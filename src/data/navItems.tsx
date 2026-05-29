import { Home, Pill, AlertTriangle, Users } from "lucide-react";

export const navItems = [
  {
    to: "/",
    label: "Home",
    icon: Home,
    exact: true,
  },
  {
    to: "/stock",
    label: "Stock",
    icon: Pill,
    exact: false,
  },
  {
    to: "/alert",
    label: "Alerts",
    icon: AlertTriangle,
    exact: false,
    badge: true,
  },
  {
    to: "/patients",
    label: "Patients",
    icon: Users,
    exact: false,
  },
];
