import { SearchX } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="flex w-full max-w-md flex-col items-center gap-6 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-accent text-primary">
          <SearchX size={28} aria-hidden="true" />
        </span>

        <div className="flex flex-col gap-2">
          <p
            aria-hidden="true"
            className="font-heading text-7xl font-extrabold tracking-tight text-primary"
          >
            404
          </p>
          <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            Page not found
          </h1>
          <p className="text-balance text-muted-foreground">
            The page you are looking for does not exist, or it may have been
            moved. Check the address, or head back to the home page.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/"
            className={cn(buttonVariants({ size: "lg" }), "h-11 px-6 rounded")}
          >
            Go to home
          </Link>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 px-6 rounded",
            )}
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
