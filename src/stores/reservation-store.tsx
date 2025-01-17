import { create } from "zustand";
import {
  ReservationResponseDto,
  UpdateMyReservationBodyDto,
} from "./types/reservation-schemas";

interface ReservationState {
  userReservations: ReservationResponseDto[]; // 사용자의 예약 목록
  reservationDetail: ReservationResponseDto | null; // 특정 예약의 상세 정보
  reservationFilters: {
    status: UpdateMyReservationBodyDto["status"]; // 예약 상태 필터
  };
  setUserReservations: (reservations: ReservationResponseDto[]) => void; // 예약 목록 업데이트
  setReservationDetail: (reservation: ReservationResponseDto) => void; // 특정 예약 상세 정보 업데이트
  updateReservationFilters: (filters: {
    status: UpdateMyReservationBodyDto["status"];
  }) => void; // 예약 상태 필터 업데이트
}

export const useReservationStore = create<ReservationState>((set) => ({
  userReservations: [],
  reservationDetail: null,
  reservationFilters: {
    status: "canceled",
  },

  // 서버에서 사용자 예약 목록 데이터를 가져온 후 호출하여 상태를 업데이트합니다.
  setUserReservations: (reservations) =>
    set({ userReservations: reservations }),

  // 특정 예약의 상세 정보를 표시하거나 업데이트할 때 호출합니다.
  setReservationDetail: (reservation) =>
    set({ reservationDetail: reservation }),

  // 예약 상태 필터(예: "canceled")를 변경할 때 호출합니다.
  updateReservationFilters: (filters) =>
    set((state) => ({
      reservationFilters: { ...state.reservationFilters, ...filters },
    })),
}));
