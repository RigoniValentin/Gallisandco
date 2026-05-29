import { createNavigation } from "next-intl/navigation";
import { routing } from "../../i18n/routing";

// Locale-aware <Link>, useRouter, usePathname, redirect, getPathname.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
