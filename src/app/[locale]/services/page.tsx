import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/PageHero";
import { Products } from "@/components/sections/Products";

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
      <Products />
    </>
  );
}
