"use client";

import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetLoggedInUser, useLogout } from "@/hooks";

export default function Header() {
  const routes = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Services", path: "/services" },
  ];

  const { data, isLoading } = useGetLoggedInUser();
  const { mutate: logout } = useLogout();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Logged Out",
          description: "Logged out Successfully.",
          type: "success",
        });
        queryClient.removeQueries({ queryKey: ["logged-in-user"] });
      },
      onError: () => {
        toast.add({
          title: "Logout Failed",
          description: "Something Went Wrong.",
          type: "error",
        });
      },
    });
  };

  return (
    <header className="w-full h-16">
      <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
        <div className="">
          <Logo />
        </div>
        <nav className="flex gap-6">
          {routes.map((route) => (
            <Link key={route.path} href={route.path}>
              {route.name}
            </Link>
          ))}
        </nav>

        <div className="gap-1.5 flex items-center">
          {!isLoading && !data && (
            <>
              <Button
                variant="outline"
                render={<Link href="/login">Login</Link>}
                nativeButton={false}
                className={`rounded-md`}
              >
                Login
              </Button>

              <Button
                render={
                  <Link href="/become-technician">Become Technician</Link>
                }
                className={`rounded-md`}
                nativeButton={false}
              >
                Apply as Technician
              </Button>
            </>
          )}
          {!isLoading && data && (
            <Button
              onClick={handleLogout}
              variant={`destructive`}
              className={`rounded-md`}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
