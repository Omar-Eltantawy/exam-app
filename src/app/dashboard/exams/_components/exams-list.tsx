"use client";

import React from "react";
import { useFetchExams } from "../_hooks/use-fetch-exams";
import InfiniteScroll from "react-infinite-scroll-component";
import ExamCard from "./exam-card";

export default function ExamsList() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useFetchExams();

  const allExams = data?.pages.flatMap((page) => page?.exams) || [];

  return (
    <div className="absolute top-32 left-[21%] w-[75%] h-[calc(100vh-7rem)] overflow-y-auto">
      <InfiniteScroll
        dataLength={allExams.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<p className="text-center my-4">Loading more...</p>}
        endMessage={<p className="text-center my-4">End of list</p>}
        style={{ overflow: "visible " }}
      >
        {isLoading && <p className="text-center my-4">Loading...</p>}

        {isError && (
          <p className="text-center text-red-500">{error?.message}</p>
        )}

        <div className="p-4 flex flex-col gap-3">
          {allExams.map((exam) => (
            <ExamCard exam={exam} key={exam._id} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
