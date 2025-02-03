"use client";

import Pagination from "@/components/common/ui/pagination";
import AllActivities from "./all-activities";
import AllActivitiesTitle from "./all-activities-title";
import CategoryPriceFilter from "./category-price-filter";
import { useActivities } from "@/app/react-query/activity-state";
import { useState } from "react";
import { LoadingIndicator } from "@/components/common/layout/loading-indicator";
import { ErrorIndicator } from "@/components/common/layout/error-indicator";
import { CategoryType, SortType } from "@/app/types/activity-schemas";

export default function AllActivitiesSection() {
  const size = 8;
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<CategoryType>(undefined);
  const [sort, setSort] = useState<SortType>(undefined);

  const { data, isLoading, isError } = useActivities({
    method: "offset",
    page,
    size,
    sort: sort || "latest",
    category,
  });

  const totalPages = Math.ceil((data?.totalCount || 0) / size);

  const handleFilterChange = (category: CategoryType, sort: SortType) => {
    setCategory(category);
    setSort(sort);
  };

  return (
    <>
      <CategoryPriceFilter onFilterChange={handleFilterChange} />

      <AllActivitiesTitle />
      {isLoading ? (
        <LoadingIndicator width={80} height={80} />
      ) : isError ? (
        <ErrorIndicator width={80} height={80} />
      ) : (
        <AllActivities activities={data?.activities || []} />
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={page}
        setPage={setPage}
      />
    </>
  );
}
