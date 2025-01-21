import { instance } from "./base-api";
import {
  ActivityBasicDto,
  ActivityWithSubImagesAndSchedulesDto,
} from "../types/activity-schemas";
import { ReservationResponseDto } from "../types/reservation-schemas";

// 내 체험 리스트 조회
export const fetchMyActivities = async (
  teamId: string,
  cursorId?: number,
  size = 20
) => {
  const response = await instance.get<{
    cursorId: number;
    totalCount: number;
    activities: ActivityBasicDto[];
  }>(`/${teamId}/my-activities`, { params: { cursorId, size } });
  return response.data;
};

// 내 체험 월별 예약 현황 조회
export const fetchMonthlyReservationStats = async (
  teamId: string,
  activityId: number,
  year: string,
  month: string
) => {
  const response = await instance.get<
    {
      date: string;
      reservations: { completed: number; confirmed: number; pending: number };
    }[]
  >(`/${teamId}/my-activities/${activityId}/reservation-dashboard`, {
    params: { year, month },
  });
  return response.data;
};

// 내 체험 날짜별 예약 정보 조회
export const fetchDailyReservationStats = async (
  teamId: string,
  activityId: number,
  date: string
) => {
  const response = await instance.get<
    {
      scheduleId: number;
      startTime: string;
      endTime: string;
      count: { declined: number; confirmed: number; pending: number };
    }[]
  >(`/${teamId}/my-activities/${activityId}/reserved-schedule`, {
    params: { date },
  });
  return response.data;
};

// 내 체험 예약 시간대별 예약 내역 조회
export const fetchReservationsBySchedule = async (
  teamId: string,
  activityId: number,
  scheduleId: number,
  status: "declined" | "pending" | "confirmed",
  cursorId?: number,
  size = 10
) => {
  const response = await instance.get<{
    cursorId: number;
    totalCount: number;
    reservations: ReservationResponseDto[];
  }>(`/${teamId}/my-activities/${activityId}/reservations`, {
    params: { scheduleId, status, cursorId, size },
  });
  return response.data;
};

// 내 체험 예약 상태 업데이트
export const updateReservationStatus = async (
  teamId: string,
  activityId: number,
  reservationId: number,
  status: { status: "confirmed" | "declined" }
) => {
  const response = await instance.patch<ReservationResponseDto>(
    `/${teamId}/my-activities/${activityId}/reservations/${reservationId}`,
    status
  );
  return response.data;
};

// 내 체험 삭제
export const deleteMyActivity = async (teamId: string, activityId: number) => {
  await instance.delete(`/${teamId}/my-activities/${activityId}`);
};

// 내 체험 수정
export const updateMyActivity = async (
  teamId: string,
  activityId: number,
  updateData: Partial<ActivityWithSubImagesAndSchedulesDto>
) => {
  const response = await instance.patch<ActivityWithSubImagesAndSchedulesDto>(
    `/${teamId}/my-activities/${activityId}`,
    updateData
  );
  return response.data;
};
