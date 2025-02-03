import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMyActivities } from "../api/my-activities-api";
import { fetchMyReservations } from "../api/my-reservations-api";
import { fetchActivities } from "../api/activities-api";
import {
  ActivityBasicDto,
  FindActivitiesQueryDto,
} from "../types/activity-schemas";
import Error from "next/error";

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

// export const useInfiniteActivities = (filters: FindActivitiesQueryDto) => {
//   return useInfiniteQuery({
//     queryKey: ["activities", filters],
//     queryFn: ({ pageParam = 0 }) => {
//       const params = { ...filters, cursorId: pageParam };
//       return fetchActivities(params);
//     },
//     getNextPageParam: (lastPage) => {
//       return lastPage.cursorId || undefined;
//     },
//     initialPageParam: 0,
//   });
// };

export const useInfiniteActivities = (filters: FindActivitiesQueryDto) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<
    {
      cursorId: number | null;
      totalCount: number;
      activities: ActivityBasicDto[];
    },
    Error
  >({
    queryKey: ["activities", filters],
    queryFn: async ({ pageParam = null }: { pageParam: unknown }) => {
      const cursorId: number | null = pageParam as number | null;

      const params: FindActivitiesQueryDto = {
        ...filters,
        cursorId,
      };
      return await fetchActivities(params);
    },
    getNextPageParam: (lastPage) => lastPage.cursorId ?? null,
    initialPageParam: null,
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  };
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
