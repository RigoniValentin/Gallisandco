"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

type Step = { id: string; number: string; title: string; description: string };

// Curated image per step (consultation → strategy → preparation → representation)
// [Editorial photos, warm/navy palette, ~800x600]
const STEP_IMAGES: Record<string, { src: string; alt: string }> = {
  consultation: {
    src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80",
    alt: "Initial consultation with an attorney",
  },
  evaluation: {
    src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80",
    alt: "Strategic case evaluation on desk",
  },
  preparation: {
    src: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=900&q=80",
    alt: "Legal documentation preparation",
  },
  representation: {
    src: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=900&q=80",
    alt: "Representation before authorities",
  },
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
      <img
        aria-hidden
        src="https://images.unsplash.com/photo-1522172239954-25c9b1b0e2b5?auto=format&fit=crop&w=1800&q=80"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-right opacity-[0.16] saturate-90 contrast-105 mix-blend-overlay"
        loading="lazy"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_circle_at_10%_0%,rgba(242,211,154,0.22),transparent_44%),radial-gradient(900px_circle_at_90%_100%,rgba(35,51,73,0.50),transparent_55%)]"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -18, 0], opacity: [0.34, 0.58, 0.34] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-y-0 right-0 w-[46vw] bg-[radial-gradient(circle_at_80%_50%,rgba(242,211,154,0.18),transparent_60%)] mix-blend-screen"
      />

      <div className="container relative z-10">
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

        <div className="relative mt-16">
          {/* Connector line (desktop only) */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="pointer-events-none absolute left-0 right-0 top-[80px] hidden h-px origin-left bg-gradient-to-r from-transparent via-accent/50 to-transparent lg:block"
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, idx) => {
              const img = STEP_IMAGES[step.id];
              return (
                <motion.article
                  key={step.id}
                  initial={{ opacity: 0, y: 36 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.18 + idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex flex-col overflow-hidden rounded-card border border-primary/10 bg-white shadow-[0_18px_46px_-34px_rgba(35,51,73,0.34)] transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-elevated"
                >
                  {/* Image cap with prominent step number */}
                  <div className="relative h-44 overflow-hidden">
                    {img ? (
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-primary/15 to-accent/15" />
                    )}
                    <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,15,23,0.06)_0%,rgba(7,15,23,0.22)_45%,rgba(255,255,255,0.96)_100%)]" />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start gap-4 text-left">
                      <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-accent/45 bg-[linear-gradient(135deg,rgba(242,211,154,0.98),rgba(222,178,95,0.9))] font-display text-2xl font-semibold text-primary shadow-[0_14px_28px_-16px_rgba(210,166,121,0.7)] transition-transform duration-500 group-hover:scale-110">
                        {step.number}
                      </span>
                      <div className="min-w-0 text-left">
                        <h3 className="font-display text-xl text-primary">{step.title}</h3>
                        <span
                          aria-hidden
                          className="mt-3 block h-px w-12 origin-left bg-accent/60 transition-transform duration-500 group-hover:scale-x-[2.8]"
                        />
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-ink-muted">{step.description}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
