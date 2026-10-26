import { AnimatePresence, motion } from "motion/react";
import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { CircleAlert, CircleCheck, Copy, LoaderCircle, Mail, Send } from "lucide-react";
import { site } from "../config/site";
import { services } from "../data/services";
import { EASE } from "./motion";

type Values = { name: string; email: string; phone: string; service: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;
type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string }
  | { kind: "mailto"; body: string }
  | { kind: "whatsapp" };

type Via = "direct" | "email" | "whatsapp";

const OTHER = "Other / not sure";
const serviceOptions = [...services.map((s) => s.title), OTHER];

function validate(v: Values): Errors {
  const errors: Errors = {};
  if (v.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!v.email.trim()) errors.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    errors.email = "That email address doesn't look right — please check it (e.g. name@example.com).";
  if (v.phone.trim() && !/^[+()\d\s-]{9,20}$/.test(v.phone.trim()))
    errors.phone = "Please enter a valid phone number, e.g. 082 123 4567.";
  if (!v.service) errors.service = "Please choose the service you need (or “Other / not sure”).";
  if (v.message.trim().length < 10) errors.message = "Please describe your plumbing issue in a few words (at least 10 characters).";
  return errors;
}

function composeBody(v: Values) {
  return [
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    `Phone: ${v.phone || "—"}`,
    `Service required: ${v.service}`,
    "",
    v.message,
  ].join("\n");
}

