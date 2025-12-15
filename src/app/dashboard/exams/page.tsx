import React from "react";
import DashboardHeader from "../_components/dashboard-header";
import { BookOpenCheck } from "lucide-react";
import ExamsList from "./_components/exams-list";

export default function page() {
  return (
    <div className="w-full flex flex-col min-h-screen ">
      <DashboardHeader title="Exams" icon={<BookOpenCheck size={50} />} />

      <div className="flex-1 ">
        <ExamsList />{" "}
      </div>
    </div>
  );
}
