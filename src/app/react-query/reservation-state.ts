import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  fetchMyReservations,
  cancelReservation,
  submitReservationReview,
} from "../(primary)/api/my-reservations-api";

// 내 예약 리스트 조회
export const useMyReservations = (cursorId?: number, status?: string) =>
  useQuery({
    queryKey: ["myReservations", cursorId, status],
    queryFn: async () => {
      try {
        return await fetchMyReservations(cursorId, 10, status);
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMessage =
            typeof error.response?.data === "object" &&
            error.response?.data?.message
              ? error.response.data.message
              : "알 수 없는 오류가 발생했습니다.";

          switch (error.response?.status) {
            case 400:
              console.error(error.message);
              alert(errorMessage);
              break;
            case 401:
              console.error(
                "인증되지 않은 요청입니다. 로그인 후 다시 시도하세요."
              );
              alert(errorMessage);
              break;
            default:
              console.error(
                "내 예약 리스트를 가져오는 중 알 수 없는 오류가 발생했습니다.",
                error
              );
              alert(errorMessage);
          }
        }
        throw error;
      }
    },
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
    onError: (error: AxiosError) => {
      if (error.response?.status) {
        const errorMessage =
          (error.response.data as { message: string })?.message ||
          "알림 삭제 중 알 수 없는 오류가 발생했습니다.";

        switch (error.response?.status) {
          case 400:
            console.error(error.message);
            alert(errorMessage);
            break;
          case 401:
            console.error(
              "인증되지 않은 요청입니다. 로그인 후 다시 시도하세요."
            );
            alert(errorMessage);
            break;
          case 403:
            console.error("본인의 예약만 취소할 수 있습니다.");
            alert(errorMessage);
            break;
          default:
            console.error(
              "예약 취소 중 알 수 없는 오류가 발생했습니다.",
              error
            );
            alert(errorMessage);
        }
      }
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
    onError: (error: AxiosError) => {
      if (error.response?.status) {
        const errorMessage =
          (error.response.data as { message: string })?.message ||
          "알림 삭제 중 알 수 없는 오류가 발생했습니다.";

        switch (error.response?.status) {
          case 400:
            console.error(error.message);
            alert(errorMessage);
            break;
          case 401:
            console.error(
              "인증되지 않은 요청입니다. 로그인 후 다시 시도하세요."
            );
            alert(errorMessage);
            break;
          case 403:
            console.error("본인의 예약만 리뷰를 작성할 수 있습니다.");
            alert(errorMessage);
            break;
          case 404:
            console.error("존재하지 않는 예약입니다.");
            alert(errorMessage);
            break;
          case 409:
            console.error("이미 리뷰를 작성했습니다.");
            alert(errorMessage);
            break;
          default:
            console.error(
              "리뷰 작성 중 알 수 없는 오류가 발생했습니다.",
              error
            );
            alert(errorMessage);
        }
      }
    },
  });
};
