import {
  fetchMyReservations,
  cancelReservation,
  submitReservationReview,
} from "../api/my-reservations-api";
import { useCustomMutation, useCustomQuery } from "./react-query-util";

// 내 예약 리스트 조회
export const useMyReservations = (cursorId?: number, status?: string) =>
  useCustomQuery(["myReservations", cursorId, status], () =>
    fetchMyReservations(cursorId, 10, status)
  );

// 예약 취소
export const useCancelReservation = () =>
  useCustomMutation(
    ({
      reservationId,
      status,
    }: {
      reservationId: number;
      status: { status: "canceled" };
    }) => cancelReservation(reservationId, status),
    [["myReservations"]]
  );

// 예약 리뷰 작성
export const useSubmitReservationReview = () =>
  useCustomMutation(
    ({
      reservationId,
      reviewData,
    }: {
      reservationId: number;
      reviewData: { rating: number; content: string };
    }) => submitReservationReview(reservationId, reviewData),
    [["myReservations"]]
  );
