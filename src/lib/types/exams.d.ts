export type Exam = {
  _id: string;
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;
  createdAt: string;
};

export type ExamsMetadata = {
  currentPage: number;
  limit: number;
  numberOfPages: number;
  nextPage?: number;
};

export type ExamsAPIResponse = {
  message?: string;
  exams: Exam[];
  metadata: ExamsMetadata;
};
