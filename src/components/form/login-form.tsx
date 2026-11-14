"use client";

import { useForm } from "@tanstack/react-form";
import { Eye, EyeClosed, ShieldCheck, UserRound, Wrench } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DEMO_ACCOUNTS } from "@/constants";
import { useLogin } from "@/hooks";
import { loginSchema } from "@/validation";
import GoogleOAuthLogin from "../GoogleLogin";
import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel, FieldSeparator } from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

const demoIcons = {
  ADMIN: ShieldCheck,
  CUSTOMER: UserRound,
  TECHNICIAN: Wrench,
};

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const router = useRouter();

  const { mutate: login, isPending: loginPending } = useLogin();

  const handleDemoLogin = (account: (typeof DEMO_ACCOUNTS)[number]) => {
    setActiveDemo(account.role);

    login(
      { email: account.email, password: account.password },
      {
        onSuccess: () => {
          toast.add({
            title: "Login Successful",
            description: `You are signed in as ${account.label}.`,
            type: "success",
          });
          router.push(account.redirectTo);
        },
        onError: (err) => {
          toast.add({
            title: "Demo Login Failed",
            description:
              err.message || "Could not sign in to the demo account.",
            type: "error",
          });
        },
        onSettled: () => setActiveDemo(null),
      },
    );
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };

      login(loginData, {
        onSuccess: () => {
          toast.add({
            title: "Login Successful",
            description: "You have successfully logged in.",
            type: "success",
          });
          router.push("/");
        },
        onError: (err) => {
          toast.add({
            title: "Login Failed",
            description: err.message || "Invalid email or password.",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="">
        <h2 className="text-2xl font-bold text-center">
          Login to your account
        </h2>
        <p className="text-sm text-center text-gray-500">
          Enter your email and password to access your account.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        {/* email input */}
        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field className="my-5">
                <FieldLabel htmlFor={field.name} className="-mb-2">
                  Email
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  value={field.state.value}
                  aria-invalid={isInvalid}
                  className="border border-gray-200 px-2 rounded"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {/* password input */}
        <form.Field name="password">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field>
                <FieldLabel htmlFor={field.name} className="-mb-2">
                  Passsword
                </FieldLabel>
                <div className="relative">
                  <Input
                    id={field.name}
                    name={field.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                    className="border border-gray-200 px-2 rounded"
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {isInvalid && (
                  <FieldError errors={field.state.meta.errors}></FieldError>
                )}
              </Field>
            );
          }}
        </form.Field>

        <Button
          disabled={loginPending}
          type="submit"
          className={`rounded my-5 w-full`}
        >
          {loginPending && !activeDemo ? (
            <>
              Submitting <Spinner />
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>

      <FieldSeparator>Or</FieldSeparator>

      <GoogleOAuthLogin />

      <FieldSeparator>Quick demo login</FieldSeparator>

      {/* quick demo login */}
      <div className="flex flex-col gap-3">
        <p className="text-sm text-center text-gray-500">
          Try each role with one click. No typing needed.
        </p>

        <ul className="flex flex-col gap-2.5">
          {DEMO_ACCOUNTS.map((account) => {
            const Icon = demoIcons[account.role];
            const isActive = activeDemo === account.role;

            return (
              <li
                key={account.role}
                className="flex items-center gap-3 rounded-xl border border-gray-200 p-3"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                  <Icon size={20} aria-hidden="true" />
                </span>

                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="text-sm font-medium">{account.label}</span>
                  <span className="text-xs text-gray-500">
                    {account.description}
                  </span>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded"
                  disabled={loginPending}
                  onClick={() => handleDemoLogin(account)}
                  aria-label={`Demo login as ${account.label}`}
                >
                  {isActive ? <Spinner /> : "Login"}
                </Button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex items-center justify-center">
        <small>
          Don't have an account?{" "}
          <Link className="text-primary" href={`/register`}>
            Register
          </Link>
        </small>
      </div>
    </div>
  );
}