"use client";

import Pagination from "@/components/common/ui/pagination";
import AllActivities from "./all-activities";
import AllActivitiesTitle from "./all-activities-title";
import CategoryPriceFilter from "./category-price-filter";
import { useActivities } from "@/app/react-query/activity-state";
import { useState } from "react";
import { LoadingIndicator } from "@/components/common/layout/indicator/loading-indicator";
import { ErrorIndicator } from "@/components/common/layout/indicator/error-indicator";
import { CategoryType, SortType } from "@/app/types/activity-schemas";
import { EmptyContent } from "@/components/common/layout/profile/empty-content";

const SIZE = 8;

export default function AllActivitiesSection() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<CategoryType | undefined>(undefined);
  const [sort, setSort] = useState<SortType>(undefined);

  const { data, isLoading, isError } = useActivities({
    method: "offset",
    page,
    size: SIZE,
    sort: sort || "latest",
    category,
  });

  const totalPages = Math.ceil((data?.totalCount || 0) / SIZE);

  const handleFilterChange = (
    category: CategoryType | undefined,
    sort: SortType
  ) => {
    setCategory(category);
    setSort(sort);
    setPage(1);
  };

  return (
    <>
      <CategoryPriceFilter onFilterChange={handleFilterChange} />

      <AllActivitiesTitle />
      {isLoading ? (
        <LoadingIndicator width={80} height={80} />
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
