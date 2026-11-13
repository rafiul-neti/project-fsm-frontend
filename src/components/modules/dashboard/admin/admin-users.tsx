"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllUsers } from "@/hooks";
import { cn } from "@/lib/utils";
import type { User, UserRole } from "@/types";

type RoleTab = "ALL" | UserRole;

const PAGE_SIZE = 10;

const tabs: { value: RoleTab; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "ADMIN", label: "Admin" },
  { value: "TECHNICIAN", label: "Technician" },
  { value: "CUSTOMER", label: "Customer" },
];

const roleStyles: Record<UserRole, string> = {
  ADMIN: "border-violet-500",
  TECHNICIAN: "border-blue-500",
  CUSTOMER: "border-teal-500",
};

const roleDots: Record<UserRole, string> = {
  ADMIN: "bg-violet-500",
  TECHNICIAN: "bg-blue-500",
  CUSTOMER: "bg-teal-500",
};

const useDebouncedValue = (value: string, delay = 400) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
};

// Array.from keeps the first letter correct for non-Latin names too.
const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => Array.from(part)[0])
    .join("")
    .toUpperCase();

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const getStatus = (user: User) => {
  if (user.isBlocked) return { label: "Blocked", dot: "bg-red-500" };
  if (!user.isEmailVerified)
    return { label: "Unverified", dot: "bg-amber-500" };
  return { label: "Active", dot: "bg-green-600" };
};

function UsersTable({
  users,
  isLoading,
  emptyMessage,
}: {
  users: User[];
  isLoading: boolean;
  emptyMessage: string;
}) {
  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Sign-in</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading &&
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow
                key={`fsm-two`.split("").join(`${index}`)}
                aria-hidden="true"
              >
                <TableCell colSpan={6}>
                  <div className="h-9 animate-pulse rounded-md bg-muted" />
                </TableCell>
              </TableRow>
            ))}

          {!isLoading && users.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-32 text-center text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            users.map((user) => {
              const status = getStatus(user);

              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {user.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt=""
                          className="size-9 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-primary"
                        >
                          {getInitials(user.name)}
                        </span>
                      )}
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate font-medium">
                          {user.name}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium capitalize",
                        roleStyles[user.role],
                      )}
                    >
                      <span
                        className={cn(
                          "size-1.5 rounded-full",
                          roleDots[user.role],
                        )}
                      />
                      {user.role.toLowerCase()}
                    </span>
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {user.authProvider === "GOOGLE"
                      ? "Google"
                      : "Email and password"}
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {user.contactNumber ?? "Not provided"}
                  </TableCell>

                  <TableCell>
                    <span className="inline-flex items-center gap-2 text-sm">
                      <span className={cn("size-2 rounded-full", status.dot)} />
                      {status.label}
                    </span>
                  </TableCell>

                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {formatDate(user.createdAt)}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}

export default function AdminUsers() {
  const [tab, setTab] = useState<RoleTab>("ALL");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebouncedValue(search.trim());

  // The API filters by name or email. An "@" means the admin typed an email.
  const searchParams = debouncedSearch
    ? debouncedSearch.includes("@")
      ? { email: debouncedSearch }
      : { name: debouncedSearch }
    : {};

  const { data, isLoading, isError, refetch } = useGetAllUsers({
    page,
    limit: PAGE_SIZE,
    ...searchParams,
  });

  const users = data?.data ?? [];
  const meta = data?.meta;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-2xl font-bold tracking-tight">
            Users
          </h1>
          <p className="text-sm text-muted-foreground">
            {meta
              ? `${meta.total} ${meta.total === 1 ? "user" : "users"} in total`
              : "Everyone with a Fieldly account."}
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            aria-label="Search users by name or email"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3"
          />
        </div>
      </div>

      {isError ? (
        <div
          role="alert"
          className="flex flex-col items-start gap-3 rounded-xl border border-destructive/40 bg-card p-5"
        >
          <p className="text-sm">
            We could not load the users. Please try again.
          </p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      ) : (
        <Tabs
          value={tab}
          onValueChange={(value) => setTab(value as RoleTab)}
          className="gap-4"
        >
          <TabsList>
            {tabs.map(({ value, label }) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map(({ value, label }) => {
            const visibleUsers =
              value === "ALL" ? users : users.filter((u) => u.role === value);

            return (
              <TabsContent key={value} value={value}>
                <UsersTable
                  users={visibleUsers}
                  isLoading={isLoading}
                  emptyMessage={
                    debouncedSearch
                      ? `No ${value === "ALL" ? "users" : `${label.toLowerCase()} users`} match "${debouncedSearch}".`
                      : `No ${value === "ALL" ? "users" : `${label.toLowerCase()} users`} found.`
                  }
                />
              </TabsContent>
            );
          })}
        </Tabs>
      )}

      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Page {meta.page} of {meta.totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={meta.page <= 1}
              onClick={() => setPage((current) => current - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={meta.page >= meta.totalPages}
              onClick={() => setPage((current) => current + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
