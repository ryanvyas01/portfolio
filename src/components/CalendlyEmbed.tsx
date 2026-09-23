import { usePortfolio } from './portfolioContext'

/**
 * A plain iframe, rather than Calendly's own embed script.
 *
 * The script would need a third-party fetch on page load, an extra dependency,
 * and an initialisation step; the iframe needs none of that, works with
 * `loading="lazy"`, and keeps Calendly's JavaScript off this site entirely until
 * the visitor actually scrolls to it. The one thing it gives up is automatic
 * height, since Calendly's script measures its own content and a cross-origin
 * iframe cannot. Hence the fixed height below: tall enough for the month view
 * plus a few time slots, and the calendar scrolls inside itself if a visitor's
 * availability runs longer.
 *
 * No colour parameters are passed. Calendly accepts `background_color` and
 * friends, but the only portfolio that embeds this is the dog one, which is
 * light — so its default styling already matches, and a half-matched palette
 * would look worse than an unmodified embed.
 */
const EMBED_HEIGHT = 680

/**
 * Appends Calendly's own parameters to the scheduling URL.
 *
 * `hide_gdpr_banner=1` is the documented way to suppress the cookie bar, which
 * otherwise renders inside the frame and reads as a second site asking for
 * consent on top of this one.
 */
function embedSrc(url: string) {
  const params = new URLSearchParams({ hide_gdpr_banner: '1' })
  return `${url}${url.includes('?') ? '&' : '?'}${params}`
}

/**
 * The dog portfolio's booking calendar, inline.
 *
 * Embeds `contactChannel.url` from the active pack. Until that is filled in there
 * is nothing to frame, so the section falls back to the email link rather than
 * rendering a widget pointing at nowhere.
 */
export function CalendlyEmbed({ url }: { url?: string }) {
  const { content } = usePortfolio()
  const { profile } = content

  if (!url) {
    /*
     * In production, render nothing: the Contact section below already offers the
     * email address, so a visitor loses nothing. In development a placeholder
     * marks the space instead, so the section's layout can be judged before the
     * URL exists.
     */
    if (!import.meta.env.DEV) {
      return null
    }

    return (
      <div className="rounded-lg border border-dashed border-neutral-300 p-8 text-center sm:p-10 dark:border-white/15">
        <p className="text-sm text-neutral-900 dark:text-white">
          Calendly embed goes here
        </p>
        <p className="mt-3 text-sm text-neutral-500">
          Add the scheduling URL to <code>contactChannel.url</code> in{' '}
          <code>src/data/dogTraining.ts</code>. This placeholder is development-only —
          in production the section shows the email link on its own.
        </p>
      </div>
    )
  }

  return (
    <div className="surface overflow-hidden rounded-lg p-2 sm:p-3">
      <iframe
        src={embedSrc(url)}
        title={`Schedule a consultation with ${profile.name}`}
        loading="lazy"
        className="w-full rounded-md border-0"
        style={{ height: EMBED_HEIGHT }}
      />
      <p className="px-2 pt-3 pb-1 text-sm text-neutral-500">
        Calendar not loading?{' '}
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4 transition-opacity hover:opacity-70"
        >
          Open it in a new tab
        </a>
        .
      </p>
    </div>
  )
}
