import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchMyReservations,
  cancelReservation,
  submitReservationReview,
} from "../api/my-reservations-api";

// 내 예약 리스트 조회
export const useMyReservations = (cursorId?: number, status?: string) =>
  useQuery({
    queryKey: ["myReservations", cursorId, status],
    queryFn: () => fetchMyReservations(cursorId, 10, status),
  });

// 예약 취소
export const useCancelReservation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      reservationId,
      status,
    }: {
      reservationId: number;
      status: { status: "canceled" };
    }) => cancelReservation(reservationId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myReservations"] });
    },
    onError: (error: unknown) => {
      console.error("Failed to cancel reservation:", error);
    },
  });
};

// 예약 리뷰 작성
export const useSubmitReservationReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      reservationId,
      reviewData,
    }: {
      reservationId: number;
      reviewData: { rating: number; content: string };
    }) => submitReservationReview(reservationId, reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myReservations"] });
    },
    onError: (error: unknown) => {
      console.error("Failed to submit reservation review:", error);
    },
  });
};
