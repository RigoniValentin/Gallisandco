import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { WhyUs } from "@/components/sections/WhyUs";
import { Products } from "@/components/sections/Products";
import { ComplexCases } from "@/components/sections/ComplexCases";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <WhoWeAre />
      <WhyUs />
      <Products />
      <ComplexCases />
      <ProcessSection />
      <Testimonials />
      <FinalCta />
    </>
  );
}
