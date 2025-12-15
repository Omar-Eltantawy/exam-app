import { useMutation } from "@tanstack/react-query";
import {
  SubmitAnswerPayload,
  submitAnswersService,
} from "../_services/submit-answers.service";

export function useSubmitAnswers() {
  return useMutation({
    mutationFn: (payload: SubmitAnswerPayload) => submitAnswersService(payload),
    onSuccess: (data) => {
      console.log("Results submitted!", data);
    },
    onError: (error) => {
      console.error("Submission failed:", error.message);
    },
  });
}
