import Link from "next/link";
import { Logo } from "@/components/Logo";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Apply as Technician", href: "/become-technician" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "All services", href: "/services" },
      { label: "Technicians", href: "/technicians" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
      { label: "Refunds", href: "/refunds" },
    ],
  },
];

const linkClass =
  "text-sm text-slate-400 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="mx-auto w-full max-w-360 px-6 pb-10 pt-16 md:px-10 lg:px-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,340px)_repeat(3,auto)] lg:justify-between lg:gap-20">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              aria-label="Fieldly home"
              className="flex w-fit items-center gap-2.5"
            >
              <Logo size={32} variant="mark" />
              <span className="font-heading text-xl font-extrabold tracking-tight text-white">
                Fieldly
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-6">
              Trusted home and field services, booked in minutes and delivered
              by verified technicians.
            </p>
          </div>

          {columns.map((col) => (
            <nav
              key={col.title}
              aria-label={col.title}
              className="flex flex-col gap-3"
            >
              <h2 className="text-sm font-medium text-white">{col.title}</h2>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Fieldly. All rights reserved.</p>
          <p>Made for reliable field service</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;