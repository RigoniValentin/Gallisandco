import { setRequestLocale, getTranslations } from "next-intl/server";
import { BookOpen, Clock3 } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("insightsPage");
  const topics = t.raw("topics") as string[];

  return (
    <>
      <PageHero
        eyebrow="Galli's & Co."
        title={t("title")}
        intro={t("intro")}
        /* [Editorial — open law book with reading glasses on warm desk, 1800x900] */
        imageSrc="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1900&q=80"
        imageAlt="Open book on a wooden desk"
      />

      <section className="bg-surface py-20 text-ink lg:py-24">
        <div className="container max-w-5xl">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <p className="text-eyebrow uppercase tracking-wider2 text-accent">
              {t("comingSoon")}
            </p>
            <span className="inline-flex items-center gap-2 text-xs text-ink-muted">
              <Clock3 className="h-3.5 w-3.5" />
              In progress
            </span>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {topics.map((topic, idx) => (
              <li
                key={topic}
                className="group relative flex items-start gap-4 overflow-hidden rounded-card border border-primary/10 bg-white p-6 shadow-[0_18px_46px_-34px_rgba(35,51,73,0.34)] transition-all duration-500 hover:-translate-y-1 hover:border-accent/45 hover:shadow-elevated"
              >
                <span
                  aria-hidden
                  className="absolute right-4 top-3 font-display text-4xl text-primary/[0.06]"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent-700 transition-transform duration-500 group-hover:scale-110">
                  <BookOpen className="h-4 w-4" />
                </span>
                <span className="text-base font-medium leading-snug text-primary">{topic}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
