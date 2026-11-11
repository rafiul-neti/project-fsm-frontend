"use client";

import { useForm } from "@tanstack/react-form";
import { Dock, Eye, EyeClosed, FileUp, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  isAcceptedFileSize,
  isAcceptedFileType,
  MAX_FILE_SIZE,
} from "@/constants";
import { useApplyAsTechnician, useGetAllCategories } from "@/hooks";
import { formatFileSize } from "@/utils";
import { applyAsTechnicianValidationSchema } from "@/validation";
import { Button } from "../ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Spinner } from "../ui/spinner";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/toast";

export default function BecomeTechnicianForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { data: categories, isLoading: categoriesLoading } =
    useGetAllCategories();

  const {
    mutate: submitTechnicianApplication,
    isPending: technicianApplicationPending,
  } = useApplyAsTechnician();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      bio: "",
      yearsOfExperience: 0,
      serviceArea: "",
      categoryIds: "",
      license: null as File | null,
    },
    validators: { onSubmit: applyAsTechnicianValidationSchema },
    onSubmit: ({ value: { categoryIds, license, ...rest } }) => {
      if (!license) {
        toast.add({
          title: "License is Required",
          description:
            "Please upload your license or certification before submitting your application.",
          type: "warning",
        });
        return;
      }

      const technicianData = {
        ...rest,
        categoryIds: [categoryIds],
      };

      submitTechnicianApplication(
        { data: technicianData, license },
        {
          onSuccess: (res) => {
            toast.add({
              title: "Application Submitted!",
              description:
                res?.message ??
                "An OTP has been sent to your email. Please verify your email to complete your registration.",
              type: "success",
            });

            const params = new URLSearchParams({
              email: technicianData.email,
            });
            router.push(`/become-technician/verify-email?${params.toString()}`);
          },
          onError: (error) => {
            toast.add({
              title: "Application Failed!",
              description:
                error.message ?? "Something went wrong. Please try again.",
              type: "error",
            });
          },
        },
      );
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Apply to join Fieldly
        </h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <div className="grid gap-5 sm:grid-cols-2">
            {/* name */}
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field className="">
                    <FieldLabel htmlFor={field.name} className="-mb-2">
                      Your Full Name
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Name"
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      aria-invalid={isInvalid}
                      className="border border-gray-200 px-2 rounded"
                      autoComplete="off"
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
                  <Field className="">
                    <FieldLabel htmlFor={field.name} className="-mb-2">
                      Email
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="Email"
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      aria-invalid={isInvalid}
                      className="border border-gray-200 px-2 rounded"
                      autoComplete="Email"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
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
                  <Field className="">
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
                        {showPassword ? (
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

            {/* phone number */}
            <form.Field name="phoneNumber">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field className="">
                    <FieldLabel htmlFor={field.name} className="-mb-2">
                      Contact Number
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="tel"
                      placeholder="+880 1234 456 789"
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      aria-invalid={isInvalid}
                      className="border border-gray-200 px-2 rounded"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          {/* bio */}
          <form.Field name="bio">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field className="">
                  <FieldLabel htmlFor={field.name} className="-mb-2">
                    Professional Bio
                  </FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    rows={4}
                    placeholder="Share why you are the 'Choice'"
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    aria-invalid={isInvalid}
                    className="border border-gray-200 px-2 rounded"
                    autoComplete="off"
                  />
                  <div className="-mt-2 flex items-center justify-between gap-2">
                    <FieldDescription>
                      Shown on your public profile after approval.
                    </FieldDescription>
                    <span className="text-xs text-muted-foreground">
                      {field.state.value.length}/1000
                    </span>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* experience */}
            <form.Field name="yearsOfExperience">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field className="">
                    <FieldLabel htmlFor={field.name} className="-mb-2">
                      Years Of Experience
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="10"
                      min={0}
                      max={50}
                      type="number"
                      value={field.state.value === 0 ? "" : field.state.value}
                      onChange={(e) => {
                        const value = e.target.value;

                        field.handleChange(value === "" ? 0 : Number(value));
                      }}
                      aria-invalid={isInvalid}
                      className="border border-gray-200 px-2 rounded"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* service area */}
            <form.Field name="serviceArea">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field className="">
                    <FieldLabel htmlFor={field.name} className="-mb-2">
                      Service Area
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="Gulshan, Baridhara"
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      aria-invalid={isInvalid}
                      className="border border-gray-200 px-2 rounded"
                      autoComplete=""
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* categories - select and options */}
            <form.Field name="categoryIds">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                const items = (categories?.data ?? []).map((category) => ({
                  value: category.id,
                  label: category.name,
                }));

                return (
                  <Field className="">
                    <FieldLabel htmlFor={field.name} className="-mb-2">
                      Service Category
                    </FieldLabel>
                    <Select
                      items={items}
                      value={field.state.value || null}
                      onValueChange={(value) => field.handleChange(value ?? "")}
                      disabled={categoriesLoading}
                    >
                      <SelectTrigger
                        id={field.name}
                        aria-invalid={isInvalid}
                        onBlur={field.handleBlur}
                        className="w-full border border-gray-200 px-2 rounded"
                      >
                        <SelectValue
                          placeholder={
                            categoriesLoading ? (
                              <>
                                <Spinner /> "Loading services..."
                              </>
                            ) : (
                              "Select your service"
                            )
                          }
                        />
                      </SelectTrigger>
                      <SelectContent alignItemWithTrigger={false}>
                        {items.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* license*/}
            <form.Field name="license">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                const file = field.state.value;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className="-mb-2">
                      License
                    </FieldLabel>

                    <div className="">
                      <Button
                        // biome-ignore lint/a11y/noLabelWithoutControl: <explanatio>
                        render={<label htmlFor="license" />}
                        nativeButton={false}
                        variant="outline"
                        className={`w-full`}
                      >
                        <FileUp size={5} /> License or Certification
                      </Button>
                      <input
                        id="license"
                        type="file"
                        className="sr-only"
                        name={field.name}
                        onChange={(e) => {
                          const license = e.target.files?.[0] || null;

                          if (
                            license &&
                            (!isAcceptedFileSize(license.size) ||
                              !isAcceptedFileType(license.type, "doc"))
                          ) {
                            field.handleBlur();
                            return;
                          }

                          field.handleChange(license);
                          e.target.value = "";
                        }}
                      />
                      {file ? (
                        <span className="mt-0.5 inline-flex max-w-full items-center gap-2 rounded-md bg-muted px-2.5">
                          <Dock className="size-4 shrink-0 text-primary" />
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
                          Supported File: .pdf, .doc, .docx and size{" "}
                          {MAX_FILE_SIZE}MB
                        </span>
                      )}
                    </div>
                  </Field>
                );
              }}
            </form.Field>
          </div>
        </FieldGroup>
        <Button
          disabled={technicianApplicationPending}
          type="submit"
          className={`rounded my-5 w-full`}
        >
          {technicianApplicationPending ? (
            <>
              <Spinner /> Application Submitting
            </>
          ) : (
            "Submit Application"
          )}
        </Button>
      </form>
    </div>
  );
}
