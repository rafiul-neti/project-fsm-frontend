import { Suspense } from "react";
import VerifyOtpForm from "@/components/form/verify-otp-form";

// Static page: the email is read on the client inside VerifyOtpForm.
// useSearchParams needs a Suspense boundary so the page can be prerendered.
export default function VerifyTechnicianEmailPage() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-muted/30 px-4 py-10">
      <Suspense fallback={null}>
        <VerifyOtpForm verifying="technician" />
      </Suspense>
    </div>
  );
}
