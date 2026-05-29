import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for:
  //  - api, _next, _vercel
  //  - any file with an extension (e.g. /favicon.ico, /brand/Icono.png)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
