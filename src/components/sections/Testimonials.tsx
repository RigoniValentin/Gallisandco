"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useTranslations } from "next-intl";

type Item = { id: string; quote: string; author: string; role: string };

// Curated avatar placeholders — diverse, editorial portraits, ~200x200
const AVATARS: Record<string, string> = {
  t1: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
  t2: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  t3: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
};

export function Testimonials() {
  const t = useTranslations("testimonials");
  const items = t.raw("items") as Item[];
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.18, once: true });

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative isolate overflow-hidden bg-[#f8f5f3] py-20 text-ink lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_10%_-10%,rgba(169,122,81,0.10),transparent_50%),radial-gradient(700px_circle_at_100%_110%,rgba(35,51,73,0.08),transparent_55%)]"
      />

      {/* Full-section background — vintage world map, warm amber tones */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.07]">
        {/* [Vintage antique world map — parchment amber tones, great texture at low opacity, ~1800x900] */}
        <img
          src="https://images.unsplash.com/photo-1519817914152-22d216bb9170?auto=format&fit=crop&w=1900&q=80"
          alt=""
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
      </div>

      {/* Decorative half-globe — bottom-right, editorial accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-16 hidden h-[380px] w-[380px] overflow-hidden rounded-full opacity-[0.09] lg:block"
      >
        {/* [Globe close-up — night lights from space, soft blue glow, ~700x700] */}
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
          alt=""
          className="h-full w-full scale-125 object-cover"
          loading="lazy"
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-3 text-eyebrow uppercase text-accent-500">
            <span className="h-px w-10 bg-accent/70" />
            {t("eyebrow")}
          </span>
          <h2 className="mt-4 font-display text-3xl leading-tight text-primary md:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">{t("subtitle")}</p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-3 lg:gap-6">
          {items.map((item, idx) => (
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col rounded-card border border-primary/10 bg-white p-7 shadow-[0_18px_46px_-34px_rgba(35,51,73,0.28)] transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-elevated"
            >
              <div className="flex items-center justify-between">
                <Quote className="h-7 w-7 text-accent-400" />
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                  ))}
                </div>
              </div>

              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink">
                “{item.quote}”
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-primary/10 pt-4">
                <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/40 ring-offset-2 ring-offset-white">
                  {/* [Client portrait — soft daylight headshot, ~200x200] */}
                  <img
                    src={AVATARS[item.id] ?? AVATARS.t1}
                    alt={item.author}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </span>
                <span>
                  <p className="font-display text-base text-primary">{item.author}</p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-wider2 text-ink-muted">
                    {item.role}
                  </p>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
