"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowUpRight, Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";

/**
 * WhoWeAre — editorial, interactive redesign.
 */

type SisterCard = {
  id: string;
  name: string;
  role: string;
  summary: string;
  bio: string;
  alt: string;
  image: string;
};

function SisterImageCard({
  sister,
  index,
  reversed,
}: {
  sister: SisterCard;
  index: number;
  reversed: boolean;
}) {
  return (
    <div className={`relative ${reversed ? "lg:order-2" : "lg:order-1"}`}>
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-[0_28px_80px_-42px_rgba(0,0,0,0.6)] ring-1 ring-white/5 backdrop-blur-sm">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.55rem] bg-[#0f1a27]">
          <img
            src={sister.image}
            alt={sister.alt}
            className="h-full w-full object-cover transition-transform duration-[1500ms] ease-out hover:scale-105"
            loading="lazy"
          />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,16,27,0.08)_0%,rgba(35,51,73,0.18)_48%,rgba(35,51,73,0.58)_100%)]" />
          <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
            <span className="rounded-pill border border-white/18 bg-white/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider2 text-white backdrop-blur-md">
              Sister {index + 1}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
            <span className="rounded-pill border border-accent/35 bg-[linear-gradient(135deg,rgba(242,211,154,0.95),rgba(222,178,95,0.85))] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider2 text-primary shadow-[0_10px_24px_-14px_rgba(210,166,121,0.65)] backdrop-blur">
              {sister.name}
            </span>
            <span className="rounded-pill border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider2 text-white backdrop-blur-md">
              0{index + 1}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SisterDescriptionCard({
  sister,
  reversed,
  bioLabel,
}: {
  sister: SisterCard;
  reversed: boolean;
  bioLabel: string;
}) {
  return (
    <div className={`flex items-center ${reversed ? "lg:order-1" : "lg:order-2"}`}>
      <div className="max-w-2xl py-2 md:py-4 lg:pl-2">
        <span className="inline-flex items-center gap-3 text-eyebrow uppercase text-accent-200">
          <span className="h-px w-10 bg-accent/70" />
          {sister.role}
        </span>
        <h4 className="mt-4 font-display text-2xl leading-snug text-accent-100 drop-shadow-[0_0_10px_rgba(210,166,121,0.15)] md:text-3xl">
          {sister.name}
        </h4>
        <p className="mt-5 border-l-4 border-accent/70 pl-5 text-[15px] italic leading-relaxed text-white/84">
          {sister.bio}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={`#${sister.id}-bio`}
            className="gold-cta inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold"
          >
            {bioLabel}
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <span className="text-[11px] uppercase tracking-wider2 text-white/55">{sister.name}</span>
        </div>
        <span id={`${sister.id}-bio`} className="sr-only" aria-hidden="true" />
      </div>
    </div>
  );
}

function SisterProfileRow({
  sister,
  index,
  reversed,
  bioLabel,
}: {
  sister: SisterCard;
  index: number;
  reversed: boolean;
  bioLabel: string;
}) {
  return (
    <motion.article
      id={sister.id}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="grid gap-5 lg:grid-cols-2 lg:gap-8"
    >
      <SisterImageCard sister={sister} index={index} reversed={reversed} />
      <SisterDescriptionCard sister={sister} reversed={reversed} bioLabel={bioLabel} />
    </motion.article>
  );
}

type OfCounsel = {
  name: string;
  role: string;
  country: string;
  image?: string;
  alt?: string;
  bio1: string;
  bio2: string;
};

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");
}

