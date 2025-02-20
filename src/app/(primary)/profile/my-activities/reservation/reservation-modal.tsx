"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  useReservationsBySchedule,
  useUpdateReservationStatus,
} from "@/app/react-query/my-activity-state";
import { format, parseISO, isValid } from "date-fns";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  activityId: number;
  selectedDate: string;
  scheduleId: number;
}

interface Reservation {
  id: number;
  nickname: string;
  status: "pending" | "confirmed" | "declined";
  headCount: number;
  startTime: string;
  endTime: string;
  scheduleId: number;
}

export default function ReservationModal({
  isOpen,
  onClose,
  activityId,
  selectedDate,
  scheduleId,
}: ReservationModalProps) {
  const updateReservationStatus = useUpdateReservationStatus();
  const [activeTab, setActiveTab] = useState<
    "pending" | "confirmed" | "declined"
  >("pending");
  const [selectedScheduleId, setSelectedScheduleId] =
    useState<number>(scheduleId);

  // 날짜 변환
  const parsedDate = useMemo(
    () => (selectedDate ? parseISO(selectedDate) : null),
    [selectedDate]
  );
  const formattedDate =
    parsedDate && isValid(parsedDate)
      ? format(parsedDate, "yyyy-MM-dd")
      : "유효하지 않은 날짜";

  // 예약 데이터 가져오기
  const {
    data: reservationsData,
    isLoading,
    refetch,
  } = useReservationsBySchedule(activityId ?? 0, selectedScheduleId, activeTab);

  // 최신순 정렬
  const reservations: Reservation[] = useMemo(() => {
    if (
      !reservationsData?.reservations ||
      !Array.isArray(reservationsData.reservations)
    ) {
      return [];
    }

    const sorted = [...reservationsData.reservations].sort(
      (a, b) => b.id - a.id
    );

    return sorted.map((res) => ({
      id: res.id ?? 0,
      nickname: res.nickname ?? "알 수 없음",
      status: res.status as "pending" | "confirmed" | "declined",
      headCount: res.headCount ?? 0,
      startTime: res.startTime ?? "",
      endTime: res.endTime ?? "",
      scheduleId: res.scheduleId ?? 0,
    }));
  }, [reservationsData]);

  //  상태별 예약 개수
  const reservationCounts = useMemo(() => {
    if (
      !reservationsData?.reservations ||
      !Array.isArray(reservationsData.reservations)
    ) {
      return { pending: 0, confirmed: 0, declined: 0 };
    }
    return {
      pending: reservationsData.reservations.filter(
        (res) => res.status === "pending"
      ).length,
      confirmed: reservationsData.reservations.filter(
        (res) => res.status === "confirmed"
      ).length,
      declined: reservationsData.reservations.filter(
        (res) => res.status === "declined"
      ).length,
    };
  }, [reservationsData]);

  // 현재 탭에 해당하는 예약만 필터링
  const filteredReservations: Reservation[] = useMemo(() => {
    return reservations.filter((res) => res.status === activeTab);
  }, [reservations, activeTab]);

  // 무한 스크롤 관련 state
  const [displayReservations, setDisplayReservations] = useState<Reservation[]>(
    []
  );
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const listInnerRef = useRef<HTMLDivElement | null>(null);

  // 페이지 단위로 보여줄 데이터 자르기
  useEffect(() => {
    const pageSize = 5;
    const allRes = filteredReservations;

    setDisplayReservations(allRes.slice(0, page * pageSize));
    setHasMore(allRes.length > page * pageSize);
  }, [filteredReservations, page]);

  // 스크롤 이벤트
  const handleScroll = () => {
    if (!listInnerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const currentRef = listInnerRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [hasMore]);

  // 모달이 열려 있지 않으면 렌더링 안 함
  if (!isOpen) return null;

  //  예약 상태 업데이트
  const handleUpdateStatus = async (
    id: number,
    status: "confirmed" | "declined"
  ): Promise<boolean> => {
    try {
      const latestReservations = await refetch().then(
        (res) => res.data?.reservations || []
      );
      const reservation = latestReservations.find((r) => r.id === id);

      if (!reservation) {
        alert("해당 예약을 찾을 수 없습니다.");
        return false;
      }

      if (reservation.status !== "pending") {
        alert("이미 처리된 예약입니다.");
        return false;
      }

      await updateReservationStatus.mutateAsync({
        activityId,
        reservationId: id,
        status,
      });
      return true;
    } catch (error) {
      console.error("예약 상태 변경 중 오류 발생:", error);
      alert("예약 상태 변경 중 오류가 발생했습니다.");
      return false;
    }
  };

  // 승인 시 다른 예약 거절 처리
  const handleConfirmReservation = async (reservationId: number) => {
    try {
      const isConfirmed = await handleUpdateStatus(reservationId, "confirmed");
      if (!isConfirmed) return;

      // 승인 후 최신 데이터 다시 가져오기
      const latestReservations = await refetch().then(
        (res) => res.data?.reservations || []
      );

      // 다른 pending 예약은 모두 거절 처리
      const pendingReservations = latestReservations.filter(
        (r) => r.id !== reservationId && r.status === "pending"
      );
      for (const res of pendingReservations) {
        await handleUpdateStatus(res.id, "declined");
      }
    } catch (error) {
      console.error("예약 승인 처리 중 오류 발생:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="bg-white p-6 rounded-[2.4rem] w-[42.9rem] h-[69.7rem] shadow-xl">
        {/* 모달 헤더 */}
        <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-3">
          <h1 className="text-[2.4rem] font-bold">예약 정보</h1>
          <button onClick={onClose} className="text-gray-500 text-lg">
            ✖
          </button>
        </div>

        {/* 탭 네비게이션 */}
        <div className="relative border-b border-gray-200 mb-4 text-lg font-semibold">
          <div className="flex">
            {[
              {
                key: "pending",
                label: "신청",
                count: reservationCounts.pending,
              },
              {
                key: "confirmed",
                label: "승인",
                count: reservationCounts.confirmed,
              },
              {
                key: "declined",
                label: "거절",
                count: reservationCounts.declined,
              },
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as typeof activeTab)}
                className={`relative flex py-3 px-4 text-[2rem] transition-colors duration-200 text-start ${
                  activeTab === key
                    ? "text-nomad-black font-bold"
                    : "text-gray-400"
                }`}
              >
                {label}
                <span className="ml-1 text-[2rem] font-bold">{count}</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-[3px] transition-all duration-200 z-10 ${
                    activeTab === key ? "bg-nomad-black" : "bg-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gray-300"></div>
        </div>

        {/*  예약 날짜 */}
        <div className="text-left text-nomad-black font-semi-bold text-[2rem] mb-[1.6rem] px-4 mt-[2.7rem]">
          예약 날짜
        </div>
        <div className="text-left text-nomad-black font-regular text-[2rem] mb-3 px-4">
          {formattedDate}
        </div>

        {/* 예약 시간 드롭다운 */}
        <div className="px-4 mb-4">
          <select
            value={selectedScheduleId}
            onChange={(e) => setSelectedScheduleId(Number(e.target.value))}
            className="w-full h-[5.6rem] p-2 border rounded-lg text-[1.6rem]"
          >
            {reservations.map((res, idx) => (
              <option key={`${res.scheduleId}-${idx}`} value={res.scheduleId}>
                {res.startTime} ~ {res.endTime}
              </option>
            ))}
          </select>
        </div>

        {/* 예약 내역 */}
        <div ref={listInnerRef} className="px-4 overflow-y-auto max-h-[40rem]">
          <h2 className="text-nomad-black font-semi-bold text-[2rem] mb-3 mt-[2.4rem]">
            예약 내역
          </h2>

          {isLoading ? (
            <p className="text-gray-500 text-center py-6">로딩 중...</p>
          ) : displayReservations.length > 0 ? (
            displayReservations.map((reservation, index) => (
              <div
                key={`${reservation.id}-${index}`}
                className="border border-gray-300 border-solid p-4 rounded-lg mb-3 bg-white"
              >
                {/* 예약 정보*/}
                <div>
                  <div className="flex gap-2 items-baseline mb-2">
                    <p className="text-[1.6rem] font-semi-bold text-gray-800">
                      닉네임
                    </p>
                    <p className="text-[1.6rem] font-semi-bold text-black">
                      {reservation.nickname}
                    </p>
                  </div>

                  <div className="flex gap-2 items-baseline">
                    <p className="text-[1.6rem] font-semi-bold text-gray-800">
                      인원
                    </p>
                    <p className="text-[1.6rem] font-semi-bold text-black">
                      {reservation.headCount}명
                    </p>
                  </div>
                </div>

                {activeTab === "pending" && (
                  <div className="flex justify-end gap-2 mt-3">
                    <button
                      onClick={() => handleConfirmReservation(reservation.id)}
                      className="py-2 bg-nomad-black text-white rounded-md hover:bg-nomad-black w-[8.2rem] h-[3.8rem] text-center text-[1.4rem]"
                    >
                      승인하기
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateStatus(reservation.id, "declined")
                      }
                      className="py-2 bg-white text-black rounded-md border border-nomad-black border-solid hover:bg-gray-200 w-[8.2rem] h-[3.8rem] text-[1.4rem]"
                    >
                      거절하기
                    </button>
                  </div>
                )}

                {reservation.status === "confirmed" && (
                  <div className="flex justify-end mt-3">
                    <div className="bg-[#FFF4E8] text-orange text-[1.4rem] text-center w-[8.2rem] h-[4.4rem] py-[1rem] px-[1.5rem] rounded-md font-bold flex items-center justify-center">
                      예약 승인
                    </div>
                  </div>
                )}

                {reservation.status === "declined" && (
                  <div className="flex justify-end mt-3">
                    <div className="bg-[#FFE4E0] text-red text-[1.4rem] text-center w-[8.2rem] h-[4.4rem] py-[1rem] px-[1.5rem] rounded-md font-bold flex items-center justify-center">
                      예약 거절
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-nomad-black text-[2.5rem] text-center py-6">
              해당 상태의 예약이 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