export function ContactForm({ initialService }: { initialService?: string }) {
  const preset = services.find((s) => s.id === initialService)?.title ?? "";
  const [values, setValues] = useState<Values>({ name: "", email: "", phone: "", service: preset, message: "" });
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);

  const errors = validate(values);
  const directDelivery = Boolean(site.formEndpoint);
  const show = (field: keyof Values) => (touched[field] ? errors[field] : undefined);

  const update = (field: keyof Values) => (value: string) => setValues((v) => ({ ...v, [field]: value }));
  const blur = (field: keyof Values) => () => setTouched((t) => ({ ...t, [field]: true }));

  const focusStatus = () => requestAnimationFrame(() => statusRef.current?.focus());

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const via = (submitter?.value as Via | undefined) ?? (directDelivery ? "direct" : "email");
    setTouched({ name: true, email: true, phone: true, service: true, message: true });
    const invalid = (Object.keys(errors) as (keyof Values)[])[0];
    if (invalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${invalid}"]`)?.focus();
      return;
    }
    if (honeypot.current?.value) return; // bot

    const subject = `Plumbing enquiry: ${values.service} — ${values.name}`;

    if (via === "whatsapp") {
      const text = `Hello ${site.name}, I'd like to enquire about: ${values.service}

${composeBody(values)}`;
      window.open(`https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
      setStatus({ kind: "whatsapp" });
      focusStatus();
      return;
    }

    if (via === "email" || !directDelivery) {
      const body = composeBody(values);
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus({ kind: "mailto", body: `Subject: ${subject}\n\n${body}` });
      focusStatus();
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch(site.formEndpoint!, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...(site.formAccessKey ? { access_key: site.formAccessKey } : {}),
          subject,
          name: values.name,
          email: values.email,
          phone: values.phone,
          service: values.service,
          message: values.message,
          _replyto: values.email,
        }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus({ kind: "sent" });
      setValues({ name: "", email: "", phone: "", service: "", message: "" });
      setTouched({});
    } catch {
      setStatus({
        kind: "error",
        message: `Your enquiry could not be sent. Please try again, call ${site.phone.mobile.display}, or email ${site.email}.`,
      });
    }
    focusStatus();
  }

  async function copyMessage(text: string) {
    try {
      await navigator.clipboard.writeText(`To: ${site.email}\n${text}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative">

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Full Name" required error={show("name")}>
          {(props) => (
            <input
              {...props}
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={(e) => update("name")(e.target.value)}
              onBlur={blur("name")}
            />
          )}
        </Field>
        <Field id="email" label="Email Address" required error={show("email")}>
          {(props) => (
            <input
              {...props}
              type="email"
              inputMode="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => update("email")(e.target.value)}
              onBlur={blur("email")}
            />
          )}
        </Field>
        <Field id="phone" label="Phone Number" hint="Optional — useful if you'd prefer a call back." error={show("phone")}>
          {(props) => (
            <input
              {...props}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={(e) => update("phone")(e.target.value)}
              onBlur={blur("phone")}
            />
          )}
        </Field>
        <Field id="service" label="Service Required" required error={show("service")}>
          {(props) => (
            <div className="relative">
              <select
                {...props}
                value={values.service}
                onChange={(e) => {
                  update("service")(e.target.value);
                  setTouched((t) => ({ ...t, service: true }));
                }}
                onBlur={blur("service")}
                className={`${props.className} appearance-none pr-12`}
              >
                <option value="" disabled>
                  Choose a service…
                </option>
                {serviceOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <svg aria-hidden="true" viewBox="0 0 12 8" className="pointer-events-none absolute top-1/2 right-5 h-2 w-3 -translate-y-1/2 fill-none stroke-ink stroke-[1.75]">
                <path d="m1 1.5 5 5 5-5" />
              </svg>
            </div>
          )}
        </Field>
        <div className="sm:col-span-2">
          <Field id="message" label="Message" required hint="What's happening, where, and since when?" error={show("message")}>
            {(props) => (
              <textarea
                {...props}
                rows={6}
                value={values.message}
                onChange={(e) => update("message")(e.target.value)}
                onBlur={blur("message")}
                className={`${props.className} min-h-40 resize-y py-4`}
              />
            )}
          </Field>
        </div>
      </div>

      {/* Honeypot (hidden from people) */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this empty
          <input ref={honeypot} type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {site.whatsapp.enabled && (
          <motion.button
            type="submit"
            name="via"
            value="whatsapp"
            whileTap={{ scale: 0.97 }}
            className="group inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 font-bold text-ink shadow-[0_16px_36px_-16px_rgb(31_180_87/0.9)] transition-colors hover:bg-[#1fb457]"
          >
            <WhatsAppIcon />
            Send via WhatsApp
          </motion.button>
        )}
        <motion.button
          type="submit"
          name="via"
          value={directDelivery ? "direct" : "email"}
          whileTap={{ scale: 0.97 }}
          disabled={status.kind === "sending"}
          className={`group inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full px-6 font-bold transition-colors disabled:cursor-wait disabled:opacity-70 ${
            site.whatsapp.enabled ? "bg-white text-ink ring-1 ring-ink/20 ring-inset hover:ring-ink" : "bg-ink text-paper hover:bg-ink-3 sm:col-span-2"
          }`}
        >
          {status.kind === "sending" ? (
            <>
              <LoaderCircle aria-hidden="true" className="h-5 w-5 animate-spin" />
              Sending…
            </>
          ) : directDelivery ? (
            <>
              Send enquiry
              <Send aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </>
          ) : (
            <>
              <Mail aria-hidden="true" className="h-4 w-4" />
              Send via email
            </>
          )}
        </motion.button>
      </div>
      <p className="mt-4 text-center text-sm text-muted">
        {directDelivery
          ? "“Send enquiry” delivers your message directly to the business."
          : "These open WhatsApp or your email app with your message written out. Nothing is sent until you press Send."}{" "}
        <span aria-hidden="true" className="text-tide-deep">*</span> Required fields.
      </p>

      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="outline-none">
        <AnimatePresence mode="wait">
          {status.kind === "sent" && (
            <StatusPanel key="sent" tone="success" title="Enquiry sent">
              Thank you — your enquiry has been delivered to {site.name}. If your matter is urgent, please call{" "}
              <a className="font-semibold underline" href={site.phone.mobile.href}>
                {site.phone.mobile.display}
              </a>
              .
            </StatusPanel>
          )}
          {status.kind === "error" && (
            <StatusPanel key="error" tone="error" title="Not sent">
              {status.message}
            </StatusPanel>
          )}
          {status.kind === "whatsapp" && (
            <StatusPanel key="whatsapp" tone="info" title="Check WhatsApp">
              WhatsApp should have opened with your enquiry written out. <strong>It has not been sent yet</strong> — please
              review it and press Send. If nothing opened, call {site.phone.mobile.display} or use “Send via email”.
            </StatusPanel>
          )}
          {status.kind === "mailto" && (
            <StatusPanel key="mailto" tone="info" title="Check your email app">
              <p>
                Your email app should have opened with the enquiry ready to send. <strong>It has not been sent yet</strong> —
                please review it and press Send.
              </p>
              <p className="mt-3">
                Nothing opened? Copy your message and email it to{" "}
                <a className="font-semibold underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                , or call {site.phone.mobile.display}.
              </p>
              <button
                type="button"
                onClick={() => copyMessage(status.body)}
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-paper"
              >
                {copied ? <CircleCheck aria-hidden="true" className="h-4 w-4 text-tide" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
                {copied ? "Copied" : "Copy message"}
              </button>
            </StatusPanel>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

type FieldRenderProps = {
  id: string;
  name: string;
  className: string;
  "aria-invalid": boolean;
  "aria-describedby"?: string;
  "aria-required"?: boolean;
};

function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: (props: FieldRenderProps) => ReactNode;
}) {
  const uid = useId();
  const inputId = `${id}-${uid}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  const className = `block w-full rounded-xl bg-white/70 px-5 text-[1.02rem] text-ink ring-1 ring-inset transition-[box-shadow,background-color] duration-200 placeholder:text-muted/70 focus:bg-white focus:outline-none focus:ring-2 min-h-14 ${
    error ? "ring-danger focus:ring-danger" : "ring-ink/15 hover:ring-ink/30 focus:ring-signal"
  }`;

  return (
    <div>
      <label htmlFor={inputId} className="mb-2 block font-semibold tracking-[-0.01em]">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-tide-deep">
            *
          </span>
        )}
      </label>
      {hint && (
        <p id={hintId} className="-mt-1 mb-2 text-sm text-muted">
          {hint}
        </p>
      )}
      {children({
        id: inputId,
        name: id,
        className,
        "aria-invalid": Boolean(error),
        "aria-describedby": [hintId, errorId].filter(Boolean).join(" ") || undefined,
        "aria-required": required || undefined,
      })}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={errorId}
            className="mt-2 flex items-start gap-1.5 text-sm font-medium text-danger"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <CircleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatusPanel({ tone, title, children }: { tone: "success" | "error" | "info"; title: string; children: ReactNode }) {
  const styles = {
    success: "bg-tide-deep/10 ring-tide-deep/30",
    error: "bg-danger/8 ring-danger/30",
    info: "bg-stone ring-ink/10",
  }[tone];
  const Icon = tone === "error" ? CircleAlert : tone === "success" ? CircleCheck : Mail;
  const iconColor = tone === "error" ? "text-danger" : "text-tide-deep";

  return (
    <motion.div
      className={`mt-8 flex gap-4 rounded-2xl p-6 ring-1 ${styles}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <Icon aria-hidden="true" className={`mt-0.5 h-5 w-5 shrink-0 ${iconColor}`} />
      <div className="text-ink">
        <p className="font-bold">{title}</p>
        <div className="mt-1 text-muted">{children}</div>
      </div>
    </motion.div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.24 8.24c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.17-.48-.29Z" />
    </svg>
  );
}
