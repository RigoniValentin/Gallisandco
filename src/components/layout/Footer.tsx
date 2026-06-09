"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { freeConsultationHref } from "@/lib/scheduling";

const quickLinkKeys = ["about", "services", "contact"] as const;

const quickLinkHrefs: Record<(typeof quickLinkKeys)[number], string> = {
  about: "/about",
  services: "/services",
  contact: "/contact",
};

export function Footer() {
  const t = useTranslations("footer");
  const navT = useTranslations("nav");
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.35, once: false });
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative isolate overflow-hidden pt-14 text-white bg-[#070f17] border-t-[3px] border-accent/40"
    >
      <div className="container relative z-10 pb-8 flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-20">
        {/* Columna 1: Logo y descripción */}
        <div className="flex-1 flex flex-col gap-6 min-w-[220px]">
          <Image
            src="/brand/logoHorizontal.png"
            alt="Galli's & Co."
            width={786}
            height={204}
            className="h-auto w-[180px] sm:w-[220px] opacity-90"
            priority
          />
          <p className="max-w-md text-sm text-white/80 font-light leading-relaxed border-l-4 border-accent pl-4 mt-2">
            {t("description")}
          </p>
          <Link
            href={freeConsultationHref}
            className="gold-cta inline-flex w-fit items-center gap-2 px-5 py-2.5 text-sm font-semibold"
          >
            {t("cta")}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Columna 2: Navegación */}
        <div className="flex-1 flex flex-col gap-6 min-w-[180px]">
          <h3 className="text-base font-semibold uppercase tracking-wider2 text-accent-200 mb-2">{t("quickLinks")}</h3>
          <ul className="flex flex-col gap-2 text-sm text-white/80">
            {quickLinkKeys.map((key) => (
              <li key={key}>
                <Link
                  href={quickLinkHrefs[key]}
                  className="transition-colors hover:text-accent-100 px-0.5 py-0.5 rounded"
                >
                  {navT(key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 3: Contacto */}
        <div className="flex-1 flex flex-col gap-6 min-w-[220px]">
          <h3 className="text-base font-semibold uppercase tracking-wider2 text-accent-200 mb-2">{t("contactTitle")}</h3>
          <div className="flex flex-col gap-3 text-sm text-white/90">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-accent-200" />
              <span className="font-light">{t("address")}</span>
            </div>
            <a
              href="tel:+5493512073555"
              className="flex items-center gap-3 hover:text-accent-100 transition-colors"
            >
              <Phone className="h-5 w-5 text-accent-200" />
              <span className="font-light">{t("phone")}</span>
            </a>
            <a
              href="mailto:contacto@gallisco.com"
              className="flex items-center gap-3 hover:text-accent-100 transition-colors"
            >
              <Mail className="h-5 w-5 text-accent-200" />
              <span className="font-light">{t("email")}</span>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-white/10 pt-4 text-center text-xs text-white/50 tracking-wide">
        {t("rights", { year })}
      </div>
    </footer>
  );
}
