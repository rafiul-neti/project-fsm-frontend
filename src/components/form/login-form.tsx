"use client";

import { useForm } from "@tanstack/react-form";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { loginSchema } from "@/validation";
import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div>
      <div className="">Login</div>

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
                <FieldLabel htmlFor={field.name} className="-mb-2">Email</FieldLabel>
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

        <Button type="submit" className={`rounded`}>
          Submit
        </Button>
      </form>
    </div>
  );
}
