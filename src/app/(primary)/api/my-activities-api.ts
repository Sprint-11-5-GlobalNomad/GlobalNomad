import { instance } from "./base-api";
import {
  ActivityBasicDto,
  ActivityWithSubImagesAndSchedulesDto,
} from "../../types/activity-schemas";
import { ReservationResponseDto } from "../../types/reservation-schemas";
import { MonthlyReservationStat } from "@/app/react-query/my-activity-state";

// 내 체험 리스트 조회
export const fetchMyActivities = async (
  cursorId?: number | null,
  size = 20
): Promise<{
  cursorId: number | null;
  totalCount: number;
  activities: ActivityBasicDto[];
}> => {
  try {
    const response = await instance.get<{
      cursorId: number | null;
      totalCount: number;
      activities: ActivityBasicDto[];
    }>(`/my-activities`, { params: { cursorId, size } });

    return response.data ?? { cursorId: null, totalCount: 0, activities: [] }; // 기본값 보장
  } catch (error) {
    console.error("체험 리스트를 가져오는 중 오류 발생:", error);
    throw error;
  }
};

// 내 체험 월별 예약 현황 조회
export const fetchMonthlyReservationStats = async (
  activityId: number,
  year: string,
  month: string
): Promise<MonthlyReservationStat[]> => {
  try {
    const response = await instance.get<
      {
        date: string;
        reservations: { completed: number; confirmed: number; pending: number };
      }[]
    >(`/my-activities/${activityId}/reservation-dashboard`, {
      params: { year, month },
    });

    return (
      response.data?.map((stat) => ({
        ...stat,
        activityId,
      })) || []
    );
  } catch (error) {
    console.error("Failed to fetch reservation stats:", error);
    return [];
  }
};
// 내 체험 날짜별 예약 정보 조회
export const fetchDailyReservationStats = async (
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
  >(`/my-activities/${activityId}/reserved-schedule`, {
    params: { date },
  });
  return response.data;
};

// 내 체험 예약 시간대별 예약 내역 조회
export const fetchReservationsBySchedule = async (
  activityId: number,
  scheduleId: number,
  status: string,
  cursorId: number | undefined,
  size: number
) => {
  const response = await instance.get<{
    cursorId: number;
    totalCount: number;
    reservations: ReservationResponseDto[];
  }>(`/my-activities/${activityId}/reservations`, {
    params: { scheduleId, status, cursorId, size },
  });
  return response.data;
};

// 내 체험 예약 상태 업데이트
export const updateReservationStatus = async (
  activityId: number,
  reservationId: number,
  status: { status: "confirmed" | "declined" }
) => {
  const response = await instance.patch<ReservationResponseDto>(
    `/my-activities/${activityId}/reservations/${reservationId}`,
    status
  );
  return response.data;
};

// 내 체험 삭제
export const deleteMyActivity = async (activityId: number) => {
  await instance.delete(`/my-activities/${activityId}`);
};

// 내 체험 수정
export const updateMyActivity = async (
  activityId: number,
  updateData: Partial<ActivityWithSubImagesAndSchedulesDto>
) => {
  const response = await instance.patch<ActivityWithSubImagesAndSchedulesDto>(
    `/my-activities/${activityId}`,
    updateData
  );
  return response.data;
};
