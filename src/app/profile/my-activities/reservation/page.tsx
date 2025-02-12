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
  //임시데이터사용
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
    { title: string; start: string; classNames: string[] }[]
  >([]);
  const [selectedReservations, setSelectedReservations] = useState<
    Reservation[]
  >([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");

  // 임시 데이터
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

  useEffect(() => {
    const activityId = searchParams.get("activityId");
    if (activityId) {
      setSelectedActivity(Number(activityId));
    }
  }, [searchParams]);

  // 이벤트 데이터 설정
  useEffect(() => {
    setEvents(
      tempReservations.map((reservation) => ({
        title: `${reservation.nickname} (${reservation.count})`,
        start: reservation.date,
        classNames: [reservation.status],
      }))
    );
  }, []);

  // 예약이 지나면 자동으로 완료로 변경
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedReservations((prev) =>
      prev.map((res) =>
        res.date < today ? { ...res, status: "completed" } : res
      )
    );
  }, []);

  useEffect(() => {
    setTimeout(() => {
      document.querySelectorAll(".fc-daygrid-day").forEach((day) => {
        const hasEvent = day.querySelector(".fc-event");
        if (hasEvent) {
          day.classList.add("has-event");
        }
      });
    }, 500);
  }, [events]);

  // 달력 이동
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

  return (
    <div className="relative flex min-h-screen bg-gray-100 justify-center mt-[14.2rem] mb-[13rem]">
      {/* 왼쪽 사이드바 */}
      <div>
        <UserProfileSidebar page="/profile/activity/reservation" />
      </div>

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
          eventClick={(info: EventClickArg) => {
            setSelectedDate(info.event.startStr);
            const filteredReservations = tempReservations
              .filter((res) => res.date === info.event.startStr)
              .sort((a, b) => b.id - a.id);
            setSelectedReservations(filteredReservations);
            setModalOpen(true);
          }}
          locale="en"
          headerToolbar={false}
          height="auto"
          aspectRatio={1.35}
          dayMaxEventRows={true}
          fixedWeekCount={false}
          showNonCurrentDates={false}
        />
      </div>

      {modalOpen && (
        <ReservationModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          activityId={selectedActivity!}
          selectedDate={selectedDate}
          reservations={selectedReservations}
          onUpdateStatus={(id: number, status: "confirmed" | "declined") => {
            setSelectedReservations((prev) =>
              prev.map((res) => (res.id === id ? { ...res, status } : res))
            );
          }}
        />
      )}
    </div>
  );
}
