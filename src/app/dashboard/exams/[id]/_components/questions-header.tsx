import React from "react";

type Props = {
  current: number;
  total: number;
  exam: string;
};

export default function QuestionHeader({ current, total, exam }: Props) {
  return (
    <div className="flex justify-between items-center mb-4 text-gray-500">
      <h2 className="text-xl">{exam}</h2>
      <div className="flex items-center gap-2 ">
        Question <span className="text-blue-600 font-bold">{current} </span>of{" "}
        {total}
      </div>
    </div>
  );
}
