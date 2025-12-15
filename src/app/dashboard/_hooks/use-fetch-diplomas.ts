"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { diplomasService } from "../_services/diplomas.service";

export function useFetchDiplomas() {
  return useInfiniteQuery({
    queryKey: ["sublects"],
    queryFn: ({ pageParam = 1 }) => diplomasService(pageParam, 2),

    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.metadata.currentPage + 1;
      return nextPage <= lastPage.metadata.numberOfPages ? nextPage : undefined;
    },

    initialPageParam: 1,
  });
}
