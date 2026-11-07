import Link from "next/link";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

export default function Header() {
  const routes = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

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

        <div className="gap-4 flex items-center">
          <Button
            variant="outline"
            render={<Link href="/login">Login</Link>}
            nativeButton={false}
          >
            Login
          </Button>

          <Button className={`rounded-md`}>Apply as Technician</Button>
        </div>
      </div>
    </header>
  );
}
