import CTABand from "@/components/modules/marketing/about/CTABand";
import Story from "@/components/modules/marketing/about/Story";
import Values from "@/components/modules/marketing/about/Values";
import PageHeader from "@/components/PageHeader";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Fieldly"
        headerText="We make reliable home service feel effortlesss"
        subHeaderText="Fieldly connects busy households with verified technicians, and gives skilled professionals a simple way to find steady work."
      />

      <div className="max-w-7xl mx-auto">
        <Story />
      </div>

      <Values />

      <div className="max-w-7xl mx-auto">
        <CTABand
          title="Ready to get started?"
          description="Book your first service in minutes, or join our network of technicians."
          primaryAction={{ label: "Book a service", href: "/dashboard/book" }}
          secondaryAction={{ label: "Apply as Technician", href: "/apply" }}
        />
      </div>
    </>
  );
}
