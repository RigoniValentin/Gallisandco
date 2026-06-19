"use client";

import { type FormEvent, useState } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";

type ContactFormProps = {
  title: string;
  intro: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  subjectLabel: string;
  subjectPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
  submittingLabel: string;
  successTitle: string;
  successText: string;
  errorTitle: string;
  errorText: string;
  emailSubject: string;
};

type SubmissionState = "idle" | "submitting" | "success" | "error";

const FORM_SUBMIT_TOKEN = "ec90d10dbdd1c38b42e12617fe00fe58";
const FORM_ACTION_ENDPOINT = `https://formsubmit.co/${FORM_SUBMIT_TOKEN}`;
const FORM_AJAX_ENDPOINT = `https://formsubmit.co/ajax/${FORM_SUBMIT_TOKEN}`;

export function ContactForm({
  title,
  intro,
  nameLabel,
  namePlaceholder,
  emailLabel,
  emailPlaceholder,
  subjectLabel,
  subjectPlaceholder,
  messageLabel,
  messagePlaceholder,
  submitLabel,
  submittingLabel,
  successTitle,
  successText,
  errorTitle,
  errorText,
  emailSubject,
}: ContactFormProps) {
  const [state, setState] = useState<SubmissionState>("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  const resetFeedback = () => {
    if (state !== "idle") {
      setState("idle");
      setFeedback(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
      _subject: emailSubject,
      _captcha: "false",
      _template: "table",
    };

    setState("submitting");
    setFeedback(null);

    try {
      const response = await fetch(FORM_AJAX_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(responseData?.message ?? errorText);
      }

      form.reset();
      setState("success");
      setFeedback(successText);
    } catch {
      setState("error");
      setFeedback(errorText);
    }
  };

  const inputClass =
    "mt-2 w-full rounded-2xl border border-white/12 bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] outline-none transition-colors focus:border-accent/55 focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-70";

  return (
    <div className="relative flex flex-col overflow-hidden rounded-card border border-primary/10 bg-primary text-white shadow-[0_18px_46px_-34px_rgba(35,51,73,0.34)]">
      <img
        src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1100&q=80"
        alt="Calendar with scheduled meetings"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
        loading="lazy"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(35,51,73,0.86),rgba(35,51,73,0.96))]"
      />

      <div className="relative z-10 flex flex-1 flex-col p-8">
        <div>
          <p className="text-eyebrow uppercase tracking-wider2 text-accent-200">{title}</p>
          <p className="mt-4 text-sm leading-relaxed text-white/80">{intro}</p>
        </div>

        {state !== "idle" ? (
          <div
            className={`mt-6 rounded-card border p-4 text-sm ${
              state === "success"
                ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-50"
                : "border-rose-400/25 bg-rose-400/10 text-rose-50"
            }`}
            role={state === "error" ? "alert" : "status"}
            aria-live="polite"
          >
            <p className="font-semibold">
              {state === "success" ? successTitle : errorTitle}
            </p>
            <p className="mt-1 leading-relaxed">{feedback}</p>
          </div>
        ) : null}

        <form
          className="mt-6 grid gap-4"
          action={FORM_ACTION_ENDPOINT}
          method="POST"
          onSubmit={handleSubmit}
          onChange={resetFeedback}
        >
          <input type="hidden" name="_subject" value={emailSubject} />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-white/88">
              {nameLabel}
              <input
                name="name"
                type="text"
                required
                minLength={2}
                autoComplete="name"
                placeholder={namePlaceholder}
                className={inputClass}
                disabled={state === "submitting"}
              />
            </label>

            <label className="block text-sm font-medium text-white/88">
              {emailLabel}
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder={emailPlaceholder}
                className={inputClass}
                disabled={state === "submitting"}
              />
            </label>
          </div>

          <label className="block text-sm font-medium text-white/88">
            {subjectLabel}
            <input
              name="subject"
              type="text"
              required
              minLength={3}
              placeholder={subjectPlaceholder}
              className={inputClass}
              disabled={state === "submitting"}
            />
          </label>

          <label className="block text-sm font-medium text-white/88">
            {messageLabel}
            <textarea
              name="message"
              required
              minLength={20}
              rows={6}
              placeholder={messagePlaceholder}
              className={`${inputClass} resize-none`}
              disabled={state === "submitting"}
            />
          </label>

          <button
            type="submit"
            disabled={state === "submitting"}
            className="gold-cta group inline-flex w-full items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {state === "submitting" ? submittingLabel : submitLabel}
            {state === "submitting" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}