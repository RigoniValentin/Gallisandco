import { setRequestLocale, getTranslations } from "next-intl/server";
import { bookingUrl, bookingEmbedUrl } from "@/lib/scheduling";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { SchedulingEmbed } from "@/components/sections/SchedulingEmbed";
import { ArrowUpRight, MessageCircle } from "lucide-react";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");
  const whatsappHref = "https://wa.me/5491173730900";

  const contactForm = {
    title: t("formTitle"),
    intro: t("formIntro"),
    nameLabel: t("formName"),
    namePlaceholder: t("formNamePlaceholder"),
    emailLabel: t("formEmail"),
    emailPlaceholder: t("formEmailPlaceholder"),
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
          <div
            id="free-consultation"
            className="group relative flex h-full scroll-mt-28 overflow-hidden rounded-card border border-primary/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,242,240,0.96))] p-8 shadow-[0_18px_46px_-34px_rgba(35,51,73,0.34)] transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:shadow-elevated"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(680px_circle_at_0%_0%,rgba(242,211,154,0.18),transparent_48%),radial-gradient(520px_circle_at_100%_100%,rgba(35,51,73,0.08),transparent_46%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 top-6 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(169,122,81,0.18),transparent_68%)] blur-3xl"
            />

            <div className="relative flex h-full flex-1 flex-col">
              <p className="text-eyebrow uppercase tracking-wider2 text-accent">
                {t("channelsTitle")}
              </p>
              <h2 className="mt-3 font-display text-2xl leading-tight text-primary md:text-[2rem]">
                {t("scheduleTitle")}
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink/75">
                {t("scheduleText")}
              </p>

              <div className="mt-7 flex flex-1 -translate-y-[25px] flex-col justify-center gap-3">
                <a
                  href="#book-calendar"
                  className="group flex items-center justify-between gap-4 rounded-[1.4rem] border border-accent/25 bg-[linear-gradient(135deg,rgba(242,211,154,0.95),rgba(255,255,255,0.96))] px-5 py-4 text-left shadow-[0_16px_36px_-26px_rgba(35,51,73,0.34)] transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-elevated"
                >
                  <span className="min-w-0">
                    <span className="block text-[10px] font-semibold uppercase tracking-wider2 text-[#8b623f]">
                      {t("channelsTitle")}
                    </span>
                    <span className="mt-1 block text-lg font-semibold leading-tight text-[#0b1830]">
                      {t("scheduleTitle")}
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-accent-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/10 bg-[linear-gradient(135deg,rgba(35,51,73,0.97),rgba(7,15,23,0.96))] px-5 py-4 text-left text-white shadow-[0_18px_36px_-26px_rgba(7,15,23,0.58)] transition-all hover:-translate-y-0.5 hover:border-white/20 hover:shadow-[0_24px_44px_-30px_rgba(7,15,23,0.72)]"
                >
                  <span className="min-w-0">
                    <span className="block text-[10px] font-semibold uppercase tracking-wider2 text-[#d7b37b]">
                      {t("channelsTitle")}
                    </span>
                    <span className="mt-1 block text-lg font-semibold leading-tight text-white">
                      {t("whatsapp")}
                    </span>
                  </span>
                  <MessageCircle className="h-5 w-5 shrink-0 text-[#d7b37b] transition-transform group-hover:rotate-12" />
                </a>
              </div>
            </div>
          </div>

          <ContactForm {...contactForm} />
        </div>
      </section>

      <SchedulingEmbed
        src={bookingEmbedUrl}
        title={t("bookTitle")}
        subtitle={t("bookText")}
        fallbackHref={bookingUrl}
        fallbackLabel={t("bookFallback")}
        closeLabel={t("bookClose")}
        activateHash="#book-calendar"
      />
    </>
  );
}
