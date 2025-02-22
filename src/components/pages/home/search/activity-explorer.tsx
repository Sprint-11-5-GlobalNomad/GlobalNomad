"use client";

import { useEffect, useState } from "react";
import { useActivities } from "@/app/react-query/activity-state";
import SearchForm from "./search-form";
import PopularActivitiesSection from "../popular-activities/popular-activities-section";
import AllActivitiesSection from "../all-activities/all-activities-section";
import Pagination from "@/components/common/ui/pagination";
import AllActivities from "../all-activities/all-activities";
import { ErrorIndicator } from "@/components/common/layout/indicator/error-indicator";
import { EmptyContent } from "@/components/common/layout/profile/empty-content";
import AllActivitiesSkeletonSection from "../all-activities/all-activites-skeleton-section";

const isLastCharHasBatchim = (text: string): boolean => {
  if (!text) return false;
  const lastChar = text[text.length - 1];
  const unicode = lastChar.charCodeAt(0);
  return (unicode - 44032) % 28 !== 0;
};

const CONFIG = {
  SUFFIX_WITH_BATCHIM: "으로 ",
  SUFFIX_WITHOUT_BATCHIM: "로 ",
};

export default function ActivityExplorer() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [submittedQuery, setSubmittedQuery] = useState<string>("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(0);

  const { data, isLoading, isError } = useActivities({
    method: "offset",
    page,
    size: size,
    ...(submittedQuery && { keyword: submittedQuery }),
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedQuery(searchQuery);
    setPage(1);
  };

  const activities = data?.activities ?? [];

  const totalPages = Math.ceil((data?.totalCount || 0) / size);

  const suffix = isLastCharHasBatchim(submittedQuery)
    ? CONFIG.SUFFIX_WITH_BATCHIM
    : CONFIG.SUFFIX_WITHOUT_BATCHIM;

  useEffect(() => {
    if (searchQuery === "") {
      setSubmittedQuery("");
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setSize(16); // 화면이 넓으면 8개
      } else if (window.innerWidth < 744) {
        setSize(8); // 화면이 좁으면 4개
      } else {
        setSize(9); // 중간 화면 크기에는 6개
      }
    };
    handleResize(); // 처음 로드 시 size 설정
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex-column desktop:w-[120rem]">
      <SearchForm
        onSubmit={handleSearchSubmit}
        onChange={handleSearchChange}
        value={searchQuery}
      />

      {submittedQuery ? (
        <div
          className="flex flex-col gap-[2.4rem] mt-[15.8rem] w-[120rem]
        tablet:w-[69.6rem] mobile:w-[34.3rem] mobile:mt-[9.3rem]"
        >
          <div className="flex flex-col gap-[1.2rem]">
            <h2 className="text-[3.2rem] leading-[3.8rem] font-regular">
              <span className="text-[3.2rem] leading-[3.8rem] font-bold">
                {submittedQuery}
              </span>
              {submittedQuery && `${suffix} 검색한 결과입니다.`}
            </h2>
            <h3 className="text-lg">
              총 {activities.length ?? 0}
              개의 결과
            </h3>
          </div>

          {isLoading && <AllActivitiesSkeletonSection />}
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
                <EmptyContent />
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
    </div>
  );
}
