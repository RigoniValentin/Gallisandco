import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "@/lib/navigation";
import { routing } from "../../../../../i18n/routing";
import { PageHero } from "@/components/layout/PageHero";

const serviceSlugs = [
  "international-mobility",
  "us-visa-guidance",
  "european-pathways",
  "argentine-legal-representation",
] as const;

type ServiceSlug = (typeof serviceSlugs)[number];

type ServiceItem = {
  title: string;
  tagline: string;
  intro: string;
  bullets: string[];
};

// [Hero image per service, ~1800x900]
const SERVICE_HERO: Record<ServiceSlug, { src: string; alt: string }> = {
  "international-mobility": {
    src: "https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?auto=format&fit=crop&w=1900&q=80",
    alt: "World map and travel planning materials",
  },
  "us-visa-guidance": {
    src: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1900&q=80",
    alt: "Statue of Liberty against the New York skyline",
  },
  "european-pathways": {
    src: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1900&q=80",
    alt: "European old-town street at golden hour",
  },
  "argentine-legal-representation": {
    src: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1900&q=80",
    alt: "Legal documents and gavel on a desk",
  },
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    serviceSlugs.map((slug) => ({ locale, slug }))
  );
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!serviceSlugs.includes(slug as ServiceSlug)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("servicesPage");
  const item = t.raw(`items.${slug}`) as ServiceItem;
  const hero = SERVICE_HERO[slug as ServiceSlug];

  return (
    <>
      <PageHero
        eyebrow={item.tagline}
        title={item.title}
        intro={item.intro}
        imageSrc={hero.src}
        imageAlt={hero.alt}
      />

      <section className="bg-surface py-20 text-ink lg:py-24">
        <div className="container max-w-5xl">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
            {/* Side image accent */}
            <div className="relative hidden aspect-[4/5] overflow-hidden rounded-card shadow-elevated lg:block">
              <img
                src={hero.src}
                alt={hero.alt}
                className="h-full w-full object-cover transition-transform duration-[1500ms] ease-out hover:scale-105"
                loading="lazy"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent"
              />
            </div>

            <div>
              <p className="text-eyebrow uppercase tracking-wider2 text-accent">
                {t("title")}
              </p>
              <h2 className="mt-3 font-display text-3xl text-primary sm:text-4xl">
                {item.title}
              </h2>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="group flex items-start gap-3 rounded-card border border-primary/10 bg-white p-4 shadow-[0_18px_46px_-34px_rgba(35,51,73,0.34)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/45"
                  >
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/15 text-accent-700 transition-transform group-hover:scale-110">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm text-ink">{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="gold-cta inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold"
                >
                  {t("ctaSectionButton")}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/services"
                  className="gold-cta-outline inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-primary"
                >
                  {t("title")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
