"use client";

import { Button } from "@/components/ui/button";
import { ChartPieDonut } from "@/components/ui/chart-pie-donut";
import { Question } from "@/lib/types/questions";
import { FolderSearch, RotateCcw } from "lucide-react";
import Link from "next/link";
import React from "react";

type ResultItem = {
  QID: string;
  Question: string;
  inCorrectAnswer?: string; // undefined if not answered
  correctAnswer: string;
  answers: Record<string, string>; // key => answer text
};

type ResultsProps = {
  results: {
    message: string;
    correct: number;
    wrong: number;
    total: string;
    WrongQuestions: ResultItem[];
    correctQuestions: ResultItem[];
  };
  questions: Question[];
  restart: () => void;
};

export default function Results({ results, questions, restart }: ResultsProps) {
  const total = questions?.length;

  const allQuestions = questions.map((q) => {
    const answered =
      results.correctQuestions.find((r) => r.QID === q._id) ||
      results.WrongQuestions.find((r) => r.QID === q._id);

    const userAnswer = answered?.inCorrectAnswer ?? undefined;

    return {
      QID: q._id,
      Question: q.question,
      correctAnswer: q.correct,
      userAnswer,
      answers: q.answers.reduce((acc, ans) => {
        acc[ans.key] = ans.answer;
        return acc;
      }, {} as Record<string, string>),
    };
  });

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Results</h2>
      <div className="flex justify-between items-center   gap-1">
        <ChartPieDonut correct={results.correct} total={total} />

        <div className="mt-6 space-y-1 w-3/4 h-[500px] overflow-y-auto pr-2 shadow-md ">
          {allQuestions.map((q) => {
            const isCorrect = q.userAnswer === q.correctAnswer;
            const answersToShow = isCorrect
              ? [q.correctAnswer] // only correct answer
              : [q.userAnswer, q.correctAnswer].filter(Boolean); // user + correct

            return (
              <div key={q.QID} className="p-4 ">
                <p className="text-md font-bold mb-2 text-blue-700">
                  {q.Question}
                </p>

                <div className="space-y-2">
                  {answersToShow.map((key) => {
                    const isUserAnswer = key === q.userAnswer;
                    const isCorrectAnswer = key === q.correctAnswer;

                    return (
                      <label
                        key={key}
                        className={`flex items-center p-2 rounded cursor-pointer ${
                          isCorrectAnswer
                            ? "bg-emerald-50"
                            : isUserAnswer
                            ? "bg-red-50"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name={q.QID}
                          value={key}
                          checked
                          disabled
                          className="mr-2"
                        />
                        <span className="text-gray-800">
                          {q.answers[key as string]}
                          {isCorrectAnswer && " (Correct)"}
                          {isUserAnswer && !isCorrectAnswer && " (Your choice)"}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex gap-10 my-6">
        <Button variant={"secondary"} onClick={restart} className="w-1/2 h-12">
          <RotateCcw /> Restart
        </Button>
        <Button className="w-1/2 h-12">
          <FolderSearch /> <Link href={"/dashboard/exams"}>Explore</Link>
        </Button>
      </div>
    </>
  );
}
