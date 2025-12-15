import { DiplomasAPIResponse } from "@/lib/types/diplomas";

export async function diplomasService(
  page: number = 1,
  limit: number = 5
): Promise<DiplomasAPIResponse> {
  const response = await fetch(`/api/diplomas?page=${page}&limit=${limit}`, {
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
