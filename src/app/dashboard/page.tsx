import React from "react";
import DashboardHeader from "./_components/dashboard-header";
import DiplomasList from "./_components/diplomas-list";
import { GraduationCap } from "lucide-react";
export default function page() {
  return (
    <div className="w-full flex flex-col min-h-screen ">
      <DashboardHeader title="Diplomas" icon={<GraduationCap size={60} />} />

      <div className="flex-1 ">
        <DiplomasList />{" "}
      </div>
    </div>
  );
}
