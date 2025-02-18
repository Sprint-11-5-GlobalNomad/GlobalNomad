"use client";

import React, { useState, useMemo } from "react";
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
  scheduleId: number; // 🔥 예약 시간대 ID 추가
}

interface Reservation {
  id: number;
  nickname: string;
  status: "pending" | "confirmed" | "declined";
  count: number;
  startTime: string;
  endTime: string;
}

export default function ReservationModal({
  isOpen,
  onClose,
  activityId,
  selectedDate,
  scheduleId, // 🔥 예약 시간대 ID 추가
}: ReservationModalProps) {
  const updateReservationStatus = useUpdateReservationStatus();
  const [activeTab, setActiveTab] = useState<
    "pending" | "confirmed" | "declined"
  >("pending");

  // 날짜 변환
  const parsedDate = useMemo(
    () => (selectedDate ? parseISO(selectedDate) : null),
    [selectedDate]
  );
  const formattedDate =
    parsedDate && isValid(parsedDate)
      ? format(parsedDate, "yyyy-MM-dd")
      : "유효하지 않은 날짜";

  const {
    data: reservations,
    isLoading,
    refetch,
  } = useReservationsBySchedule(activityId ?? 0, scheduleId, activeTab); // 🔥 scheduleId 추가

  if (!isOpen) return null;

  // 현재 선택된 예약 리스트 필터링
  const filteredReservations: Reservation[] = reservations ?? [];

  // 예약 상태 업데이트 함수
  const handleUpdateStatus = async (
    id: number,
    status: "confirmed" | "declined"
  ) => {
    await updateReservationStatus.mutateAsync({
      activityId,
      reservationId: id,
      status,
    });
    refetch(); // 업데이트 후 데이터 새로고침
  };

  // 확정하기 버튼 클릭 시 다른 예약 자동 거절
  const handleConfirmReservation = async (reservationId: number) => {
    await handleUpdateStatus(reservationId, "confirmed");

    // 해당 시간대의 다른 예약들을 거절 처리
    const otherReservations = filteredReservations.filter(
      (res) => res.id !== reservationId
    );
    for (const res of otherReservations) {
      await handleUpdateStatus(res.id, "declined");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[42.9rem] h-[69.7rem] shadow-xl">
        {/* 모달 헤더 */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-[2.4rem] font-bold">예약 정보</h1>
          <button onClick={onClose} className="text-gray-500 text-lg">
            ✖
          </button>
        </div>

        {/* 탭 네비게이션 */}
        <div className="relative border-b border-gray-200 mb-4 text-lg font-semibold">
          <div className="flex">
            {["pending", "confirmed", "declined"].map((tab) => (
              <button
                key={tab}
                onClick={() =>
                  setActiveTab(tab as "pending" | "confirmed" | "declined")
                }
                className={`relative py-3 px-4 text-[2rem] transition-colors duration-200 ${
                  activeTab === tab
                    ? "text-nomad-black font-bold"
                    : "text-gray-400"
                }`}
              >
                {tab === "pending"
                  ? `신청 ${filteredReservations.length}`
                  : tab === "confirmed"
                    ? `승인 ${filteredReservations.length}`
                    : `거절 ${filteredReservations.length}`}

                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-nomad-black z-10"></span>
                )}
              </button>
            ))}
          </div>
          <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gray-200 z-0"></span>
        </div>

        {/* 예약 날짜 */}
        <div className="text-left text-nomad-black font-semi-bold text-[2rem] mb-[1.6rem] px-4 mt-[2.7rem]">
          예약 날짜
        </div>
        <div className="text-left text-nomad-black font-regular text-[2rem] mb-3 px-4">
          {formattedDate}
        </div>

        {/* 예약 내역 */}
        <div className="px-4">
          <h2 className="text-nomad-black font-semi-bold text-[2rem] mb-3 mt-[2.4rem]">
            예약 내역
          </h2>

          {isLoading ? (
            <p className="text-gray-500 text-center py-6">로딩 중...</p>
          ) : filteredReservations.length > 0 ? (
            filteredReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="border p-4 rounded-lg mb-3 bg-gray-50"
              >
                {/* 예약 시간 */}
                <p className="text-sm font-semi-bold text-gray-600">
                  {reservation.startTime} ~ {reservation.endTime}
                </p>

                {/* 닉네임, 인원 */}
                <p className="font-semi-bold text-gray-800 mt-1">
                  닉네임: {reservation.nickname}
                </p>
                <p className="text-gray-600 text-sm">
                  인원 {reservation.count}명
                </p>

                {/* 승인/거절 버튼 */}
                {activeTab === "pending" && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleConfirmReservation(reservation.id)}
                      className="flex-1 py-2 bg-nomad-black text-white rounded-md hover:bg-nomad-black"
                    >
                      확정하기
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateStatus(reservation.id, "declined")
                      }
                      className="flex-1 py-2 bg-white text-gray-700 border rounded-md hover:bg-gray-100"
                    >
                      거절하기
                    </button>
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
