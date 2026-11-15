"use client";

import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Logging the error so it can be found in the browser console or a monitoring tool.
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="flex w-full max-w-md flex-col items-center gap-6 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AlertCircle size={28} aria-hidden="true" />
        </span>

        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            Something went wrong
          </h1>
          <p className="text-balance text-muted-foreground">
            An unexpected error happened on our side. You can try again, or go
            back to the home page.
          </p>
          {error.digest && (
            <p className="font-mono text-xs text-muted-foreground">
              Error reference: {error.digest}
            </p>
          )}
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button size="lg" className="h-11 px-6" onClick={() => reset()}>
            Try again
          </Button>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 px-6",
            )}
          >
            Go to home
          </Link>
        </div>
      </div>
    </section>
  );
}
