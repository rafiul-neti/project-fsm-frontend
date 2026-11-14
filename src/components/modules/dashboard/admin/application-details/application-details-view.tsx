import {
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import type { ElementType } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import type {
  TechnicianApplicationDetails,
  TechnicianApplicationStatus,
} from "@/types";

interface ApplicationDetailsViewProps {
  application: TechnicianApplicationDetails;
  onStatusChange: (
    changedStatus: TechnicianApplicationStatus,
    technicianId: string,
  ) => void;
  statusChanging: boolean;
}

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-lg bg-muted p-2">
        <Icon className="size-4 text-muted-foreground" />
      </div>

      <div className="min-w-0 space-y-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="wrap-break-word text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

function ApplicantOverview({
  application,
}: {
  application: TechnicianApplicationDetails;
}) {
  const { user } = application;

  return (
    <Card>
      <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
        <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-xl font-bold text-primary">
          {user.profileImage ? (
            <img
              src={user?.profileImage}
              alt={user?.name}
              className="size-full object-cover"
            />
          ) : (
            user.name?.slice(0, 1).toUpperCase()
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-1">
          <h2 className="text-xl font-semibold">{user?.name}</h2>

          <p className="break-all text-sm text-muted-foreground">
            {user?.email}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="secondary">Technician</Badge>

            {user.isEmailVerified ? (
              <Badge variant="outline" className="gap-1 text-green-700">
                <BadgeCheck className="size-3.5" />
                Email verified
              </Badge>
            ) : (
              <Badge variant="destructive">Email not verified</Badge>
            )}

            {user.isBlocked && <Badge variant="destructive">Blocked</Badge>}
          </div>
        </div>

        <div className="text-sm text-muted-foreground sm:text-right">
          <p>Applied on</p>
          <p className="font-medium text-foreground">
            {formatDate(application.createdAt)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function ApplicantInformation({
  user,
}: {
  user: TechnicianApplicationDetails["user"];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="size-5" />
          Applicant Information
        </CardTitle>
        <CardDescription>Personal and contact information.</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-5 sm:grid-cols-2">
        <DetailItem icon={User} label="Full Name" value={user?.name} />

        <DetailItem icon={Mail} label="Email Address" value={user?.email} />

        <DetailItem
          icon={Phone}
          label="Contact Number"
          value={user.contactNumber}
        />

        <DetailItem
          icon={MapPin}
          label="Address"
          value={user.address || "Not provided"}
        />
      </CardContent>
    </Card>
  );
}

function ProfessionalInformation({
  application,
}: {
  application: TechnicianApplicationDetails;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BriefcaseBusiness className="size-5" />
          Professional Information
        </CardTitle>
        <CardDescription>Experience and service details.</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-5 sm:grid-cols-2">
        <DetailItem
          icon={BriefcaseBusiness}
          label="Experience"
          value={`${application.yearsOfExperience} ${
            application.yearsOfExperience === 1 ? "year" : "years"
          }`}
        />

        <DetailItem
          icon={MapPin}
          label="Service Area"
          value={application.serviceArea}
        />

        <DetailItem
          icon={ShieldCheck}
          label="Availability"
          value={application.availabilityStatus}
        />

        <DetailItem
          icon={CalendarDays}
          label="Application Date"
          value={formatDate(application.createdAt)}
        />
      </CardContent>
    </Card>
  );
}

function ApplicantSkills({
  skills,
}: {
  skills: TechnicianApplicationDetails["skills"];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills & Categories</CardTitle>
        <CardDescription>
          Services the technician is qualified to provide.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge
                key={`${skill.category?.name}-${index}`}
                variant="outline"
                className="px-3 py-1.5 border border-primary rounded-full"
              >
                {skill.category?.name}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No skills or categories provided.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function LicenseDocument({ licenseURL }: { licenseURL: string | null }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="size-5" />
          License Document
        </CardTitle>
        <CardDescription>
          Review the document submitted by the applicant.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {licenseURL ? (
          <>
            <div className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-muted p-3">
                  <FileText className="size-6 text-muted-foreground" />
                </div>

                <div>
                  <p className="font-medium">Technician License</p>
                  <p className="text-xs text-muted-foreground">
                    Uploaded document
                  </p>
                </div>
              </div>

              <Button
                size="sm"
                variant="outline"
                render={
                  <Link
                    href={licenseURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 size-4" />
                    Open Document
                  </Link>
                }
                nativeButton={false}
              />
            </div>

            <div className="overflow-hidden rounded-lg border bg-muted/20">
              <iframe
                src={licenseURL}
                title="Technician license document preview"
                className="h-125 w-full"
              />
            </div>

            <p className="text-xs text-muted-foreground">
              If the document cannot be previewed here, use the Open Document
              button.
            </p>
          </>
        ) : (
          <p className="text-sm text-destructive">
            No license document was submitted.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function ApplicationActions({
  status,
  technicianId,
  onStatusChange,
  statusChanging,
}: {
  status: TechnicianApplicationDetails["applicationStatus"];
  technicianId: string;
  onStatusChange: (
    changedStatus: TechnicianApplicationStatus,
    technicianId: string,
  ) => void;
  statusChanging: boolean;
}) {
  if (status !== "PENDING") return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Decision</CardTitle>
        <CardDescription>
          Approve this application if the submitted information and documents
          meet your requirements. Otherwise, reject it.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Separator className="mb-5" />

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          {statusChanging ? (
            <Button disabled={statusChanging} className={`w-full`}>
              <Spinner />
            </Button>
          ) : (
            <>
              <Button
                disabled={statusChanging}
                variant="destructive"
                onClick={() => onStatusChange("REJECTED", technicianId)}
              >
                <XCircle className="mr-2 size-4" />
                Reject Application
              </Button>

              <Button
                disabled={statusChanging}
                onClick={() => onStatusChange("APPROVED", technicianId)}
              >
                <CheckCircle2 className="mr-2 size-4" />
                Approve Application
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ApplicationDetailsView({
  application,
  onStatusChange,
  statusChanging,
}: ApplicationDetailsViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Applicant Overview</h2>

        <Badge
          variant="outline"
          className="gap-1.5 border-yellow-300 bg-yellow-50 text-yellow-800"
        >
          <Clock className="size-3.5" />
          {application.applicationStatus}
        </Badge>
      </div>

      <ApplicantOverview application={application} />

      <div className="grid gap-6 lg:grid-cols-2">
        <ApplicantInformation user={application.user} />

        <ProfessionalInformation application={application} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About the Technician</CardTitle>
          <CardDescription>
            The applicant's professional introduction.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
            {application.bio || "No biography provided."}
          </p>
        </CardContent>
      </Card>

      <ApplicantSkills skills={application.skills} />

      <LicenseDocument licenseURL={application.licenseURL} />

      <ApplicationActions
        status={application.applicationStatus}
        technicianId={application.id}
        onStatusChange={onStatusChange}
        statusChanging={statusChanging}
      />
    </div>
  );
}
