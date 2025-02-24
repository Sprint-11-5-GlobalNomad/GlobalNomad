import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  fetchActivities,
  createActivity,
  fetchActivityDetail,
  createReservation,
  fetchActivityReviews,
  fetchAvailableSchedules,
  uploadActivityImage,
} from "../(primary)/api/activities-api";
import {
  ActivityBasicDto,
  ActivityWithSubImagesAndSchedulesDto,
  CreateActivityBodyDto,
  FindActivitiesQueryDto,
  FindAvailableScheduleQueryDto,
  FindReviewsQueryDto,
} from "../types/activity-schemas";
import {
  ReservationResponseDto,
  CreateReservationBodyDto,
} from "../types/reservation-schemas";

// 체험 리스트 조회
export const useActivities = (filters: FindActivitiesQueryDto) =>
  useQuery<{
    cursorId: number | null;
    totalCount: number;
    activities: ActivityBasicDto[];
  }>({
    queryKey: ["activities", filters],
    queryFn: async () => {
      try {
        return await fetchActivities(filters);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage =
            typeof error.response?.data === "object" &&
            error.response?.data?.message
              ? error.response.data.message
              : "알 수 없는 오류가 발생했습니다.";

          if (error.response?.status === 400) {
            console.error(errorMessage);
          } else if (error.response?.status === 401) {
            console.error(
              "인증되지 않은 요청입니다. 로그인 후 다시 시도하세요."
            );
            alert(errorMessage);
          } else {
            console.error(
              "체험 리스트를 가져오는 중 알 수 없는 오류가 발생했습니다.",
              error
            );
            alert(errorMessage);
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
        const errorMessage =
          typeof error.response?.data === "object" &&
          error.response?.data?.message
            ? error.response.data.message
            : "알 수 없는 오류가 발생했습니다.";

        switch (error.response?.status) {
          case 400:
            console.error(error.message);
            alert(errorMessage);
            break;
          case 409:
            console.error(
              "겹치는 예약 가능 시간대가 존재합니다. 스케줄을 확인하세요."
            );
            alert(errorMessage);
            break;
          case 401:
            console.error(
              "인증되지 않은 요청입니다. 로그인 후 다시 시도하세요."
            );
            alert(errorMessage);
            break;
          default:
            console.error("체험 등록에 실패했습니다.", error);
            alert(errorMessage);
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
          const errorMessage =
            typeof error.response?.data === "object" &&
            error.response?.data?.message
              ? error.response.data.message
              : "알 수 없는 오류가 발생했습니다.";

          if (error.response?.status === 404) {
            console.error(
              "존재하지 않는 체험입니다. 잘못된 ID를 입력했는지 확인하세요."
            );
            alert(errorMessage);
          } else if (error.response?.status === 401) {
            console.error(
              "인증되지 않은 요청입니다. 로그인 후 다시 시도하세요."
            );
            alert(errorMessage);
          } else {
            console.error(
              "체험 상세 정보를 가져오는 중 알 수 없는 오류가 발생했습니다.",
              error
            );
            alert(errorMessage);
          }
        }
        throw error;
      }
    },
  });

// 체험 리뷰 조회
export const useReviews = ({ filters }: { filters: FindReviewsQueryDto }) => {
  const query = useQuery({
    queryKey: ["activityReviews", filters],
    queryFn: () => fetchActivityReviews({ filters }),
    staleTime: 60 * 60 * 1000,
    retry: 1,
  });
  if (query.isError) {
    console.error(query.error);
  }
  return query;
};

// 체험 예약 가능일 조회
export const useAvailableSchedules = ({
  filters,
}: {
  filters: FindAvailableScheduleQueryDto;
}) => {
  const query = useQuery({
    queryKey: ["availableSchedules", filters],
    queryFn: () => fetchAvailableSchedules({ filters }),
    staleTime: 60 * 60 * 1000,
    retry: 1,
  });
  if (query.isError) {
    console.error(query.error);
  }
  return query;
};

// 체험 예약 신청
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
        const errorMessage =
          typeof error.response?.data === "object" &&
          error.response?.data?.message
            ? error.response.data.message
            : "알 수 없는 오류가 발생했습니다.";

        switch (error.response?.status) {
          case 400:
            console.error(error.message);
            alert(errorMessage);
            break;
          case 409:
            console.error("해당 스케줄은 이미 확정된 예약이 존재합니다.");
            alert(errorMessage);
            break;
          case 404:
            console.error(
              "존재하지 않는 체험입니다. 올바른 체험 ID를 입력하세요."
            );
            alert(errorMessage);
            break;
          case 401:
            console.error(
              "인증되지 않은 요청입니다. 로그인 후 다시 시도하세요."
            );
            alert(errorMessage);
            break;
          default:
            console.error("체험 예약에 실패했습니다.", error);
            alert(errorMessage);
        }
      }
    },
  });
};

export const useUploadActivityImage = () => {
  return useMutation({
    mutationFn: uploadActivityImage,
    onSuccess: (data) => {
      console.log("✅ 이미지 업로드 성공:", data.activityImageUrl);
    },
    onError: (error) => {
      console.error("❌ 이미지 업로드 실패:", error);
    },
  });
};
