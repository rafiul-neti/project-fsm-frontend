"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AuditAction, TGetAllAuditLogsQuery } from "@/types";

const ALL = "all";
const ENTITY_TYPES = ["ServiceRequest", "User", "Payment"];
const ACTIONS: AuditAction[] = [];

type Props = {
  query: TGetAllAuditLogsQuery;
  onChange: (key: string, value?: string) => void;
};

export function AuditLogsFilters({ query, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={query.entityType ?? ALL}
        onValueChange={(v) =>
          onChange("entityType", v === ALL ? undefined : (v ?? undefined))
        }
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Entity type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All entities</SelectItem>
          {ENTITY_TYPES.map((t) => (
            <SelectItem key={t} value={t}>
              {t}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={query.action ?? ALL}
        onValueChange={(v) =>
          onChange("action", v === ALL ? undefined : (v ?? undefined))
        }
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Action" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All actions</SelectItem>
          {ACTIONS.map((a) => (
            <SelectItem key={a} value={a}>
              {a}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        onClick={() =>
          onChange("sortOrder", query.sortOrder === "desc" ? "asc" : "desc")
        }
      >
        {query.sortOrder === "desc" ? "Newest first" : "Oldest first"}
      </Button>
    </div>
  );
}
