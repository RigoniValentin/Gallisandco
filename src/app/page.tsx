import { redirect } from "next/navigation";

/**
 * Root path — redirect to the default locale (English).
 * The app uses explicit locale prefixes, so `/` forwards to `/en`.
 */
export default function RootPage() {
  redirect("/en");
}
