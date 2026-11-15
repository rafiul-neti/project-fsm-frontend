import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TAuditLog } from "@/types";

export function AuditLogsTable({ logs }: { logs: TAuditLog[] }) {
  if (logs.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        No audit logs found.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Time</TableHead>
          <TableHead>Actor</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Entity</TableHead>
          <TableHead>Service request</TableHead>
          <TableHead>Metadata</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log) => (
          <TableRow key={log.id}>
            <TableCell className="whitespace-nowrap">
              {new Date(log.createdAt).toLocaleString()}
            </TableCell>
            <TableCell>
              <div className="font-medium">{log.actor.name}</div>
              <div className="text-xs text-muted-foreground">
                {log.actor.role}
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="secondary">{log.action}</Badge>
            </TableCell>
            <TableCell>
              <div>{log.entityType}</div>
              <div
                className="text-xs text-muted-foreground"
                title={log.entityId}
              >
                {log.entityId.slice(0, 8)}
              </div>
            </TableCell>
            <TableCell className="text-xs" title={log.serviceRequestId ?? ""}>
              {log.serviceRequestId ? log.serviceRequestId.slice(0, 8) : "—"}
            </TableCell>
            <TableCell className="max-w-64 truncate font-mono text-xs">
              {log.metadata ? JSON.stringify(log.metadata) : "—"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
