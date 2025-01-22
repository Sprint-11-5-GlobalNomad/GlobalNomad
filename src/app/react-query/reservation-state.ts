import {
  fetchMyReservations,
  cancelReservation,
  submitReservationReview,
} from "../api/my-reservation-api";
import { useCustomMutation, useCustomQuery } from "./react-query-util";

// 내 예약 리스트 조회
export const useMyReservations = (teamId: string, cursorId?: number) =>
  useCustomQuery(["myReservations", teamId, cursorId], () =>
    fetchMyReservations(teamId, cursorId)
  );

// 예약 취소
export const useCancelReservation = (teamId: string) =>
  useCustomMutation(
    ({
      reservationId,
      status,
    }: {
      reservationId: number;
      status: { status: "canceled" };
    }) => cancelReservation(teamId, reservationId, status),
    [["myReservations", teamId]]
  );

// 예약 리뷰 작성
export const useSubmitReservationReview = (teamId: string) =>
  useCustomMutation(
    ({
      reservationId,
      reviewData,
    }: {
      reservationId: number;
      reviewData: { rating: number; content: string };
    }) => submitReservationReview(teamId, reservationId, reviewData),
    [["myReservations", teamId]]
  );
