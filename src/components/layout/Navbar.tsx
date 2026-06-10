"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, ArrowUpRight, Instagram, Music2, MessageCircle } from "lucide-react";
import { clsx } from "clsx";
import { Link } from "@/lib/navigation";
import { freeConsultationHref } from "@/lib/scheduling";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NavDropdown } from "./NavDropdown";

type NavbarProps = {
  /**
   * When `true`, the navbar starts transparent over a dark hero and
   * solidifies on scroll. When `false`, it always sits on a light surface.
   */
  overDark?: boolean;
};

const navKeys = [
  "home",
  "services",
  "about",
  "contact",
] as const;
type NavKey = (typeof navKeys)[number];
type DropdownKey = NavKey | "brand";

const navHrefs: Record<NavKey, string> = {
  home: "/",
  about: "/#about",
  services: "/services",
  contact: "/contact",
};

const socialItems = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    Icon: Instagram,
    posClass: "left-[2.2rem] top-[2.8rem]",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/",
    Icon: Music2,
    posClass: "left-1/2 top-[4.05rem] -translate-x-1/2",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/5493512073555",
    Icon: MessageCircle,
    posClass: "right-[2.2rem] top-[2.8rem]",
  },
] as const;

export function Navbar({ overDark = true }: NavbarProps) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !overDark || open;
  const tone: "onLight" | "onDark" = overDark ? "onDark" : "onLight";

  function clearCloseTimeout() {
    if (!closeTimeoutRef.current) return;
    clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = null;
  }

  function handleDropdownOpen(key: DropdownKey) {
    clearCloseTimeout();
    setActiveDropdown(key);
  }

  function handleDropdownCloseWithDelay(key: DropdownKey) {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown((prev) => (prev === key ? null : prev));
      closeTimeoutRef.current = null;
    }, 220);
  }

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 overflow-visible transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300",
        solid
          ? "border-b border-white/15 bg-[linear-gradient(135deg,rgba(26,38,55,0.96)_0%,rgba(35,51,73,0.97)_44%,rgba(59,85,122,0.95)_72%,rgba(45,66,95,0.96)_100%)] backdrop-blur-xl shadow-[0_24px_52px_-28px_rgba(0,0,0,0.78)]"
          : "border-b border-transparent bg-transparent"
      )}
    >
      {solid ? (
        <>
          <div
            aria-hidden
            className="footer-gradient-live pointer-events-none absolute inset-0 opacity-90"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-[-8%] top-3 h-20 w-20 rounded-full bg-[radial-gradient(circle,rgba(210,166,121,0.56)_0%,rgba(210,166,121,0.1)_42%,transparent_70%)] blur-xl footer-orb-live"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-[-5%] top-1 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(169,122,81,0.5)_0%,rgba(169,122,81,0.1)_38%,transparent_72%)] blur-xl footer-orb-live"
            style={{ animationDelay: "1.2s" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(210,166,121,0.82),rgba(255,255,255,0.35),rgba(210,166,121,0.82),transparent)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-5 text-white/[0.08]"
          >
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="h-full w-full fill-current">
              <path d="M0,0 L0,32 C170,58 336,76 525,58 C708,40 910,10 1095,24 C1230,34 1330,54 1440,26 L1440,0 Z" />
            </svg>
          </div>
        </>
      ) : null}

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-pill focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
      >
        {t("skipToContent")}
      </a>

      <div className="container flex h-20 items-center justify-between gap-6">
        {/* Brand */}
        <div
          className="relative hidden lg:block"
          onMouseEnter={() => handleDropdownOpen("brand")}
          onMouseLeave={() => handleDropdownCloseWithDelay("brand")}
          onFocus={() => handleDropdownOpen("brand")}
          onBlur={() => handleDropdownCloseWithDelay("brand")}
        >
          <Link
            href="/"
            aria-label="Galli's & Co. — Home"
            className="group flex items-center rounded-pill border border-transparent px-2 py-1 transition-all hover:border-white/20 hover:bg-white/5"
          >
            <Image
              src="/brand/logoHorizontal.png"
              alt="Galli's & Co. — Global Mobility & Solutions"
              width={786}
              height={204}
              priority
              className="h-auto w-[180px] object-contain transition-transform duration-300 group-hover:-translate-y-px sm:w-[220px] lg:w-[260px]"
            />
          </Link>

          <div
            className={clsx(
              "absolute left-1/2 top-[calc(100%+0.4rem)] z-[130] -translate-x-1/2 transition-all duration-300",
              activeDropdown === "brand"
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-1 opacity-0"
            )}
          >
            <div className="relative h-[8.3rem] w-[16.5rem]">
              <div className="absolute inset-x-0 top-0 h-[6.8rem] rounded-b-[10rem] " />
              <div className="pointer-events-none absolute inset-x-[1.8rem] top-[2.9rem] h-px bg-[linear-gradient(90deg,transparent,rgba(210,166,121,0.55),transparent)]" />

              <p className="pointer-events-none absolute inset-x-0 top-3 text-center text-[10px] uppercase tracking-wider2 text-white/60">
                Find Galli's
              </p>

              {socialItems.map(({ label, href, Icon, posClass }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={clsx(
                    "group/item absolute grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/[0.07] text-white/90 shadow-[0_10px_18px_-14px_rgba(0,0,0,0.65)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/55 hover:bg-white/[0.12] hover:text-white",
                    posClass
                  )}
                >
                  <Icon className="h-4 w-4 text-accent-200 transition-transform duration-300 group-hover/item:scale-110" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <Link
          href="/"
          aria-label="Galli's & Co. — Home"
          className="group flex items-center rounded-pill border border-transparent px-2 py-1 transition-all hover:border-white/20 hover:bg-white/5 lg:hidden"
        >
          <Image
            src="/brand/logoHorizontal.png"
            alt="Galli's & Co. — Global Mobility & Solutions"
            width={786}
            height={204}
            priority
            className="h-auto w-[180px] object-contain transition-transform duration-300 group-hover:-translate-y-px sm:w-[220px] lg:w-[260px]"
          />
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 lg:flex"
        >
          {navKeys.map((key) => (
            <NavDropdown
              key={key}
              navKey={key}
              label={t(key)}
              href={navHrefs[key]}
              solid={solid}
              open={activeDropdown === key}
              onOpen={() => handleDropdownOpen(key)}
              onCloseWithDelay={() => handleDropdownCloseWithDelay(key)}
            />
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex w-full items-center justify-end gap-3">
          <Link
            href={freeConsultationHref}
            className="gold-cta hidden items-center gap-2 px-4 py-2 text-sm font-semibold lg:inline-flex"
          >
            <span>{t("cta")}</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <div className="md:block">
            <LanguageSwitcher
              tone={tone}
              className="rounded-pill border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-all hover:border-accent/45 hover:bg-white/18"
            />
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={clsx(
              "inline-flex h-10 w-10 items-center justify-center rounded-pill border lg:hidden",
              solid
                ? "border-white/25 text-white"
                : "border-white/30 text-white"
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        className={clsx(
          "lg:hidden",
          "overflow-hidden border-t border-white/15 bg-[linear-gradient(160deg,rgba(26,38,55,0.98)_0%,rgba(35,51,73,0.98)_58%,rgba(45,66,95,0.98)_100%)] backdrop-blur-xl transition-[max-height] duration-300",
          open ? "max-h-[480px]" : "max-h-0"
        )}
      >
        <nav aria-label="Mobile" className="container flex flex-col gap-1 py-4">
          {navKeys.map((key) => (
            <Link
              key={key}
              href={navHrefs[key]}
              onClick={() => setOpen(false)}
              className="nav-link rounded-card px-4 py-3 text-base font-medium text-white transition-all hover:bg-white/[0.07] hover:text-white"
            >
              {t(key)}
            </Link>
          ))}
          <div className="mt-3 flex items-center justify-between gap-3">
            <LanguageSwitcher tone="onLight" />
            <Link
              href={freeConsultationHref}
              onClick={() => setOpen(false)}
              className="gold-cta inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium"
            >
              {t("cta")}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
