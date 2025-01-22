import {
  fetchActivities,
  createActivity,
  fetchActivityDetail,
  createReservation,
} from "../api/activities-api";
import { useCustomQuery, useCustomMutation } from "./react-query-util";
import {
  ActivityBasicDto,
  ActivityWithSubImagesAndSchedulesDto,
  CreateActivityBodyDto,
  FindActivitiesQueryDto,
} from "../types/activity-schemas";
import {
  ReservationResponseDto,
  CreateReservationBodyDto,
} from "../types/reservation-schemas";

// 체험 리스트 조회
export const useActivities = (filters: FindActivitiesQueryDto) =>
  useCustomQuery<
    { cursorId: number; totalCount: number; activities: ActivityBasicDto[] }, // 반환 타입
    unknown // 에러 타입
  >(["activities", filters], () => fetchActivities(filters));

// 체험 등록
export const useCreateActivity = () =>
  useCustomMutation<
    ActivityWithSubImagesAndSchedulesDto, // 반환 타입
    unknown, // 에러 타입
    CreateActivityBodyDto // 입력 데이터 타입
  >(
    (activityData: CreateActivityBodyDto) => createActivity(activityData),
    [["activities"]]
  );

// 체험 상세 조회
export const useActivityDetail = (activityId: number) =>
  useCustomQuery<
    ActivityWithSubImagesAndSchedulesDto, // 반환 타입
    unknown // 에러 타입
  >(["activityDetail", activityId], () => fetchActivityDetail(activityId));

// 체험 예약 생성
export const useCreateReservation = () =>
  useCustomMutation<
    ReservationResponseDto, // 반환 타입
    unknown, // 에러 타입
    { activityId: number; reservationData: CreateReservationBodyDto } // 입력 데이터 타입
  >(
    ({
      activityId,
      reservationData,
    }: {
      activityId: number;
      reservationData: CreateReservationBodyDto;
    }) => createReservation(activityId, reservationData),
    [["activities"]]
  );
