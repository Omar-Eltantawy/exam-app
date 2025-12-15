import { useQuery } from "@tanstack/react-query";
import { questionsService } from "../_services/questions.service";

export function useFetchQuestions(examId: string) {
  return useQuery({
    queryKey: ["questions"],
    queryFn: () => questionsService(examId),
    enabled: !!examId,
  });
}
