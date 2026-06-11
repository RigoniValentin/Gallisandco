"use client";

import { Gavel, Home, Stamp, Baby, ClipboardCheck, Globe, type LucideIcon } from "lucide-react";
import { ServiceLayout } from "@/components/services/ServiceLayout";

const sectionIcons: Record<string, LucideIcon> = {
  judicial: Gavel,
  residency: Home,
  consular: Stamp,
  minors: Baby,
  aire: ClipboardCheck,
  relocation: Globe,
};

export function EuropeanPathwaysService() {
  return (
    <ServiceLayout
      namespace="services.europeanPathways"
      heroImage={{
        src: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1900&q=80",
        alt: "European old-town street at golden hour",
      }}
      featureImage={{
        src: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?auto=format&fit=crop&w=1900&q=80",
        alt: "Historic European architecture",
      }}
      sectionIcons={sectionIcons}
    />
  );
}
