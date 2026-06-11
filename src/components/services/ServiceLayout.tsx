"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Check, type LucideIcon } from "lucide-react";
import { Link } from "@/lib/navigation";

// ── Content schema (shared by every service via i18n) ───────────────────────

type Hero = {
  eyebrow: string;
  title: string;
  description: string;
  badges: string[];
  primaryCta: string;
  secondaryCta: string;
};

type Highlight = { title: string; text: string };

type Intro = {
  eyebrow: string;
  title: string;
  lead: string;
  highlights: Highlight[];
};

type SectionsHeading = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

type ServiceSection = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
  cta?: string;
};

type Feature = {
  quote: string;
  author: string;
};

type Closing = {
  eyebrow: string;
  title: string;
  subtitle: string;
  button: string;
};

export type ServiceLayoutProps = {
  /** i18n namespace, e.g. "services.internationalMobility" */
  namespace: string;
  heroImage: { src: string; alt: string };
  featureImage: { src: string; alt: string };
  /** Icon per section id */
  sectionIcons: Record<string, LucideIcon>;
};

// ── Animation helpers ───────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Atoms ───────────────────────────────────────────────────────────────────

function Eyebrow({ children, tone = "dark" }: { children: React.ReactNode; tone?: "dark" | "light" }) {
  const color = tone === "light" ? "text-accent-200" : "text-accent-700";
  return (
    <span className={`inline-flex items-center gap-3 text-eyebrow uppercase tracking-wider2 ${color}`}>
      <span className="h-px w-10 bg-accent/70" />
      {children}
    </span>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 rounded-2xl border border-primary/10 bg-white px-4 py-3 shadow-[0_14px_38px_-32px_rgba(35,51,73,0.4)]">
      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/12 text-accent-700">
        <Check className="h-3.5 w-3.5" />
      </span>
      <span className="text-sm leading-relaxed text-ink">{text}</span>
    </li>
  );
}

// ── Layout ──────────────────────────────────────────────────────────────────

