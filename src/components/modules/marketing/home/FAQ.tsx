import { Plus } from "lucide-react";

const faqs = [
  {
    question: "How are technicians verified?",
    answer:
      "Every technician applies with their experience, skills, and service area. Our team reviews each application and approves only qualified people before they can receive any jobs.",
  },
  {
    question: "What are the Morning, Afternoon and Evening windows?",
    answer:
      "Technicians publish when they are free in three windows each day. After our team assigns a technician to your request, you can see the date and the window for your job.",
  },
  {
    question: "How do I pay, and when?",
    answer:
      "You pay online once the job is completed. If a payment does not go through, you can try again from your request page.",
  },
  {
    question: "Can I cancel a request?",
    answer:
      "Yes. Open the request in your dashboard and choose cancel. If you need a different time, cancel it and submit a new request.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-muted">
      <div className="w-full px-6 py-16 md:px-10 lg:px-20 lg:py-22">
        <h2
          id="faq-title"
          className="text-center font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[40px] lg:leading-12"
        >
          Frequently asked questions
        </h2>

        <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-3">
          {faqs.map(({ question, answer }) => (
            <details key={question} className="group rounded-xl border bg-card">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-6 py-5 font-heading text-lg font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                {question}
                <Plus
                  size={20}
                  aria-hidden="true"
                  className="shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="px-6 pb-5 leading-7 text-muted-foreground">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;