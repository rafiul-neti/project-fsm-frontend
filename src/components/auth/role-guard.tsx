"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { useGetLoggedInUser } from "@/hooks";
import type { UserRole } from "@/types";
import AuthLoading from "./auth-loading";
import AccessDeined from "./access-denied";

interface IProps {
  children: ReactNode;
  roles: UserRole[];
}

export default function RoleGuard({ children, roles }: IProps) {
  const router = useRouter();

  const { data, isPending, isError } = useGetLoggedInUser();

  const user = data?.data;

  const isAuthorized = !!user && roles.includes(user.role);

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

  if (isError || !user) {
    return <AuthLoading label="Redirecting..." />;
  }

  if (isAuthorized) {
    return <>{children}</>;
  }

  return <AccessDeined />
}
