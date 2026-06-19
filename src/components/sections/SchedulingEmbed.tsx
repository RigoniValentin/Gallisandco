"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";

type SchedulingEmbedProps = {
  /** Embeddable Google Calendar appointment-schedule URL (with `?gv=true`). */
  src: string;
  /** Accessible title shown in the modal header and used as the iframe title. */
  title: string;
  /** Optional supporting copy shown under the title. */
  subtitle?: string;
  /** External booking URL used as a fallback if the iframe is blocked. */
  fallbackHref: string;
  /** Label for the fallback link. */
  fallbackLabel: string;
  /** Accessible label for the close button. */
  closeLabel: string;
  /** Hash that, when present in the URL, opens the modal (e.g. `#book-calendar`). */
  activateHash?: string;
};

export function SchedulingEmbed({
  src,
  title,
  subtitle,
  fallbackHref,
  fallbackLabel,
  closeLabel,
  activateHash = "#book-calendar",
}: SchedulingEmbedProps) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    if (window.location.hash === activateHash) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
  }, [activateHash]);

  useEffect(() => {
    const syncFromHash = () => {
      if (window.location.hash === activateHash) setOpen(true);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [activateHash]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <div
        aria-hidden
        onClick={close}
        className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
      />

      <div className="relative flex h-[92vh] max-h-[900px] w-full max-w-3xl flex-col overflow-hidden rounded-card border border-primary/10 bg-white shadow-elevated">
        <div className="flex items-start justify-between gap-4 border-b border-primary/10 px-6 py-4">
          <div className="min-w-0">
            <h2 className="font-display text-lg font-semibold leading-tight text-primary md:text-xl">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-1 text-sm leading-relaxed text-ink/70">
                {subtitle}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={close}
            aria-label={closeLabel}
            className="-mr-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-pill border border-primary/15 text-primary/70 transition-colors hover:border-accent/40 hover:text-accent-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <iframe
          src={src}
          title={title}
          loading="lazy"
          className="block w-full min-h-0 flex-1 border-0"
        />

        <a
          href={fallbackHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 border-t border-primary/10 bg-surface/60 px-5 py-3 text-sm font-medium text-primary/70 transition-colors hover:text-accent-700"
        >
          {fallbackLabel}
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
