import { setRequestLocale, getTranslations } from "next-intl/server";
import { Compass, Globe2, Scale, ShieldCheck } from "lucide-react";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { PageHero } from "@/components/layout/PageHero";

type Value = { id: string; title: string; description: string };

const VALUE_ICONS = {
  excellence: ShieldCheck,
  integrity: Scale,
  international: Globe2,
  strategy: Compass,
} as const;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const values = t.raw("values") as Value[];

  return (
    <>
      <PageHero
        eyebrow="Galli's & Co."
        title={t("title")}
        intro={t("intro")}
        /* [Editorial — historic European library or law office, warm tones, 1800x900] */
        imageSrc="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1900&q=80"
        imageAlt="Wall of historic law books"
      />

      <WhoWeAre />

      <section className="relative bg-surface py-20 text-ink lg:py-24">
        <div className="container max-w-6xl">
          {/* Mission band with side image */}
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div className="relative aspect-[5/4] overflow-hidden rounded-card shadow-elevated">
              {/* [Boutique attorney signing documents, soft daylight, ~800x640] */}
              <img
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1100&q=80"
                alt="Attorney drafting legal documents"
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-105"
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-eyebrow uppercase tracking-wider2 text-accent">
                {t("missionTitle")}
              </p>
              <p className="mt-4 font-display text-2xl leading-snug text-primary sm:text-3xl lg:text-4xl">
                {t("mission")}
              </p>
            </div>
          </div>

          {/* Values grid with icons */}
          <div className="mt-20">
            <p className="text-eyebrow uppercase tracking-wider2 text-accent">
              {t("valuesTitle")}
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => {
                const Icon =
                  VALUE_ICONS[value.id as keyof typeof VALUE_ICONS] ?? ShieldCheck;
                return (
                  <div
                    key={value.id}
                    className="group rounded-card border border-primary/10 bg-white p-6 shadow-[0_18px_46px_-34px_rgba(35,51,73,0.34)] transition-all duration-500 hover:-translate-y-1 hover:border-accent/45 hover:shadow-elevated"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent-700 transition-transform duration-500 group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-display text-xl text-primary">{value.title}</h3>
                    <p className="mt-2 text-sm text-ink-muted">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
