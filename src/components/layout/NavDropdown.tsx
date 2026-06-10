"use client";

import { ChevronDown, ArrowUpRight } from "lucide-react";
import { clsx } from "clsx";
import { useLocale } from "next-intl";
import { Link } from "@/lib/navigation";

type NavDropdownItem = {
  label: string;
  description: string;
  href: string;
};

type NavDropdownProps = {
  label: string;
  href: string;
  navKey: NavKey;
  solid: boolean;
  open: boolean;
  onOpen: () => void;
  onCloseWithDelay: () => void;
};

export type NavKey = "home" | "about" | "services" | "contact";

const dropdownItemsByKeyEs: Record<NavKey, NavDropdownItem[]> = {
  home: [],
  about: [
    { label: "Las hermanas", description: "Biografías y presentación de las socias.", href: "#the-sisters" },
    { label: "Of counsel", description: "Aliados legales y apoyo interdisciplinario.", href: "#of-counsel" },
    { label: "Red interdisciplinaria", description: "Alcance global y conexiones por jurisdicción.", href: "#interdisciplinary-network" },
  ],
  services: [
    { label: "Movilidad Internacional", description: "Residencia, ciudadanía y relocation en Argentina.", href: "/services/international-mobility" },
    { label: "Representación en Argentina", description: "Litigios, civil y administrativo.", href: "/services/argentine-legal-representation" },
    { label: "Visas para EE. UU.", description: "B1/B2, DS-160 y estrategia consular.", href: "/services/us-visa-guidance" },
    { label: "Rutas Europeas", description: "Ciudadanía italiana y residencias.", href: "/services/european-pathways" },
  ],
  contact: [
    { label: "Consulta gratis de 15 min", description: "Hook temporal para agendar una intro call.", href: "/contact#free-consultation" },
    { label: "WhatsApp", description: "Intercambio rápido por chat.", href: "https://wa.me/5493512073555" },
    { label: "Email", description: "contacto@gallisco.com", href: "mailto:contacto@gallisco.com" },
  ],
};

const dropdownItemsByKeyEn: Record<NavKey, NavDropdownItem[]> = {
  home: [],
  about: [
    { label: "The sisters", description: "Biographies and the founding partners.", href: "#the-sisters" },
    { label: "Of counsel", description: "Legal allies and interdisciplinary support.", href: "#of-counsel" },
    { label: "Interdisciplinary network", description: "Global reach and jurisdictional connections.", href: "#interdisciplinary-network" },
  ],
  services: [
    { label: "International Mobility", description: "Argentine residency, citizenship and relocation.", href: "/services/international-mobility" },
    { label: "Argentine Representation", description: "Litigation, civil and administrative.", href: "/services/argentine-legal-representation" },
    { label: "U.S. Visa Guidance", description: "B1/B2, DS-160 and consular strategy.", href: "/services/us-visa-guidance" },
    { label: "European Pathways", description: "Italian citizenship and residencies.", href: "/services/european-pathways" },
  ],
  contact: [
    { label: "15 min free consultation", description: "Temporary hook to book an intro call.", href: "/contact#free-consultation" },
    { label: "WhatsApp", description: "Quick exchange by chat.", href: "https://wa.me/5493512073555" },
    { label: "Email", description: "contacto@gallisco.com", href: "mailto:contacto@gallisco.com" },
  ],
};

export function NavDropdown({
  label,
  href,
  navKey,
  solid,
  open,
  onOpen,
  onCloseWithDelay,
}: NavDropdownProps) {
  const locale = useLocale();
  const items = locale === "es" ? dropdownItemsByKeyEs[navKey] : dropdownItemsByKeyEn[navKey];
  const hasItems = items.length > 0;

  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onCloseWithDelay}
      onFocus={onOpen}
      onBlur={onCloseWithDelay}
    >
      <Link
        href={href}
        className={clsx(
          "nav-link inline-flex items-center gap-1 rounded-pill px-4 py-2 text-sm font-medium transition-all whitespace-nowrap",
          solid
            ? "bg-transparent text-white/90 visited:text-white/90 hover:bg-white/[0.07] hover:text-white"
            : "text-white/90 visited:text-white/90 hover:text-white"
        )}
      >
        {label}
        {hasItems ? (
          <ChevronDown
            className={clsx(
              "h-3.5 w-3.5 opacity-75 transition-transform duration-300",
              open ? "rotate-180" : "rotate-0"
            )}
          />
        ) : null}
      </Link>

      {hasItems ? (
        <div
          className={clsx(
            "absolute left-1/2 top-[calc(100%+0.6rem)] z-[120] w-[360px] -translate-x-1/2 transition-all duration-300",
            open
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-1 opacity-0"
          )}
        >
          <div className="rounded-[1.4rem] border border-white/20 bg-[linear-gradient(150deg,rgba(26,38,55,0.98)_0%,rgba(35,51,73,0.98)_55%,rgba(45,66,95,0.98)_100%)] p-2 shadow-[0_28px_62px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            <ul className="space-y-1">
              {items.map((item) => {
                const isExternal =
                  item.href.startsWith("http") || item.href.startsWith("mailto:");
                const inner = (
                  <>
                    <span>
                      <span className="block text-sm font-medium text-white">{item.label}</span>
                      <span className="mt-0.5 block text-xs text-white/70">{item.description}</span>
                    </span>
                    <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-accent-200 transition-transform duration-300 group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5" />
                  </>
                );
                return (
                  <li key={`${item.label}-${item.href}`}>
                    {isExternal ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/item flex items-start justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.08]"
                      >
                        {inner}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="group/item flex items-start justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.08]"
                      >
                        {inner}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
