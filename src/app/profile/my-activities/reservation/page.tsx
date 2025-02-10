"use client";

import React, { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useSearchParams } from "next/navigation";
import UserProfileSidebar from "@/components/common/layout/profile/my-page-card";
import SelectDropdown from "@/components/common/ui/dropdown/select-dropdown";
import "@/styles/fullcalendar.css";
import Image from "next/image";
import ReservationModal from "./reservation-modal";
import { EventClickArg } from "@fullcalendar/core";

interface ActivityBasicDto {
  id: number;
  name?: string;
}

interface Reservation {
  id: number;
  nickname: string;
  status: "pending" | "confirmed" | "declined" | "completed";
  count: number;
  date: string;
  startTime: string;
  endTime: string;
}

export default function ReservationPage() {
  const searchParams = useSearchParams();
  const calendarRef = useRef<FullCalendar | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedActivity, setSelectedActivity] = useState<number | null>(1);
  const [events, setEvents] = useState<
    { title: string; start: string; status: string }[]
  >([]);
  const [selectedReservations, setSelectedReservations] = useState<
    Reservation[]
  >([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");

  // ✅ 임시 데이터 (예약 일정)
  const tempReservations: Reservation[] = [
    {
      id: 1,
      nickname: "사용자1",
      status: "pending",
      count: 10,
      date: "2025-02-09",
      startTime: "10:00",
      endTime: "11:00",
    },
    {
      id: 2,
      nickname: "사용자2",
      status: "confirmed",
      count: 5,
      date: "2025-02-10",
      startTime: "14:00",
      endTime: "15:00",
    },
    {
      id: 3,
      nickname: "사용자3",
      status: "pending",
      count: 8,
      date: "2025-02-11",
      startTime: "16:00",
      endTime: "17:00",
    },
    {
      id: 4,
      nickname: "사용자4",
      status: "confirmed",
      count: 6,
      date: "2025-02-12",
      startTime: "09:00",
      endTime: "10:00",
    },
  ];

  // ✅ URL에서 체험 ID 가져오기
  useEffect(() => {
    const activityId = searchParams.get("activityId");
    if (activityId) {
      setSelectedActivity(Number(activityId));
    }
  }, [searchParams]);

  // ✅ 이벤트 데이터 설정
  useEffect(() => {
    setEvents(
      tempReservations.map((reservation) => ({
        title: `${reservation.nickname} (${reservation.count})`,
        start: reservation.date,
        status: reservation.status,
      }))
    );
  }, []);

  // ✅ 예약이 지나면 자동으로 "완료" 상태로 변경
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedReservations((prev) =>
      prev.map((res) =>
        res.date < today ? { ...res, status: "completed" } : res
      )
    );
  }, []);

  // 🔄 달력 이동 버튼
  const handlePrev = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.prev();
      setCurrentDate(calendarApi.getDate());
    }
  };

  const handleNext = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.next();
      setCurrentDate(calendarApi.getDate());
    }
  };

  // 📌 이벤트 클릭 시 모달 열기 및 예약 정보 설정
  const handleEventClick = (info: EventClickArg) => {
    setSelectedDate(info.event.startStr);
    const filteredReservations = tempReservations
      .filter((res) => res.date === info.event.startStr)
      .sort((a, b) => b.id - a.id);
    setSelectedReservations(filteredReservations);
    setModalOpen(true);
  };

  // 📌 예약 승인/거절 기능
  const handleUpdateStatus = (id: number, status: "confirmed" | "declined") => {
    setSelectedReservations((prev) => {
      return prev.map((res) => {
        if (res.id === id) {
          return { ...res, status };
        }
        if (
          res.status === "confirmed" &&
          status === "confirmed" &&
          res.startTime === prev.find((r) => r.id === id)?.startTime
        ) {
          return { ...res, status: "declined" }; // 기존 승인된 예약 거절
        }
        return res;
      });
    });
  };

  return (
    <div className="relative flex min-h-screen bg-gray-100 justify-center mt-[14.2rem] mb-[13rem]">
      {/* 왼쪽 사이드바 */}
      <div>
        <UserProfileSidebar page="/profile/activity/reservation" />
      </div>

      {/* 예약 데이터가 없는 경우 */}
      {events.length === 0 ? (
        <div className="w-[80rem] h-[81.3rem] ml-[2.4rem]">
          <h1 className="text-[3.2rem] font-bold mb-[3.8rem] text-start mt-0">
            예약 현황
          </h1>
          <div className="flex flex-col items-center">
            <Image
              src="/image/empty.svg"
              alt="No reservations"
              width={240}
              height={240}
            />
            <p className="text-gray-600 text-lg mt-4">
              아직 등록한 체험이 없어요
            </p>
          </div>
        </div>
      ) : (
        <div className="w-[80rem] h-[81.3rem] ml-[2.4rem]">
          <h1 className="text-[3.2rem] font-bold mb-[3.8rem] text-start mt-0">
            예약 현황
          </h1>

          {/* 드롭다운 */}
          <div className="mb-[3rem] relative w-full">
            <label className="absolute top-[-0.6rem] left-3 px-1 text-sm font-semibold text-nomad-black bg-white z-10">
              체험명
            </label>
            <div className="relative border border-gray-300 rounded-md">
              <SelectDropdown
                options={["함께 배우면 즐거운 스트릿 댄스"]}
                description="함께 배우면 즐거운 스트릿 댄스"
                onSelect={() => {}}
                className="p-3"
              />
            </div>
          </div>

          {/* 네비게이션 버튼 */}
          <div className="flex justify-center items-center mb-6">
            <button onClick={handlePrev} className="text-2xl mx-[9.6rem]">
              «
            </button>
            <h2 className="text-[2rem] font-bold">
              {currentDate.toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
              })}
            </h2>
            <button onClick={handleNext} className="text-2xl mx-[9.6rem]">
              »
            </button>
          </div>

          {/* FullCalendar */}
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={handleEventClick}
            locale="en"
            headerToolbar={false}
            height="auto"
            aspectRatio={1.35}
            dayMaxEventRows={true}
            fixedWeekCount={false}
            showNonCurrentDates={false}
          />
        </div>
      )}

      {modalOpen && (
        <ReservationModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          activityId={selectedActivity!}
          selectedDate={selectedDate}
          reservations={selectedReservations}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
}
