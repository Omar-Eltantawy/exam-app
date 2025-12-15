export type SubmitAnswerPayload = {
  answers: { questionId: string; correct: string }[];
  time: number;
};

export async function submitAnswersService(payload: SubmitAnswerPayload) {
  const res = await fetch("/api/questions/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to submit answers");
  }

  return res.json();
}
