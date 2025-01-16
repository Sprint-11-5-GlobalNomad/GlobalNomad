import axios, { Axios, AxiosError, ResponseType } from "axios";
import { instance } from "@/apis/apis";
import { DataType } from "@/types/activities-type";
import { ReviewData } from "@/types/activities-type";
import { AvailableSchedule } from "@/types/activities-type";
import { requestor } from "@/apis/config/requestor";
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
  const { data } = await instance.get(`/activities/${activityId}`);
  return data;
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
  const { data } = await instance.get(
    `/activities/${activityId}/available-schedule`
  );
  return data;
}

export const getSchedule = async (
  year: string,
  month: string,
  activityId: number
): Promise<AvailableSchedule[]> => {
  const { data } = await instance.get(
    `/activities/${activityId}/available-schedule`,
    {
      params: {
        year,
        month,
      },
    }
  );
  return data;
};

//체험 리뷰 조회
export async function getReviews(
  activityId: number,
  page: number,
  size: number
): Promise<ReviewData> {
  const { data } = await instance.get(`/activities/${activityId}/reviews`, {
    params: {
      activityId,
      page,
      size,
    },
  });
  return data;
}
