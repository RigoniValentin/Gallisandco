import { setRequestLocale, getTranslations } from "next-intl/server";
import { freeConsultationHref } from "@/lib/scheduling";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");
  const footerT = await getTranslations("footer");
  const whatsappHref = "https://wa.me/5491173721580";

  const contactForm = {
    title: t("formTitle"),
    intro: t("formIntro"),
    nameLabel: t("formName"),
    namePlaceholder: t("formNamePlaceholder"),
    emailLabel: t("formEmail"),
    emailPlaceholder: t("formEmailPlaceholder"),
    phoneLabel: t("formPhone"),
    phonePlaceholder: t("formPhonePlaceholder"),
    subjectLabel: t("formSubject"),
    subjectPlaceholder: t("formSubjectPlaceholder"),
    messageLabel: t("formMessage"),
    messagePlaceholder: t("formMessagePlaceholder"),
    submitLabel: t("formSubmit"),
    submittingLabel: t("formSubmitting"),
    successTitle: t("formSuccessTitle"),
    successText: t("formSuccessText"),
    errorTitle: t("formErrorTitle"),
    errorText: t("formErrorText"),
    emailSubject: t("formEmailSubject"),
    consultationLabel: t("scheduleTitle"),
    whatsappLabel: t("whatsapp"),
    consultationHref: freeConsultationHref,
    whatsappHref,
  };

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
                  href="tel:+5491173721580"
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
                  href="mailto:contact@galliandco.com"
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

          <ContactForm {...contactForm} />
        </div>
      </section>
    </>
  );
}
