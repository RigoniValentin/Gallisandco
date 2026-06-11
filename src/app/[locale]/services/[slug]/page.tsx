import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../../../../i18n/routing";
import { InternationalMobilityService } from "@/components/sections/InternationalMobilityService";
import { ArgentineLegalRepresentationService } from "@/components/sections/ArgentineLegalRepresentationService";
import { USVisaGuidanceService } from "@/components/sections/USVisaGuidanceService";
import { EuropeanPathwaysService } from "@/components/sections/EuropeanPathwaysService";

const serviceSlugs = [
  "international-mobility",
  "us-visa-guidance",
  "european-pathways",
  "argentine-legal-representation",
] as const;

type ServiceSlug = (typeof serviceSlugs)[number];

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

  switch (slug as ServiceSlug) {
    case "international-mobility":
      return <InternationalMobilityService />;
    case "argentine-legal-representation":
      return <ArgentineLegalRepresentationService />;
    case "us-visa-guidance":
      return <USVisaGuidanceService />;
    case "european-pathways":
      return <EuropeanPathwaysService />;
    default:
      return notFound();
  }
}
