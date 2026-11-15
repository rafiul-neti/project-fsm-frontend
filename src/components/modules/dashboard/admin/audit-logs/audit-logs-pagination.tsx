"use client";

import { Button } from "@/components/ui/button";
import type { Meta } from "@/types";

type Props = {
  meta: Meta;
  onPageChange: (page: number) => void;
};

export function AuditLogsPagination({ meta, onPageChange }: Props) {
  const { page, totalPages, total } = meta;

  return (
    <div className="flex items-center justify-between pt-4">
      <p className="text-sm text-muted-foreground">
        Page {page} of {Math.max(totalPages, 1)} · {total} logs
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
