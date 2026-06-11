"use client";

import { Plane, Home, BadgeCheck, ShieldCheck, type LucideIcon } from "lucide-react";
import { ServiceLayout } from "@/components/services/ServiceLayout";

const sectionIcons: Record<string, LucideIcon> = {
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
        src: "/Images/InternationalMobilityImage1.jpg",
        alt: "Patagonia landscape representing relocation to Argentina",
      }}
      featureImage={{
        src: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=1900&q=80",
        alt: "Buenos Aires cityscape",
      }}
      sectionIcons={sectionIcons}
    />
  );
}
