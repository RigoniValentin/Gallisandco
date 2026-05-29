"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/lib/navigation";

const defaultMessage = "Hola, quisiera realizar una consulta general sobre sus servicios.";
const whatsappHref = `https://wa.me/5493512073555?${new URLSearchParams({
  text: defaultMessage,
}).toString()}`;

export function WhatsAppFloat() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTopButton(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";

  function handleGoTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      {isHome && showTopButton ? (
        <button
          type="button"
          onClick={handleGoTop}
          aria-label={t("backToTop")}
          className="fixed bottom-[5.25rem] right-[1.625rem] z-[59] inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 bg-white/95 text-primary shadow-[0_12px_28px_-16px_rgba(35,51,73,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ChevronUp className="h-5 w-5" />
          <span className="sr-only">{t("backToTop")}</span>
        </button>
      ) : null}

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("whatsappLabel")}
        className="group fixed bottom-5 right-5 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/50 bg-[#25D366] text-white shadow-[0_18px_38px_-18px_rgba(37,211,102,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_22px_44px_-20px_rgba(37,211,102,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="h-7 w-7 fill-current transition-transform duration-300 group-hover:scale-110"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        <span className="sr-only">WhatsApp</span>
      </a>
    </>
  );
}
