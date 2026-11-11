"use client";

import { useForm } from "@tanstack/react-form";
import { OTPInput, REGEXP_ONLY_DIGITS, type SlotProps } from "input-otp";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useEffect } from "react";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useVerifyOtp } from "@/hooks";
import { cn } from "@/lib/utils";
import { verifyOtpZodSchema } from "@/validation";

const OTP_LENGTH = 6;

const OtpSlot = ({
  char,
  isActive,
  hasFakeCaret,
  invalid,
}: SlotProps & { invalid: boolean }) => (
  <div
    className={cn(
      "relative flex size-12 items-center justify-center rounded-lg border bg-background text-xl font-semibold transition-all sm:size-14 sm:text-2xl",
      invalid ? "border-destructive" : "border-input",
      isActive && !invalid && "border-primary ring-4 ring-primary/15",
      isActive && invalid && "ring-4 ring-destructive/15",
    )}
  >
    {char}
    {hasFakeCaret && (
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="h-6 w-px animate-pulse bg-foreground" />
      </span>
    )}
  </div>
);

const VerifyOtpForm = ({ verifying }: { verifying?: "technician" }) => {
  const router = useRouter();
  const email = useSearchParams().get("email");
  const { mutate: verifyOtp, isPending } = useVerifyOtp();

  // Without an email there is nothing to verify, so send the user back.
  useEffect(() => {
    if (!email) {
      if (verifying === "technician") {
        router.replace("/become-technician");
        return;
      }
      router.replace("/register");
    }
  }, [email, router, verifying]);

  const form = useForm({
    defaultValues: {
      otp: "",
    },
    validators: {
      onSubmit: verifyOtpZodSchema,
    },
    onSubmit: ({ value }) => {
      if (!email) return;

      verifyOtp(
        {
          email,
          otp: value.otp,
          ...(verifying === "technician" && { verifying }),
        },
        {
          onSuccess: () => {
            if (verifying === "technician") {
              router.push("/become-technician/success");
              return;
            }

            toast.add({
              title: "Email verified",
              description: "Your registration is complete. Please log in.",
              type: "success",
            });
            router.push("/login");
          },
          onError: (err) => {
            toast.add({
              title: "Verification failed",
              description: err.message ?? "Something went wrong!",
              type: "error",
            });
            form.reset();
          },
        },
      );
    },
  });

  if (!email) return null;

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6">
      <Logo size={36} />

      <div className="flex w-full flex-col items-center gap-6 rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-primary">
            <Mail size={24} aria-hidden="true" />
          </span>

          <h1 className="font-heading text-2xl font-bold tracking-tight">
            Check your email
          </h1>

          <p className="text-balance text-sm text-muted-foreground">
            We sent a {OTP_LENGTH}-digit code to{" "}
            <span className="break-all font-medium text-foreground">
              {email}
            </span>
            . Enter it below to complete your registration.
          </p>
        </div>

        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="otp">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid} className="items-center">
                    <OTPInput
                      maxLength={OTP_LENGTH}
                      pattern={REGEXP_ONLY_DIGITS}
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      aria-label="One-time verification code"
                      aria-invalid={isInvalid}
                      value={field.state.value}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      onComplete={() => form.handleSubmit()}
                      disabled={isPending}
                      autoFocus
                      containerClassName="justify-center has-[:disabled]:opacity-50"
                      render={({ slots }) => (
                        <div className="flex items-center gap-2">
                          {slots.map((slot, index) => (
                            // biome-ignore lint/suspicious/noArrayIndexKey: <explanatio>
                            <Fragment key={index}>
                              <OtpSlot {...slot} invalid={isInvalid} />
                              {index === 2 && (
                                <span
                                  aria-hidden="true"
                                  className="mx-0.5 h-0.5 w-2 rounded-full bg-border"
                                />
                              )}
                            </Fragment>
                          ))}
                        </div>
                      )}
                    />

                    {isInvalid && (
                      <FieldError
                        className="text-center"
                        errors={field.state.meta.errors}
                      />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <Button className="h-11 w-full" disabled={isPending} type="submit">
              {isPending ? (
                <>
                  <Spinner /> Verifying
                </>
              ) : (
                "Verify email"
              )}
            </Button>
          </FieldGroup>
        </form>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Used the wrong email?{" "}
        <Link
          href={`${verifying === "technician" ? "/become-technician" : "/register"}`}
          className="font-medium underline underline-offset-4 hover:text-primary"
        >
          {verifying === "technician" ? "Apply again" : "Register again"}
        </Link>
      </p>
    </div>
  );
};

export default VerifyOtpForm;
