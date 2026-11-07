import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/form/login-form";
import Logo from "@/components/Logo";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <Logo />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
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
