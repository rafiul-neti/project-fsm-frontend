import Story from "@/components/modules/marketing/about/Story";
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
    </>
  );
}
