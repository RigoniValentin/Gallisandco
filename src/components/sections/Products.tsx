"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  CalendarClock,
  Check,
  Flag,
  Globe2,
  Landmark,
  Scale,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";

type ServiceCard = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  detail: string;
  cta: string;
};

type ServiceId = "international" | "usa" | "european" | "litigation";

const SERVICE_ICONS: Record<ServiceId, typeof Landmark> = {
  international: Landmark,
  usa: Globe2,
  european: Flag,
  litigation: Scale,
};

const SERVICE_SLUGS: Record<ServiceId, string> = {
  international: "international-mobility",
  usa: "us-visa-guidance",
  european: "european-pathways",
  litigation: "argentine-legal-representation",
};

// [Editorial photo per service — warm/navy palette, ~1200x800]
const SERVICE_IMAGES: Record<ServiceId, { src: string; alt: string }> = {
  international: {
    src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1300&q=80",
    alt: "Passport, map and travel essentials laid out for an international move",
  },
  usa: {
    src: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1300&q=80",
    alt: "Statue of Liberty against the New York skyline at golden hour",
  },
  european: {
    src: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1300&q=80",
    alt: "European old-town street with classical architecture",
  },
  litigation: {
    src: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=1300&q=80",
    alt: "Courthouse columns symbolizing Argentine legal representation",
  },
};

