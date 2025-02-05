"use client";

import { useState } from "react";
import { useMyReservations } from "@/app/react-query/reservation-state";
import FilterDropdown from "@/components/common/ui/dropdown/filter-dropdown";
import UserProfileSidebar from "@/components/common/layout/profile/my-page-card";
import { MyReservationCard } from "@/components/pages/profile-reservation/my-reservation-card";
import { EmptyActivity } from "@/components/common/layout/profile/empty-activity";

const filterOption: string[] = [
  "예약 완료",
  "예약 취소",
  "예약 승인",
  "예약 거절",
  "체험 완료",
];

const statusMapping: Record<string, string> = {
  "예약 완료": "pending",
  "예약 취소": "canceled",
  "예약 승인": "confirmed",
  "예약 거절": "declined",
  "체험 완료": "completed",
};

export default function MyReservation() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const selectedStatus =
    selectedFilter && statusMapping[selectedFilter]
      ? statusMapping[selectedFilter]
      : undefined;

  const { data, isLoading } = useMyReservations(undefined, selectedStatus);

  return (
    <div className="flex flex-row justify-center gap-[2.4rem] mt-[14.4rem] mobile:mt-[9rem] mb-[18.3rem] mobile:mb-[10rem]">
      <div className="mobile:hidden">
        <UserProfileSidebar page={"/profile/my-reservations"} />
      </div>
      <div className="flex flex-col">
        <div className=" flex flex-row justify-between items-center">
          <h2 className="text-[3.2rem] font-bold">예약 내역</h2>
          <FilterDropdown
            description={"필터"}
            options={filterOption}
            size={"large"}
            onSelect={(option) => setSelectedFilter(option)} // 필터 변경
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
            <div className="mt-[5rem] mb-[4.1rem]">
              <EmptyActivity />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
