import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/lib/navigation";
import { PageHero } from "@/components/layout/PageHero";

const serviceSlugs = [
  "international-mobility",
  "us-visa-guidance",
  "european-pathways",
  "argentine-legal-representation",
] as const;

type ServiceItem = {
  title: string;
  tagline: string;
  intro: string;
  bullets: string[];
};

// [Editorial photo per service, ~900x540]
const SERVICE_IMAGES: Record<(typeof serviceSlugs)[number], { src: string; alt: string }> = {
  "international-mobility": {
    src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1100&q=80",
    alt: "Passport and travel documents on a desk",
  },
  "us-visa-guidance": {
    src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1100&q=80",
    alt: "U.S. skyline at golden hour",
  },
  "european-pathways": {
    src: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1100&q=80",
    alt: "European city street and architecture",
  },
  "argentine-legal-representation": {
    src: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=1100&q=80",
    alt: "Courthouse columns and steps",
  },
};

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("servicesPage");

  return (
    <>
      <PageHero
        eyebrow="Galli's & Co."
        title={t("title")}
        intro={t("intro")}
        /* [Wide-angle — global cityscape skyline at dusk, navy/amber palette, 1800x900] */
        imageSrc="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1900&q=80"
        imageAlt="Global cityscape at dusk"
      />

      <section className="bg-surface py-20 text-ink lg:py-24">
        <div className="container grid gap-6 lg:grid-cols-2">
          {serviceSlugs.map((slug) => {
            const item = t.raw(`items.${slug}`) as ServiceItem;
            const img = SERVICE_IMAGES[slug];
            return (
              <Link
                key={slug}
                href={`/services/${slug}`}
                className="group flex flex-col overflow-hidden rounded-card border border-primary/10 bg-white shadow-[0_18px_46px_-34px_rgba(35,51,73,0.34)] transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-elevated"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent"
                  />
                  <span className="absolute left-5 top-5 rounded-pill bg-white/95 px-3 py-1 text-eyebrow uppercase tracking-wider2 text-accent-700 backdrop-blur">
                    {item.tagline}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-2xl text-primary">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.intro}</p>
                  <ul className="mt-5 flex flex-wrap gap-2 text-xs text-primary/80">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="rounded-pill border border-primary/15 bg-primary/[0.04] px-3 py-1"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-700 transition-transform group-hover:translate-x-1">
                    {t("exploreCta")}
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="container mt-16 max-w-3xl rounded-card border border-primary/10 bg-white p-8 text-center shadow-[0_18px_46px_-34px_rgba(35,51,73,0.34)]">
          <h2 className="font-display text-2xl text-primary sm:text-3xl">
            {t("ctaSectionTitle")}
          </h2>
          <p className="mt-3 text-sm text-ink-muted">{t("ctaSectionText")}</p>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-pill bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            {t("ctaSectionButton")}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
