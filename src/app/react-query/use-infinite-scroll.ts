import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMyActivities } from "../api/my-activities-api";
import { fetchMyReservations } from "../api/my-reservations-api";
import { fetchActivities } from "../api/activities-api";
import {
  ActivityBasicDto,
  FindActivitiesQueryDto,
} from "../types/activity-schemas";
import Error from "next/error";
import { fetchNotifications } from "../api/my-notifications-api";

export function useInfinityMyActivities() {
  return useInfiniteQuery({
    queryKey: ["activities"],
    queryFn: async ({
      pageParam = null,
    }: {
      pageParam: number | null | undefined;
    }) => fetchMyActivities(pageParam, 10),
    getNextPageParam: (lastPage) => {
      return lastPage.cursorId || undefined;
    },
    initialPageParam: null, // ✅ 첫 페이지 요청 시 `null` 전달
  });
}

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

export const useInfiniteNotifications = () => {
  return useInfiniteQuery({
    queryKey: ["infiniteNotifications"],
    queryFn: async ({
      pageParam = null,
    }: {
      pageParam: number | null | undefined;
    }) => {
      return fetchNotifications(pageParam, 10);
    },
    getNextPageParam: (lastpage) => {
      return lastpage.cursorId ?? undefined;
    },
    initialPageParam: null,
  });
};

export const useInfiniteMyReservations = (status?: string) => {
  return useInfiniteQuery({
    queryKey: ["infiniteMyReservations", status], // ✅ 필터 값을 queryKey에 포함
    queryFn: async ({
      pageParam = null,
    }: {
      pageParam: number | null | undefined;
    }) => {
      return fetchMyReservations(pageParam, 10, status); // ✅ API에 필터 전달
    },
    getNextPageParam: (lastPage) => {
      return lastPage.cursorId || undefined;
    },
    initialPageParam: null,
  });
};
