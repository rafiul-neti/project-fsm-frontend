import { Check, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type StepStatus = "done" | "current" | "todo";

const steps: { label: string; time?: string; status: StepStatus }[] = [
  { label: "Request received", time: "9:02 AM", status: "done" },
  { label: "Technician assigned", time: "9:14 AM", status: "done" },
  { label: "On the way", time: "Arriving by 10:30 AM", status: "current" },
  { label: "Job completed", status: "todo" },
];

const avatars = ["SH", "NJ", "TA", "MR"];

const Hero = () => {
  return (
    <section className="w-full px-6 pb-16 pt-12 md:px-10 lg:px-0 lg:pb-24 lg:pt-18">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-14">
        {/* ---------- Copy ---------- */}
        <div className="flex flex-col items-start gap-7">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground">
            <ShieldCheck
              size={16}
              aria-hidden="true"
              className="text-primary"
            />
            Verified technicians across Dhaka
          </span>

          <h1 className="font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-[56px]">
            Home services, handled by people you can trust.
          </h1>

          <p className="max-w-xl text-lg leading-7 text-muted-foreground">
            Book a verified technician in minutes, follow every step of the job,
            and pay securely once the work is done.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard/book"
              className={cn(buttonVariants({ size: "lg" }), "h-12 px-7")}
            >
              Book a service
            </Link>
            <Link
              href="/apply"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 px-7",
              )}
            >
              Apply as Technician
            </Link>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="flex" aria-hidden="true">
              {avatars.map((initials, index) => (
                <span
                  key={initials}
                  className={cn(
                    "-ml-2.5 flex size-9 items-center justify-center rounded-full border-2 border-background text-xs font-medium text-secondary-foreground first:ml-0",
                    index % 2 === 0 ? "bg-secondary" : "bg-accent",
                  )}
                >
                  {initials}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-0.5">
              <div className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explnation>
                    key={index}
                    size={14}
                    className="fill-amber-500 text-amber-500"
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                4.9 average rating from 12,000+ completed jobs
              </p>
            </div>
          </div>
        </div>

        {/* ---------- Visual (decorative) ---------- */}
        <div
          aria-hidden="true"
          className="relative mx-auto w-full max-w-140 pb-10 pt-6 lg:pl-8"
        >
          <div className="absolute right-0 top-8 -z-10 size-[88%] rounded-full bg-accent/75" />
          <div className="absolute -right-2 -top-12 -z-10 size-16 rounded-full bg-amber-500" />

          <div className="relative z-10 flex flex-col gap-4.5 rounded-2xl border bg-card p-6 shadow-xl shadow-primary/10">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-muted-foreground">
                #FS-1042
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500 px-2.5 py-1 text-xs font-medium">
                <span className="size-1.5 rounded-full bg-violet-500" />
                In progress
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-heading text-2xl font-bold tracking-tight">
                AC servicing
              </p>
              <p className="text-sm text-muted-foreground">
                Gulshan, Dhaka · Tue 12 Nov · Morning
              </p>
            </div>

            <hr className="border-border" />

            <ol>
              {steps.map((step, index) => {
                const isLast = index === steps.length - 1;
                return (
                  <li
                    key={step.label}
                    className="relative flex gap-3.5 pb-5 last:pb-0"
                  >
                    {!isLast && (
                      <span
                        className={cn(
                          "absolute left-1.75 top-4 bottom-0 w-0.5",
                          step.status === "done" ? "bg-primary" : "bg-border",
                        )}
                      />
                    )}
                    <span
                      className={cn(
                        "relative z-10 mt-0.5 size-4 shrink-0 rounded-full",
                        step.status === "done" && "bg-primary",
                        step.status === "current" &&
                          "border-4 border-primary bg-card",
                        step.status === "todo" && "bg-muted",
                      )}
                    />
                    <div className="flex flex-col">
                      <span
                        className={cn(
                          "text-sm font-medium leading-5",
                          step.status === "todo" && "text-muted-foreground",
                        )}
                      >
                        {step.label}
                      </span>
                      {step.time && (
                        <span className="text-xs text-muted-foreground">
                          {step.time}
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>

            <hr className="border-border" />

            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-primary">
                TA
              </span>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-sm font-medium">Tanvir A.</span>
                <span className="text-xs text-muted-foreground">
                  4.9 rating · 320 jobs
                </span>
              </div>
              <span className="rounded-md border bg-card px-3 py-1.5 text-sm font-medium">
                Message
              </span>
            </div>
          </div>

          <div className="absolute bottom-0 right-2 z-20 flex items-center gap-3 rounded-xl border bg-card py-3.5 pl-4 pr-5 shadow-lg shadow-primary/10 sm:right-0">
            <span className="flex size-9 items-center justify-center rounded-lg bg-green-600 text-white">
              <Check size={18} />
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Payment secured</span>
              <span className="text-xs text-muted-foreground">
                Pay online after the job
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
