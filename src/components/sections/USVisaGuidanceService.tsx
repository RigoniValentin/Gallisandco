"use client";

import { Plane, Briefcase, Users, Building2, FileText, type LucideIcon } from "lucide-react";
import { ServiceLayout } from "@/components/services/ServiceLayout";

const sectionIcons: Record<string, LucideIcon> = {
  visitor: Plane,
  business: Briefcase,
  family: Users,
  employment: Building2,
  additional: FileText,
};

export function USVisaGuidanceService() {
  return (
    <ServiceLayout
      namespace="services.usVisaGuidance"
      heroImage={{
        src: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1900&q=80",
        alt: "Statue of Liberty against the New York skyline",
      }}
      featureImage={{
        src: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1900&q=80",
        alt: "New York City skyline",
      }}
      sectionIcons={sectionIcons}
    />
  );
}
