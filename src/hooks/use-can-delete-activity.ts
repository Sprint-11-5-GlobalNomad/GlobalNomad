import { useState, useEffect } from "react";
import { useMonthlyReservationStats } from "@/app/react-query/my-activity-state";

export function useCanDeleteActivity(activityId: number) {
  const { data: monthlyStats, isLoading } = useMonthlyReservationStats(
    activityId,
    new Date().getFullYear().toString(),
    (new Date().getMonth() + 1).toString()
  );

  const [canDelete, setCanDelete] = useState(false);

  useEffect(() => {
    if (!monthlyStats) return;

    let hasPending = false;
    let hasApproved = false;

    monthlyStats.forEach((stat) => {
      if (stat.reservations.pending > 0) {
        hasPending = true;
      }
      if (stat.reservations.confirmed > 0) {
        hasApproved = true;
      }
    });

    if (hasPending || hasApproved) {
      setCanDelete(false); // 삭제 불가능
    } else {
      setCanDelete(true); // 삭제 가능
    }
  }, [monthlyStats]);

  return { canDelete, isLoading };
}
