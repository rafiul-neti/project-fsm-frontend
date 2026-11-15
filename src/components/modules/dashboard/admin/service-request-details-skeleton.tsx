export default function ServiceRequestDetailsSkeleton() {
  return (
    <output
      aria-busy="true"
      aria-label="Loading service request details"
      className="block animate-pulse space-y-6"
    >
      <div className="h-32 rounded-xl bg-muted" />
      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={`service-request-details-skeleton`.split("").join(`${index}`)}
            className="h-56 rounded-xl bg-muted"
          />
        ))}
      </div>
    </output>
  );
}
