"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { useGetLoggedInUser } from "@/hooks";
import AuthLoading from "./auth-loading";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();

  const { data, isPending, isError } = useGetLoggedInUser();

  const user = data?.data;

  useEffect(() => {
    if (isPending) {
      return;
    }

    if (isError || !user) {
      router.replace("/login");
    }
  }, [isError, isPending, user, router]);

  if (isPending) {
    return <AuthLoading />;
  }

  if(isError || !user) {
    return <AuthLoading label="Redirecting..." />
  } 

  return <>{children}</>;
}
