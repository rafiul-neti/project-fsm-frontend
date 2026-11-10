"use client";

import { useForm } from "@tanstack/react-form";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { contactZodSchema } from "@/validation";

// Sample details. Replace with your real contact information.
const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "support@fieldly.example",
    href: "mailto:support@fieldly.example",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+880 1700 000 000",
    href: "tel:+8801700000000",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Level 5, Gulshan Avenue, Dhaka 1212",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Sat to Thu, 9:00 AM to 8:00 PM",
  },
];

const inputClass = "h-11 rounded-lg border border-input bg-background px-3.5";
const textareaClass =
  "min-h-36 rounded-lg border border-input bg-background px-3.5 py-3";

const ContactBody = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      topic: "",
      message: "",
    },
    validators: {
      onSubmit: contactZodSchema,
    },
    onSubmit: async ({ value }) => {
      // TODO: send `value` to your backend. Your API collection has no
      // contact endpoint yet, so this only shows the success state.
      console.log(value);

      toast.add({
        title: "Message sent",
        description:
          "Thanks for reaching out. We will reply within one working day.",
        type: "success",
      });
      form.reset();
    },
  });

  return (
    <section
      aria-label="Contact details and message form"
      className="w-full px-6 py-16 md:px-10 lg:px-20 lg:py-22"
    >
      <div className="grid items-start gap-12 lg:grid-cols-[420px_1fr]">
        {/* ---------- Contact info ---------- */}
        <ul className="flex flex-col gap-4">
          {contactInfo.map(({ icon: Icon, label, value, href }) => (
            <li
              key={label}
              className="flex items-center gap-4 rounded-2xl border bg-card px-6 py-5"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                <Icon size={22} aria-hidden="true" />
              </span>
              <div className="flex min-w-0 flex-col">
                <span className="text-sm text-muted-foreground">{label}</span>
                {href ? (
                  <a
                    href={href}
                    className="wrap-break-word transition-colors hover:text-primary"
                  >
                    {value}
                  </a>
                ) : (
                  <span>{value}</span>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* ---------- Form ---------- */}
        <div className="flex flex-col gap-5 rounded-2xl border bg-card p-6 sm:p-9">
          <h2 className="font-heading text-2xl font-bold tracking-tight">
            Send us a message
          </h2>

          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <div className="grid gap-5 sm:grid-cols-2">
                {/* name input */}
                <form.Field name="name">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Full name</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          value={field.state.value}
                          aria-invalid={isInvalid}
                          autoComplete="name"
                          placeholder="Your name"
                          className={inputClass}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
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
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Email address
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="email"
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          value={field.state.value}
                          aria-invalid={isInvalid}
                          autoComplete="email"
                          placeholder="you@example.com"
                          className={inputClass}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
              </div>

              {/* topic input */}
              <form.Field name="topic">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Topic</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        aria-invalid={isInvalid}
                        autoComplete="off"
                        placeholder="Booking, payment, or technician account"
                        className={inputClass}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* message textarea */}
              <form.Field name="message">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Message</FieldLabel>
                      <Textarea
                        id={field.name}
                        name={field.name}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        aria-invalid={isInvalid}
                        placeholder="How can we help?"
                        className={textareaClass}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Subscribe selector={(state) => state.isSubmitting}>
                {(isSubmitting) => (
                  <Button
                    className="h-12 w-full px-7 sm:w-fit rounded-md"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner /> Sending
                      </>
                    ) : (
                      "Send message"
                    )}
                  </Button>
                )}
              </form.Subscribe>
            </FieldGroup>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactBody;