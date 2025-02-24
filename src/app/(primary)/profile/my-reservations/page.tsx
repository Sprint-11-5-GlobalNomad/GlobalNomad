"use client";

import { useState, useEffect } from "react";
import FilterDropdown from "@/components/common/ui/dropdown/filter-dropdown";
import UserProfileSidebar from "@/components/common/layout/profile/my-page-card";
import { MyReservationCard } from "@/components/pages/profile-reservation/my-reservation-card";
import { EmptyContent } from "@/components/common/layout/profile/empty-content";
import { useInView } from "react-intersection-observer";
import { useInfiniteMyReservations } from "@/app/react-query/use-infinite-scroll";

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

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteMyReservations(selectedStatus);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const isEmpty =
    !data?.pages ||
    data.pages.length === 0 ||
    data.pages.every((page) => page.reservations.length === 0);

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
            onSelect={(option) => setSelectedFilter(option)}
          />
        </div>
        <div className="flex flex-col gap-[2.4rem] mt-[1.6rem] h-auto desktop:w-[79.2rem] tablet:w-[42.9rem] mobile:w-[34.4rem]">
          {isLoading ? (
            <div className="flex flex-col gap-[2.4rem]">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="mobile:w-[34.4rem] mobile:h-[12.8rem] desktop:w-[80rem] desktop:h-[20.4rem] tablet:w-[42.9rem] tablet:h-[15.6rem] rounded-[2.4rem] skeleton"
                />
              ))}
            </div>
          ) : isEmpty ? (
            <div className="mt-[5rem] mb-[4.1rem]">
              <EmptyContent />
            </div>
          ) : (
            data.pages.map((page) =>
              page.reservations.map((reservation, index) => {
                const lastPage = data?.pages?.[data.pages.length - 1];
                const isLastItem =
                  index === page.reservations.length - 1 && lastPage === page;

                return (
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
                    ref={isLastItem ? ref : null}
                    reviewSubmitted={reservation.reviewSubmitted}
                    selectedStatus={
                      reservation.reviewSubmitted ? selectedStatus : undefined
                    }
                  />
                );
              })
            )
          )}

          {isFetchingNextPage && (
            <div className="flex flex-col gap-[2.4rem]">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="mobile:w-[34.4rem] mobile:h-[12.8rem] desktop:w-[80rem] desktop:h-[20.4rem] tablet:w-[42.9rem] tablet:h-[15.6rem] rounded-[2.4rem] skeleton"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
