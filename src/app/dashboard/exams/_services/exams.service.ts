import { ExamsAPIResponse } from "@/lib/types/exams";

export async function examsService(
  page: number = 1,
  limit: number = 1
): Promise<ExamsAPIResponse> {
  const response = await fetch(`/api/exams?page=${page}&limit=${limit}`, {
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
