"use client";
import { CircleUserRound, Lock, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export function AccountSidebar() {
  const pathName = usePathname();

  const items = [
    {
      title: "Profile",
      url: "/dashboard/account",
      icon: CircleUserRound,
    },
    {
      title: "Change Password",
      url: "/dashboard/account/change-password",
      icon: Lock,
    },
  ];

  return (
    <Sidebar className="relative overflow-hidden h-[580px] border">
      <SidebarContent>
        <SidebarGroup className="flex flex-col flex-1">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathName === item.url;

                return (
                  <SidebarMenuItem key={item.title} className="m-2 text-2xl">
                    <SidebarMenuButton
                      asChild
                      className={`${
                        isActive
                          ? "bg-blue-50  border-blue-500"
                          : "hover:bg-blue-100 "
                      } py-5`}
                    >
                      <Link href={item.url}>
                        <item.icon
                          className={`${
                            isActive ? "text-blue-600" : "text-gray-500"
                          }`}
                        />
                        <span
                          className={`${
                            isActive ? "text-blue-600" : "text-gray-500"
                          } text-base`}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarFooter className="mt-auto ">
            <div
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="bg-red-50 text-red-500 flex items-center justify-center p-2 cursor-pointer "
            >
              <LogOut className=" rotate-180 m-1" /> Logout
            </div>
          </SidebarFooter>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
