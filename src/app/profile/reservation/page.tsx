"use client";

import { useMyReservations } from "@/app/react-query/reservation-state";
import FilterDropdown from "@/components/common/ui/filter-dropdown";
import { EmptyActivity } from "@/components/empty-activity";
import UserProfileSidebar from "@/components/my-page-card";
import { MyReservationCard } from "@/components/my-reservation-card";

const filterOption: string[] = [
  "예약 완료",
  "예약 취소",
  "예약 승인",
  "예약 거절",
  "체험 완료",
];

export default function MyReservation() {
  const { data, isLoading } = useMyReservations();

  return (
    <div className="flex flex-row justify-center min-h-[700px] h-auto mt-[7.2rem]">
      <UserProfileSidebar />
      <div className="pl-[2.4rem]">
        <div className=" flex flex-row justify-between items-center">
          <h2 className="text-[3.2rem]">예약 내역</h2>
          <FilterDropdown
            description={"필터"}
            options={filterOption}
            size={"large"}
          />
        </div>
        <div className="flex flex-col gap-[2.4rem] mt-[1.6rem] h-auto desktop:w-[79.2rem] tablet:w-[42.9rem] mobile:w-[34.4rem]">
          {isLoading ? (
            <p>로딩 중...</p>
          ) : data && data.reservations.length > 0 ? (
            data.reservations.map((reservation) => (
              <MyReservationCard
                key={reservation.id}
                activity={reservation.activity}
                status={reservation.status}
                date={reservation.date}
                startTime={reservation.startTime}
                endTime={reservation.endTime}
                headCount={reservation.headCount}
                totalPrice={reservation.totalPrice}
                id={reservation.id}
              />
            ))
          ) : (
            <div className="mt-[5rem]">
              <EmptyActivity />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
