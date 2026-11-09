"use client";

import { useForm } from "@tanstack/react-form";
import { Eye, EyeClosed, FileUp, Image, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  isAcceptedFileSize,
  isAcceptedFileType,
  MAX_FILE_SIZE,
} from "@/constants";
import { useRegister } from "@/hooks";
import { formatFileSize } from "@/utils";
import { registerUserValidationSchema } from "@/validation";
import GoogleOAuthLogin from "../GoogleLogin";
import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel, FieldSeparator } from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const { mutate: register, isPending: registerPending } = useRegister();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      profilePhoto: null as File | null,
    },
    validators: {
      onSubmit: registerUserValidationSchema,
    },
    onSubmit: ({ value }) => {
      const userData = {
        name: value.name,
        email: value.email,
        password: value.password,
      };

      register(
        { data: userData, profileImage: value.profilePhoto as File },
        {
          onSuccess: (res) => {
            if (res?.success) {
              toast.add({
                title: "Registration Successful",
                description: res.message ?? "You have successfully registered.",
                type: "success",
              });

              const params = new URLSearchParams({
                email: userData.email,
              });
              router.push(`/account-verify?${params.toString()}`);
            }
          },
          onError: (err) => {
            toast.add({
              title: "Registration Failed",
              description:
                err.message ?? "An error occurred during registration.",
              type: "error",
            });
          },
        },
      );
    },
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="">
        <h2 className="text-2xl font-bold text-center">
          Register for an account
        </h2>
        <p className="text-sm text-center text-gray-500">
          Create a new account by filling out the form below.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        {/* name */}
        <form.Field name="name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field className="my-5">
                <FieldLabel htmlFor={field.name} className="-mb-2">
                  Your Full Name
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

        {/* profile photo */}
        <form.Field name="profilePhoto">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            const file = field.state.value;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name} className="-mb-2">
                  Profile Photo
                </FieldLabel>

                <div className="">
                  <Button
                    // biome-ignore lint/a11y/noLabelWithoutControl: <explanatio>
                    render={<label htmlFor="profile-photo" />}
                    nativeButton={false}
                    variant="outline"
                    className={`w-full`}
                  >
                    <FileUp size={4} /> Upload Profile Photo
                  </Button>
                  <input
                    id="profile-photo"
                    type="file"
                    className="sr-only"
                    name={field.name}
                    onChange={(e) => {
                      const profilePhoto = e.target.files?.[0] || null;

                      if (
                        profilePhoto &&
                        (!isAcceptedFileSize(profilePhoto.size) ||
                          !isAcceptedFileType(profilePhoto.type))
                      ) {
                        field.handleBlur();
                        return;
                      }

                      field.handleChange(profilePhoto);
                      e.target.value = "";
                    }}
                  />
                  {file ? (
                    <span className="mt-0.5 inline-flex max-w-full items-center gap-2 rounded-md bg-muted px-2.5">
                      <Image className="size-4 shrink-0 text-primary" />
                      <span className="truncate">{file.name}</span>
                      <span className="text-[16px] text-muted-foreground">
                        {formatFileSize(file.size)}
                      </span>
                      <button
                        type="button"
                        aria-label="Remove Profile Photo"
                        onClick={() => {
                          field.handleChange(null);
                          field.handleBlur();
                        }}
                        className="transition-colors hover:text-destructive focus:outline-none"
                      >
                        <X className="size-5" />
                      </button>
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      Supported File: .jpg, .jpeg, .png, .webp and size{" "}
                      {MAX_FILE_SIZE}MB
                    </span>
                  )}
                </div>
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
              <Field className="my-5">
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

        {/* confirm password input */}
        <form.Field name="confirmPassword">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field className="my-5">
                <FieldLabel htmlFor={field.name} className="-mb-2">
                  Confirm Passsword
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
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? (
                      <EyeClosed size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
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
          disabled={registerPending}
          type="submit"
          className={`rounded my-5 w-full`}
        >
          {registerPending ? (
            <>
              Submitting <Spinner />
            </>
          ) : (
            "Register"
          )}
        </Button>
      </form>

      <FieldSeparator>Or</FieldSeparator>

      <GoogleOAuthLogin />

      <div className="flex items-center justify-center">
        <small>
          Already have an account?{" "}
          <Link className="text-primary" href={`/login`}>
            Login
          </Link>
        </small>
      </div>
    </div>
  );
}
