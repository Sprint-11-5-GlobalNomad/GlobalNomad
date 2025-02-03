"use client";

import { useState } from "react";
import { useActivities } from "@/app/react-query/activity-state";
import SearchForm from "./search-form";
import PopularActivitiesSection from "../popular-activities/popular-activities-section";
import AllActivitiesSection from "../all-activities/all-activities-section";
import Pagination from "@/components/common/ui/pagination";
import AllActivities from "../all-activities/all-activities";
import { LoadingIndicator } from "@/components/common/layout/indicator/loading-indicator";
import { ErrorIndicator } from "@/components/common/layout/indicator/error-indicator";
import { EmptyActivity } from "@/components/common/layout/profile/empty-activity";
import { useDebounce } from "use-debounce";

const isLastCharHasBatchim = (text: string): boolean => {
  if (!text) return false;
  const lastChar = text[text.length - 1];
  const unicode = lastChar.charCodeAt(0);
  return (unicode - 44032) % 28 !== 0; // 받침이 있으면 true
};

export default function ActivityExplorer() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce(searchQuery, 500);
  const [page, setPage] = useState(1);
  const size = 16;

  const { data, isLoading, isError } = useActivities({
    method: "offset",
    page,
    size,
    keyword: debouncedQuery,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const activities = data?.activities ?? [];

  const totalPages = Math.ceil((data?.totalCount || 0) / size);

  const suffix = isLastCharHasBatchim(searchQuery) ? "으로 " : "로 ";

  return (
    <>
      <SearchForm
        onSubmit={handleSearchSubmit}
        onChange={handleSearchChange}
        value={searchQuery}
      />

      {searchQuery ? (
        <div className="flex flex-col gap-[2.4rem] mt-[15.8rem] w-[120rem]">
          <div className="flex flex-col gap-[1.2rem]">
            <h2 className="text-[3.2rem] leading-[3.8rem] font-regular">
              <span className="text-[3.2rem] leading-[3.8rem] font-bold">
                {searchQuery}
              </span>
              {searchQuery && `${suffix} 검색한 결과입니다.`}
            </h2>
            <h3 className="text-lg">
              총 {activities.length ?? 0}
              개의 결과
            </h3>
          </div>

          {isLoading && <LoadingIndicator width={80} height={80} />}
          {isError && <ErrorIndicator width={80} height={80} />}

          {activities.length > 0 ? (
            <>
              <AllActivities activities={activities} />
              <div className="flex gap-[1rem] justify-center">
                <Pagination
                  totalPages={totalPages}
                  currentPage={page}
                  setPage={setPage}
                />
              </div>
            </>
          ) : (
            !isLoading &&
            !isError && (
              <div className="m-[20rem]">
                <EmptyActivity />
              </div>
            )
          )}
        </div>
      ) : (
        <>
          <PopularActivitiesSection />
          <AllActivitiesSection />
        </>
      )}
    </>
  );
}
