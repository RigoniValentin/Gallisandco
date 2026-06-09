"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/lib/navigation";

/**
 * Hero — "Velvet Navy" edition.
 *
 * Design intent:
 *  • IsologotipoWhite.png sits as the commanding centrepiece.
 *  • Background simulates velvet depth: layered radial gradients + diagonal sheen
 *    + fine noise grain.
 *  • An animated gold glow (two layers + shimmer sweep) wraps the crescent
 *    area of the logo — all pure CSS, no JavaScript animation library needed.
 *  • Content flows: eyebrow → logo → headline → subtitle → CTAs → metrics.
 */
export function Hero() {
  const t = useTranslations("hero");

  const tickerKeywords = [
    "International Mobility",
    "Argentine Residency",
    "Italian Citizenship",
    "U.S. Visa Guidance",
    "European Pathways",
    "Legal Representation",
    "Cross-Border Advisory",
    "Relocation Strategy",
    "Document Reconstruction",
    "Litigation",
    "Administrative Matters",
  ];
  const videoPlaylist = [
    "/brand/VideoFondoBanner2.mp4",
    "/brand/VideoFondoBanner3.mp4",
    "/brand/VideoFondoBanner.mp4",
  ];
  const [activeLayer, setActiveLayer] = useState<0 | 1>(0);
  const [layerSources, setLayerSources] = useState<[number, number]>([
    0,
    videoPlaylist.length > 1 ? 1 : 0,
  ]);
  const videoRefs = useRef<[HTMLVideoElement | null, HTMLVideoElement | null]>([
    null,
    null,
  ]);

  useEffect(() => {
    const node = videoRefs.current[activeLayer];
    if (!node) return;
    node.currentTime = 0;
    const autoplayAttempt = node.play();
    if (autoplayAttempt) autoplayAttempt.catch(() => undefined);
  }, [activeLayer, layerSources]);

  function handleVideoEnd(layer: 0 | 1) {
    if (videoPlaylist.length <= 1 || layer !== activeLayer) return;

    const nextLayer = (1 - layer) as 0 | 1;
    setActiveLayer(nextLayer);

    setLayerSources((prev) => {
      const nextActiveSource = prev[nextLayer];
      const upcomingSource = (nextActiveSource + 1) % videoPlaylist.length;
      const updated: [number, number] = [...prev] as [number, number];
      updated[layer] = upcomingSource;
      return updated;
    });
  }

  return (
    <section
      id="main"
      className="relative isolate flex h-svh flex-col items-center justify-between overflow-hidden bg-[bg-primary] text-white"
    >
      {/* ── Layer 1 — video background ────────────────────────────────────── */}
      {[0, 1].map((layer) => {
        const typedLayer = layer as 0 | 1;
        return (
          <video
            key={`${typedLayer}-${videoPlaylist[layerSources[typedLayer]]}`}
            ref={(node) => {
              videoRefs.current[typedLayer] = node;
            }}
            aria-hidden
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={() => handleVideoEnd(typedLayer)}
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out ${
              activeLayer === typedLayer ? "opacity-100" : "opacity-0"
            }`}
            src={videoPlaylist[layerSources[typedLayer]]}
          />
        );
      })}

      {/* ── Layer 2 — brand blue overlay (bg-primary at 68%) + light blur ────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundColor: "rgba(7, 37, 81, 0.85)",
          backdropFilter: "blur(3px) saturate(1.45) contrast(1.08)",
          WebkitBackdropFilter: "blur(3px) saturate(1.45) contrast(1.08)",
        }}
      />

      {/* ── Layer 3 — noise grain (velvet micro-texture) ──────────────────── */}
      <div
        aria-hidden
        className="hero-grain pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-screen"
      />

      {/* ── Layer 4 — radial gold glow centre ────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-primary-glow" />

      {/* ── Top fade ─────────────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-black/30 to-transparent"
      />

      {/* ═══════════════════ MAIN CONTENT ═══════════════════════════════════ */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-5 px-6 pb-4 pt-24 text-center">

        {/* Eyebrow */}
        <div className="flex items-center gap-4">
          <span className="h-px w-14 bg-gradient-to-r from-transparent to-accent/60" />
          <span className="text-eyebrow uppercase tracking-wider2 text-accent-300/90">
            {t("eyebrow")}
          </span>
          <span className="h-px w-14 bg-gradient-to-l from-transparent to-accent/60" />
        </div>

        {/* ── LOGO — the commanding centre ──────────────────────────────── */}
        <div className="relative flex items-center justify-center">

          {/* Outer diffuse gold bloom */}
          <div
            aria-hidden
            className="hero-glow-outer pointer-events-none absolute -inset-[60%] rounded-full"
          />
          
          {/* Crescent spot-glow — C-arc (ɔ) centered on the icon circle */}
          <div
            aria-hidden
            className="crescent-glow pointer-events-none absolute"
            style={{
              top: "-2%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "32%",
              aspectRatio: "1",
            }}
          />

          {/* The logo itself */}
          <Image
            src="/brand/IsologotipoWhite.png"
            alt="Galli's & Co. — Global Mobility & Solutions"
            width={520}
            height={520}
            priority
            className="logo-breathe relative z-10 w-[220px] object-contain sm:w-[280px] md:w-[360px] lg:w-[440px]"
          />
        </div>

        {/* Headline */}
        <div className="max-w-3xl space-y-3">
          <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl md:text-display-md">

            <span className="block text-accent-200">{t("headlineLine2")}</span>
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
            {t("subtitle")}
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
          <Link
            href="/services"
            className="gold-cta group px-7 py-3.5 text-sm font-semibold"
          >
            <span className="relative z-[1]">{t("secondaryCta")}</span>
            <ArrowUpRight className="relative z-[1] h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

      </div>
      {/* ════════════════════════════════════════════════════════════════════ */}

      {/* ── Keyword ticker strip ──────────────────────────────────────────── */}
      <div
        aria-hidden
        className="relative z-10 w-full overflow-hidden border-t border-white/10 bg-black/25 py-3 backdrop-blur-sm"
      >
        {/* left / right fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/40 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/40 to-transparent" />

        <div className="hero-ticker-track flex w-max items-center gap-0">
          {[...tickerKeywords, ...tickerKeywords].map((kw, i) => (
            <span key={i} className="flex items-center gap-0">
              <span className="whitespace-nowrap px-5 text-[11px] font-medium uppercase tracking-wider2 text-white/55">
                {kw}
              </span>
              <span className="text-accent-300/50" aria-hidden>·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
