import { setRequestLocale, getTranslations } from "next-intl/server";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");
  const footerT = await getTranslations("footer");

  return (
    <>
      <PageHero
        eyebrow="Galli's & Co."
        title={t("title")}
        intro={t("intro")}
        /* [Editorial — modern boutique office reception with warm light, 1800x900] */
        imageSrc="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1900&q=80"
        imageAlt="Modern boutique office reception"
      />

      <section className="bg-surface py-20 text-ink lg:py-24">
        <div className="container grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_1fr]">
          {/* Channels card */}
          <div className="group rounded-card border border-primary/10 bg-white p-8 shadow-[0_18px_46px_-34px_rgba(35,51,73,0.34)] transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:shadow-elevated">
            <p className="text-eyebrow uppercase tracking-wider2 text-accent">
              {t("channelsTitle")}
            </p>
            <ul className="mt-6 space-y-4 text-sm text-ink">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent/15 text-accent-700">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="leading-relaxed">{footerT("address")}</span>
              </li>
              <li>
                <a
                  href="tel:+5493512073555"
                  className="flex items-start gap-3 transition-colors hover:text-accent-700"
                >
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent/15 text-accent-700">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span className="leading-relaxed">{footerT("phone")}</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contacto@gallisco.com"
                  className="flex items-start gap-3 transition-colors hover:text-accent-700"
                >
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent/15 text-accent-700">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="leading-relaxed">{footerT("email")}</span>
                </a>
              </li>
            </ul>

            {/* Decorative map image */}
            <div className="mt-8 relative h-44 overflow-hidden rounded-card">
              {/* [Stylised city map / aerial of Córdoba, ~900x300] */}
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1100&q=80"
                alt="City map illustration"
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent"
              />
            </div>
          </div>

          {/* Schedule card — visual */}
          <div className="relative flex flex-col overflow-hidden rounded-card border border-primary/10 bg-primary text-white shadow-[0_18px_46px_-34px_rgba(35,51,73,0.34)]">
            {/* [Calendar planning / coffee on desk, 800x500] */}
            <img
              src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1100&q=80"
              alt="Calendar with scheduled meetings"
              className="absolute inset-0 h-full w-full object-cover opacity-25"
              loading="lazy"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(35,51,73,0.86),rgba(35,51,73,0.96))]"
            />
            <div className="relative z-10 flex flex-1 flex-col p-8">
              <p className="text-eyebrow uppercase tracking-wider2 text-accent-200">
                {t("scheduleTitle")}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/80">{t("scheduleText")}</p>
              <a
                href="https://wa.me/5493512073555"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-auto inline-flex w-fit items-center gap-2 rounded-pill bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-emerald-400"
              >
                <MessageCircle className="h-4 w-4 transition-transform group-hover:rotate-12" />
                {t("whatsapp")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
