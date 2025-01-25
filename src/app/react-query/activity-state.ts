import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
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
  useQuery<{
    cursorId: number;
    totalCount: number;
    activities: ActivityBasicDto[];
  }>({
    queryKey: ["activities", filters],
    queryFn: async () => {
      try {
        return await fetchActivities(filters);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 400) {
            console.error(
              "체험 리스트를 가져오는 데 실패했습니다. 페이지네이션 방식이 'offset' 또는 'cursor'로 설정되었는지 확인하세요."
            );
          } else if (error.response?.status === 401) {
            console.error(
              "인증되지 않은 요청입니다. 로그인 후 다시 시도하세요."
            );
          } else {
            console.error(
              "체험 리스트를 가져오는 중 알 수 없는 오류가 발생했습니다.",
              error
            );
          }
        }
        throw error;
      }
    },
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
      if (axios.isAxiosError(error)) {
        switch (error.response?.status) {
          case 400:
            console.error(
              "잘못된 요청입니다. 제목, 카테고리, 주소 등 입력값을 확인하세요."
            );
            break;
          case 409:
            console.error(
              "겹치는 예약 가능 시간대가 존재합니다. 스케줄을 확인하세요."
            );
            break;
          case 401:
            console.error(
              "인증되지 않은 요청입니다. 로그인 후 다시 시도하세요."
            );
            break;
          default:
            console.error("체험 등록에 실패했습니다.", error);
        }
      }
    },
  });
};

// 체험 상세 조회
export const useActivityDetail = (activityId: number) =>
  useQuery<ActivityWithSubImagesAndSchedulesDto, unknown>({
    queryKey: ["activityDetail", activityId],
    queryFn: async () => {
      try {
        return await fetchActivityDetail(activityId);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            console.error(
              "존재하지 않는 체험입니다. 잘못된 ID를 입력했는지 확인하세요."
            );
          } else if (error.response?.status === 401) {
            console.error(
              "인증되지 않은 요청입니다. 로그인 후 다시 시도하세요."
            );
          } else {
            console.error(
              "체험 상세 정보를 가져오는 중 알 수 없는 오류가 발생했습니다.",
              error
            );
          }
        }
        throw error;
      }
    },
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
      if (axios.isAxiosError(error)) {
        switch (error.response?.status) {
          case 400:
            console.error(
              "잘못된 요청입니다. 예약하려는 스케줄 ID 또는 인원을 확인하세요."
            );
            break;
          case 409:
            console.error("해당 스케줄은 이미 확정된 예약이 존재합니다.");
            break;
          case 404:
            console.error(
              "존재하지 않는 체험입니다. 올바른 체험 ID를 입력하세요."
            );
            break;
          case 401:
            console.error(
              "인증되지 않은 요청입니다. 로그인 후 다시 시도하세요."
            );
            break;
          default:
            console.error("체험 예약에 실패했습니다.", error);
        }
      }
    },
  });
};
