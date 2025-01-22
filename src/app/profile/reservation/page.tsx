"use client";
import { useReservationStore } from "@/stores/reservation-store";
import { ReservationResponseDto } from "@/app/types/reservation-schemas";
import { useEffect } from "react";

export default function MyReservation() {
  const { userReservations, setUserReservations } = useReservationStore();

  // 일단 목데이터 넣어놨습니다.
  const fetchReservations = async () => {
    // API 요청 로직을 추가해야함
    const mockData: ReservationResponseDto[] = [
      {
        id: 1,
        teamId: "team123",
        userId: 101,
        activity: {
          bannerImageUrl: "https://example.com/banner1.jpg",
          title: "Activity 1",
          id: 1,
        },
        scheduleId: 203,
        status: "confirmed",
        reviewSubmitted: false,
        totalPrice: 5000,
        headCount: 2,
        date: "2025-01-20",
        startTime: "10:00",
        endTime: "12:00",
        createdAt: "2025-01-10T10:00:00Z",
        updatedAt: "2025-01-15T12:00:00Z",
      },
      {
        id: 2,
        teamId: "team456",
        userId: 102,
        activity: {
          bannerImageUrl: "https://example.com/banner2.jpg",
          title: "Activity 2",
          id: 2,
        },
        scheduleId: 204,
        status: "canceled",
        reviewSubmitted: true,
        totalPrice: 3000,
        headCount: 1,
        date: "2025-01-22",
        startTime: "14:00",
        endTime: "16:00",
        createdAt: "2025-01-11T10:00:00Z",
        updatedAt: "2025-01-18T12:00:00Z",
      },
    ];

    setUserReservations(mockData);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div>
      <div>
        <div>프로필 있는 자리</div>
        <div>
          <div>
            <div>예약 내역</div>
            <div>드롭다운 자리</div>
          </div>
          <div>
            {userReservations.length > 0 ? (
              userReservations.map((reservation) => (
                <div key={reservation.id}>
                  <div>예약 카드 컴포넌트 추가</div>
                </div>
              ))
            ) : (
              <p>EmptyActivity 컴포넌트 추가</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
