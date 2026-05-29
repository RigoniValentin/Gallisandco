import { defineRouting } from "next-intl/routing";

/**
 * i18n routing strategy
 * - Default locale: English  → served at  `/`
 * - Secondary:      Spanish  → served at  `/es/...`
 * `localePrefix: "as-needed"` keeps the default locale clean (no `/en` prefix).
 */
export const routing = defineRouting({
  locales: ["en", "es"] as const,
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type AppLocale = (typeof routing.locales)[number];
