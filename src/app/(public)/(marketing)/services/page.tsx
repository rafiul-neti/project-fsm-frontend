import PageHeader from "@/components/PageHeader";

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-4 bg-[#F0FDFA] p-20">
      <PageHeader
        title="Services"
        headerText="Find the right service for your home"
        subHeaderText="Browse categories, compare starting prices, and book a verified technician in minutes."
      />
    </div>
  );
}
