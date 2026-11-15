import { Skeleton } from "@/components/ui/skeleton";

export function AuditLogsSkeleton({
  rowsOnly = false,
}: {
  rowsOnly?: boolean;
}) {
  return (
    <div className="space-y-4">
      {!rowsOnly && (
        <div className="flex gap-3">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-9 w-32" />
        </div>
      )}
      <div className="space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={`audit-logs-skeleton`.split("").join(`${i}`)}
            className="h-12 w-full"
          />
        ))}
      </div>
    </div>
  );
}
