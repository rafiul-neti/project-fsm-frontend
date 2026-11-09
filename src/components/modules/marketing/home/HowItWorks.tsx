import { CreditCard, UserCheck, Wrench } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Wrench,
    title: "Choose a service",
    description:
      "Pick a category, describe the problem, and add your address. It takes about two minutes.",
  },
  {
    number: "02",
    icon: UserCheck,
    title: "We assign a technician",
    description:
      "Our team reviews your request, matches a verified technician, and confirms the time window.",
  },
  {
    number: "03",
    icon: CreditCard,
    title: "Get it done, pay securely",
    description:
      "Follow the job from start to finish, then pay online once the work is complete.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-title"
      className="w-full px-6 py-16 md:px-10 lg:px-0 lg:py-22"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
        <h2
          id="how-it-works-title"
          className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[40px] lg:leading-12"
        >
          Book in three simple steps
        </h2>
        <p className="text-lg text-muted-foreground text-balance">
          No phone calls and no guessing. Tell us what you need and we handle
          the rest.
        </p>
      </div>

      <ol className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map(({ number, icon: Icon, title, description }) => (
          <li
            key={number}
            className="flex flex-col gap-4 rounded-2xl border bg-card p-7"
          >
            <div className="flex items-center justify-between">
              <span className="flex size-13 items-center justify-center rounded-xl bg-accent text-primary">
                <Icon size={26} aria-hidden="true" />
              </span>
              <span
                aria-hidden="true"
                className="font-heading text-3xl font-bold text-border"
              >
                {number}
              </span>
            </div>

            <h3 className="font-heading text-xl font-bold tracking-tight">
              {title}
            </h3>
            <p className="text-muted-foreground">{description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default HowItWorks;