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
      className="relative isolate overflow-hidden bg-surface py-20 text-ink lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_circle_at_90%_10%,rgba(169,122,81,0.10),transparent_45%),radial-gradient(700px_circle_at_5%_90%,rgba(35,51,73,0.08),transparent_45%)]"
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-3 text-eyebrow uppercase text-accent-500">
            <span className="h-px w-10 bg-accent/70" />
            {t("eyebrow")}
            <span className="h-px w-10 bg-accent/70" />
          </span>
          <h2 className="mt-4 font-display text-3xl leading-tight text-primary md:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">{t("subtitle")}</p>
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
                  {/* Image cap with number badge */}
                  <div className="relative h-40 overflow-hidden">
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
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-white via-white/0 to-white/0" />
                    <span className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full border border-accent/45 bg-white/95 font-display text-base font-semibold text-accent-700 shadow-[0_8px_20px_-12px_rgba(35,51,73,0.5)] backdrop-blur transition-transform duration-500 group-hover:scale-110">
                      {step.number}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl text-primary">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
                    <span
                      aria-hidden
                      className="mt-5 h-px w-10 origin-left bg-accent/50 transition-transform duration-500 group-hover:scale-x-[2.5]"
                    />
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
