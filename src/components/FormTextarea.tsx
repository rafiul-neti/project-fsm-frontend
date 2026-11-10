"use client";

import type { AnyFieldApi } from "@tanstack/react-form";
import type React from "react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

type FormTextareaProps = Omit<
  React.ComponentProps<typeof Textarea>,
  "id" | "name" | "value" | "onChange" | "onBlur"
> & {
  /** The `field` object from `<form.Field>`'s render function. */
  field: AnyFieldApi;
  label: string;
};

const FormTextarea = ({ field, label, ...props }: FormTextareaProps) => {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

      <Textarea
        {...props}
        id={field.name}
        name={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        aria-invalid={isInvalid}
      />

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};

export default FormTextarea;
