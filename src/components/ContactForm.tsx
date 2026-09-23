import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { usePortfolio } from './portfolioContext'

/**
 * What the form is doing right now.
 *
 * One value rather than a fistful of booleans, so the states cannot contradict
 * each other — there is no arrangement of `sending` and `sent` that can both be
 * true at once.
 */
type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  /** Delivered to the configured endpoint. */
  | { kind: 'sent' }
  /** No endpoint configured, so the visitor's mail client was opened instead. */
  | { kind: 'handoff' }
  | { kind: 'error'; message: string }

type Fields = { name: string; email: string; message: string }

type FieldErrors = Partial<Record<keyof Fields, string>>

const EMPTY: Fields = { name: '', email: '', message: '' }

/**
 * Deliberately permissive. The only thing worth catching here is a typo the
 * visitor can fix; anything stricter starts rejecting addresses that are
 * perfectly valid, and the receiving inbox is the real authority anyway.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const FIELD_CLASS =
  'w-full rounded-lg border bg-white/70 px-4 py-2.5 text-sm text-neutral-900 transition-colors placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-neutral-500'

function validate(fields: Fields): FieldErrors {
  const errors: FieldErrors = {}

  if (fields.name.trim().length === 0) {
    errors.name = 'Please add your name.'
  }

  if (fields.email.trim().length === 0) {
    errors.email = 'Please add an email address so I can reply.'
  } else if (!EMAIL_PATTERN.test(fields.email.trim())) {
    errors.email = 'That does not look like an email address.'
  }

  if (fields.message.trim().length === 0) {
    errors.message = 'Please add a short message.'
  }

  return errors
}

/**
 * Composes a message for the visitor's own mail client.
 *
 * This is the fallback when no `endpoint` is configured. A plain `mailto:` is
 * the only option that works without a server, and it is used openly rather than
 * as a silent stand-in for a real submission.
 */
