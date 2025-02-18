import { useQuery } from "@tanstack/react-query";
import { fetchMonthlyReservationStats } from "@/app/api/my-activities-api";

async function fetchSixMonthsStats(activityId: number) {
  const promises = [];
  const currentDate = new Date();

  for (let i = 0; i < 6; i++) {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1
    );
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");

    promises.push(fetchMonthlyReservationStats(activityId, year, month));
  }

  const results = await Promise.all(promises);
  return results.flat();
}

export function useCanDeleteActivity(activityId: number) {
  const { data: canDelete, isLoading } = useQuery({
    queryKey: ["reservationStats", activityId, "6months"],
    queryFn: () => fetchSixMonthsStats(activityId),
    select: (stats) =>
      !stats.some(
        (stat: { reservations: { pending: number; confirmed: number } }) =>
          stat.reservations.pending > 0 || stat.reservations.confirmed > 0
      ),
  });

  return { canDelete, isLoading };
}
