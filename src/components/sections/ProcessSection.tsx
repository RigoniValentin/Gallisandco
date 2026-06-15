"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { MessageSquare, GitMerge, FileText, Scale } from "lucide-react";

type Step = { id: string; number: string; title: string; description: string };

const STEP_ICONS: Record<string, React.ElementType> = {
  consultation: MessageSquare,
  evaluation: GitMerge,
  preparation: FileText,
  representation: Scale,
};

export function ProcessSection() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as Step[];
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.15, once: true });

  return (
    <section
      id="process"
      ref={ref}
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#07101a_0%,#0c1520_48%,#13100e_100%)] py-20 text-white lg:py-28"
    >
      {/* ── Background atmosphere ─────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_circle_at_10%_0%,rgba(242,211,154,0.20),transparent_44%),radial-gradient(900px_circle_at_90%_100%,rgba(35,51,73,0.48),transparent_55%)]"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -18, 0], opacity: [0.28, 0.48, 0.28] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-y-0 right-0 w-[46vw] bg-[radial-gradient(circle_at_80%_50%,rgba(242,211,154,0.14),transparent_60%)] mix-blend-screen"
      />
      {/* Fine noise grain */}
      <div className="hero-grain pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-screen" />

      <div className="container relative z-10">

        {/* ── Section header ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-3 text-eyebrow uppercase text-accent-200">
            <span className="h-px w-10 bg-accent/70" />
            {t("eyebrow")}
            <span className="h-px w-10 bg-accent/70" />
          </span>
          <h2 className="mt-4 font-display text-3xl leading-tight text-white md:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">{t("subtitle")}</p>
        </motion.div>

        <div className="mt-16">

          {/* ── Desktop: number bubbles row + connector line ─────────────────── */}
          <div className="relative hidden lg:grid lg:grid-cols-4">
            {/* Animated connector line drawn left → right */}
            <motion.div
              aria-hidden
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-1/2 h-px origin-left -translate-y-1/2 bg-gradient-to-r from-accent/30 via-accent/75 to-accent/30"
            />

            {/* Glowing mid-dots between circles */}
            {[25, 50, 75].map((pct) => (
              <motion.span
                key={pct}
                aria-hidden
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.3 + pct / 250, duration: 0.35 }}
                className="pointer-events-none absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_3px_rgba(210,166,121,0.65)]"
                style={{ left: `${pct}%` }}
              />
            ))}

            {/* Number bubbles */}
            {steps.map((step, idx) => (
              <div key={step.id} className="flex justify-center">
                <motion.div
                  initial={{ scale: 0.35, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.55, delay: 0.42 + idx * 0.14, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.12 }}
                  className="relative z-10 grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full border-2 border-accent/65 bg-[linear-gradient(145deg,#f5dfa0_0%,#e0a84e_55%,#a97a51_100%)] font-display text-2xl font-bold text-primary shadow-[0_0_0_5px_rgba(210,166,121,0.12),0_0_36px_rgba(210,166,121,0.50),0_10px_28px_-10px_rgba(0,0,0,0.65)]"
                >
                  {step.number}
                </motion.div>
              </div>
            ))}
          </div>

          {/* ── Cards grid ───────────────────────────────────────────────────── */}
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, idx) => {
              const Icon = STEP_ICONS[step.id];
              return (
                <motion.article
                  key={step.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.58 + idx * 0.13, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.28, ease: "easeOut" } }}
                  className="group flex flex-col rounded-[1.4rem] border border-white/[0.08] bg-[linear-gradient(160deg,rgba(255,255,255,0.065)_0%,rgba(255,255,255,0.018)_100%)] p-6 text-center shadow-[0_24px_64px_-28px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-accent/30 hover:shadow-[0_32px_72px_-24px_rgba(210,166,121,0.18),0_24px_64px_-28px_rgba(0,0,0,0.72)]"
                >
                  {/* Mobile: number bubble (hidden on desktop where it's above) */}
                  <div className="mb-5 flex justify-center lg:hidden">
                    <motion.span
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={inView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.5 + idx * 0.13 }}
                      className="grid h-14 w-14 place-items-center rounded-full border-2 border-accent/60 bg-[linear-gradient(145deg,#f5dfa0_0%,#e0a84e_55%,#a97a51_100%)] font-display text-xl font-bold text-primary shadow-[0_0_24px_rgba(210,166,121,0.40)]"
                    >
                      {step.number}
                    </motion.span>
                  </div>

                  {/* Icon */}
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-white/12 bg-white/[0.05] text-accent-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/[0.08] group-hover:text-accent-100 group-hover:shadow-[0_0_22px_rgba(210,166,121,0.22)]">
                    {Icon ? <Icon className="h-5 w-5" /> : null}
                  </div>

                  {/* Title */}
                  <h3 className="mt-5 font-display text-[1.18rem] leading-snug text-white">
                    {step.title}
                  </h3>

                  {/* Animated gold divider */}
                  <span
                    aria-hidden
                    className="mx-auto mt-3 block h-px w-8 bg-gradient-to-r from-transparent via-accent/80 to-transparent transition-all duration-500 group-hover:w-16 group-hover:via-accent"
                  />

                  {/* Description */}
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-white/58">
                    {step.description}
                  </p>
                </motion.article>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
