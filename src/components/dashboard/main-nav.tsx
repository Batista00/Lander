"use client";

import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  Store,
  ShoppingCart,
  Settings,
  Package
} from "lucide-react";

const mainNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Marketplace",
    href: "/dashboard/marketplace",
    icon: ShoppingBag,
    children: [
      {
        title: "Explorar",
        href: "/dashboard/marketplace",
        icon: Store,
      },
      {
        title: "Mis Compras",
        href: "/dashboard/marketplace/my-purchases",
        icon: ShoppingCart,
      },
      {
        title: "Favoritos",
        href: "/dashboard/marketplace/favorites",
        icon: Heart,
      },
      {
        title: "Mis Productos",
        href: "/dashboard/marketplace/my-products",
        icon: Package,
      },
      {
        title: "Vender",
        href: "/dashboard/marketplace/my-products/new",
        icon: Store,
      }
    ]
  }
];

export function MainNav() {
  const location = useLocation();

  return (
    <nav className="flex flex-col space-y-1">
      {mainNavItems.map((item) => {
        const isActive = location.pathname === item.href;
        
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
                  const isChildActive = location.pathname === child.href;
                  
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