export function Products() {
  const t = useTranslations("stepper");
  const services = t.raw("services") as ServiceCard[];

  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.2, once: true });

  const [activeId, setActiveId] = useState<ServiceId>(
    (services[0]?.id as ServiceId) ?? "international",
  );

  const active = useMemo(
    () => services.find((s) => s.id === activeId) ?? services[0],
    [services, activeId],
  );
  const activeIndex = services.findIndex((s) => s.id === activeId);
  const activeImage = SERVICE_IMAGES[activeId];
  const activeSlug = SERVICE_SLUGS[activeId];
  const detailChips = active?.detail.split("·").map((s) => s.trim()).filter(Boolean) ?? [];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-surface py-20 text-ink lg:py-28"
    >
      <span id="products" className="absolute -top-24" aria-hidden />

      {/* Ambient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_15%_5%,rgba(169,122,81,0.18),transparent_45%),radial-gradient(700px_circle_at_95%_95%,rgba(35,51,73,0.10),transparent_50%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
      />
      <div className="hero-grain pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-multiply" />

      <div className="container relative z-10">
        {/* ── Header ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end"
        >
          <div>
            <span className="inline-flex items-center gap-3 text-eyebrow uppercase text-accent-700">
              <span className="h-px w-10 bg-accent/70" />
              {t("eyebrow")}
            </span>
            <h2 className="mt-3 font-display text-3xl leading-tight text-primary md:text-4xl lg:text-5xl">
              {t("title")}
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-ink-muted lg:justify-self-end lg:max-w-md lg:text-base">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* ── Mobile pill nav (horizontal scroll) ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="mt-10 -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:hidden"
          role="tablist"
          aria-label="Services"
        >
          {services.map((s) => {
            const Icon = SERVICE_ICONS[s.id as ServiceId];
            const isActive = s.id === activeId;
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(s.id as ServiceId)}
                className={[
                  "flex shrink-0 items-center gap-2 rounded-pill border px-4 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "border-accent/60 bg-primary text-white shadow-elevated"
                    : "border-primary/15 bg-white text-primary hover:border-accent/40",
                ].join(" ")}
              >
                <Icon className="h-4 w-4" />
                {s.eyebrow}
              </button>
            );
          })}
        </motion.div>

        {/* ── Main showcase ───────────────────────────────────────────── */}
        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-[340px_1fr] lg:gap-8 xl:grid-cols-[380px_1fr]">
          {/* Desktop vertical tabs */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden flex-col gap-3 lg:flex"
            role="tablist"
            aria-label="Services"
          >
            {services.map((s, idx) => {
              const Icon = SERVICE_ICONS[s.id as ServiceId];
              const isActive = s.id === activeId;
              return (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(s.id as ServiceId)}
                  className={[
                    "group relative flex items-start gap-4 overflow-hidden rounded-card border p-5 text-left transition-all duration-500",
                    isActive
                      ? "border-accent/60 bg-primary text-white shadow-[0_24px_60px_-30px_rgba(35,51,73,0.45)]"
                      : "border-primary/10 bg-white text-primary hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_18px_46px_-34px_rgba(35,51,73,0.34)]",
                  ].join(" ")}
                >
                  {/* Active accent bar */}
                  <span
                    aria-hidden
                    className={[
                      "absolute inset-y-0 left-0 w-1 origin-top bg-accent transition-transform duration-500",
                      isActive ? "scale-y-100" : "scale-y-0",
                    ].join(" ")}
                  />

                  <span
                    className={[
                      "grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-all duration-500",
                      isActive
                        ? "border-accent/55 bg-accent/20 text-accent-100"
                        : "border-primary/15 bg-primary/5 text-primary group-hover:scale-110",
                    ].join(" ")}
                    aria-hidden
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  <span className="flex-1">
                    <span
                      className={[
                        "block text-[10px] uppercase tracking-wider2 transition-colors",
                        isActive ? "text-accent-200" : "text-accent-700",
                      ].join(" ")}
                    >
                      0{idx + 1} · {s.eyebrow}
                    </span>
                    <span className="mt-1 block font-display text-lg leading-snug">
                      {s.title}
                    </span>
                  </span>

                  <ArrowUpRight
                    className={[
                      "mt-1 h-4 w-4 shrink-0 transition-all duration-500",
                      isActive
                        ? "translate-x-0 text-accent-100 opacity-100"
                        : "-translate-x-1 text-primary/30 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                    ].join(" ")}
                  />
                </button>
              );
            })}
          </motion.div>

          {/* Detail panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
            className="relative overflow-hidden rounded-card border border-primary/10 bg-white shadow-[0_24px_60px_-32px_rgba(35,51,73,0.4)]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-[1fr_1.05fr]"
              >
                {/* Image side */}
                <div className="relative h-56 overflow-hidden md:h-full md:min-h-[460px]">
                  <motion.img
                    key={`${activeId}-img`}
                    src={activeImage.src}
                    alt={activeImage.alt}
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-primary/55 via-primary/10 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-white/95"
                  />
                  {/* Service number badge */}
                  <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-pill bg-white/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider2 text-primary backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {String(activeIndex + 1).padStart(2, "0")} / 0{services.length}
                  </span>
                </div>

                {/* Content side */}
                <div className="flex flex-col justify-between gap-6 p-7 md:p-9">
                  <div>
                    <span className="text-eyebrow uppercase tracking-wider2 text-accent-700">
                      {active?.eyebrow}
                    </span>
                    <h3 className="mt-2 font-display text-2xl leading-tight text-primary md:text-3xl">
                      {active?.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-ink-muted md:text-base">
                      {active?.summary}
                    </p>

                    {detailChips.length > 0 ? (
                      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                        {detailChips.map((chip) => (
                          <li
                            key={chip}
                            className="flex items-start gap-2 text-sm text-primary/90"
                          >
                            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent-700">
                              <Check className="h-3 w-3" />
                            </span>
                            {chip}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 border-t border-primary/10 pt-5">
                    <Link
                      href={`/services/${activeSlug}`}
                      className="group inline-flex items-center gap-2 rounded-pill bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-700"
                    >
                      {active?.cta}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-pill border border-primary/20 bg-white px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-accent/50 hover:text-accent-700"
                    >
                      <CalendarClock className="h-4 w-4" />
                      {t("ctaButton")}
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── Bottom band CTA ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="mt-10 flex flex-col items-start gap-5 rounded-card border border-accent/25 bg-[linear-gradient(135deg,rgba(210,166,121,0.10),rgba(35,51,73,0.04))] p-7 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="font-display text-xl text-primary sm:text-2xl">{t("ctaTitle")}</p>
            <p className="mt-1.5 text-sm text-ink-muted">{t("ctaText")}</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-pill bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-700"
          >
            {t("ctaButton")}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
