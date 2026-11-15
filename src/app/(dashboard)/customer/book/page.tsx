import { ClipboardPlus } from "lucide-react";
import { Suspense } from "react";
import BookServiceForm from "@/components/form/book-service-form";

const steps = [
  "We review your request.",
  "We assign a verified technician and confirm the time window.",
  "You follow the job and pay online once it is done.",
];

export default function BookServicePage() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-3">
          <ClipboardPlus className="size-6 text-primary" />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Make a Service Request to Book a Service
          </h1>
          <p className="text-sm text-muted-foreground">
            Tell us what needs fixing and we will take it from there.
          </p>
        </div>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-xl border bg-card p-5 sm:p-7">
          <Suspense
            fallback={
              <output
                aria-label="Loading the request form"
                className="block h-96 animate-pulse rounded-lg bg-muted"
              />
            }
          >
            <BookServiceForm />
          </Suspense>
        </div>

        <aside className="rounded-xl border bg-card p-5">
          <h2 className="font-heading text-lg font-bold tracking-tight">
            What happens next
          </h2>
          <ol className="mt-4 flex flex-col gap-4">
            {steps.map((step, index) => (
              <li key={step} className="flex items-start gap-3 text-sm">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-primary">
                  {index + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </div>
  );
}
