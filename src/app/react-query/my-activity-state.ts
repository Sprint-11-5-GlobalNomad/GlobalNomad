import {
  fetchMyActivities,
  fetchMonthlyReservationStats,
  fetchDailyReservationStats,
  fetchReservationsBySchedule,
  updateReservationStatus,
  deleteMyActivity,
  updateMyActivity,
} from "../api/my-activity-api";
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
export const useMyActivities = (teamId: string, cursorId?: number, size = 20) =>
  useCustomQuery<
    { cursorId: number; totalCount: number; activities: ActivityBasicDto[] },
    unknown
  >(["myActivities", teamId, cursorId], () =>
    fetchMyActivities(teamId, cursorId, size)
  );

// 월별 예약 현황 조회
export const useMonthlyReservationStats = (
  teamId: string,
  activityId: number,
  year: string,
  month: string
) =>
  useCustomQuery<MonthlyReservationStat[], unknown>(
    ["monthlyReservationStats", teamId, activityId, year, month],
    () => fetchMonthlyReservationStats(teamId, activityId, year, month)
  );

// 날짜별 예약 정보 조회
export const useDailyReservationStats = (
  teamId: string,
  activityId: number,
  date: string
) =>
  useCustomQuery<DailyReservationStat[], unknown>(
    ["dailyReservationStats", teamId, activityId, date],
    () => fetchDailyReservationStats(teamId, activityId, date)
  );

// 예약 시간대별 예약 내역 조회
export const useReservationsBySchedule = (
  teamId: string,
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
  >(
    [
      "reservationsBySchedule",
      teamId,
      activityId,
      scheduleId,
      status,
      cursorId,
    ],
    () =>
      fetchReservationsBySchedule(
        teamId,
        activityId,
        scheduleId,
        status,
        cursorId,
        size
      )
  );

// 예약 상태 업데이트
export const useUpdateReservationStatus = (
  teamId: string,
  activityId: number,
  reservationId: number
) =>
  useCustomMutation<
    ReservationResponseDto,
    unknown,
    { status: "confirmed" | "declined" }
  >(
    (status) =>
      updateReservationStatus(teamId, activityId, reservationId, status),
    [
      ["reservationsBySchedule", teamId, activityId],
      ["dailyReservationStats", teamId, activityId],
    ]
  );

// 내 체험 삭제
export const useDeleteMyActivity = (teamId: string, activityId: number) =>
  useCustomMutation<void, unknown>(
    () => deleteMyActivity(teamId, activityId),
    [["myActivities", teamId]]
  );

// 내 체험 수정
export const useUpdateMyActivity = (
  teamId: string,
  activityId: number,
  updateData: UpdateMyActivityBodyDto
) =>
  useCustomMutation<
    ActivityWithSubImagesAndSchedulesDto,
    unknown,
    UpdateMyActivityBodyDto
  >(
    () => updateMyActivity(teamId, activityId, updateData),
    [
      ["myActivities", teamId],
      ["activityDetail", teamId, activityId],
    ]
  );
