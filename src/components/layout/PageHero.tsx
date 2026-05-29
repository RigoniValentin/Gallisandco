type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Background image URL (any host whitelisted in next.config) */
  imageSrc: string;
  imageAlt: string;
  /** Optional dim overlay strength 0–1 (default 0.78) */
  overlay?: number;
};

/**
 * Editorial page hero — full-bleed image with navy overlay.
 * Used at the top of every interior page (about, services, complex-cases, insights, contact, services/[slug]).
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  imageSrc,
  imageAlt,
  overlay = 0.78,
}: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-primary pt-32 pb-24 text-white lg:pt-40 lg:pb-28">
      {/* Image layer */}
      <img
        src={imageSrc}
        alt={imageAlt}
        aria-hidden={imageAlt === "" ? true : undefined}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      {/* Dark gradient overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(35,51,73,${overlay}) 0%, rgba(35,51,73,${Math.min(
            overlay + 0.08,
            1,
          )}) 60%, rgba(26,38,55,0.96) 100%)`,
        }}
      />
      {/* Accent radial */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(210,166,121,0.28),transparent_50%),radial-gradient(circle_at_10%_100%,rgba(210,166,121,0.18),transparent_55%)]"
      />
      <div className="hero-grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-screen" />

      <div className="container relative z-10 max-w-3xl">
        {eyebrow ? (
          <span className="inline-flex items-center gap-3 text-eyebrow uppercase tracking-wider2 text-accent-200">
            <span className="h-px w-10 bg-accent/70" />
            {eyebrow}
          </span>
        ) : null}
        <h1 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {intro ? (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {intro}
          </p>
        ) : null}
      </div>
    </section>
  );
}
