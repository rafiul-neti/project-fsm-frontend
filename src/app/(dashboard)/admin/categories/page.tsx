import ServiceCategories from "@/components/modules/dashboard/admin/service-categories";

export default function ServiceCategoriesPage() {
  return (
    <div className="min-h-screen bg-muted/30 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Service Categories
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage the service categories available on your platform.
          </p>
        </div>

        <ServiceCategories />
      </div>
    </div>
  );
}
