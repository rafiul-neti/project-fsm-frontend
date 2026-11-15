"use client";

import { useQueryClient } from "@tanstack/react-query";
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
import { useAssignServiceRequest, useGetTechnicians } from "@/hooks";
import { cn } from "@/lib/utils";
import type { Technician } from "@/types";

function getErrorMessage(error: unknown) {
  const e = error as { data?: { message?: string }; message?: string } | null;
  return e?.data?.message ?? e?.message ?? "Something went wrong.";
}

export default function AssignTechnicianDialog({
  serviceRequestId,
  categoryId,
  categoryName,
}: {
  serviceRequestId: string;
  categoryId: string;
  categoryName: string;
}) {
  const [open, setOpen] = useState(false);
  const [technician, setTechnician] = useState<Technician | null>(null);

  const queryClient = useQueryClient();

  const techniciansQuery = useGetTechnicians(
    { categoryId, status: "APPROVED" },
    { enabled: open },
  );
  const assign = useAssignServiceRequest();

  const technicians = techniciansQuery.data?.data ?? [];
  const error = techniciansQuery.error ?? assign.error;

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setTechnician(null);
      assign.reset();
    }
  }

  function handleAssign() {
    if (!technician) return;

    assign.mutate(
      { serviceRequestId, technicianId: technician.userId },
      {
        onSuccess: () => {
          handleOpenChange(false);
          queryClient.removeQueries({
            queryKey: ["service-request", serviceRequestId],
          });
          queryClient.removeQueries({ queryKey: ["service-requests"] });
          queryClient.removeQueries({
            queryKey: ["service-requests-admin"],
          });
        },
      },
    );
  }

  return (
    <>
      <Button className="rounded" onClick={() => setOpen(true)}>
        Assign a Technician
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Assign a technician</DialogTitle>
            <DialogDescription>
              Approved technicians for {categoryName}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {techniciansQuery.isPending ? (
              <p className="text-sm text-muted-foreground">Loading…</p>
            ) : technicians.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No approved technicians found for this category.
              </p>
            ) : (
              <ul className="space-y-2">
                {technicians.map((t) => (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => setTechnician(t)}
                      aria-pressed={technician?.id === t.id}
                      className={cn(
                        "w-full rounded-lg border p-3 text-left text-sm transition-colors hover:bg-muted",
                        technician?.id === t.id && "border-primary bg-muted",
                      )}
                    >
                      <span className="block font-medium">{t.name}</span>
                      <span className="block text-muted-foreground">
                        {[
                          t.serviceArea,
                          t.yearsOfExperience != null
                            ? `${t.yearsOfExperience} yrs experience`
                            : null,
                        ]
                          .filter(Boolean)
                          .join(" · ") || "No details"}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {error && (
              <p role="alert" className="text-sm text-red-600">
                {getErrorMessage(error)}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={assign.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAssign}
              disabled={!technician || assign.isPending}
            >
              {assign.isPending ? "Assigning…" : "Assign"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
