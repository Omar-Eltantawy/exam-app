"use client";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { GraduationCap, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarItem() {
  const pathName = usePathname();

  const items = [
    {
      title: "Diplomas",
      url: "/dashboard",
      icon: GraduationCap,
      isActive: pathName === "/dashboard",
    },
    {
      title: "Account Setting",
      url: "/dashboard/account",
      icon: User,
      isActive: pathName.startsWith("/dashboard/account"),
    },
  ];

  return (
    <>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            className={`p-5 rounded-none transition-all ${
              item.isActive
                ? "bg-blue-100 border border-blue-500"
                : "hover:bg-blue-100 hover:border hover:border-blue-500"
            }`}
          >
            <Link className="flex items-center gap-2" href={item.url}>
              <item.icon
                className={item.isActive ? "text-blue-600" : "text-gray-500"}
              />
              <span
                className={item.isActive ? "text-blue-700" : "text-gray-500"}
              >
                {item.title}
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
}
