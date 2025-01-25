import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchActivities,
  createActivity,
  fetchActivityDetail,
  createReservation,
} from "../api/activities-api";
import {
  ActivityBasicDto,
  ActivityWithSubImagesAndSchedulesDto,
  CreateActivityBodyDto,
  FindActivitiesQueryDto,
} from "../types/activity-schemas";
import {
  ReservationResponseDto,
  CreateReservationBodyDto,
} from "../types/reservation-schemas";

// 체험 리스트 조회
export const useActivities = (filters: FindActivitiesQueryDto) =>
  useQuery<
    { cursorId: number; totalCount: number; activities: ActivityBasicDto[] },
    unknown
  >({
    queryKey: ["activities", filters],
    queryFn: () => fetchActivities(filters),
  });

// 체험 등록
export const useCreateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ActivityWithSubImagesAndSchedulesDto,
    unknown,
    CreateActivityBodyDto
  >({
    mutationFn: (activityData) => createActivity(activityData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
    onError: (error: unknown) => {
      console.error("Activity creation failed:", error);
    },
  });
};

// 체험 상세 조회
export const useActivityDetail = (activityId: number) =>
  useQuery<ActivityWithSubImagesAndSchedulesDto, unknown>({
    queryKey: ["activityDetail", activityId],
    queryFn: () => fetchActivityDetail(activityId),
  });

// 체험 예약 생성
export const useCreateReservation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ReservationResponseDto,
    unknown,
    { activityId: number; reservationData: CreateReservationBodyDto }
  >({
    mutationFn: ({ activityId, reservationData }) =>
      createReservation(activityId, reservationData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
    onError: (error: unknown) => {
      console.error("Reservation creation failed:", error);
    },
  });
};
