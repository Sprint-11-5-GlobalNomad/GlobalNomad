// Reservation DTOs
export interface ReservationResponseDto {
  id: number;
  teamId: string;
  userId: number;
  activity: {
    bannerImageUrl: string;
    title: string;
    id: number;
  };
  nickname: string;
  scheduleId: number;
  status: "pending" | "confirmed" | "declined" | "canceled" | "completed";
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReservationBodyDto {
  scheduleId: number;
  headCount: number;
}

export interface FindReservationsByMonthQueryDto {
  year: string;
  month: string;
}

export interface UpdateMyReservationBodyDto {
  status: "canceled";
}