function OfCounselCard({ member, index }: { member: OfCounsel; index: number }) {
  const initials = getInitials(member.name);

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(7,15,23,0.96),rgba(35,51,73,0.92))] shadow-[0_22px_60px_-42px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-colors duration-300 hover:border-accent/30"
    >
      <div className="relative min-h-[24rem] overflow-hidden">
        <motion.div
          aria-hidden
          animate={{ x: [0, 22, 0], y: [0, -14, 0], scale: [1, 1.07, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(242,211,154,0.24),transparent_68%)] blur-3xl"
        />
        <motion.div
          aria-hidden
          animate={{ x: [0, -18, 0], y: [0, 14, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -left-24 bottom-10 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(119,82,62,0.24),transparent_70%)] blur-3xl"
        />
        <motion.div
          aria-hidden
          animate={{ opacity: [0.72, 0.92, 0.72] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[22rem] bg-[linear-gradient(180deg,rgba(7,16,26,0)_0%,rgba(19,16,14,0.24)_34%,rgba(245,242,240,0.9)_100%)]"
        />

        {member.image ? (
          <img
            src={member.image}
            alt={member.alt ?? member.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
            loading="lazy"
          />
        ) : null}

        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(7,15,23,0.06)),radial-gradient(circle_at_18%_20%,rgba(242,211,154,0.18),transparent_30%),radial-gradient(circle_at_85%_80%,rgba(120,178,220,0.2),transparent_34%)]" />

        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-7">
          <div className="flex items-start justify-between gap-4">
            <span className="inline-flex items-center gap-2 rounded-pill border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider2 text-white/85 backdrop-blur-md">
              Of counsel
            </span>
            <span className="text-[10px] uppercase tracking-wider2 text-white/60">{member.country}</span>
          </div>

          <div className="flex items-end justify-between gap-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/15 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(242,211,154,0.16))] text-3xl font-display text-white shadow-[0_18px_40px_-24px_rgba(0,0,0,0.7)] backdrop-blur-md md:h-28 md:w-28 md:text-4xl">
              {initials}
            </div>
            <span className="max-w-[8rem] text-right text-[11px] uppercase leading-relaxed tracking-wider2 text-white/65">
              Hover to reveal profile
            </span>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0">
          <div className="pointer-events-none h-32 bg-[linear-gradient(180deg,transparent,rgba(7,15,23,0.7))]" />

          <div className="relative border-t border-white/10 bg-[linear-gradient(180deg,rgba(7,15,23,0.88),rgba(35,51,73,0.96))] px-6 pb-6 pt-5 backdrop-blur-sm transition-transform duration-500 ease-out group-hover:-translate-y-0.5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h4 className="font-display text-2xl leading-tight text-accent-100 md:text-[2rem]">
                  {member.name}
                </h4>
                <p className="mt-2 text-[12px] font-semibold uppercase tracking-wider2 text-white/60">
                  {member.role}
                </p>
              </div>
            </div>

            <div className="mt-4 max-h-0 overflow-hidden space-y-4 text-[14px] leading-relaxed text-white/76 opacity-0 transition-all duration-500 ease-out group-hover:max-h-[14rem] group-hover:opacity-100 md:text-[15px]">
              <p>{member.bio1}</p>
              <p>{member.bio2}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

type NetworkCountry = {
  code: string;
  image: string;
  alt: string;
};

const networkCountries: NetworkCountry[] = [
  {
    code: "ARGENTINA",
    image:
      "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=1200&q=80",
    alt: "Buenos Aires skyline, Argentina",
  },
  {
    code: "USA",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80",
    alt: "New York City skyline, United States",
  },
  {
    code: "ITALY",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
    alt: "The Colosseum in Rome, Italy",
  },
  {
    code: "SPAIN",
    image:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=80",
    alt: "Barcelona cityscape, Spain",
  },
  {
    code: "UNITED KINGDOM",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
    alt: "London skyline with Big Ben, United Kingdom",
  },
  {
    code: "AUSTRALIA",
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
    alt: "Sydney Opera House, Australia",
  },
  {
    code: "PORTUGAL",
    image:
      "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?auto=format&fit=crop&w=1200&q=80",
    alt: "Lisbon old town, Portugal",
  },
];

function NetworkSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % networkCountries.length);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  const current = networkCountries[index];

  return (
    <>
      <AnimatePresence>
        <motion.img
          key={current.code}
          src={current.image}
          alt={current.alt}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1.2 }}
          exit={{ opacity: 0, scale: 1.24 }}
          transition={{
            opacity: { duration: 1.3, ease: "easeInOut" },
            scale: { duration: 6.5, ease: "linear" },
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,15,23,0.12)_0%,rgba(7,15,23,0.42)_45%,rgba(7,15,23,0.82)_100%)]"
      />

      <div className="absolute right-5 top-5 flex items-center gap-2">
        <AnimatePresence mode="wait">
          <motion.span
            key={current.code}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="whitespace-nowrap rounded-pill border border-accent/30 bg-[linear-gradient(135deg,rgba(242,211,154,0.95),rgba(222,178,95,0.9))] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider2 text-primary shadow-[0_10px_24px_-14px_rgba(210,166,121,0.7)] backdrop-blur"
          >
            {current.code}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-5 right-5 flex items-center gap-1.5">
        {networkCountries.map((c, i) => (
          <span
            key={c.code}
            aria-hidden
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === index ? "w-5 bg-accent" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </>
  );
}

export function WhoWeAre() {
  const t = useTranslations("whoWeAre");
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.12, once: true });

  const sisters = t.raw("sisters") as SisterCard[];
  const displayedSisters = [...sisters].reverse();
  const jurisdictions = t.raw("jurisdictions") as string[];
  const ofCounsel = t.raw("ofCounsel") as OfCounsel[];

  const stats = [
    { value: "15+", label: t("statYears") },
    { value: "100+", label: t("statCases") },
    { value: "10+", label: t("statJurisdictions") },
    { value: "4", label: t("statLanguages") },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#07101a_0%,#0c1520_48%,#13100e_100%)] py-20 text-white lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_circle_at_10%_0%,rgba(242,211,154,0.24),transparent_44%),radial-gradient(900px_circle_at_88%_10%,rgba(232,160,126,0.18),transparent_40%),radial-gradient(900px_circle_at_50%_100%,rgba(35,51,73,0.5),transparent_58%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_28%)]"
      />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.42, 0.82, 0.42], x: [0, 18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-x-0 top-0 h-[40rem] bg-[radial-gradient(760px_circle_at_72%_-10%,rgba(242,211,154,0.18),transparent_60%)] mix-blend-screen"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, 18, 0], y: [0, -14, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-28 top-16 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(242,211,154,0.24),transparent_68%)] blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, 22, 0], y: [0, 18, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(232,160,126,0.22),transparent_70%)] blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -16, 0], y: [0, 16, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-24 bottom-10 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(119,82,62,0.26),transparent_70%)] blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -14, 0], y: [0, 10, 0], opacity: [0.28, 0.48, 0.28] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[18%] top-[22%] h-60 w-60 rounded-full bg-[radial-gradient(circle,rgba(255,244,223,0.22),transparent_68%)] blur-3xl mix-blend-screen"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
      />
      <div className="hero-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-screen" />

      <div className="container relative z-10">
        <div id="who-we-are" className="scroll-mt-28 grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-white/10 shadow-[0_30px_80px_-42px_rgba(0,0,0,0.65)]">
              <img
                src="/Images/TheSisters.png"
                alt="Galli's & Co. founding sisters"
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
                <span className="text-[10px] uppercase tracking-wider2 text-white/85">Córdoba · AR</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.92 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-6 -right-4 hidden items-center gap-3 rounded-card bg-white px-5 py-4 shadow-elevated ring-1 ring-primary/10 sm:flex md:-right-6"
            >
              <div className="leading-tight">
                <p className="font-display text-2xl text-primary">15+</p>
                <p className="text-[10px] uppercase tracking-wider2 text-ink-muted">{t("statYears")}</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            id="our-approach"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-3 text-eyebrow uppercase text-accent-200">
              <span className="h-px w-10 bg-accent/70" />
              {t("eyebrow")}
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight text-white md:text-4xl lg:text-[2.85rem]">
              {t("title")}
            </h2>
            <p className="mt-6 border-l-4 border-accent/70 pl-5 text-[15px] italic leading-relaxed text-white/78">
              {t("paragraph1")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/about" className="gold-cta group px-5 py-2.5 text-sm font-medium">
                {t("cta")}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/contact"
                className="gold-cta group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium"
              >
                {t("conversationCta")}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(35,51,73,0.72))] shadow-[0_22px_60px_-36px_rgba(0,0,0,0.55)] md:grid-cols-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="group relative flex flex-col items-center justify-center gap-1 overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(35,51,73,0.32))] px-4 py-6 text-center backdrop-blur-sm transition-transform duration-500 hover:-translate-y-0.5"
            >
              <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
              <span
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(242,211,154,0.18),transparent_52%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
              />
              <p className="relative font-display text-3xl text-accent-200 drop-shadow-[0_0_12px_rgba(210,166,121,0.18)] md:text-4xl">
                {s.value}
              </p>
              <p className="relative text-[10px] font-semibold uppercase tracking-wider2 text-white/72">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        <div id="legal-team" className="mt-16 scroll-mt-28 rounded-[2.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] px-5 py-8 text-white shadow-[0_24px_70px_-42px_rgba(0,0,0,0.4)] backdrop-blur-sm md:px-8 md:py-10">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-eyebrow uppercase text-accent-200">{t("sistersEyebrow")}</span>
              <h3 className="mt-2 font-display text-2xl text-white md:text-3xl">{t("sistersTitle")}</h3>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:gap-8">
            {displayedSisters.map((s, index) => {
              const isReversed = index === 1;
              return (
                <SisterProfileRow
                  key={s.id}
                  sister={s}
                  index={index}
                  reversed={isReversed}
                  bioLabel={t("fullBioCta")}
                />
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
          className="mt-14 overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(7,15,23,0.98),rgba(35,51,73,0.94))] text-white shadow-[0_28px_80px_-50px_rgba(0,0,0,0.65)]"
        >
          <div className="grid gap-0 lg:grid-cols-[1.1fr_1fr]">
            <div className="relative min-h-[240px] overflow-hidden lg:min-h-[340px]">
              <NetworkSlideshow />
              <div className="pointer-events-none absolute inset-x-5 bottom-5 flex items-end">
                <div className="max-w-[12rem] rounded-[1.1rem] border border-white/10 bg-black/20 p-3 backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-wider2 text-accent-100">{t("globalReach")}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/80">
                    Argentina, Europe and the United States working as one coordinated network.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center p-7 md:p-10">
              <span className="inline-flex items-center gap-3 text-eyebrow uppercase text-accent-100">
                <span className="h-px w-10 bg-accent/70" />
                {t("networkTitle")}
              </span>
              <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-white/74 md:text-base">
                {t("networkText")}
              </p>

              <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {jurisdictions.map((code) => (
                  <span
                    key={code}
                    className="flex items-center justify-center whitespace-nowrap rounded-full border border-accent/20 bg-[linear-gradient(135deg,rgba(242,211,154,0.95),rgba(222,178,95,0.88))] px-3 py-2 text-[11px] font-semibold tracking-wider2 text-primary shadow-[0_10px_24px_-18px_rgba(210,166,121,0.7)] backdrop-blur"
                  >
                    {code}
                  </span>
                ))}
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative col-span-2 flex items-center justify-center overflow-hidden rounded-full border border-accent/30 bg-[linear-gradient(135deg,rgba(242,211,154,0.10),rgba(255,255,255,0.04))] px-3 py-2 text-[11px] font-medium tracking-wider2 whitespace-nowrap text-accent-100 backdrop-blur sm:col-span-4"
                >
                  {/* Shimmer sweep */}
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(105deg,transparent 20%,rgba(242,211,154,0.32) 50%,transparent 80%)",
                      translateX: "-140%",
                    }}
                    animate={inView ? { translateX: "240%" } : { translateX: "-140%" }}
                    transition={{
                      duration: 1.5,
                      delay: 1.0,
                      repeat: Infinity,
                      repeatDelay: 3.4,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  />
                  {/* Border glow pulse */}
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full"
                    animate={
                      inView
                        ? {
                            boxShadow: [
                              "0 0 0px 0px rgba(210,166,121,0)",
                              "0 0 18px 4px rgba(210,166,121,0.3)",
                              "0 0 0px 0px rgba(210,166,121,0)",
                            ],
                          }
                        : {}
                    }
                    transition={{
                      duration: 2.4,
                      delay: 1.0,
                      repeat: Infinity,
                      repeatDelay: 2.6,
                      ease: "easeInOut",
                    }}
                  />
                  {t("moreJurisdictions")}
                </motion.span>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wider2 text-accent-100/75">
                <span className="inline-flex items-center gap-1.5 rounded-pill border border-accent/15 bg-[linear-gradient(135deg,rgba(242,211,154,0.10),rgba(255,255,255,0.04))] px-3 py-1.5 backdrop-blur">
                  <Languages className="h-3.5 w-3.5 text-accent-100" /> ES · EN · IT
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.62, ease: "easeOut" }}
          className="mt-10"
        >
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-3 text-eyebrow uppercase text-accent-200">
                <span className="h-px w-8 bg-accent/70" />
                {t("ofCounselEyebrow")}
              </span>
              <h3 className="mt-2 font-display text-xl text-white md:text-2xl">{t("ofCounselTitle")}</h3>
            </div>
            <p className="max-w-md text-[13px] leading-relaxed text-white/60">{t("ofCounselSubtitle")}</p>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {ofCounsel.map((member, i) => (
              <OfCounselCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(7,15,23,0.96),rgba(35,51,73,0.9))] text-white shadow-[0_28px_80px_-50px_rgba(0,0,0,0.62)]"
        >
          <motion.div
            aria-hidden
            animate={{ x: [0, 20, 0], y: [0, -12, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -left-20 -top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(210,166,121,0.2),transparent_70%)] blur-3xl"
          />
          <motion.div
            aria-hidden
            animate={{ x: [0, -18, 0], y: [0, 14, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(35,51,73,0.45),transparent_72%)] blur-3xl"
          />
          <motion.div
            aria-hidden
            animate={{ opacity: [0.55, 0.9, 0.55] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-x-0 top-0 h-[18rem] bg-[radial-gradient(700px_circle_at_72%_-12%,rgba(242,211,154,0.14),transparent_62%)]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
          />

          <div className="relative grid gap-px md:grid-cols-[0.8fr_1.2fr]">
            <div className="flex items-center justify-between bg-white/5 px-7 py-8 md:flex-col md:items-start md:justify-center md:py-10">
              <div>
                <span className="inline-flex items-center gap-3 text-eyebrow uppercase text-accent-100">
                  <span className="h-px w-8 bg-accent/70" />
                  {t("togetherEyebrow")}
                </span>
                <h3 className="mt-3 font-display text-2xl text-accent-100 md:text-[2rem]">
                  {t("sistersTitle")}
                </h3>
              </div>
            </div>

            <div className="relative p-7 md:p-10">
              <motion.div
                aria-hidden
                animate={{ opacity: [0.5, 0.95, 0.5] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(242,211,154,0.14),transparent_38%),radial-gradient(circle_at_100%_100%,rgba(120,178,220,0.1),transparent_34%)]"
              />
              <p className="relative max-w-4xl border-l-4 border-accent/60 pl-5 text-[15px] leading-relaxed text-white/82 md:text-base">
                {t("paragraph4")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
