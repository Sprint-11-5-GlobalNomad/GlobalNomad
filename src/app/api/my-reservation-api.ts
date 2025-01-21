import { instance } from "./base-api";
import { ReservationResponseDto } from "../types/reservation-schemas";

// 내 예약 리스트 조회
export const fetchMyReservations = async (
  teamId: string,
  cursorId?: number,
  size = 10,
  status?: "pending" | "confirmed" | "declined" | "canceled" | "completed"
) => {
  const response = await instance.get<{
    cursorId: number;
    reservations: ReservationResponseDto[];
    totalCount: number;
  }>(`/${teamId}/my-reservations`, { params: { cursorId, size, status } });
  return response.data;
};

// 내 예약 취소
export const cancelReservation = async (
  teamId: string,
  reservationId: number,
  status: { status: "canceled" }
) => {
  const response = await instance.patch<ReservationResponseDto>(
    `/${teamId}/my-reservations/${reservationId}`,
    status
  );
  return response.data;
};

// 내 예약 리뷰 작성
export const submitReservationReview = async (
  teamId: string,
  reservationId: number,
  reviewData: { rating: number; content: string }
) => {
  const response = await instance.post<{
    id: number;
    content: string;
    rating: number;
    userId: number;
    activityId: number;
    createdAt: string;
    updatedAt: string;
  }>(`/${teamId}/my-reservations/${reservationId}/reviews`, reviewData);
  return response.data;
};
