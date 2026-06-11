"use client";

import { Scale, Landmark, Users, FileCheck, Network, type LucideIcon } from "lucide-react";
import { ServiceLayout } from "@/components/services/ServiceLayout";

const sectionIcons: Record<string, LucideIcon> = {
  litigation: Scale,
  administrative: Landmark,
  civil: Users,
  documentation: FileCheck,
  network: Network,
};

export function ArgentineLegalRepresentationService() {
  return (
    <ServiceLayout
      namespace="services.argentineLegalRepresentation"
      heroImage={{
        src: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=1900&q=80",
        alt: "Classical courthouse columns",
      }}
      featureImage={{
        src: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1900&q=80",
        alt: "Legal documents and gavel on a desk",
      }}
      sectionIcons={sectionIcons}
    />
  );
}
