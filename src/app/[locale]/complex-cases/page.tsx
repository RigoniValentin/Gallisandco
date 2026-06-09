import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "@/lib/navigation";
import { ComplexCases } from "@/components/sections/ComplexCases";
import { PageHero } from "@/components/layout/PageHero";

export default async function ComplexCasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("complexCasesPage");
  const scope = t.raw("scope") as string[];

  return (
    <>
      <PageHero
        eyebrow="Galli's & Co."
        title={t("title")}
        intro={t("intro")}
        /* [Editorial — chess board mid-game close-up, navy & gold tones, 1800x900] */
        imageSrc="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1900&q=80"
        imageAlt="Chess board mid-game representing complex strategy"
      />

      <section className="relative bg-surface py-20 text-ink lg:py-24">
        <div className="container max-w-5xl">
          <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="text-eyebrow uppercase tracking-wider2 text-accent">
                {t("scopeTitle")}
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {scope.map((item) => (
                  <li
                    key={item}
                    className="group flex items-start gap-3 rounded-card border border-primary/10 bg-white p-4 shadow-[0_18px_46px_-34px_rgba(35,51,73,0.34)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/45"
                  >
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/15 text-accent-700 transition-transform group-hover:scale-110">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm text-ink">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Link
                  href="/contact"
                  className="gold-cta inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold"
                >
                  {t("cta")}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Side image */}
            <div className="relative hidden aspect-[4/5] overflow-hidden rounded-card shadow-elevated lg:block">
              {/* [Antique compass and world map close-up, ~700x880] */}
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=900&q=80"
                alt="Compass over a world map"
                className="h-full w-full object-cover transition-transform duration-[1500ms] ease-out hover:scale-105"
                loading="lazy"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      <ComplexCases />
    </>
  );
}
