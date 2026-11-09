import { Check } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const benefits = [
  "Choose Morning, Afternoon or Evening windows",
  "Get matched with jobs in your service area",
  "Build your rating and win more bookings",
];

const TechnicianCTA = () => {
  return (
    <section
      id="for-technicians"
      aria-labelledby="technician-cta-title"
      className="w-full px-6 py-16 md:px-10 lg:px-0 lg:py-22"
    >
      <div className="grid items-center gap-10 rounded-[28px] bg-primary px-6 py-10 text-primary-foreground sm:px-10 lg:grid-cols-[1fr_380px] lg:gap-12 lg:px-16 lg:py-14">
        <div className="flex flex-col items-start gap-4">
          <h2
            id="technician-cta-title"
            className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[40px] lg:leading-12"
          >
            Grow your income as a Fieldly technician
          </h2>
          <p className="max-w-xl text-lg text-primary-foreground/80">
            Set your own availability, get matched with jobs in your service
            area, and build your reputation with customer reviews.
          </p>
          <Link
            href="/apply"
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "mt-2 h-12 px-7 rounded-md",
            )}
          >
            Join as a Technician
          </Link>
        </div>

        <ul className="flex flex-col gap-3.5">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary-foreground text-primary">
                <Check size={16} aria-hidden="true" />
              </span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TechnicianCTA;