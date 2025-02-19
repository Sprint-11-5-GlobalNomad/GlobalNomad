import { useQuery } from "@tanstack/react-query";
import { fetchMonthlyReservationStats } from "@/app/api/my-activities-api";

export async function fetchFiveMonthsStats(activityId: number) {
  const currentDate = new Date();
  const statsArray = [];

  for (let i = -2; i <= 2; i++) {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() + i);

    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");

    try {
      const stats = await fetchMonthlyReservationStats(activityId, year, month);
      statsArray.push(...stats);
    } catch (error) {
      console.error(
        `Failed to fetch reservation stats for ${year}-${month}:`,
        error
      );
    }
  }

  return statsArray;
}

export function useCanDeleteActivity(activityId: number) {
  const { data: canDelete, isLoading } = useQuery({
    queryKey: ["reservationStats", activityId, "5months"],
    queryFn: () => fetchFiveMonthsStats(activityId),
    select: (stats) =>
      !stats.some(
        (stat: { reservations: { pending: number; confirmed: number } }) =>
          stat.reservations.pending > 0 || stat.reservations.confirmed > 0
      ),
  });

  return { canDelete, isLoading };
}