function mailtoHref(to: string, fields: Fields) {
  const subject = `Enquiry from ${fields.name}`
  const body = `${fields.message}\n\n— ${fields.name}\n${fields.email}`
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/**
 * The software portfolio's contact form.
 *
 * Posts to `endpoint` when one is configured. Until then it still validates and
 * composes properly, then hands off to the mail client — so the frontend is
 * complete and honest and the only thing left to supply is a URL.
 */
export function ContactForm({ endpoint }: { endpoint?: string }) {
  const { content } = usePortfolio()
  const { profile } = content

  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  const nameId = useId()
  const emailId = useId()
  const messageId = useId()

  const busy = status.kind === 'sending'

  // First name only: a full name reads stiffly in a greeting.
  const firstName = fields.name.trim().split(/\s+/)[0]

  function update(key: keyof Fields, value: string) {
    setFields((current) => ({ ...current, [key]: value }))

    // Clear this field's error as soon as it is edited, so the message never sits
    // there contradicting what the visitor is currently typing.
    setErrors((current) => {
      if (!current[key]) {
        return current
      }
      const next = { ...current }
      delete next[key]
      return next
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (busy) {
      return
    }

    /*
     * Honeypot. A field no human can see, which only a script filling every input
     * will touch. Read straight off the form rather than through state so it never
     * renders controlled, and accepted silently when tripped: telling a bot it
     * failed only teaches it what to avoid next time. Formspree also filters on
     * this exact name server-side.
     */
    if (new FormData(event.currentTarget).get('_gotcha')) {
      setStatus({ kind: 'sent' })
      return
    }

    const problems = validate(fields)
    setErrors(problems)
    if (Object.keys(problems).length > 0) {
      return
    }

    if (!endpoint) {
      window.location.href = mailtoHref(profile.email, fields)
      setStatus({ kind: 'handoff' })
      return
    }

    setStatus({ kind: 'sending' })

    const body = new FormData()
    body.append('name', fields.name)
    body.append('email', fields.email)
    body.append('message', fields.message)

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        // Formspree answers with JSON when asked for it, rather than redirecting
        // to its own thank-you page, which is what an AJAX submission wants.
        headers: { Accept: 'application/json' },
        body,
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      // Not cleared here: the confirmation greets them by name, and "Send
      // another" is what resets the fields.
      setStatus({ kind: 'sent' })
    } catch {
      /*
       * A network failure and a rejected submission are the same thing from here:
       * the message did not arrive. Say so plainly, and leave what was typed in
       * place so nothing has to be written out twice.
       */
      setStatus({
        kind: 'error',
        message: `Something went wrong and the message was not sent. Please try again, or email ${profile.email} directly.`,
      })
    }
  }

  if (status.kind === 'sent' || status.kind === 'handoff') {
    return (
      <Confirmation
        title={status.kind === 'sent' ? 'Message sent' : 'Almost there'}
        body={
          status.kind === 'sent'
            ? `Thanks${firstName ? `, ${firstName}` : ''}. I'll get back to you at the email address you gave.`
            : `Your email app should have opened with the message ready to send. If it did not, email ${profile.email} and I'll pick it up from there.`
        }
        onReset={() => {
          setFields(EMPTY)
          setErrors({})
          setStatus({ kind: 'idle' })
        }}
      />
    )
  }

  return (
    <form
      // Validation is ours, not the browser's: the native bubbles cannot be
      // styled to match, and they announce inconsistently across screen readers.
      noValidate
      onSubmit={handleSubmit}
      className="surface rounded-lg p-8 sm:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={nameId} label="Name" error={errors.name}>
          <input
            id={nameId}
            name="name"
            type="text"
            autoComplete="name"
            value={fields.name}
            onChange={(event) => update('name', event.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${nameId}-error` : undefined}
            className={`${FIELD_CLASS} ${errors.name ? 'border-red-500 dark:border-red-500/70' : 'border-neutral-300 dark:border-white/15'}`}
          />
        </Field>

        <Field id={emailId} label="Email" error={errors.email}>
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={(event) => update('email', event.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${emailId}-error` : undefined}
            className={`${FIELD_CLASS} ${errors.email ? 'border-red-500 dark:border-red-500/70' : 'border-neutral-300 dark:border-white/15'}`}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field id={messageId} label="Message" error={errors.message}>
          <textarea
            id={messageId}
            name="message"
            rows={5}
            value={fields.message}
            onChange={(event) => update('message', event.target.value)}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? `${messageId}-error` : undefined}
            className={`${FIELD_CLASS} resize-y ${errors.message ? 'border-red-500 dark:border-red-500/70' : 'border-neutral-300 dark:border-white/15'}`}
          />
        </Field>
      </div>

      {/* Unseeable and unreachable, but present in the markup for a script to fill. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${nameId}-gotcha`}>Leave this field empty</label>
        <input
          id={`${nameId}-gotcha`}
          name="_gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status.kind === 'error' ? (
        <p role="alert" className="mt-6 text-sm text-red-600 dark:text-red-400">
          {status.message}
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 disabled:opacity-60 dark:bg-white dark:text-neutral-900"
        >
          {busy ? 'Sending…' : 'Send message'}
        </button>
        <p className="text-sm text-neutral-500">
          Or email{' '}
          <a
            href={`mailto:${profile.email}`}
            className="underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            {profile.email}
          </a>
        </p>
      </div>
    </form>
  )
}

/** Label, control, and error, so the three cannot drift out of alignment. */
function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-neutral-900 dark:text-white"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  )
}

/**
 * Replaces the form once it has been sent. Kept in the same card so the section
 * does not change height and jolt the page.
 */
function Confirmation({
  title,
  body,
  onReset,
}: {
  title: string
  body: string
  onReset: () => void
}) {
  return (
    <div className="surface rounded-lg p-8 sm:p-10">
      <p role="status" className="text-lg text-neutral-900 dark:text-white">
        {title}
      </p>
      <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">{body}</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 rounded-lg border border-neutral-300 px-4 py-2 text-sm text-neutral-700 transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 dark:border-white/15 dark:text-neutral-200 dark:hover:bg-white/[0.06]"
      >
        Send another
      </button>
    </div>
  )
}
