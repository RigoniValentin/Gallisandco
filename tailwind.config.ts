import type { Config } from "tailwindcss";

/**
 * Galli's & Co. — Design Tokens
 * All color values extracted strictly from the official Brand Manual (PDF).
 * Do NOT introduce hues outside this palette.
 *
 * Cromática oficial:
 *   #233349  Deep Navy   -> primary    (corporate, authority)
 *   #a97a51  Bronze Gold -> accent     (the crescent moon / highlight)
 *   #938374  Warm Taupe  -> neutral.dk
 *   #d0bba5  Sand        -> neutral.md
 *   #e4d9d5  Pale Blush  -> neutral.lt
 *   #f5f2f0  Off White   -> surface
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/sections/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "3rem",
        "2xl": "4rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        // Brand primary — navy
        primary: {
          DEFAULT: "#233349",
          50: "#eef1f5",
          100: "#d5dce6",
          200: "#aab8cb",
          300: "#7e93b0",
          400: "#536f95",
          500: "#3b557a",
          600: "#2d425f",
          700: "#233349", // base
          800: "#1a2637",
          900: "#111a25",
        },
        // Brand accent — bronze / gold of the crescent
        accent: {
          DEFAULT: "#a97a51",
          50: "#faf4ee",
          100: "#f1e2d1",
          200: "#e3c5a3",
          300: "#d2a679",
          400: "#bc8d61",
          500: "#a97a51", // base
          600: "#8a6240",
          700: "#6b4b31",
          800: "#4d3623",
          900: "#312216",
        },
        // Brand neutrals — warm tonal range from manual
        sand: {
          DEFAULT: "#d0bba5",
          dark: "#938374",
          light: "#e4d9d5",
        },
        surface: {
          DEFAULT: "#f5f2f0", // off-white base from manual
          alt: "#ffffff",
        },
        ink: {
          DEFAULT: "#233349", // body copy on light surfaces = primary navy
          muted: "#5b6577",
        },
      },
      fontFamily: {
        // Logo font (NV Vainilla) — used ONLY inside the logotype, per manual.
        display: ["var(--font-display)", "Playfair Display", "serif"],
        // Bajada / body / UI — Google Sans (with a safe stack fallback).
        sans: [
          "var(--font-sans)",
          "Google Sans",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        // Editorial scale to support a law-firm hierarchy
        "display-xl": ["clamp(3.5rem, 7vw, 6.5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.75rem, 5.5vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        eyebrow: ["0.75rem", { lineHeight: "1", letterSpacing: "0.22em" }],
      },
      spacing: {
        // "Área de seguridad" base unit ≈ x-height of the logotype.
        // We expose it as a spacing token so all paddings stay in rhythm.
        "safe-x": "1.25rem",
        "safe-2x": "2.5rem",
        "safe-3x": "3.75rem",
        section: "clamp(4rem, 9vw, 8rem)",
      },
      borderRadius: {
        pill: "9999px",
        card: "1.25rem",
      },
      boxShadow: {
        elevated:
          "0 30px 60px -25px rgba(35, 51, 73, 0.35), 0 10px 25px -15px rgba(35, 51, 73, 0.25)",
        ring: "0 0 0 1px rgba(35, 51, 73, 0.08)",
      },
      backgroundImage: {
        // Subtle radial used on the navy hero to add depth
        "primary-glow":
          "radial-gradient(1200px 600px at 80% -10%, rgba(169,122,81,0.22), transparent 60%), radial-gradient(900px 500px at 0% 100%, rgba(169,122,81,0.12), transparent 55%)",
        "gold-sheen":
          "linear-gradient(135deg, #d2a679 0%, #a97a51 45%, #6b4b31 100%)",
      },
      letterSpacing: {
        wider2: "0.18em",
      },
    },
  },
  plugins: [],
};

export default config;
