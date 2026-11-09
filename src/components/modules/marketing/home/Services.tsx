import {
  Bug,
  Droplets,
  Hammer,
  Paintbrush,
  Snowflake,
  Sparkles,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ServiceCategory = {
  id?: string;
  name: string;
  description: string;
};

// Used until you connect the categories API. Same shape as the API response.
const defaultCategories: ServiceCategory[] = [
  {
    name: "Plumbing",
    description:
      "Leaking taps, blocked drains, pipe repair and bathroom fittings.",
  },
  {
    name: "Electrical",
    description:
      "Wiring faults, switches, fans, lighting and home safety checks.",
  },
  {
    name: "AC & Cooling",
    description:
      "AC servicing, gas refill, repair and installation for any room.",
  },
  {
    name: "Appliance Repair",
    description:
      "Fridge, washing machine, oven and other household appliances.",
  },
  {
    name: "Home Cleaning",
    description:
      "Deep cleaning for flats, kitchens and bathrooms by trained staff.",
  },
  {
    name: "Pest Control",
    description:
      "Safe, effective treatment for ants, cockroaches and termites.",
  },
  {
    name: "Painting",
    description: "Interior touch-ups and full room painting with clean finish.",
  },
  {
    name: "Carpentry",
    description: "Furniture repair, custom woodwork, door and window fitting.",
  },
];

// Categories are created by admins, so the icon is chosen from the name.
const iconRules: [RegExp, LucideIcon][] = [
  [/plumb|pipe|water/i, Droplets],
  [/electric|wiring|light/i, Zap],
  [/\bac\b|cool|air|hvac/i, Snowflake],
  [/clean/i, Sparkles],
  [/pest/i, Bug],
  [/paint/i, Paintbrush],
  [/carpent|wood|furniture/i, Hammer],
];

const getServiceIcon = (name: string): LucideIcon =>
  iconRules.find(([pattern]) => pattern.test(name))?.[1] ?? Wrench;

type ServicesProps = {
  categories?: ServiceCategory[];
};

const Services = ({ categories = defaultCategories }: ServicesProps) => {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="bg-muted"
    >
      <div className="max-w-7xl mx-auto w-full px-6 py-16 md:px-10 lg:px-0 lg:py-22">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <h2
            id="services-title"
            className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[40px] lg:leading-12"
          >
            Every home service, one place
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Popular categories, handled by verified technicians you can trust.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = getServiceIcon(category.name);
            return (
              <li
                key={category.id ?? category.name}
                className="flex flex-col gap-4 rounded-2xl border bg-card p-6"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-primary">
                  <Icon size={24} aria-hidden="true" />
                </span>

                <div className="flex flex-col gap-1.5">
                  <h3 className="font-heading text-lg font-bold tracking-tight">
                    {category.name}
                  </h3>
                  <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex justify-center">
          <Link
            href="/services"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 px-7",
            )}
          >
            View all services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;