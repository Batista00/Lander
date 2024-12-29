"use client";

import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Store,
  Users,
  BarChart,
  Settings,
  Megaphone,
  Plus,
  List
} from "lucide-react";

const mainNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Landing Pages",
    href: "/dashboard/landing-pages",
    icon: Store,
    children: [
      {
        title: "Todas las Landing Pages",
        href: "/dashboard/landing-pages",
        icon: List,
      },
      {
        title: "Crear Landing Page",
        href: "/dashboard/landing-pages/editor/new",
        icon: Plus,
      }
    ]
  },
  {
    title: "Leads",
    href: "/dashboard/leads",
    icon: Users,
    children: [
      {
        title: "Todos los Leads",
        href: "/dashboard/leads/all",
        icon: Users,
      },
      {
        title: "Campañas",
        href: "/dashboard/leads/campaigns",
        icon: Megaphone,
      }
    ]
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart,
  },
  {
    title: "Configuración",
    href: "/dashboard/settings",
    icon: Settings,
  }
];

export function MainNav() {
  const location = useLocation();

  return (
    <nav className="flex flex-col space-y-1">
      {mainNavItems.map((item) => {
        const isActive = location.pathname === item.href || 
                        (item.children && item.children.some(child => location.pathname.startsWith(child.href)));
        
        return (
          <div key={item.href}>
            <Link
              to={item.href}
              className={cn(
                "group flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                isActive ? "bg-accent" : "transparent",
                isActive ? "text-accent-foreground" : "text-muted-foreground"
              )}
            >
              <item.icon className="mr-3 h-4 w-4" />
              <span>{item.title}</span>
              {item.children && (
                <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs">
                  {item.children.length}
                </span>
              )}
            </Link>
            
            {item.children && (
              <div className="ml-6 mt-1 space-y-1">
                {item.children.map((child) => {
                  const isChildActive = location.pathname.startsWith(child.href);
                  
                  return (
                    <Link
                      key={child.href}
                      to={child.href}
                      className={cn(
                        "group flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        isChildActive ? "bg-accent" : "transparent",
                        isChildActive ? "text-accent-foreground" : "text-muted-foreground"
                      )}
                    >
                      <child.icon className="mr-3 h-4 w-4" />
                      <span>{child.title}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
