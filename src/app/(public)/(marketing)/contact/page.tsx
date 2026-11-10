import ContactBody from "@/components/modules/marketing/contact/ContactBody";
import PageHeader from "@/components/PageHeader";

export default function ContactPage() {
  return (
    <div>
      <PageHeader
        title="Contact"
        headerText="We would love to hear from you"
        subHeaderText="Questions about a booking, a payment, or joining as a technician? Send a message and we will reply within one working day."
      />

      <ContactBody />
    </div>
  );
}
