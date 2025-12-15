"use client";
import DashboardHeader from "@/app/dashboard/_components/dashboard-header";
import { CircleQuestionMark } from "lucide-react";
import React from "react";
import { useFetchQuestions } from "../_hooks/use-fetch-questions";

type HeaderProps = {
  examId: string;
};

export default function QuizHeader({ examId }: HeaderProps) {
  const { data } = useFetchQuestions(examId);
  const title = data?.questions[0]?.exam?.title || "";
  return (
    <div>
      <DashboardHeader
        title={title}
        parentTitle="Exams"
        parentPath="/dashboard/exams"
        icon={<CircleQuestionMark size={60} />}
      />
    </div>
  );
}
