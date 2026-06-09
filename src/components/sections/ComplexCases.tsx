"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";

type Item = { id: string; label: string };

export function ComplexCases() {
  const t = useTranslations("complexCases");
  const items = t.raw("items") as Item[];
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.18, once: true });

  return (
    <section
      id="complex-cases"
      ref={ref}
      className="relative isolate overflow-hidden bg-[#1a2637] py-20 text-white lg:py-28"
    >
      {/* Subtle dot pattern */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]"
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="cc-dot" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d2a679" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        {Array.from({ length: 38 }).map((_, i) => {
          const cx = (i * 53) % 800;
          const cy = ((i * 71) % 360) + 20;
          const r = ((i * 13) % 4) + 1.2;
          return <circle key={i} cx={cx} cy={cy} r={r} fill="url(#cc-dot)" />;
        })}
      </svg>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_-10%,rgba(210,166,121,0.22),transparent_55%)]"
      />

      <div className="container relative z-10">
        {/* ── Header + visual ──────────────────────────────────────────── */}
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-3 text-eyebrow uppercase text-accent-200">
              <span className="h-px w-10 bg-accent/70" />
              {t("eyebrow")}
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight text-white md:text-4xl lg:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/75">{t("subtitle")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative aspect-[5/4] overflow-hidden rounded-card border border-white/10 shadow-elevated"
          >
            {/* [Editorial — passports, maps and legal documents flat-lay, warm tones, ~900x720] */}
            <img
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1100&q=80"
              alt="Complex international case files and maps"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] ease-out hover:scale-105"
              loading="lazy"
            />
            <div aria-hidden className="absolute inset-0 bg-primary/45 mix-blend-multiply" />
          </motion.div>
        </div>

        {/* ── Case grid ────────────────────────────────────────────────── */}
        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + idx * 0.05, ease: "easeOut" }}
              className="group relative rounded-card border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:bg-white/[0.08]"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10 text-[11px] font-semibold text-accent-200 transition-transform duration-300 group-hover:scale-110">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-snug text-white/90">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Tagline CTA ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="mt-14 flex flex-col items-start gap-6 rounded-card border border-accent/30 bg-[linear-gradient(135deg,rgba(210,166,121,0.18),rgba(35,51,73,0.4))] p-7 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="font-display text-2xl text-white sm:text-3xl">{t("tagline")}</p>
          <Link
            href="/complex-cases"
            className="gold-cta px-6 py-3 text-sm font-medium"
          >
            {t("cta")}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
