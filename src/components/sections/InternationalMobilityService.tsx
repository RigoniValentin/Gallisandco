"use client";

import { Plane, Home, BadgeCheck, ShieldCheck, LaptopMinimal, type LucideIcon } from "lucide-react";
import { ServiceLayout } from "@/components/services/ServiceLayout";

const sectionIcons: Record<string, LucideIcon> = {
  digitalNomad: LaptopMinimal,
  temporary: Plane,
  permanent: Home,
  citizenship: BadgeCheck,
  audit: ShieldCheck,
};

export function InternationalMobilityService() {
  return (
    <ServiceLayout
      namespace="services.internationalMobility"
      heroImage={{
        src: "/Images/InternationalMobilityToArg.png",
        alt: "Family in Buenos Aires with the Argentine flag",
      }}
      featureImage={{
        src: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=1900&q=80",
        alt: "Buenos Aires cityscape",
      }}
      sectionIcons={sectionIcons}
    />
  );
}
