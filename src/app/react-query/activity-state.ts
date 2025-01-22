import {
  fetchActivities,
  createActivity,
  fetchActivityDetail,
  createReservation,
} from "../api/activity-api";
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
export const useActivities = (
  teamId: string,
  filters: FindActivitiesQueryDto
) =>
  useCustomQuery<
    { cursorId: number; totalCount: number; activities: ActivityBasicDto[] }, // 반환 타입
    unknown // 에러 타입
  >(["activities", teamId, filters], () => fetchActivities(teamId, filters));

// 체험 등록
export const useCreateActivity = (teamId: string) =>
  useCustomMutation<
    ActivityWithSubImagesAndSchedulesDto, // 반환 타입
    unknown, // 에러 타입
    CreateActivityBodyDto // 입력 데이터 타입
  >(
    (activityData: CreateActivityBodyDto) =>
      createActivity(teamId, activityData),
    [["activities", teamId]]
  );

// 체험 상세 조회
export const useActivityDetail = (teamId: string, activityId: number) =>
  useCustomQuery<
    ActivityWithSubImagesAndSchedulesDto, // 반환 타입
    unknown // 에러 타입
  >(["activityDetail", teamId, activityId], () =>
    fetchActivityDetail(teamId, activityId)
  );

// 체험 예약 생성
export const useCreateReservation = (teamId: string) =>
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
    }) => createReservation(teamId, activityId, reservationData),
    [["activities", teamId]]
  );
