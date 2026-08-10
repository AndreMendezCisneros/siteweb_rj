"use client";

import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import type { Dict } from "@/lib/i18n";

type Status = "idle" | "loading" | "success" | "error";

type FieldErrors = {
  name?: string;
  email?: string;
  need?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function ContactForm({
  t,
  submitLabel,
  contactEmail,
}: {
  t: Dict["form"];
  submitLabel: string;
  contactEmail: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [mailto, setMailto] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const needRef = useRef<HTMLTextAreaElement>(null);

  function validate(values: { name: string; email: string; need: string }): FieldErrors {
    const next: FieldErrors = {};
    if (!values.name) next.name = t.errors.name;
    if (!values.email) next.email = t.errors.email;
    else if (!isValidEmail(values.email)) next.email = t.errors.emailInvalid;
    if (!values.need) next.need = t.errors.need;
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setMailto(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      organization: String(data.get("organization") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      need: String(data.get("need") || "").trim(),
    };

    const fieldErrors = validate(payload);
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) {
      setStatus("idle");
      if (fieldErrors.name) nameRef.current?.focus();
      else if (fieldErrors.email) emailRef.current?.focus();
      else needRef.current?.focus();
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        ok: boolean;
        message?: string;
        mailto?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || t.errors.generic);
      }

      setStatus("success");
      setMailto(result.mailto || null);
      setMessage(t.success.body);
      form.reset();
      setErrors({});
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : t.errors.generic);
    }
  }

  const fieldClass =
    "mt-2 w-full rounded-[var(--radius-md)] border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-primary/20";
  const okBorder = "border-border focus:border-primary";
  const errBorder = "border-error focus:border-error";

  if (status === "success") {
    return (
      <div
        className="rounded-[var(--radius-lg)] border border-success/30 bg-primary-soft/50 p-6"
        role="status"
        aria-live="polite"
      >
        <h3 className="font-[family-name:var(--font-syne)] text-xl font-semibold text-ink">
          {t.success.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{message}</p>
        <ol className="mt-5 space-y-2 text-sm text-muted">
          {t.success.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {mailto ? (
            <a
              href={mailto}
              className="inline-flex items-center justify-center rounded-[var(--radius-md)] border border-border bg-surface px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {t.success.openEmail}
            </a>
          ) : null}
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setStatus("idle");
              setMessage("");
              setMailto(null);
            }}
          >
            {t.success.another}
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted">
          {t.success.alsoWrite}{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="font-medium text-primary underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {contactEmail}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="text-sm font-medium text-ink">
          {t.name}
        </label>
        <input
          ref={nameRef}
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={`${fieldClass} ${errors.name ? errBorder : okBorder}`}
        />
        {errors.name ? (
          <p id="name-error" className="mt-1.5 text-sm text-error">
            {errors.name}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-ink">
          {t.email}
        </label>
        <input
          ref={emailRef}
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`${fieldClass} ${errors.email ? errBorder : okBorder}`}
        />
        {errors.email ? (
          <p id="email-error" className="mt-1.5 text-sm text-error">
            {errors.email}
          </p>
        ) : null}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="organization" className="text-sm font-medium text-ink">
            {t.organization}
          </label>
          <input
            id="organization"
            name="organization"
            type="text"
            autoComplete="organization"
            className={`${fieldClass} ${okBorder}`}
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-ink">
            {t.phone}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={`${fieldClass} ${okBorder}`}
          />
        </div>
      </div>
      <div>
        <label htmlFor="need" className="text-sm font-medium text-ink">
          {t.need}
        </label>
        <textarea
          ref={needRef}
          id="need"
          name="need"
          required
          rows={5}
          aria-invalid={errors.need ? true : undefined}
          aria-describedby={errors.need ? "need-error" : undefined}
          className={`${fieldClass} ${errors.need ? errBorder : okBorder}`}
          placeholder={t.needPlaceholder}
        />
        {errors.need ? (
          <p id="need-error" className="mt-1.5 text-sm text-error">
            {errors.need}
          </p>
        ) : null}
      </div>

      <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? t.sending : submitLabel}
      </Button>

      {status === "error" && message ? (
        <p role="alert" className="text-sm text-error">
          {message}
        </p>
      ) : null}
    </form>
  );
}
