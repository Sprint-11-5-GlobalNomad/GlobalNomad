import {
  fetchMyActivities,
  fetchMonthlyReservationStats,
  fetchDailyReservationStats,
  fetchReservationsBySchedule,
  updateReservationStatus,
  deleteMyActivity,
  updateMyActivity,
} from "../api/my-activities-api";
import { useCustomQuery, useCustomMutation } from "./react-query-util";
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
  useCustomQuery<
    { cursorId: number; totalCount: number; activities: ActivityBasicDto[] },
    unknown
  >(["myActivities", cursorId], () => fetchMyActivities(cursorId, size));

// 월별 예약 현황 조회
export const useMonthlyReservationStats = (
  activityId: number,
  year: string,
  month: string
) =>
  useCustomQuery<MonthlyReservationStat[], unknown>(
    ["monthlyReservationStats", activityId, year, month],
    () => fetchMonthlyReservationStats(activityId, year, month)
  );

// 날짜별 예약 정보 조회
export const useDailyReservationStats = (activityId: number, date: string) =>
  useCustomQuery<DailyReservationStat[], unknown>(
    ["dailyReservationStats", activityId, date],
    () => fetchDailyReservationStats(activityId, date)
  );

// 예약 시간대별 예약 내역 조회
export const useReservationsBySchedule = (
  activityId: number,
  scheduleId: number,
  status: "declined" | "pending" | "confirmed",
  cursorId?: number,
  size = 10
) =>
  useCustomQuery<
    {
      cursorId: number;
      totalCount: number;
      reservations: ReservationResponseDto[];
    },
    unknown
  >(["reservationsBySchedule", activityId, scheduleId, status, cursorId], () =>
    fetchReservationsBySchedule(activityId, scheduleId, status, cursorId, size)
  );

// 예약 상태 업데이트
export const useUpdateReservationStatus = (
  activityId: number,
  reservationId: number
) =>
  useCustomMutation<
    ReservationResponseDto,
    unknown,
    { status: "confirmed" | "declined" }
  >(
    (status) => updateReservationStatus(activityId, reservationId, status),
    [
      ["reservationsBySchedule", activityId],
      ["dailyReservationStats", activityId],
    ]
  );

// 내 체험 삭제
export const useDeleteMyActivity = (activityId: number) =>
  useCustomMutation<void, unknown>(
    () => deleteMyActivity(activityId),
    [["myActivities"]]
  );

// 내 체험 수정
export const useUpdateMyActivity = (
  activityId: number,
  updateData: UpdateMyActivityBodyDto
) =>
  useCustomMutation<
    ActivityWithSubImagesAndSchedulesDto,
    unknown,
    UpdateMyActivityBodyDto
  >(
    () => updateMyActivity(activityId, updateData),
    [["myActivities"], ["activityDetail", activityId]]
  );
