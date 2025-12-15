import { useInfiniteQuery } from "@tanstack/react-query";
import { examsService } from "../_services/exams.service";

export function useFetchExams() {
  return useInfiniteQuery({
    queryKey: ["exams"],
    queryFn: ({ pageParam = 1 }) => examsService(pageParam),

    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.metadata.currentPage + 1;
      return nextPage <= lastPage.metadata.numberOfPages ? nextPage : undefined;
    },

    initialPageParam: 1,
  });
}
