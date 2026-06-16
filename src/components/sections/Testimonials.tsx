"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight, Quote, Star, X } from "lucide-react";
import { useTranslations } from "next-intl";

type Item = { id: string; quote: string; author: string; role: string };

// Client portraits, ~200x200
const AVATARS: Record<string, string> = {
  "mariano-g": "/Images/Mariano.jpg",
  "carlos-r": "/Images/Carlos.png",
  "agustina-t": "/Images/Agustina.jpg",
};

export function Testimonials() {
  const t = useTranslations("testimonials");
  const items = t.raw("items") as Item[];
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.18, once: true });
  const [offset, setOffset] = useState(0);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const getAvatarSrc = (id: string) => AVATARS[id] ?? AVATARS["mariano-g"];

  useEffect(() => {
    setOffset(0);
  }, [items.length]);

  useEffect(() => {
    if (!selectedItem) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedItem(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedItem]);

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
          {items.length > 3 ? (
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={advance}
                className="gold-cta-outline group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white"
                aria-label="Advance testimonials"
              >
                Next
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          ) : null}

          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            {visibleItems.map((item, idx) => (
              <motion.figure
                key={`${item.id}-${offset}-${idx}`}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-label={`Abrir detalle del testimonio de ${item.author}`}
                onClick={() => setSelectedItem(item)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedItem(item);
                  }
                }}
                className="group relative flex cursor-pointer flex-col overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.05] p-7 shadow-[0_18px_46px_-34px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-accent/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-100"
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
                      src={getAvatarSrc(item.id)}
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

      <AnimatePresence>
        {selectedItem ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="testimonial-photo-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          >
            <button
              type="button"
              aria-label="Cerrar detalle de la foto"
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative z-10 w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#09131f] shadow-[0_32px_90px_-32px_rgba(0,0,0,0.9)]"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
                <div>
                  <p className="text-xs uppercase tracking-wider2 text-accent-200">Foto ampliada</p>
                  <h3 id="testimonial-photo-title" className="mt-1 font-display text-xl text-white">
                    {selectedItem.author}
                  </h3>
                  <p className="mt-1 text-sm text-white/70">{selectedItem.role}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Cerrar detalle de la foto"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-0 p-4 sm:p-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
                <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/20">
                  <img
                    src={getAvatarSrc(selectedItem.id)}
                    alt={selectedItem.author}
                    className="h-full max-h-[70vh] w-full object-contain"
                    loading="eager"
                  />
                </div>

                <div className="flex flex-col justify-between gap-4 p-1 pt-5 lg:pl-5 lg:pt-1">
                  <div>
                    <p className="text-sm uppercase tracking-wider2 text-accent-200">Testimonio</p>
                    <blockquote className="mt-4 text-base leading-relaxed text-white/92">
                      “{selectedItem.quote}”
                    </blockquote>
                  </div>

                  <p className="text-sm text-white/65">
                    Haz click fuera de la tarjeta o presioná Escape para cerrar.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
