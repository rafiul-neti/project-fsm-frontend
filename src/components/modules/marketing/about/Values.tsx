import { Clock, Eye, ShieldCheck } from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Trust first",
    description:
      "Every technician is reviewed and approved by our team, and rated by real customers after each job.",
  },
  {
    icon: Eye,
    title: "Always in the loop",
    description:
      "Follow your request from review to assignment to completion, so you always know what happens next.",
  },
  {
    icon: Clock,
    title: "Respect for time",
    description:
      "Technicians work in Morning, Afternoon and Evening windows, so you plan around a real window and not an all-day wait.",
  },
];

const Values = () => {
  return (
    <section id="values" aria-labelledby="values-title" className="bg-muted">
      <div className="max-w-7xl mx-auto w-full px-6 py-16 md:px-10 lg:px-0 lg:py-22">
        <h2
          id="values-title"
          className="text-center font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[40px] lg:leading-12"
        >
          What we stand for
        </h2>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map(({ icon: Icon, title, description }) => (
            <li
              key={title}
              className="flex flex-col gap-4 rounded-2xl border bg-card p-7"
            >
              <span className="flex size-13 items-center justify-center rounded-xl bg-[#CCFBF1] text-primary">
                <Icon size={26} aria-hidden="true" />
              </span>
              <h3 className="font-heading text-xl font-bold tracking-tight">
                {title}
              </h3>
              <p className="text-muted-foreground">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Values;