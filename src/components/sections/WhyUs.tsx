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
      className="relative isolate overflow-hidden bg-surface py-20 text-ink lg:py-28"
    >
      <img
        aria-hidden
        src="https://images.unsplash.com/photo-1523050854058-8df90110c9d1?auto=format&fit=crop&w=1800&q=80"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-[0.12] saturate-75 contrast-105 mix-blend-multiply"
        loading="lazy"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(245,242,240,0.10)_0%,rgba(245,242,240,0.60)_58%,rgba(245,242,240,0.96)_100%),radial-gradient(900px_circle_at_85%_0%,rgba(169,122,81,0.12),transparent_50%),radial-gradient(700px_circle_at_5%_100%,rgba(35,51,73,0.08),transparent_55%)]"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, 16, 0], y: [0, -12, 0], scale: [1, 1.07, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(210,166,121,0.12),transparent_70%)] blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -18, 0], y: [0, 14, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-28 left-0 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(35,51,73,0.08),transparent_70%)] blur-3xl"
      />
      <div className="hero-grain pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-multiply" />

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
                className="group relative flex flex-col overflow-hidden rounded-card border border-primary/10 bg-white shadow-[0_18px_46px_-34px_rgba(35,51,73,0.28)] transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-elevated"
              >
                {/* Image header */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={cfg.bg}
                    alt={cfg.alt}
                    className="h-full w-full object-cover opacity-75 transition-all duration-[1400ms] ease-out group-hover:scale-110 group-hover:opacity-90"
                    loading="lazy"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/10 to-white/0"
                  />
                  <div className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-accent/45 bg-accent/10 text-accent-700 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="absolute right-5 top-5 text-[10px] uppercase tracking-wider2 text-ink-muted">
                    · 0{idx + 1}
                  </span>
                </div>

                <div className="relative flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl text-primary">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.description}</p>
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
