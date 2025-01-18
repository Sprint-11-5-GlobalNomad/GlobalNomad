import { instance } from "@/app/api/api";
import { DataType } from "@/types/activities-type";
import { ReviewData } from "@/types/activities-type";
import { AvailableSchedule } from "@/types/activities-type";
import { requestor } from "@/app/api/config/requestor";
import { ActivityListResponse } from "@/types/activities-type";

const BASE_URL = "https://sp-globalnomad-api.vercel.app/4-17";

//체험 리스트조회
export const getActivities = async (
  cursorId?: number,
  size?: number,
  category?: string
): Promise<ActivityListResponse> => {
  const response = await requestor.get("/activities", {
    params: {
      cursorId,
      size,
      category,
    },
  });
  return response.data;
};

// 체험 상세조회
export async function getDatas(activityId: number): Promise<DataType> {
  const response = await instance.get<DataType>(`/activities/${activityId}`);
  return response.data;
}

export const getActivityDetails = async (activityId: number) => {
  const response = await requestor.get(`/activities/${activityId}`);
  const ActivityDetailsData = response.data;
  return ActivityDetailsData;
};

//체험 예약가능일 조회
export async function getAvailableSchedule(
  year: number,
  month: number,
  activityId: number
): Promise<AvailableSchedule> {
  const response = await instance.get<AvailableSchedule>(
    `/activities/${activityId}/available-schedule`
  );
  return response.data;
}

export const getSchedule = async (
  year: string,
  month: string,
  activityId: number
): Promise<AvailableSchedule[]> => {
  const response = await instance.get<AvailableSchedule[]>(
    `/activities/${activityId}/available-schedule`,
    {
      params: {
        year,
        month,
      },
    }
  );
  return response.data;
};

//체험 리뷰 조회
export async function getReviews(
  activityId: number,
  page: number,
  size: number
): Promise<ReviewData> {
  const response = await instance.get<ReviewData>(
    `/activities/${activityId}/reviews`,
    {
      params: {
        page,
        size,
      },
    }
  );
  return response.data;
}
