"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/lib/navigation";
import { routing } from "../../../i18n/routing";
import { clsx } from "clsx";

type Tone = "onLight" | "onDark";

const labels: Record<(typeof routing.locales)[number], string> = {
  en: "EN",
  es: "ES",
};

export function LanguageSwitcher({ tone = "onLight", className }: { tone?: Tone; className?: string }) {
  const t = useTranslations("nav");
  const current = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: string) => {
    if (next === current) return;
    startTransition(() => {
      // `pathname` here is already locale-stripped thanks to next-intl/navigation
      router.replace(pathname, { locale: next as "en" | "es" });
    });
  };

  return (
    <div
      role="group"
      aria-label={t("languageLabel")}
      className={clsx(
        "inline-flex items-center rounded-pill border p-0.5 text-xs font-medium tracking-wider2",
        tone === "onDark"
          ? "border-white/20 bg-white/5 backdrop-blur"
          : "border-primary/15 bg-white",
        isPending && "opacity-60",
        className
      )}
    >
      {routing.locales.map((loc) => {
        const active = loc === current;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => switchTo(loc)}
            aria-pressed={active}
            className={clsx(
              "rounded-pill px-3 py-1.5 transition-colors",
              active
                ? tone === "onDark"
                  ? "bg-white text-primary"
                  : "bg-primary text-white"
                : tone === "onDark"
                  ? "text-white/70 hover:text-white"
                  : "text-ink-muted hover:text-primary"
            )}
          >
            {labels[loc]}
          </button>
        );
      })}
    </div>
  );
}
