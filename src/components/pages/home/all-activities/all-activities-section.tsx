"use client";

import Pagination from "@/components/common/ui/pagination";
import AllActivities from "./all-activities";
import AllActivitiesTitle from "./all-activities-title";
import CategoryPriceFilter from "./category-price-filter";
import { useActivities } from "@/app/react-query/activity-state";
import { useState } from "react";
import { LoadingIndicator } from "@/components/common/layout/loading-indicator";
import { ErrorIndicator } from "@/components/common/layout/error-indicator";

export default function AllActivitiesSection() {
  const size = 8;
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useActivities({
    method: "offset",
    page,
    size,
    sort: "latest",
  });

  const totalPages = Math.ceil((data?.totalCount || 0) / size);

  return (
    <>
      <CategoryPriceFilter />

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
