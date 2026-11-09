import Hero from "@/components/modules/marketing/home/Hero";
import HowItWorks from "@/components/modules/marketing/home/HowItWorks";
import Stats from "@/components/modules/marketing/home/Stats";


export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto">
      <Hero />
      <Stats />
      <HowItWorks />
    </div>
  )
}
