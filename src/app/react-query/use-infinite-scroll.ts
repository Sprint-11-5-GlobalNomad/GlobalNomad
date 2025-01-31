import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMyActivities } from "../api/my-activities-api";
import { fetchMyReservations } from "../api/my-reservations-api";
import { fetchActivities } from "../api/activities-api";
import { FindActivitiesQueryDto } from "../types/activity-schemas";

export function useInfinityMyActivities() {
  return useInfiniteQuery({
    queryKey: ["activities"],
    queryFn: ({ pageParam = 0 }) => {
      return fetchMyActivities(pageParam, 10);
    },
    getNextPageParam: (lastPage) => {
      return lastPage.cursorId || undefined;
    },
    initialPageParam: 0,
  });
}

export const useInfiniteActivities = (filters: FindActivitiesQueryDto) => {
  return useInfiniteQuery({
    queryKey: ["activities", filters],
    queryFn: ({ pageParam = 0 }) => {
      const params = { ...filters, cursorId: pageParam };
      return fetchActivities(params);
    },
    getNextPageParam: (lastPage) => {
      return lastPage.cursorId || undefined;
    },
    initialPageParam: 0,
  });
};

export const useInfiniteMyReservations = () => {
  return useInfiniteQuery({
    queryKey: ["infiniteMyReservations"],
    queryFn: async ({ pageParam }) => {
      return fetchMyReservations(pageParam);
    },
    getNextPageParam: (lastPage) => {
      return lastPage.cursorId || undefined;
    },
    initialPageParam: 0,
  });
};
