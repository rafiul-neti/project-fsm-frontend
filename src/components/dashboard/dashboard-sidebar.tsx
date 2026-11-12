"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { adminRoutes, customerRoutes, technicianRoutes } from "@/routes";
import type { UserRole } from "@/types";
import Logo from "../Logo";

const sidebarRoutes = {
  ADMIN: adminRoutes,
  TECHNICIAN: technicianRoutes,
  CUSTOMER: customerRoutes,
};

export function DashboardSidebar({ userRole }: { userRole: UserRole }) {
  const pathname = usePathname();

  const routes = sidebarRoutes[userRole] || [];

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href={`/`}>
          <Logo />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {routes.map((item, ind) => (
          <SidebarGroup key={item.items.flatMap((i) => i.title).join(`${ind}`)}>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((i) => (
                  <SidebarMenuItem key={i.title}>
                    <SidebarMenuButton
                      render={<Link href={i.url} />}
                      isActive={pathname === i.url}
                    >
                      {i.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
