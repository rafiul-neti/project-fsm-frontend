import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CTAAction = {
  label: string;
  href: string;
};

type CTABandProps = {
  title: string;
  description: string;
  primaryAction: CTAAction;
  secondaryAction?: CTAAction;
};

const CTABand = ({
  title,
  description,
  primaryAction,
  secondaryAction,
}: CTABandProps) => {
  return (
    <section className="w-full px-6 py-16 md:px-10 lg:px-0 lg:py-22">
      <div className="flex flex-col items-center gap-4 rounded-[28px] bg-primary px-6 py-12 text-center text-primary-foreground sm:px-10 lg:px-16 lg:py-14">
        <h2 className="max-w-2xl font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[40px] lg:leading-12">
          {title}
        </h2>
        <p className="max-w-2xl text-lg text-balance text-primary-foreground/80">
          {description}
        </p>

        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Link
            href={primaryAction.href}
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "h-12 px-7 rounded-md",
            )}
          >
            {primaryAction.label}
          </Link>

          {secondaryAction && (
            <Link
              href={secondaryAction.href}
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "h-12 border border-primary-foreground/40 px-7 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-md",
              )}
            >
              {secondaryAction.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTABand;
