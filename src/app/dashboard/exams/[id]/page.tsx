import React from "react";
import Questions from "./_components/questions";
import QuizHeader from "./_components/quiz-header";

type parmasType = {
  params: {
    id: string;
  };
};

export default function page({ params }: parmasType) {
  const examId = params.id;
  const duration = 20;
  return (
    <div className="w-full flex flex-col min-h-screen ">
      <QuizHeader examId={examId} />

      <div className="flex-1 absolute top-32 left-[21%] w-[75%]  overflow-auto min-h-screen">
        <Questions examId={examId} duration={duration} />
      </div>
    </div>
  );
}
