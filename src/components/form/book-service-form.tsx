"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useCreateServiceRequest, useGetAllCategories } from "@/hooks";

// import { createServiceRequestSchema } from "@/validation";

const routes = {
  requests: "/customer/requests",
  requestDetails: (id: string) => `/customer/requests/details?requestId=${id}`,
};

const DESCRIPTION_MAX = 1000;

const inputClass = "h-11 rounded-lg border border-input bg-background px-3.5";
const textareaClass =
  "min-h-36 rounded-lg border border-input bg-background px-3.5 py-3";

export default function BookServiceForm() {
  const router = useRouter();

  const preselectedCategoryId = useSearchParams().get("categoryId") ?? "";

  const { data: categories, isLoading: categoriesLoading } =
    useGetAllCategories();
  const { mutate: createRequest, isPending } = useCreateServiceRequest();

  const activeCategories = (categories?.data ?? []).filter(
    (category) => category.isActive && !category.isDeleted,
  );

  const items = activeCategories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const form = useForm({
    defaultValues: {
      categoryId: preselectedCategoryId,
      title: "",
      description: "",
      address: "",
    },
    // validators: {
    //   onSubmit: createServiceRequestSchema,
    // },
    onSubmit: ({ value }) => {
      createRequest(value, {
        onSuccess: (res) => {
          toast.add({
            title: "Request submitted",
            description: "Our team will review it and assign a technician.",
            type: "success",
          });
          const id = res?.data?.id;
          router.push(id ? routes.requestDetails(id) : routes.requests);
        },
        onError: (err) => {
          toast.add({
            title: "Could not submit the request",
            description: err.message || "Something went wrong!",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        {/* category - select and options */}
        <form.Field name="categoryId">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            // Ignore an unknown id from the URL so the select stays empty.
            const selected = items.some(
              (item) => item.value === field.state.value,
            )
              ? field.state.value
              : null;
            const selectedCategory = activeCategories.find(
              (category) => category.id === selected,
            );

            return (
              <Field data-invalid={isInvalid} className="">
                <FieldLabel htmlFor={field.name}>Service category</FieldLabel>
                <Select
                  items={items}
                  value={selected}
                  onValueChange={(value) => field.handleChange(value ?? "")}
                  disabled={categoriesLoading}
                >
                  <SelectTrigger
                    id={field.name}
                    aria-invalid={isInvalid}
                    onBlur={field.handleBlur}
                    className="h-11 w-full border border-input"
                  >
                    <SelectValue
                      placeholder={
                        categoriesLoading
                          ? "Loading services..."
                          : "Select a service category"
                      }
                      className={`mx-3`}
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
                {selectedCategory && (
                  <FieldDescription>
                    {selectedCategory.description}
                  </FieldDescription>
                )}
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {/* title */}
        <form.Field name="title">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  value={field.state.value}
                  aria-invalid={isInvalid}
                  placeholder="For example: Ceiling fan not spinning"
                  autoComplete="off"
                  className={inputClass}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {/* description */}
        <form.Field name="description">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Describe the problem
                </FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  rows={5}
                  maxLength={DESCRIPTION_MAX}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  value={field.state.value}
                  aria-invalid={isInvalid}
                  placeholder="What is happening, since when, and anything the technician should know."
                  className={textareaClass}
                />
                <div className="flex items-center justify-between gap-2">
                  <FieldDescription>
                    The more detail you give, the better we can match you.
                  </FieldDescription>
                  <span className="text-xs text-muted-foreground">
                    {field.state.value.length}/{DESCRIPTION_MAX}
                  </span>
                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {/* address */}
        <form.Field name="address">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Service address</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  value={field.state.value}
                  aria-invalid={isInvalid}
                  placeholder="House, road, area, city"
                  autoComplete="street-address"
                  className={inputClass}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <Button
          className="h-12 w-full sm:w-fit sm:px-8"
          disabled={isPending}
          type="submit"
        >
          {isPending ? (
            <>
              <Spinner /> Submitting ...
            </>
          ) : (
            "Submit request"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
