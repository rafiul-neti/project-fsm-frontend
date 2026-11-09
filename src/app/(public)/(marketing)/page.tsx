import Hero from "@/components/modules/marketing/home/Hero";
import HowItWorks from "@/components/modules/marketing/home/HowItWorks";
import Services from "@/components/modules/marketing/home/Services";
import Stats from "@/components/modules/marketing/home/Stats";
import TechnicianCTA from "@/components/modules/marketing/home/TechnicianCta";

export default function HomePage() {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Hero />
        <Stats />
        <HowItWorks />
      </div>
      <Services />
      <div className="max-w-7xl mx-auto">
        <TechnicianCTA />
      </div>
    </>
  );
}
