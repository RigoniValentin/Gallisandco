"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  Briefcase,
  Compass,
  Gavel,
  Globe2,
  Languages,
  Scale,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";

/**
 * WhoWeAre — editorial, interactive redesign.
 *
 * Composition:
 *  1. Editorial split-hero (founding portrait + eyebrow/title/lead + floating stat badge)
 *  2. Stats strip (years · cases · jurisdictions · languages)
 *  3. Interactive sister profiles (tab switcher with AnimatePresence detail panel)
 *  4. Network strip with jurisdiction chips
 *  5. Closing manifesto
 */

type SisterId = "international" | "domestic";

// Static visual / icon config — translation keys resolved inside component
const SISTERS_CONFIG = [
  {
    id: "international" as SisterId,
    // [Portrait — confident female attorney, soft daylight, ~600x720, blue-toned]
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
    alt: "Attorney portrait — international mobility lead",
    RoleIcon: Globe2,
    paragraphKey: "paragraph2" as const,
    roleEyebrowKey: "internationalRoleEyebrow" as const,
    signatureKey: "internationalSignature" as const,
    strengthKeys: [
      { Icon: Compass, key: "strengthCrossBorder" as const },
      { Icon: Globe2, key: "strengthMobility" as const },
      { Icon: Briefcase, key: "strengthRelocation" as const },
    ],
  },
  {
    id: "domestic" as SisterId,
    // [Portrait — professional woman attorney, warm neutral background, ~600x720]
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80",
    alt: "Attorney portrait — Argentine legal representation lead",
    RoleIcon: Scale,
    paragraphKey: "paragraph3" as const,
    roleEyebrowKey: "domesticRoleEyebrow" as const,
    signatureKey: "domesticSignature" as const,
    strengthKeys: [
      { Icon: Gavel, key: "strengthLitigation" as const },
      { Icon: Award, key: "strengthCourt" as const },
      { Icon: Scale, key: "strengthPractice" as const },
    ],
  },
] as const;

const JURISDICTIONS = ["AR", "ES", "IT", "US", "FR", "UK", "DE", "CH"] as const;

