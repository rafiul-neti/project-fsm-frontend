"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGoogleOAuth, useLogin } from "@/hooks";
import { loginSchema } from "@/validation";
import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel, FieldSeparator } from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { mutate: login, isPending: loginPending } = useLogin();
  const { mutate: googleLogin } = useGoogleOAuth();

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

  const handleGoogleLoginSuccess = (credentialResponse: {
    credential?: string;
  }) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      toast.add({
        title: "Google Login Failed",
        description: "Something Went Wrong. Please Try Again.",
        type: "error",
      });

      return;
    }

    googleLogin(
      { idToken },
      {
        onSuccess: () => {
          toast.add({
            title: "Google Login Successfull",
            description: "Welcome to the App.",
            type: "succcess",
          });

          router.push("/")
        },
        onError: (err) => {
          toast.add({
            title: "Google Login Failed",
            description: err.message ||  "Something Went Wrong. Please Try Again.",
            type: "error",
          });
        },
      },
    );
  };

  const handleGoogleLoginError = () => {
    toast.add({
      title: "Google Login Failed",
      description: "Something Went Wrong. Please Try Again.",
      type: "error",
    });
  };

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
          {loginPending ? (
            <>
              Submitting <Spinner />
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>

      <FieldSeparator>Or</FieldSeparator>

      <GoogleLogin
        text="continue_with"
        shape="rectangular"
        onSuccess={handleGoogleLoginSuccess}
        onError={handleGoogleLoginError}
      />
    </div>
  );
}
