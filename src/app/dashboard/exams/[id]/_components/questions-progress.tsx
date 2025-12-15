import React from "react";

type Props = {
  questionProgress: number;
};

export default function QuestionProgress({ questionProgress }: Props) {
  return (
    <div className="mb-4">
      <div className="h-4 w-full bg-gray-200   mb-1">
        <div
          className="h-4 bg-blue-600  transition-all"
          style={{ width: `${questionProgress}%` }}
        />
      </div>
    </div>
  );
}
