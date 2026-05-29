import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Users, Pill, FlaskConical, ShoppingCart, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

const items = [
  { title: "Dashboard", url: "/app", icon: LayoutDashboard },
  { title: "Patients", url: "/app/patients", icon: Users },
  { title: "Medicines", url: "/app/medicines", icon: Pill },
  { title: "Dispensing", url: "/app/sales", icon: ShoppingCart },
  { title: "Lab Tests", url: "/app/lab", icon: FlaskConical },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const { user, roles, signOut } = useAuth();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 text-white font-bold">
            <Pill/>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Rx-assist</span>
            <span className="text-xs text-muted-foreground">Pharmacy System</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active =
                  item.url === "/app" ? pathname === "/app" : pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={active}>
                      <Link to={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-2 py-2 text-xs text-muted-foreground truncate">
          <div className="font-medium text-foreground truncate">{user?.email}</div>
          <div className="capitalize">{roles[0] ?? "staff"}</div>
        </div>
        <Button variant="destructive" size="sm" onClick={signOut} className="justify-start ">
          <LogOut className="h-4 w-4 mr-2" /> Sign out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
