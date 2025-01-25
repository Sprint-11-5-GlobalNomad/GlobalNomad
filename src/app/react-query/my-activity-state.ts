import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  useQuery<
    { cursorId: number; totalCount: number; activities: ActivityBasicDto[] },
    unknown
  >({
    queryKey: ["myActivities", cursorId],
    queryFn: () => fetchMyActivities(cursorId, size),
  });

// 월별 예약 현황 조회
export const useMonthlyReservationStats = (
  activityId: number,
  year: string,
  month: string
) =>
  useQuery<MonthlyReservationStat[], unknown>({
    queryKey: ["monthlyReservationStats", activityId, year, month],
    queryFn: () => fetchMonthlyReservationStats(activityId, year, month),
  });

// 날짜별 예약 정보 조회
export const useDailyReservationStats = (activityId: number, date: string) =>
  useQuery<DailyReservationStat[], unknown>({
    queryKey: ["dailyReservationStats", activityId, date],
    queryFn: () => fetchDailyReservationStats(activityId, date),
  });

// 예약 시간대별 예약 내역 조회
export const useReservationsBySchedule = (
  activityId: number,
  scheduleId: number,
  status: "declined" | "pending" | "confirmed",
  cursorId?: number,
  size = 10
) =>
  useQuery<
    {
      cursorId: number;
      totalCount: number;
      reservations: ReservationResponseDto[];
    },
    unknown
  >({
    queryKey: [
      "reservationsBySchedule",
      activityId,
      scheduleId,
      status,
      cursorId,
    ],
    queryFn: () =>
      fetchReservationsBySchedule(
        activityId,
        scheduleId,
        status,
        cursorId,
        size
      ),
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
    mutationFn: ({ activityId, reservationId, status }) =>
      updateReservationStatus(activityId, reservationId, { status }),
    onSuccess: (_, { activityId }) => {
      queryClient.invalidateQueries({
        queryKey: ["reservationsBySchedule", activityId],
      });
      queryClient.invalidateQueries({
        queryKey: ["dailyReservationStats", activityId],
      });
    },
    onError: (error: unknown) => {
      console.error("Reservation status update failed:", error);
    },
  });
};

// 내 체험 삭제
export const useDeleteMyActivity = () => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, number>({
    mutationFn: (activityId) => deleteMyActivity(activityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myActivities"] });
    },
    onError: (error: unknown) => {
      console.error("Activity deletion failed:", error);
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
    mutationFn: ({ activityId, updateData }) =>
      updateMyActivity(activityId, updateData),
    onSuccess: (_, { activityId }) => {
      queryClient.invalidateQueries({ queryKey: ["myActivities"] });
      queryClient.invalidateQueries({
        queryKey: ["activityDetail", activityId],
      });
    },
    onError: (error: unknown) => {
      console.error("Activity update failed:", error);
    },
  });
};
