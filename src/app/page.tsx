import { redirect } from "next/navigation";

/**
 * Root path — redirect to the default locale (English).
 * This handles the case where the next-intl middleware "as-needed" prefix
 * doesn't rewrite "/" before Next.js routing kicks in.
 */
export default function RootPage() {
  redirect("/en");
}
