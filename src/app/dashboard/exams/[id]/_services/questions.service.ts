import { QuestionsResponse } from "@/lib/types/questions";

export async function questionsService(
  examId: string
): Promise<QuestionsResponse> {
  const response = await fetch(`/api/questions?exam=${examId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch diplomas");
  }

  return response.json();
}
