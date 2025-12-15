"use client";

import React, { useState, useEffect } from "react";
import { useFetchQuestions } from "../_hooks/use-fetch-questions";
import QuestionHeader from "./questions-header";
import QuestionProgress from "./questions-progress";
import QuestionCard from "./questions-card";
import NavigationButtons from "./navigation-buttons";
import { useSubmitAnswers } from "../_hooks/use-submit-answers";
import Results from "./results";

type QuestionQuizProps = {
  examId: string;
  duration: number; // in minutes
};

export default function Questions({ examId, duration }: QuestionQuizProps) {
  const { data, isLoading, isError, refetch } = useFetchQuestions(examId);
  const questions = data?.questions || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration * 60); // seconds
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const {
    mutate: submitAnswers,
    isPending: isSubmitting,
    data: results,
  } = useSubmitAnswers();

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    refetch();
  }, [examId, refetch]);

  if (isLoading) return <p>Loading questions...</p>;
  if (isError) return <p>Failed to load questions</p>;
  if (questions.length === 0) return <p>No questions available</p>;

  const question = questions[currentIndex];

  const handleAnswerSelect = (key: string) => {
    setAnswers((prev) => ({
      ...prev,
      [question._id]: key,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSubmit = () => {
    const payload = {
      answers: Object.entries(answers).map(([questionId, correct]) => ({
        questionId,
        correct,
      })),
      time: duration * 60 - timeLeft,
    };

    submitAnswers(payload, {
      onSuccess: () => setShowResults(true),
    });
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setTimeLeft(duration * 60);
    setAnswers({});
    setShowResults(false);
  };

  // Progress calculations
  const questionProgress = ((currentIndex + 1) / questions.length) * 100;
  const timerProgress = (timeLeft / (duration * 60)) * 100;

  return (
    <div className="p-6 w-full mx-auto  bg-white">
      <QuestionHeader
        current={currentIndex + 1}
        total={questions.length}
        exam={question.exam.title}
      />
      {showResults && results ? (
        <Results
          results={results}
          questions={questions}
          restart={handleRestart}
        />
      ) : (
        <>
          <QuestionProgress questionProgress={questionProgress} />
          <QuestionCard
            question={question}
            selectedAnswer={answers[question._id]}
            onSelectAnswer={handleAnswerSelect}
          />
          <NavigationButtons
            onPrev={handlePrev}
            onNext={
              currentIndex === questions.length - 1 ? handleSubmit : handleNext
            }
            disablePrev={currentIndex === 0}
            disableNext={currentIndex === questions.length - 1}
            timerProgress={timerProgress}
            formatTime={formatTime}
            timeLeft={timeLeft}
            isLast={currentIndex === questions.length - 1}
            isSubmitting={isSubmitting}
          />
        </>
      )}
    </div>
  );
}