export function WhoWeAre() {
  const t = useTranslations("whoWeAre");
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.12, once: true });

  // Build the translated sisters array
  const sisters = SISTERS_CONFIG.map((cfg) => ({
    ...cfg,
    roleEyebrow: t(cfg.roleEyebrowKey),
    signature: t(cfg.signatureKey),
    strengths: cfg.strengthKeys.map(({ Icon, key }) => ({ Icon, label: t(key) })),
  }));

  const stats = [
    { value: "15+", label: t("statYears") },
    { value: "500+", label: t("statCases") },
    { value: "12+", label: t("statJurisdictions") },
    { value: "3", label: t("statLanguages") },
  ];

  const [activeId, setActiveId] = useState<SisterId>(sisters[0].id);
  const active = sisters.find((s) => s.id === activeId) ?? sisters[0];
  const activeIndex = sisters.findIndex((s) => s.id === activeId);

  return (
    <section
      id="about"
      ref={ref}
      className="relative isolate overflow-hidden bg-surface py-20 text-ink lg:py-28"
    >
      {/* Backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_8%_0%,rgba(169,122,81,0.12),transparent_45%),radial-gradient(900px_circle_at_95%_100%,rgba(35,51,73,0.12),transparent_50%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />
      <div className="hero-grain pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-multiply" />

      <div className="container relative z-10">
        {/* ── 1. Editorial header ─────────────────────────────────────── */}
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-primary/10 shadow-elevated">
              {/* [Editorial photo — two female attorneys in a sunlit Córdoba office, warm navy palette, ~800x1000] */}
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1100&q=80"
                alt="Galli's & Co. founding sisters in their Córdoba office"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out hover:scale-[1.05]"
                loading="lazy"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/15 to-transparent"
              />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                <span className="rounded-pill bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider2 text-primary backdrop-blur">
                  Las Hermanas Galli
                </span>
                <span className="text-[10px] uppercase tracking-wider2 text-white/85">
                  Córdoba · AR
                </span>
              </div>
            </div>

            {/* Floating accent stat badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.92 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-6 -right-4 hidden items-center gap-3 rounded-card bg-white px-5 py-4 shadow-elevated ring-1 ring-primary/10 sm:flex md:-right-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-50 text-accent-700">
                <Sparkles className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <p className="font-display text-2xl text-primary">15+</p>
                <p className="text-[10px] uppercase tracking-wider2 text-ink-muted">
                  {t("statYears")}
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-3 text-eyebrow uppercase text-accent-500">
              <span className="h-px w-10 bg-accent/70" />
              {t("eyebrow")}
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight text-primary md:text-4xl lg:text-[2.85rem]">
              {t("title")}
            </h2>
            <p className="mt-6 border-l-4 border-accent/70 pl-5 text-[15px] italic leading-relaxed text-ink">
              {t("paragraph1")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 rounded-pill bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-elevated transition-all hover:-translate-y-0.5 hover:bg-primary/90"
              >
                {t("cta")}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-pill border border-primary/15 bg-white px-5 py-2.5 text-sm font-medium text-primary transition-all hover:border-accent/60 hover:text-accent-700"
              >
                {t("conversationCta")}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ── 2. Stats strip ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-primary/10 bg-primary/10 md:grid-cols-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center gap-1 bg-white px-4 py-6 text-center"
            >
              <p className="font-display text-3xl text-primary md:text-4xl">{s.value}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider2 text-ink-muted">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── 3. Interactive sister profiles ──────────────────────────── */}
        <div className="mt-16">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-eyebrow uppercase text-accent-500">
                {t("sistersEyebrow")}
              </span>
              <h3 className="mt-2 font-display text-2xl text-primary md:text-3xl">
                {t("sistersTitle")}
              </h3>
            </div>
            <div
              role="tablist"
              aria-label={t("sistersEyebrow")}
              className="inline-flex rounded-pill border border-primary/15 bg-white p-1 shadow-[0_10px_30px_-22px_rgba(35,51,73,0.4)]"
            >
              {sisters.map((s, idx) => {
                const Icon = s.RoleIcon;
                const isActive = s.id === activeId;
                return (
                  <button
                    key={s.id}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    onClick={() => setActiveId(s.id)}
                    className={`inline-flex items-center gap-2 rounded-pill px-4 py-2 text-xs font-semibold uppercase tracking-wider2 transition-all ${
                      isActive
                        ? "bg-primary text-white shadow-elevated"
                        : "text-primary/70 hover:text-primary"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">
                      {String(idx + 1).padStart(2, "0")} · {s.roleEyebrow}
                    </span>
                    <span className="sm:hidden">{s.roleEyebrow}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-card border border-primary/10 bg-white shadow-[0_24px_60px_-40px_rgba(35,51,73,0.4)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-0 md:grid-cols-[minmax(0,1fr)_1.15fr]"
              >
                <div className="relative aspect-[4/5] overflow-hidden md:aspect-auto md:min-h-[460px]">
                  <motion.img
                    key={active.img}
                    src={active.img}
                    alt={active.alt}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/5 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-white/40"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-pill bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider2 text-primary backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {String(activeIndex + 1).padStart(2, "0")} / {sisters.length.toString().padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-col justify-center gap-5 p-7 md:p-10">
                  <div>
                    <span className="inline-flex items-center gap-2 text-eyebrow uppercase text-accent-600">
                      <active.RoleIcon className="h-3.5 w-3.5" />
                      {active.roleEyebrow}
                    </span>
                    <h4 className="mt-3 font-display text-2xl leading-snug text-primary md:text-3xl">
                      {active.signature}
                    </h4>
                  </div>
                  <p className="text-[15px] leading-relaxed text-ink/85">
                    {t(active.paragraphKey)}
                  </p>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {active.strengths.map(({ Icon, label }) => (
                      <li
                        key={label}
                        className="flex items-center gap-3 rounded-card border border-primary/10 bg-surface/60 px-3 py-2.5"
                      >
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-50 text-accent-700">
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-[13px] font-medium text-primary">
                          {label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── 4. Network strip ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
          className="mt-14 grid items-stretch gap-0 overflow-hidden rounded-card border border-primary/10 bg-[linear-gradient(135deg,rgba(35,51,73,0.04),rgba(169,122,81,0.06))] md:grid-cols-[1fr_1.5fr]"
        >
          <div className="relative hidden min-h-[200px] overflow-hidden md:block">
            {/* [Stylized world map / globe close-up, warm tones, ~800x600] */}
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80"
              alt="Network of jurisdictions"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div aria-hidden className="absolute inset-0 bg-primary/55 mix-blend-multiply" />
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-pill bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider2 text-primary backdrop-blur">
              <Globe2 className="h-3 w-3 text-accent" />
              {t("globalReach")}
            </div>
          </div>
          <div className="p-7 md:p-9">
            <h3 className="text-sm font-semibold uppercase tracking-wider2 text-accent-700">
              {t("networkTitle")}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {t("networkText")}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {JURISDICTIONS.map((code) => (
                <span
                  key={code}
                  className="inline-flex items-center gap-1.5 rounded-pill border border-primary/15 bg-white px-3 py-1 text-[11px] font-semibold tracking-wider2 text-primary"
                >
                  {code}
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5 rounded-pill bg-primary/5 px-3 py-1 text-[11px] font-medium tracking-wider2 text-ink-muted">
                {t("moreJurisdictions")}
              </span>
            </div>
            <div className="mt-5 flex flex-wrap gap-3 text-[11px] uppercase tracking-wider2 text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <Languages className="h-3.5 w-3.5 text-accent" /> ES · EN · IT
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── 5. Closing manifesto ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
          className="mt-10 rounded-card border border-accent/25 bg-[linear-gradient(135deg,rgba(169,122,81,0.08),rgba(35,51,73,0.04))] p-7 md:p-9"
        >
          <span className="text-eyebrow uppercase text-accent-600">{t("togetherEyebrow")}</span>
          <p className="mt-3 font-display text-xl leading-relaxed text-primary md:text-2xl">
            {t("paragraph4")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
