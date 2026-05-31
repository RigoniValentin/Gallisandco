import { defineRouting } from "next-intl/routing";

/**
 * i18n routing strategy
 * - Default locale: English  → served at  `/en/...`
 * - Secondary:      Spanish  → served at  `/es/...`
 * `localePrefix: "always"` keeps locale-specific routes explicit for both languages.
 */
export const routing = defineRouting({
  locales: ["en", "es"] as const,
  defaultLocale: "en",
  localePrefix: "always",
});

export type AppLocale = (typeof routing.locales)[number];
