"use client";

import { useForm } from "@tanstack/react-form";
import {
  CalendarDays,
  CheckCircle2,
  FolderPlus,
  Layers3,
  Plus,
  Tag,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useCreateCategory, useGetAllCategories } from "@/hooks";
import type { Category } from "@/types";

export default function ServiceCategories() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    data: categoriesResponse,
    isPending,
    isError,
    error,
  } = useGetAllCategories();
  const { mutate: createCategory, isPending: categoryPending } =
    useCreateCategory();

  const categories: Category[] = categoriesResponse?.data ?? [];

  const activeCategories = categories.filter((category) => category.isActive);

  const inactiveCategories = categories.filter(
    (category) => !category.isActive,
  );

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },

    validators: {
      onSubmit: ({ value }) => {
        if (!value.name.trim()) {
          return [{ message: "Category name is required." }];
        }

        if (!value.description.trim()) {
          return [{ message: "Category description is required." }];
        }

        return undefined;
      },
    },

    onSubmit: async ({ value }) => {
      const categoryData = {
        name: value.name.trim(),
        description: value.description.trim(),
      };

      createCategory(categoryData, {
        onSuccess: () => {
          toast.add({
            title: "Category Created",
            description: "Category creation successful.",
            type: "success",
          });
        },
        onError: (error) => {
          toast.add({
            title: "Operation Failed",
            description: error.message || "Category creation unsuccessful",
            type: "error",
          });
        },
      });
    },
  });

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);

    if (!open) {
      form.reset();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="size-4" />
          Create New Category
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Create Service Category
            </DialogTitle>

            <DialogDescription>
              Add a new category to organize the services available on your
              platform.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) =>
                  !value.trim() ? "Category name is required." : undefined,
              }}
            >
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Category Name</FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="e.g. Plumbing"
                      value={field.state.value}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                    />

                    {isInvalid && (
                      <FieldError>
                        {field.state.meta.errors.join(", ")}
                      </FieldError>
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field
              name="description"
              validators={{
                onChange: ({ value }) =>
                  !value.trim()
                    ? "Category description is required."
                    : undefined,
              }}
            >
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>

                    <Textarea
                      id={field.name}
                      name={field.name}
                      placeholder="Describe the services included in this category..."
                      value={field.state.value}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      rows={4}
                      className="resize-none"
                    />

                    {isInvalid && (
                      <FieldError>
                        {field.state.meta.errors.join(", ")}
                      </FieldError>
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleDialogChange(false)}
              >
                Cancel
              </Button>

              <Button type="submit">
                {categoryPending ? (
                  <Spinner />
                ) : (
                  <>
                    <FolderPlus className="size-4" />
                    Create Category
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Categories"
          value={categories.length}
          description="All registered service categories"
          icon={Layers3}
        />

        <StatCard
          title="Active Categories"
          value={activeCategories.length}
          description="Currently available categories"
          icon={CheckCircle2}
        />

        <StatCard
          title="Inactive Categories"
          value={inactiveCategories.length}
          description="Currently unavailable categories"
          icon={Tag}
        />
      </div>

      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">All Categories</h2>

            <p className="text-sm text-muted-foreground">
              Browse your existing service categories.
            </p>
          </div>

          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
            {categories.length} categories
          </span>
        </div>

        {isPending ? (
          <div className="flex min-h-48 items-center justify-center rounded-xl border bg-card">
            <Spinner />
          </div>
        ) : isError ? (
          <div className="rounded-xl border border-destructive/30 bg-card p-8 text-center">
            <p className="font-medium text-destructive">
              Failed to load categories
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              {error?.message || "Something went wrong."}
            </p>
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-card px-6 py-16 text-center">
            <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-muted">
              <FolderPlus className="size-7 text-muted-foreground" />
            </div>

            <h3 className="font-semibold">No categories found</h3>

            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              You haven't created any service categories yet. Create your first
              category to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* Statistics Card */
function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>

        <Icon className="size-5 text-primary" />
      </div>

      <p className="mt-3 text-3xl font-bold">{value}</p>

      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

/* Category Card */
function CategoryCard({ category }: { category: Category }) {
  return (
    <article className="flex flex-col rounded-xl border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Tag className="size-5" />
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            category.isActive
              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {category.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="mt-5 flex-1 space-y-2">
        <h3 className="font-semibold">{category.name}</h3>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {category.description}
        </p>
      </div>

      <div className="mt-5 flex items-center gap-2 border-t pt-4 text-xs text-muted-foreground">
        <CalendarDays className="size-4" />

        <span>
          Created{" "}
          {new Date(category.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    </article>
  );
}
