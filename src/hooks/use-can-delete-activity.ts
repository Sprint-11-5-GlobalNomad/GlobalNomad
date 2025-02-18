import { useQuery } from "@tanstack/react-query";
import { fetchMonthlyReservationStats } from "@/app/api/my-activities-api";

async function fetchOneMonthStats(activityId: number) {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");

  try {
    const stats = await fetchMonthlyReservationStats(activityId, year, month);
    return stats;
  } catch (error) {
    console.error("Failed to fetch reservation stats:", error);
    return [];
  }
}

export function useCanDeleteActivity(activityId: number) {
  const { data: canDelete, isLoading } = useQuery({
    queryKey: ["reservationStats", activityId, "1month"],
    queryFn: () => fetchOneMonthStats(activityId),
    select: (stats) =>
      !stats.some(
        (stat: { reservations: { pending: number; confirmed: number } }) =>
          stat.reservations.pending > 0 || stat.reservations.confirmed > 0
      ),
  });

  return { canDelete, isLoading };
}
