"use client";

import { useActivities } from "@/app/react-query/activity-state";
import PopularActivities from "./popular-activities";
import PopularActivitiesTitle from "./popular-activities-title";
import { useState } from "react";
import { LoadingIndicator } from "@/components/common/layout/loading-indicator";
import { ErrorIndicator } from "@/components/common/layout/error-indicator";

export default function PopularActivitiesSection() {
  const size = 3;
  const [cursorId, setCursorId] = useState<number | null>(null);

  const { data, isLoading, isError } = useActivities({
    method: "cursor",
    cursorId,
    size,
    sort: "most_reviewed",
  });

  const handleNextCursor = () => {
    if (data && data.activities.length > 0) {
      setCursorId(data.activities[data.activities.length - 1].id);
    }
  };

  const handlePrevCursor = () => {
    setCursorId(null);
  };

  return (
    <>
      <PopularActivitiesTitle
        handleNextCursor={handleNextCursor}
        handlePrevCursor={handlePrevCursor}
        cursorId={cursorId}
      />
      {isLoading ? (
        <LoadingIndicator width={80} height={80} />
      ) : isError ? (
        <ErrorIndicator width={80} height={80} />
      ) : (
        <PopularActivities activities={data?.activities || []} />
      )}
    </>
  );
}
