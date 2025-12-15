"use client";

import React from "react";
import { Input } from "@/components/ui/input";

type Answer = {
  answer: string;
  key: string;
};

type Props = {
  question: { _id: string; question: string; answers: Answer[] };
  selectedAnswer?: string;
  onSelectAnswer: (key: string) => void;
};

export default function QuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
}: Props) {
  return (
    <div>
      <p className="mb-4 text-gray-800">{question.question}</p>
      <div className="flex flex-col gap-3">
        {question.answers.map((ans) => (
          <label
            key={ans.key}
            className={`flex items-center gap-3 p-3  cursor-pointer bg-gray-100 hover:bg-gray-50 transition `}
          >
            <Input
              type="radio"
              name={question._id}
              value={ans.key}
              checked={selectedAnswer === ans.key}
              onChange={() => onSelectAnswer(ans.key)}
              className="w-4 h-4 accent-blue-500 hover:bg-gray-50"
            />
            <span>{ans.answer}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