export function ServiceLayout({ namespace, heroImage, featureImage, sectionIcons }: ServiceLayoutProps) {
  const t = useTranslations(namespace);
  const hero = t.raw("hero") as Hero;
  const intro = t.raw("intro") as Intro;
  const sectionsHeading = t.raw("sectionsHeading") as SectionsHeading;
  const sections = t.raw("sections") as ServiceSection[];
  const feature = t.raw("feature") as Feature;
  const closing = t.raw("closing") as Closing;

  return (
    <>
      {/* ── 1. Hero — editorial image header ─────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-primary pt-32 pb-24 text-white lg:pt-40 lg:pb-28">
        <img
          src={heroImage.src}
          alt={heroImage.alt}
          aria-hidden={heroImage.alt === "" ? true : undefined}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,16,26,0.82) 0%, rgba(7,16,26,0.86) 55%, rgba(7,16,26,0.96) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(210,166,121,0.28),transparent_50%),radial-gradient(circle_at_10%_100%,rgba(210,166,121,0.18),transparent_55%)]"
        />
        <div className="hero-grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-screen" />

        <div className="container relative z-10 max-w-6xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <Eyebrow tone="light">{hero.eyebrow}</Eyebrow>
            <h1 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              {hero.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {hero.badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center rounded-full border border-accent/35 bg-accent/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-100"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="gold-cta group inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold"
              >
                <span>{hero.primaryCta}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/services"
                className="gold-cta-outline inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white"
              >
                {hero.secondaryCta}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Intro / context — cream ───────────────────────────────────── */}
      <section className="bg-[linear-gradient(180deg,#f7f4ee_0%,#f3efe8_100%)] py-16 text-ink lg:py-24">
        <div className="container max-w-6xl">
          <Reveal className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="rounded-[30px] border border-primary/10 bg-white p-6 shadow-[0_24px_70px_-46px_rgba(35,51,73,0.4)] sm:p-8">
              <Eyebrow>{intro.eyebrow}</Eyebrow>
              <h2 className="mt-4 font-display text-2xl leading-tight text-primary sm:text-3xl">
                {intro.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">{intro.lead}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {intro.highlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className="rounded-[24px] border border-accent/20 bg-[linear-gradient(150deg,rgba(210,166,121,0.12)_0%,rgba(255,255,255,0.98)_55%)] p-5 shadow-[0_20px_60px_-46px_rgba(210,166,121,0.5)] sm:p-6"
                >
                  <p className="font-display text-lg text-primary">{highlight.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{highlight.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. Service sections — alternating topic cards ────────────────── */}
      <section className="bg-[linear-gradient(180deg,#f3efe8_0%,#f7f4ee_100%)] py-16 text-ink lg:py-24">
        <div className="container max-w-6xl">
          <Reveal className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <Eyebrow>{sectionsHeading.eyebrow}</Eyebrow>
            </div>
            <h2 className="mt-4 font-display text-3xl leading-tight text-primary sm:text-4xl">
              {sectionsHeading.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">{sectionsHeading.subtitle}</p>
          </Reveal>

          <div className="mt-12 flex flex-col gap-6 lg:mt-16 lg:gap-8">
            {sections.map((section, index) => {
              const Icon = sectionIcons[section.id];
              const reversed = index % 2 === 1;
              return (
                <Reveal key={section.id} delay={0.05}>
                  <article className="overflow-hidden rounded-[30px] border border-primary/10 bg-white shadow-[0_28px_80px_-54px_rgba(35,51,73,0.45)]">
                    <div
                      className={[
                        "grid gap-0 lg:grid-cols-[1fr_1fr]",
                        reversed ? "lg:[&>*:first-child]:order-2" : "",
                      ].join(" ")}
                    >
                      {/* Text column */}
                      <div className="flex flex-col justify-center gap-5 p-6 sm:p-8 lg:p-10">
                        <div className="flex items-center gap-4">
                          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent/12 text-primary">
                            {Icon ? <Icon className="h-6 w-6" /> : null}
                          </span>
                          <span className="text-eyebrow uppercase tracking-wider2 text-accent-700">
                            {section.eyebrow}
                          </span>
                        </div>
                        <h3 className="font-display text-2xl leading-tight text-primary sm:text-3xl">
                          {section.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-ink-muted sm:text-base">
                          {section.description}
                        </p>
                        {section.cta ? (
                          <div>
                            <Link
                              href="/contact"
                              className="gold-cta group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold"
                            >
                              {section.cta}
                              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                          </div>
                        ) : null}
                      </div>

                      {/* Items column */}
                      <div className="border-t border-primary/10 bg-[linear-gradient(180deg,#f7f4ee_0%,#f3efe8_100%)] p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
                        <ul className="grid gap-2.5">
                          {section.items.map((item) => (
                            <CheckItem key={item} text={item} />
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. Feature image band — editorial pull quote ─────────────────── */}
      <section className="relative isolate overflow-hidden bg-primary py-20 text-white lg:py-28">
        <img
          src={featureImage.src}
          alt={featureImage.alt}
          aria-hidden={featureImage.alt === "" ? true : undefined}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(7,16,26,0.92) 0%, rgba(35,51,73,0.78) 55%, rgba(7,16,26,0.92) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(210,166,121,0.22),transparent_46%)]"
        />
        <div className="container relative z-10 max-w-4xl text-center">
          <Reveal>
            <p className="font-display text-2xl leading-snug text-white sm:text-3xl lg:text-4xl">
              “{feature.quote}”
            </p>
            <p className="mt-6 text-[11px] uppercase tracking-[0.28em] text-accent-200">
              {feature.author}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 5. Closing CTA — dark navy ───────────────────────────────────── */}
      <section className="bg-[linear-gradient(180deg,#07101a_0%,#0b1623_100%)] py-16 text-white lg:py-24">
        <div className="container max-w-6xl">
          <Reveal className="rounded-[34px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_70px_-46px_rgba(7,16,26,0.9)] sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <Eyebrow tone="light">{closing.eyebrow}</Eyebrow>
                <h2 className="mt-4 font-display text-3xl leading-tight text-white sm:text-4xl">
                  {closing.title}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/72 sm:text-base">
                  {closing.subtitle}
                </p>
              </div>
              <Link
                href="/contact"
                className="gold-cta inline-flex shrink-0 items-center gap-2 px-7 py-3.5 text-sm font-semibold"
              >
                <span>{closing.button}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
