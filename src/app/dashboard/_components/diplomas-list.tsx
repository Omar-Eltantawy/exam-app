"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import { useFetchDiplomas } from "../_hooks/use-fetch-diplomas";

import DiplomaCard from "./diploma-card";
import Link from "next/link";

export default function DiplomasList() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useFetchDiplomas();

  const allDiplomas = data?.pages.flatMap((page) => page?.diplomas) || [];

  return (
    <div className="absolute top-32 left-[21%] w-[75%]  overflow-auto min-h-screen">
      <InfiniteScroll
        dataLength={allDiplomas.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<p className="text-center my-4">Loading more...</p>}
        endMessage={<p className="text-center my-4">No more diplomas!</p>}
        style={{ overflow: "visible " }}
      >
        {isLoading && <p className="text-center my-4">Loading...</p>}

        {isError && (
          <p className="text-center text-red-500">{error?.message}</p>
        )}

        <div className="grid grid-cols-3 gap-3  p-4">
          {allDiplomas.map((diploma) => (
            <Link href={"/dashboard/exams"} key={diploma._id}>
              <DiplomaCard diploma={diploma} />
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
