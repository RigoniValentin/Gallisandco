"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, CalendarClock, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";

const whatsappHref = "https://wa.me/5493512073555";

export function FinalCta() {
  const t = useTranslations("finalCta");
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  return (
    <section
      id="start"
      ref={ref}
      className="relative isolate overflow-hidden bg-[#0e1a28] py-24 text-white lg:py-32"
    >
      {/* [Cinematic background — airplane wing over clouds at sunset, 1600x900] */}
      <img
        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1800&q=80"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
        loading="lazy"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(14,26,40,0.72)_0%,rgba(14,26,40,0.60)_40%,rgba(14,26,40,0.80)_100%)]"
      />
      {/* Accent top edge for context entry */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-accent/80 to-transparent" />
      {/* Accent bottom edge — separates from footer */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-transparent via-accent/80 to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_-20%,rgba(210,166,121,0.32),transparent_55%),radial-gradient(700px_circle_at_50%_120%,rgba(210,166,121,0.18),transparent_55%)]"
      />
      <div className="hero-grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-screen" />

      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-3 text-eyebrow uppercase text-accent-200">
            <span className="h-px w-10 bg-accent/70" />
            {t("eyebrow")}
            <span className="h-px w-10 bg-accent/70" />
          </span>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl leading-tight md:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75">
            {t("subtitle")}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-pill border border-accent/60 bg-accent/30 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-accent/45"
            >
              <CalendarClock className="h-4 w-4 transition-transform group-hover:rotate-12" />
              {t("primary")}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-pill border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4 transition-transform group-hover:rotate-12" />
              {t("secondary")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
