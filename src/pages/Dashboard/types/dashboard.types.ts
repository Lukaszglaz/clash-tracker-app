import { type LucideIcon } from "lucide-react";

export type DashboardCategory =
  | "general"
  | "villages"
  | "community"
  | "account";

export interface DashboardNavChild {
  label: string;
  to: string;
}

export interface DashboardNavItem {
  id: string;
  label: string;
  description: string;
  to: string;
  icon: LucideIcon;
  category: DashboardCategory;
  children?: DashboardNavChild[];
}
