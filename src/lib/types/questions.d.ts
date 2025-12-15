import { Exam } from "./exams";

export type Answer = {
  answer: string;
  key: string;
};

export type Question = {
  _id: string;
  question: string;
  answers: Answer[];
  type: "single_choice" | "multiple_choice";
  correct: string;
  subject: string | null;
  exam: Exam;
  createdAt: string;
};

export type QuestionsResponse = {
  message: string;
  questions: Question[];
};
