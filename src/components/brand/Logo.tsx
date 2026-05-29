import { clsx } from "clsx";

type LogoVariant = "light" | "dark";

type LogoProps = {
  variant?: LogoVariant;
  className?: string;
  /** Accessible label; pass empty string when logo is decorative */
  label?: string;
};

/**
 * Galli's & Co. — Isotipo (circular seal)
 *
 * Inline SVG recreation of the brand mark for crisp scaling inside the Navbar
 * and for use as a favicon source. Colors are pulled strictly from the brand
 * palette tokens defined in tailwind.config.ts:
 *   primary  bg-primary   (navy ring + serif G)
 *   accent   text-highlight   (crescent — gold)
 *   surface  bg-base   (inner fill)
 *
 * For full lockups (logotype with "Galli's & Co. / Global Mobility & Solutions")
 * use <Image src="/brand/IsologotipoBlue.png" .../> from public/brand.
 */
export function Logo({ variant = "dark", className, label = "Galli's & Co." }: LogoProps) {
  const ring = variant === "light" ? "#ffffff" : "bg-primary";
  const letter = variant === "light" ? "#ffffff" : "bg-primary";

  return (
    <svg
      viewBox="0 0 120 120"
      role={label ? "img" : "presentation"}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      className={clsx("block", className)}
    >
      <defs>
        <linearGradient id="gallis-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d2a679" />
          <stop offset="55%" stopColor="text-highlight" />
          <stop offset="100%" stopColor="#6b4b31" />
        </linearGradient>
      </defs>

      {/* Outer ring */}
      <circle cx="60" cy="60" r="56" fill="none" stroke={ring} strokeWidth="2.5" />

      {/* Gold crescent — built by subtracting one circle from another */}
      <mask id="gallis-crescent">
        <rect width="120" height="120" fill="black" />
        <circle cx="68" cy="60" r="38" fill="white" />
        <circle cx="56" cy="60" r="38" fill="black" />
      </mask>
      <rect width="120" height="120" fill="url(#gallis-gold)" mask="url(#gallis-crescent)" />

      {/* Serif G — set in a generic serif to mirror NV Vainilla weight */}
      <text
        x="60"
        y="78"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', 'Times New Roman', serif"
        fontSize="64"
        fontWeight={500}
        fill={letter}
      >
        G
      </text>
    </svg>
  );
}
