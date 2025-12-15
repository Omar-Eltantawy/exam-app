import React from "react";
import { AccountSidebar } from "./_components/account-sidbar";
import DashboardHeader from "../_components/dashboard-header";
import { User } from "lucide-react";

export default function SidbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-col min-h-screen  overflow-hidden">
      <DashboardHeader title="Account Settings" icon={<User size={60} />} />
      <div className="flex-1 absolute top-36 left-[21%] w-[75%]   flex gap-2 overflow-hidden">
        <AccountSidebar />
        {children}
      </div>
    </div>
  );
}
