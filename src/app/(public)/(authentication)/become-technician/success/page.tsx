import { Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Logo } from "@/components/Logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Application submitted | Fieldly",
  robots: { index: false },
};

type StepStatus = "done" | "current" | "todo";

const steps: { title: string; description: string; status: StepStatus }[] = [
  {
    title: "Application received",
    description: "We have your details and the service you selected.",
    status: "done",
  },
  {
    title: "Review by our team",
    description: "We check your experience, service area, and license.",
    status: "current",
  },
  {
    title: "Decision",
    description:
      "Once you are approved, you can set your availability and start receiving jobs.",
    status: "todo",
  },
];

export default function ApplicationSubmittedPage() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-muted/30 px-4 py-10">
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <Logo size={36} />

        <div className="flex w-full flex-col items-center gap-7 rounded-2xl border bg-card p-6 shadow-sm sm:p-9">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-green-600 text-white">
              <Check size={28} aria-hidden="true" />
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500 px-2.5 py-1 text-xs font-medium">
              <span className="size-1.5 rounded-full bg-amber-500" />
              Under review
            </span>

            <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              Application submitted
            </h1>

            <p className="text-balance text-muted-foreground">
              Thank you for applying to join Fieldly. Our team is reviewing your
              application and will get back to you soon.
            </p>
          </div>

          <div className="flex w-full flex-col gap-4 rounded-xl bg-muted/60 p-5">
            <h2 className="font-heading text-base font-bold">
              What happens next
            </h2>

            <ol>
              {steps.map((step, index) => {
                const isLast = index === steps.length - 1;
                return (
                  <li
                    key={step.title}
                    className="relative flex gap-3.5 pb-5 last:pb-0"
                  >
                    {!isLast && (
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute left-1.75 top-4 bottom-0 w-0.5",
                          step.status === "done" ? "bg-primary" : "bg-border",
                        )}
                      />
                    )}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "relative z-10 mt-0.5 size-4 shrink-0 rounded-full",
                        step.status === "done" && "bg-primary",
                        step.status === "current" &&
                          "border-4 border-primary bg-card",
                        step.status === "todo" && "bg-border",
                      )}
                    />
                    <div className="flex flex-col">
                      <span
                        className={cn(
                          "text-sm font-medium leading-5",
                          step.status === "todo" && "text-muted-foreground",
                        )}
                      >
                        {step.title}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {step.description}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className={cn(buttonVariants({ size: "lg" }), "h-12 flex-1")}
            >
              Back to home
            </Link>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 flex-1",
              )}
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}