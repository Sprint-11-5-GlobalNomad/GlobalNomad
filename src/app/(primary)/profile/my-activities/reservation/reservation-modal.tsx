"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  useReservationsBySchedule,
  useUpdateReservationStatus,
} from "@/app/react-query/my-activity-state";
import { format, parseISO, isValid } from "date-fns";
import UseOutsideClick from "@/hooks/use-outside-click";

type ReservationStatus =
  | "pending"
  | "confirmed"
  | "declined"
  | "completed"
  | "canceled";

interface DailyReservationStat {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count?: {
    pending?: number;
    confirmed?: number;
    declined?: number;
  };
}

interface IReservation {
  id: number;
  nickname: string;
  status: ReservationStatus;
  headCount: number;
  startTime: string;
  endTime: string;
  scheduleId: number;
}

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  activityId: number;
  selectedDate: string;
  scheduleId: number;
  dailyStatsForThisDate: DailyReservationStat[];
  onUpdated?: () => void;
}

export default function ReservationModal({
  isOpen,
  onClose,
  activityId,
  selectedDate,
  scheduleId,
  dailyStatsForThisDate,
  onUpdated,
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
  const formattedDate = useMemo(() => {
    return parsedDate && isValid(parsedDate)
      ? format(parsedDate, "yyyy년 MM월 dd일")
      : "유효하지 않은 날짜";
  }, [parsedDate]);

  // 모달내부상태
  const [currentScheduleId, setCurrentScheduleId] = useState(scheduleId);
  useEffect(() => {
    setCurrentScheduleId(scheduleId);
  }, [scheduleId]);

  const [localDailyStats, setLocalDailyStats] = useState<
    DailyReservationStat[]
  >(dailyStatsForThisDate);
  useEffect(() => {
    setLocalDailyStats(dailyStatsForThisDate);
  }, [dailyStatsForThisDate]);

  // 날짜 전체 탭 갯수
  const totalTabCounts = useMemo(() => {
    if (!Array.isArray(localDailyStats)) {
      return { pending: 0, confirmed: 0, declined: 0 };
    }
    return localDailyStats.reduce(
      (acc, stat) => {
        acc.pending += stat.count?.pending ?? 0;
        acc.confirmed += stat.count?.confirmed ?? 0;
        acc.declined += stat.count?.declined ?? 0;
        return acc;
      },
      { pending: 0, confirmed: 0, declined: 0 }
    );
  }, [localDailyStats]);

  // 예약 목록 요청
  const {
    data: reservationsData,
    isLoading,
    refetch,
  } = useReservationsBySchedule(activityId, currentScheduleId, activeTab);

  // 목록 정렬
  const reservations = useMemo<IReservation[]>(() => {
    if (!reservationsData?.reservations) return [];
    return [...reservationsData.reservations].sort((a, b) => b.id - a.id);
  }, [reservationsData]);

  // 무한 스크롤
  const listInnerRef = useRef<HTMLDivElement | null>(null);
  const [displayReservations, setDisplayReservations] = useState<
    IReservation[]
  >([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const pageSize = 5;
    const slice = reservations.slice(0, page * pageSize);
    setDisplayReservations(slice);
    setHasMore(reservations.length > slice.length);
  }, [reservations, page]);

  const handleScroll = () => {
    if (!listInnerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const el = listInnerRef.current;
    if (el) el.addEventListener("scroll", handleScroll);
    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore]);

  // 예약 상태 업데이트 로직
  const handleUpdateStatus = async (
    id: number,
    newStatus: "confirmed" | "declined"
  ): Promise<boolean> => {
    try {
      const latest = await refetch().then(
        (res) => res.data?.reservations || []
      );
      const found = (latest as IReservation[]).find((r) => r.id === id);
      if (!found) {
        alert("해당 예약을 찾을 수 없습니다.");
        return false;
      }
      if (found.status !== "pending") {
        alert("이미 처리된 예약입니다.");
        return false;
      }

      await updateReservationStatus.mutateAsync({
        activityId,
        reservationId: id,
        status: newStatus,
      });
      return true;
    } catch (error) {
      console.error("예약 상태 변경 오류:", error);
      alert("예약 상태 변경 중 오류가 발생했습니다.");
      return false;
    }
  };

  // 승인하기
  const handleConfirmReservation = async (reservationId: number) => {
    if (!confirm("예약을 승인하시겠습니까?")) return;
    const success = await handleUpdateStatus(reservationId, "confirmed");
    if (!success) return;
    alert("승인되었습니다.");

    // 승인 시, 다른 대기중 예약 모두 거절
    const latest = await refetch().then((r) => r.data?.reservations || []);
    const restPending = (latest as IReservation[]).filter(
      (r) => r.id !== reservationId && r.status === "pending"
    );
    for (const p of restPending) {
      await handleUpdateStatus(p.id, "declined");
    }

    // 탭 업데이트
    setLocalDailyStats((prev) =>
      prev.map((stat) => {
        if (stat.scheduleId !== currentScheduleId) return stat;
        const pendingCount = stat.count?.pending ?? 0;
        if (pendingCount === 0) return stat;

        const newConfirmed = (stat.count?.confirmed ?? 0) + 1;
        const newDeclined = (stat.count?.declined ?? 0) + (pendingCount - 1);
        return {
          ...stat,
          count: {
            ...stat.count,
            pending: 0,
            confirmed: newConfirmed,
            declined: newDeclined,
          },
        };
      })
    );

    onUpdated?.();
  };

  // 거절하기
  const handleDeclineReservation = async (reservationId: number) => {
    if (!confirm("예약을 거절하시겠습니까?")) return;
    const success = await handleUpdateStatus(reservationId, "declined");
    if (!success) return;
    alert("거절되었습니다.");

    // 탭 업데이트
    setLocalDailyStats((prev) =>
      prev.map((stat) => {
        if (stat.scheduleId !== currentScheduleId) return stat;
        const pendingCount = stat.count?.pending ?? 0;
        if (pendingCount === 0) return stat;
        return {
          ...stat,
          count: {
            ...stat.count,
            pending: pendingCount - 1,
            declined: (stat.count?.declined ?? 0) + 1,
          },
        };
      })
    );

    onUpdated?.();
  };

  const modalRef = UseOutsideClick(() => {
    if (isOpen) onClose();
  });

  // 모달이 열려 있지 않으면 렌더링 X
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-[2.4rem] w-[42.9rem] h-[69.7rem] shadow-xl"
      >
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-3">
          <h1 className="text-[2.4rem] font-bold">예약 정보</h1>
          <button onClick={onClose} className="text-gray-900 text-[3rem]">
            ✖
          </button>
        </div>

        {/* 탭  */}
        <div className="relative border-b border-gray-200 mb-4 text-lg font-semibold">
          <div className="flex">
            {(
              [
                {
                  key: "pending",
                  label: "신청",
                  count: totalTabCounts.pending,
                },
                {
                  key: "confirmed",
                  label: "승인",
                  count: totalTabCounts.confirmed,
                },
                {
                  key: "declined",
                  label: "거절",
                  count: totalTabCounts.declined,
                },
              ] as const
            ).map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => {
                  setActiveTab(key);
                  setPage(1);
                }}
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

        {/* 시간 드롭다운 */}
        <div className="px-4 mb-4">
          <select
            value={currentScheduleId}
            onChange={(e) => {
              const newId = Number(e.target.value);
              setCurrentScheduleId(newId);
              setPage(1);
            }}
            className="w-full h-[5.6rem] p-2 border rounded-lg text-[1.6rem] border-solid border-nomad-black"
          >
            {localDailyStats.map((stat) => (
              <option key={stat.scheduleId} value={stat.scheduleId}>
                {stat.startTime} ~ {stat.endTime}
              </option>
            ))}
          </select>
        </div>

        {/* 예약 목록 */}
        <div ref={listInnerRef} className="px-4 overflow-y-auto max-h-[40rem]">
          <h2 className="text-nomad-black font-semi-bold text-[2rem] mb-3 mt-[2.4rem]">
            예약 내역
          </h2>

          {isLoading ? (
            <p className="text-gray-500 text-center py-6">로딩 중...</p>
          ) : displayReservations.length > 0 ? (
            displayReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="border border-gray-300 border-solid p-4 rounded-lg mb-3 bg-white"
              >
                <div>
                  <div className="flex gap-2 items-baseline mb-[1rem]">
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

                {/* 대기중 예약일 때만 승인/거절 버튼 노출 */}
                {activeTab === "pending" && (
                  <div className="flex justify-end gap-2 mt-3">
                    <button
                      onClick={() => handleConfirmReservation(reservation.id)}
                      className="py-2 bg-nomad-black text-white rounded-md hover:bg-nomad-black w-[8.2rem] h-[3.8rem] text-center text-[1.4rem]"
                    >
                      승인하기
                    </button>
                    <button
                      onClick={() => handleDeclineReservation(reservation.id)}
                      className="py-2 bg-white text-black rounded-md border border-solid border-nomad-black hover:bg-gray-200 w-[8.2rem] h-[3.8rem] text-[1.4rem]"
                    >
                      거절하기
                    </button>
                  </div>
                )}

                {/* 승인 상태 */}
                {reservation.status === "confirmed" && (
                  <div className="flex justify-end mt-3">
                    <div className="bg-[#FFF4E8] text-orange text-[1.4rem] text-center w-[8.2rem] h-[4.4rem] py-[1rem] px-[1.5rem] rounded-[2.65rem] font-bold flex items-center justify-center">
                      예약 승인
                    </div>
                  </div>
                )}

                {/* 거절 상태 */}
                {reservation.status === "declined" && (
                  <div className="flex justify-end mt-3">
                    <div className="bg-[#FFE4E0] text-red text-[1.4rem] text-center w-[8.2rem] h-[4.4rem] py-[1rem] px-[1.5rem] rounded-[2.65rem] font-bold flex items-center justify-center">
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
