import { instance } from "./base-api";
import {
  ActivityBasicDto,
  FindActivitiesQueryDto,
  ActivityWithSubImagesAndSchedulesDto,
  CreateActivityBodyDto,
} from "../types/activity-schemas";
import {
  CreateReservationBodyDto,
  ReservationResponseDto,
} from "../types/reservation-schemas";

// 체험 리스트 조회
export const fetchActivities = async (filters: FindActivitiesQueryDto) => {
  const response = await instance.get<{
    cursorId: number;
    totalCount: number;
    activities: ActivityBasicDto[];
  }>(`/activities`, { params: filters });
  return response.data;
};

// 체험 등록
export const createActivity = async (activityData: CreateActivityBodyDto) => {
  const response = await instance.post<ActivityWithSubImagesAndSchedulesDto>(
    `/activities`,
    activityData
  );
  return response.data;
};

// 체험 상세 조회
export const fetchActivityDetail = async (activityId: number) => {
  const response = await instance.get<ActivityWithSubImagesAndSchedulesDto>(
    `/activities/${activityId}`
  );
  return response.data;
};

// 체험 예약 가능일 조회
export const fetchAvailableSchedules = async (
  activityId: number,
  year: string,
  month: string
) => {
  const response = await instance.get<
    {
      date: string;
      times: { id: number; startTime: string; endTime: string }[];
    }[]
  >(`/activities/${activityId}/available-schedule`, {
    params: { year, month },
  });
  return response.data;
};

// 체험 리뷰 조회
export const fetchActivityReviews = async (
  activityId: number,
  page = 1,
  size = 3
) => {
  const response = await instance.get<{
    averageRating: number;
    totalCount: number;
    reviews: {
      id: number;
      user: { profileImageUrl: string; nickname: string; id: number };
      activityId: number;
      rating: number;
      content: string;
      createdAt: string;
      updatedAt: string;
    }[];
  }>(`/activities/${activityId}/reviews`, { params: { page, size } });
  return response.data;
};

// 체험 이미지 URL 생성
export const uploadActivityImage = async (teamId: string, imageFile: File) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await instance.post<{ activityImageUrl: string }>(
    `/activities/image`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
};

// 체험 예약 신청
export const createReservation = async (
  activityId: number,
  reservationData: CreateReservationBodyDto
) => {
  const response = await instance.post<ReservationResponseDto>(
    `/activities/${activityId}/reservations`,
    reservationData
  );
  return response.data;
};
