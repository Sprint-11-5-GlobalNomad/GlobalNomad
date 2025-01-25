import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  fetchMyActivities,
  fetchMonthlyReservationStats,
  fetchDailyReservationStats,
  fetchReservationsBySchedule,
  updateReservationStatus,
  deleteMyActivity,
  updateMyActivity,
} from "../api/my-activities-api";
import {
  ActivityBasicDto,
  ActivityWithSubImagesAndSchedulesDto,
  UpdateMyActivityBodyDto,
} from "../types/activity-schemas";
import { ReservationResponseDto } from "../types/reservation-schemas";

// 월별 예약 현황 타입
interface MonthlyReservationStat {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}

// 날짜별 예약 현황 타입
interface DailyReservationStat {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    declined: number;
    confirmed: number;
    pending: number;
  };
}

// 내 체험 리스트 조회
export const useMyActivities = (cursorId?: number, size = 20) =>
  useQuery<{
    cursorId: number;
    totalCount: number;
    activities: ActivityBasicDto[];
  }>({
    queryKey: ["myActivities", cursorId],
    queryFn: async () => {
      try {
        return await fetchMyActivities(cursorId, size);
      } catch (error) {
        if (error instanceof AxiosError) {
          switch (error.response?.status) {
            case 400:
              console.error(error.message);
              break;
            case 401:
              console.error(
                "인증되지 않은 요청입니다. 로그인 후 다시 시도하세요."
              );
              break;
            default:
              console.error("체험 리스트를 가져오는 중 오류가 발생했습니다.");
          }
        }
        throw error;
      }
    },
  });

// 월별 예약 현황 조회
export const useMonthlyReservationStats = (
  activityId: number,
  year: string,
  month: string
) =>
  useQuery<MonthlyReservationStat[], unknown>({
    queryKey: ["monthlyReservationStats", activityId, year, month],
    queryFn: async () => {
      try {
        return await fetchMonthlyReservationStats(activityId, year, month);
      } catch (error) {
        if (error instanceof AxiosError) {
          switch (error.response?.status) {
            case 400:
              console.error(error.message);
              break;
            case 401:
              console.error(
                "인증되지 않은 요청입니다. 로그인 후 다시 시도하세요."
              );
              break;
            case 403:
              console.error("본인의 체험만 조회할 수 있습니다.");
              break;
            default:
              console.error(
                "월별 예약 현황을 가져오는 중 오류가 발생했습니다."
              );
          }
        }
        throw error;
      }
    },
  });

// 날짜별 예약 정보 조회
export const useDailyReservationStats = (activityId: number, date: string) =>
  useQuery<DailyReservationStat[], unknown>({
    queryKey: ["dailyReservationStats", activityId, date],
    queryFn: async () => {
      try {
        return await fetchDailyReservationStats(activityId, date);
      } catch (error) {
        if (error instanceof AxiosError) {
          switch (error.response?.status) {
            case 400:
              console.error(error.message);
              break;
            case 401:
              console.error(
                "인증되지 않은 요청입니다. 로그인 후 다시 시도하세요."
              );
              break;
            case 403:
              console.error("본인의 체험만 조회할 수 있습니다.");
              break;
            default:
              console.error(
                "날짜별 예약 정보를 가져오는 중 오류가 발생했습니다."
              );
          }
        }
        throw error;
      }
    },
  });

// 예약 시간대별 예약 내역 조회
export const useReservationsBySchedule = (
  activityId: number,
  scheduleId: number,
  status: "declined" | "pending" | "confirmed",
  cursorId?: number,
  size = 10
) =>
  useQuery<{
    cursorId: number;
    totalCount: number;
    reservations: ReservationResponseDto[];
  }>({
    queryKey: [
      "reservationsBySchedule",
      activityId,
      scheduleId,
      status,
      cursorId,
    ],
    queryFn: async () => {
      try {
        return await fetchReservationsBySchedule(
          activityId,
          scheduleId,
          status,
          cursorId,
          size
        );
      } catch (error) {
        if (error instanceof AxiosError) {
          switch (error.response?.status) {
            case 400:
              console.error(error.message);
              break;
            case 401:
              console.error(
                "인증되지 않은 요청입니다. 로그인 후 다시 시도하세요."
              );
              break;
            case 403:
              console.error("본인의 체험만 조회할 수 있습니다.");
              break;
            default:
              console.error(
                "예약 시간대별 정보를 가져오는 중 오류가 발생했습니다."
              );
          }
        }
        throw error;
      }
    },
  });

// 예약 상태 업데이트
export const useUpdateReservationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ReservationResponseDto,
    unknown,
    {
      activityId: number;
      reservationId: number;
      status: "confirmed" | "declined";
    }
  >({
    mutationFn: async ({ activityId, reservationId, status }) =>
      updateReservationStatus(activityId, reservationId, { status }),
    onSuccess: (_, { activityId }) => {
      queryClient.invalidateQueries({
        queryKey: ["reservationsBySchedule", activityId],
      });
      queryClient.invalidateQueries({
        queryKey: ["dailyReservationStats", activityId],
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 400:
            console.error(error.message);
            break;
          case 401:
            console.error(
              "인증되지 않은 요청입니다. 로그인 후 다시 시도하세요."
            );
            break;
          case 403:
            console.error("본인의 체험만 예약 상태를 변경할 수 있습니다.");
            break;
          case 404:
            console.error("존재하지 않는 체험입니다.");
            break;
          default:
            console.error("예약 상태 업데이트 중 오류가 발생했습니다.");
        }
      }
    },
  });
};

// 내 체험 삭제
export const useDeleteMyActivity = () => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, number>({
    mutationFn: async (activityId) => deleteMyActivity(activityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myActivities"] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 400:
            console.error(error.message);
            break;
          case 401:
            console.error(
              "인증되지 않은 요청입니다. 로그인 후 다시 시도하세요."
            );
            break;
          case 403:
            console.error("본인의 체험만 삭제할 수 있습니다.");
            break;
          case 404:
            console.error("존재하지 않는 체험입니다.");
            break;
          default:
            console.error("체험 삭제 중 오류가 발생했습니다.");
        }
      }
    },
  });
};

// 내 체험 수정
export const useUpdateMyActivity = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ActivityWithSubImagesAndSchedulesDto,
    unknown,
    { activityId: number; updateData: UpdateMyActivityBodyDto }
  >({
    mutationFn: async ({ activityId, updateData }) =>
      updateMyActivity(activityId, updateData),
    onSuccess: (_, { activityId }) => {
      queryClient.invalidateQueries({ queryKey: ["myActivities"] });
      queryClient.invalidateQueries({
        queryKey: ["activityDetail", activityId],
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 400:
            console.error(error.message);
            break;
          case 401:
            console.error(
              "인증되지 않은 요청입니다. 로그인 후 다시 시도하세요."
            );
            break;
          case 403:
            console.error("본인의 체험만 수정할 수 있습니다.");
            break;
          case 404:
            console.error("존재하지 않는 체험입니다.");
            break;
          case 409:
            console.error("겹치는 예약 가능 시간대가 존재합니다.");
            break;
          default:
            console.error("체험 수정 중 오류가 발생했습니다.");
        }
      }
    },
  });
};
