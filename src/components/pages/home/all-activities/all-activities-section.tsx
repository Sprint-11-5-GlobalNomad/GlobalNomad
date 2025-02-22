"use client";

import Pagination from "@/components/common/ui/pagination";
import AllActivities from "./all-activities";
import AllActivitiesTitle from "./all-activities-title";
import CategoryPriceFilter from "./category-price-filter";
import { useActivities } from "@/app/react-query/activity-state";
import { useEffect, useState } from "react";
import { ErrorIndicator } from "@/components/common/layout/indicator/error-indicator";
import { CategoryType, SortType } from "@/app/types/activity-schemas";
import { EmptyContent } from "@/components/common/layout/profile/empty-content";
import AllActivitiesSkeletonSection from "./all-activites-skeleton-section";

export default function AllActivitiesSection() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<CategoryType | undefined>(undefined);
  const [sort, setSort] = useState<SortType>(undefined);
  const [size, setSize] = useState(4);

  // const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const { data, isLoading, isError } = useActivities({
    method: "offset",
    page,
    size,
    sort: sort || "latest",
    category,
  });

  const totalPages = Math.ceil((data?.totalCount || 0) / size);

  const handleFilterChange = (
    category: CategoryType | undefined,
    sort: SortType
  ) => {
    setCategory(category);
    setSort(sort);
    setPage(1);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setSize(8); // 화면이 넓으면 8개
      } else if (window.innerWidth < 744) {
        setSize(4); // 화면이 좁으면 4개
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
    <>
      <CategoryPriceFilter onFilterChange={handleFilterChange} />

      <AllActivitiesTitle category={category} />
      {isLoading ? (
        <AllActivitiesSkeletonSection />
      ) : isError ? (
        <ErrorIndicator width={80} height={80} />
      ) : (data?.activities?.length ?? 0 > 0) ? (
        <AllActivities activities={data?.activities || []} />
      ) : (
        <div className="m-[10rem]">
          <EmptyContent />
        </div>
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={page}
        setPage={setPage}
      />
    </>
  );
}
