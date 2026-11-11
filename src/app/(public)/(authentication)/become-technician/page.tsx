import Image from "next/image";
import Link from "next/link";
import BecomeTechnicianForm from "@/components/form/become-technician-form";
import Logo from "@/components/Logo";

export default function BecomeTechnicianPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-3">
      <div className="flex flex-col gap-4 p-6 md:p-10 lg:col-span-2">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <Logo />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-2xl">
            <BecomeTechnicianForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block lg:col-span-1">
        <Image
          src="/FSM-Login.webp"
          alt="Avoid_Image"
          className="object-cover"
          fill
        />
      </div>
    </div>
  );
}
