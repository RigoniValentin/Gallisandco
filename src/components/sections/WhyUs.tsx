"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Compass, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

type WhyUsItem = { id: string; title: string; description: string };

const ICON_CONFIG = {
  expertise: {
    Icon: Award,
    // [Wide-angle, dimly lit law library — bookshelves and warm light, 1200x600]
    bg: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1100&q=80",
    alt: "Law library bookshelves",
  },
  problemSolving: {
    Icon: Compass,
    // [Hands sketching strategy on glass with marker, monochrome navy, 1200x600]
    bg: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1100&q=80",
    alt: "Strategy planning on a glass wall",
  },
  oneStop: {
    Icon: ShieldCheck,
    // [Modern boutique office reception, soft daylight, 1200x600]
    bg: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1100&q=80",
    alt: "Modern boutique law office",
  },
} as const;

export function WhyUs() {
  const t = useTranslations("whyUs");
  const items = t.raw("items") as WhyUsItem[];
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });

  return (
    <section
      id="why-us"
      ref={ref}
      className="relative isolate overflow-hidden bg-primary py-20 text-white lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_85%_0%,rgba(210,166,121,0.22),transparent_50%),radial-gradient(700px_circle_at_5%_100%,rgba(210,166,121,0.12),transparent_55%)]"
      />
      <div className="hero-grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-screen" />

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
          <p className="mt-4 text-base leading-relaxed text-white/75">{t("subtitle")}</p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((item, idx) => {
            const cfg = ICON_CONFIG[item.id as keyof typeof ICON_CONFIG] ?? ICON_CONFIG.expertise;
            const Icon = cfg.Icon;
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.15 + idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col overflow-hidden rounded-card border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/60 hover:bg-white/[0.07] hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]"
              >
                {/* Image header */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={cfg.bg}
                    alt={cfg.alt}
                    className="h-full w-full object-cover opacity-70 transition-all duration-[1400ms] ease-out group-hover:scale-110 group-hover:opacity-90"
                    loading="lazy"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/60 to-primary"
                  />
                  <div className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-accent/45 bg-accent/15 text-accent-100 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="absolute right-5 top-5 text-[10px] uppercase tracking-wider2 text-white/55">
                    · 0{idx + 1}
                  </span>
                </div>

                <div className="relative flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">{item.description}</p>
                  <span
                    aria-hidden
                    className="mt-6 h-px w-12 origin-left bg-accent/60 transition-transform duration-500 group-hover:scale-x-[2.5]"
                  />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
