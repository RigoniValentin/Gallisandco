"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Quote, Star } from "lucide-react";
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
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setOffset(0);
  }, [items.length]);

  const advance = () => {
    setOffset((current) => (current + 1) % items.length);
  };

  const visibleItems = [...items.slice(offset), ...items.slice(0, offset)];

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative isolate overflow-hidden bg-[#07101a] py-20 text-white lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px bg-[radial-gradient(900px_circle_at_10%_-10%,rgba(210,166,121,0.22),transparent_50%),radial-gradient(700px_circle_at_100%_110%,rgba(35,51,73,0.14),transparent_55%)]"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, 18, 0], y: [0, -12, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-24 top-12 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(210,166,121,0.18),transparent_68%)] blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -16, 0], y: [0, 16, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-28 bottom-0 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(35,51,73,0.14),transparent_70%)] blur-3xl"
      />

      <div aria-hidden className="pointer-events-none absolute -inset-px overflow-hidden opacity-[0.54] mix-blend-screen">
        <img
          src="/Images/InternationalMobilityImage1.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px bg-[linear-gradient(135deg,rgba(7,15,23,0.92),rgba(35,51,73,0.7)_55%,rgba(7,15,23,0.92))]"
      >
      </div>

      <div aria-hidden className="pointer-events-none absolute -inset-px bg-[radial-gradient(900px_circle_at_14%_0%,rgba(210,166,121,0.2),transparent_46%),radial-gradient(700px_circle_at_100%_100%,rgba(120,178,220,0.14),transparent_52%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-px h-[18rem] bg-[linear-gradient(180deg,transparent,rgba(7,15,23,0.82))]"
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-3 text-eyebrow uppercase text-accent-200">
            <span className="h-px w-10 bg-accent/70" />
            {t("eyebrow")}
          </span>
          <h2 className="mt-4 font-display text-3xl leading-tight text-white md:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/84">{t("subtitle")}</p>
        </motion.div>

        <div className="mt-12">
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={advance}
              className="gold-cta group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium"
              aria-label="Advance testimonials"
            >
              Next
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            {visibleItems.map((item, idx) => (
              <motion.figure
                key={`${item.id}-${offset}-${idx}`}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.05] p-7 shadow-[0_18px_46px_-34px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-accent/35"
              >
                <div className="flex items-center justify-between">
                  <Quote className="h-7 w-7 text-accent-200" />
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                    ))}
                  </div>
                </div>

                <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-white/92 md:text-[15.5px]">
                  “{item.quote}”
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                  <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/40 ring-offset-2 ring-offset-primary">
                    <img
                      src={AVATARS[item.id] ?? AVATARS.t1}
                      alt={item.author}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </span>
                  <span>
                    <p className="font-display text-base text-white">{item.author}</p>
                    <p className="mt-0.5 text-[11px] uppercase tracking-wider2 text-white/72">
                      {item.role}
                    </p>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
