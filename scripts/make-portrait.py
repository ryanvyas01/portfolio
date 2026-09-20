#!/usr/bin/env python3
"""Build the hero portrait cut-out from a source photo.

Run from the repo root:

    python scripts/make-portrait.py path/to/photo.jpg

Writes `public/portrait.png` and `public/portrait.webp`.

Why the steps are in this order
-------------------------------
1. **Upscale first.** Segmentation models score the image at a fixed low
   internal resolution (u2net at 320px), so their alpha is inherently coarse.
   Upscaling the *input* first gives a smoother, higher-resolution alpha.
2. **BiRefNet for the matte.** `birefnet-portrait` resolves hair and fine edges
   far better than `u2net_human_seg`.
3. **Decontaminate the fringe.** Partial-alpha pixels are a blend of the subject
   and the *original* background. That colour survives in the cut-out and shows
   up as a halo — most visibly against dark backgrounds. We replace fringe
   colour with an average of nearby fully-opaque pixels.
4. **Tighten the alpha, then downscale.** The final downscale averages the alpha
   smoothly, which is what yields a crisp edge at display size.

Requires: `pip install rembg onnxruntime pillow numpy`
"""

from __future__ import annotations

import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter
from rembg import new_session, remove

# Work at 4x the source: enough headroom for a clean alpha and a downscale that
# averages away stair-stepping. Delivery is smaller than this (see OUT_SIZE).
WORK_SIZE = 1600
OUT_SIZE = 800
MODEL = "birefnet-portrait"
# Alpha below this is dropped entirely (kills faint haze); above it is snapped
# opaque. Values between are kept, because hair genuinely needs soft coverage.
ALPHA_FLOOR = 0.06
ALPHA_CEIL = 0.98
# Breathing room around the subject, as a fraction of its longest side. The
# source photo is cropped so tightly that the hair meets the image edge, which
# leaves a circular mask no choice but to cut into it. Padding gives the fade
# somewhere to happen that isn't the subject's face.
PAD = 0.30


def upscale(source: Image.Image) -> Image.Image:
    """Lanczos upscale with a light unsharp pass to restore edge definition."""
    im = source.convert("RGBA").resize((WORK_SIZE, WORK_SIZE), Image.LANCZOS)
    rgb = im.convert("RGB").filter(
        ImageFilter.UnsharpMask(radius=2, percent=55, threshold=3)
    )
    rgb = rgb.convert("RGBA")
    rgb.putalpha(im.getchannel("A"))
    return rgb


def decontaminate(im: Image.Image, sigma: float = 6.0) -> Image.Image:
    """Replace fringe colour with the colour of nearby opaque pixels.

    Blurs the subject's own colours and divides by the blurred coverage mask to
    get, per pixel, an average of the *opaque* neighbourhood. The original
    background colour no longer bleeds into the silhouette.
    """
    arr = np.asarray(im.convert("RGBA"), dtype=np.float32)
    rgb, alpha = arr[..., :3], arr[..., 3]

    opaque = (alpha > ALPHA_CEIL * 255).astype(np.float32)
    if opaque.sum() == 0:
        return im

    def blur(channel: np.ndarray) -> np.ndarray:
        img = Image.fromarray(channel.astype(np.uint8), mode="L")
        return np.asarray(img.filter(ImageFilter.GaussianBlur(sigma)), dtype=np.float32)

    coverage = blur(opaque * 255.0) / 255.0
    coverage = np.maximum(coverage, 1e-3)

    cleaned = np.empty_like(rgb)
    for c in range(3):
        weighted = blur(rgb[..., c] * opaque)
        cleaned[..., c] = weighted / coverage

    # Only rewrite the fringe; leave the solid interior untouched.
    fringe = (alpha <= ALPHA_CEIL * 255)[..., None]
    out = np.where(fringe, cleaned, rgb)
    out = np.clip(out, 0, 255)

    result = np.concatenate([out, alpha[..., None]], axis=-1).astype(np.uint8)
    return Image.fromarray(result, mode="RGBA")


def tighten_alpha(im: Image.Image) -> Image.Image:
    """Drop barely-there haze, snap near-opaque pixels, keep real softness."""
    arr = np.asarray(im.convert("RGBA"), dtype=np.float32)
    a = arr[..., 3] / 255.0
    a[a < ALPHA_FLOOR] = 0.0
    a[a > ALPHA_CEIL] = 1.0
    arr[..., 3] = a * 255.0
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), mode="RGBA")


def main() -> int:
    if len(sys.argv) != 2:
        print(__doc__.strip().splitlines()[3])
        return 2

    source_path = Path(sys.argv[1])
    if not source_path.is_file():
        print(f"No such file: {source_path}")
        return 1

    out_dir = Path("public")
    out_dir.mkdir(exist_ok=True)

    source = Image.open(source_path)
    print(f"source   {source.size[0]}x{source.size[1]}")

    work = upscale(source)
    print(f"upscaled {work.size[0]}x{work.size[1]}")

    print(f"segmenting with {MODEL} (downloads once, then cached)…", flush=True)
    cut = remove(work, session=new_session(MODEL))
    print("  matte done", flush=True)

    cut = decontaminate(cut)
    print("  fringe decontaminated")

    cut = tighten_alpha(cut)

    bbox = cut.getchannel("A").getbbox()
    if not bbox:
        print("Matte is empty — the model found no subject.")
        return 1
    cut = cut.crop(bbox)
    print(f"  cropped to subject {cut.size[0]}x{cut.size[1]}")

    # Square canvas with breathing room around the subject, anchored to the
    # bottom edge so the shoulder cut lands on the section divider. The empty
    # margin is what the circular fade dissolves into, so the mask never chews
    # into the hair or the face.
    side = int(max(cut.size) * (1 + PAD))
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.paste(cut, ((side - cut.width) // 2, side - cut.height), cut)

    canvas = canvas.resize((OUT_SIZE, OUT_SIZE), Image.LANCZOS)
    canvas.save(out_dir / "portrait.png")
    canvas.save(out_dir / "portrait.webp", quality=92, method=6)

    print(f"wrote    public/portrait.png + portrait.webp  ({OUT_SIZE}x{OUT_SIZE})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
