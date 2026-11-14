"use client";

import { Clock, Search, Users } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTechnicianApplications } from "@/hooks";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

export default function TechnicianApplications() {
  const [search, setSearch] = useState("");

  // Connect your actual API hook here.
  const { data, isLoading, isError, error } = useGetTechnicianApplications();

  const applications = data?.data ?? [];

  const filteredApplications = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    if (!searchTerm) return applications;

    return applications.filter((application) =>
      [
        application.name,
        application.email,
        application.contactNumber,
        application.serviceArea,
      ].some((value) => value.toLowerCase().includes(searchTerm)),
    );
  }, [applications, search]);

  const totalApplications = applications.length;

  const statistics = [
    {
      title: "Pending Applications",
      value: totalApplications,
      icon: Clock,
      iconClass: "text-yellow-600",
    },
  ];

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Technician Applications
        </h1>
        <p className="text-sm text-muted-foreground">
          Review and manage technician registration applications.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <Icon className={`size-5 ${stat.iconClass}`} />
              </div>

              <p className="mt-3 text-3xl font-bold tabular-nums">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Applications table */}
      <div className="rounded-xl border bg-card">
        <div className="flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">All Applications</h2>
            <p className="text-sm text-muted-foreground">
              {totalApplications} applications found
            </p>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search applicants..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4 p-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={`skeleton`.split("").join(`${index}`)}
                className="h-12 animate-pulse rounded-md bg-muted"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="p-10 text-center">
            <p className="font-medium text-destructive">
              Failed to load applications.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {error instanceof Error
                ? error.message
                : "Something went wrong. Please try again."}
            </p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="p-10 text-center">
            <Users className="mx-auto mb-3 size-10 text-muted-foreground" />
            <p className="font-medium">
              {search
                ? "No matching applications found."
                : "No technician applications yet."}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {search
                ? "Try searching with another name, email, or service area."
                : "New technician applications will appear here."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>
                A list of technician registration applications.
              </TableCaption>

              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Service Area</TableHead>
                  <TableHead>Applied On</TableHead>

                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="min-w-50">
                      <p className="font-medium">{application.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {application.email}
                      </p>
                    </TableCell>

                    <TableCell className="whitespace-nowrap">
                      {application.contactNumber}
                    </TableCell>

                    <TableCell className="whitespace-nowrap">
                      {application.yearsOfExperience}{" "}
                      {application.yearsOfExperience === 1 ? "year" : "years"}
                    </TableCell>

                    <TableCell className="whitespace-nowrap">
                      {application.serviceArea}
                    </TableCell>

                    <TableCell className="whitespace-nowrap">
                      {formatDate(application.createdAt)}
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        className={`rounded-md`}
                        render={
                          <Link
                            href={`/admin/applications/details?technicianId=${application.technicianProfileId}`}
                          />
                        }
                        nativeButton={false}
                      >
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
