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

  // 데이터가 올바른지 체크 후 배열로 변환
  const reservations: Reservation[] = useMemo(() => {
    if (!reservationsData || !reservationsData.reservations) return [];

    // 배열인지 확인 후 변환
    if (Array.isArray(reservationsData.reservations)) {
      return reservationsData.reservations.map((res) => ({
        id: res.id ?? 0, // ID 기본값 추가
        nickname: res.nickname ?? "알 수 없음", // 닉네임 기본값 추가
        status: res.status as "pending" | "confirmed" | "declined", // 상태 변환 (TS 오류 방지)
        headCount: res.headCount ?? 0, // 기본 인원 수 설정
        startTime: res.startTime ?? "", // 시작 시간 기본값 설정
        endTime: res.endTime ?? "", // 종료 시간 기본값 설정
        scheduleId: res.scheduleId ?? 0, // 스케줄 ID 기본값 추가
      }));
    }

    return [];
  }, [reservationsData]);

  // 상태별 예약 개수
  const reservationCounts = useMemo(() => {
    if (!reservationsData || !Array.isArray(reservationsData.reservations)) {
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

  if (!isOpen) return null;

  // 현재 선택된 탭의 예약 리스트 필터링
  const filteredReservations: Reservation[] = reservations.filter(
    (res) => res.status === activeTab
  );

  // 승인하기 버튼 클릭 시 다른 예약 자동 거절
  const handleUpdateStatus = async (
    id: number,
    status: "confirmed" | "declined"
  ): Promise<boolean> => {
    try {
      const latestReservations = await refetch().then(
        (res) => res.data?.reservations || []
      );
      const reservation = latestReservations.find((res) => res.id === id);

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

  // 승인 버튼 클릭 시, 다른 예약들을 자동 거절 처리
  const handleConfirmReservation = async (reservationId: number) => {
    try {
      // 선택한 예약을 승인
      const isConfirmed = await handleUpdateStatus(reservationId, "confirmed");
      if (!isConfirmed) return;

      // 최신 데이터 가져오기
      const latestReservations = await refetch().then(
        (res) => res.data?.reservations || []
      );

      // 다른 예약 중 'pending' 상태인 것만 거절
      const pendingReservations = latestReservations.filter(
        (res) => res.id !== reservationId && res.status === "pending"
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
                onClick={() =>
                  setActiveTab(key as "pending" | "confirmed" | "declined")
                }
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

        {/* 예약 날짜 */}
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
            {reservations.map((res, index) => (
              <option key={`${res.scheduleId}-${index}`} value={res.scheduleId}>
                {res.startTime} ~ {res.endTime}
              </option>
            ))}
          </select>
        </div>

        {/* 예약 내역 */}
        <div className="px-4">
          <h2 className="text-nomad-black font-semi-bold text-[2rem] mb-3 mt-[2.4rem]">
            예약 내역
          </h2>

          {isLoading ? (
            <p className="text-gray-500 text-center py-6">로딩 중...</p>
          ) : filteredReservations.length > 0 ? (
            filteredReservations.map((reservation, index) => (
              <div
                key={`${reservation.id}-${index}`}
                className="border border-gray-300 border-solid p-4 rounded-lg mb-3 bg-white "
              >
                <p className="text-[1.6rem] font-semi-bold text-gray-800">
                  닉네임: {reservation.nickname}
                </p>
                <p className="text-[1.6rem] font-semi-bold pt-[1rem] text-gray-800">
                  인원 {reservation.headCount}명
                </p>
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
