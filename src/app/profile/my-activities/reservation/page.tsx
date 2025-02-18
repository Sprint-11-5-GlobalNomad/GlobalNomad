"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import UserProfileSidebar from "@/components/common/layout/profile/my-page-card";
import SelectDropdown from "@/components/common/ui/dropdown/select-dropdown";
import "@/styles/fullcalendar.css";
import ReservationModal from "./reservation-modal";
import { EventClickArg } from "@fullcalendar/core";
import {
  useMyActivities,
  useMonthlyReservationStats,
  useDailyReservationStats,
} from "@/app/react-query/my-activity-state";
import { format, isValid } from "date-fns";
import Image from "next/image";

export default function ReservationPage() {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const [selectedActivityName, setSelectedActivityName] =
    useState<string>("체험을 선택하세요");
  const [events, setEvents] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null
  );
  const [currentDate, setCurrentDate] = useState(new Date());

  const { data: myActivitiesData } = useMyActivities();
  const myActivities = myActivitiesData ?? { activities: [] };

  // 날짜 포맷 변환 (유효한 경우 변환)
  const formattedSelectedDate = isValid(new Date(selectedDate))
    ? format(new Date(selectedDate), "yyyyMM")
    : "";

  const currentYear = String(new Date().getFullYear());
  const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0");

  const { data: monthlyStats, refetch: refetchMonthlyStats } =
    useMonthlyReservationStats(
      selectedActivity ?? undefined,
      currentYear,
      currentMonth
    );
  const { data: dailyStats = [], refetch: refetchDailyStats } =
    useDailyReservationStats(
      selectedActivity ?? undefined, //
      formattedSelectedDate
    );

  useEffect(() => {
    if (selectedActivity) {
      refetchMonthlyStats();
    }
  }, [selectedActivity, refetchMonthlyStats]);

  // 날짜 변경 시 dailyStats 호출
  const refetchStats = useCallback(() => {
    if (selectedActivity) {
      refetchMonthlyStats();
    }
  }, [selectedActivity, refetchMonthlyStats]);

  useEffect(() => {
    refetchStats();
  }, [refetchStats]);

  useEffect(() => {
    refetchStats();
  }, [refetchStats]);

  // monthlyStats를 기반 FullCalendar 이벤트 업데이트
  useEffect(() => {
    if (Array.isArray(monthlyStats) && monthlyStats.length > 0) {
      setEvents(
        monthlyStats
          .filter(
            (stat) =>
              stat.reservations?.confirmed > 0 || stat.reservations?.pending > 0
          )
          .map((stat) => ({
            title: `예약 ${stat.reservations.confirmed + stat.reservations.pending + (stat.reservations.completed ?? 0)}`,
            start: format(new Date(stat.date), "yyyyMMdd"),
            classNames: stat.reservations.confirmed
              ? ["confirmed"]
              : stat.reservations.pending
                ? ["pending"]
                : ["completed"],
            extendedProps: { activityId: stat.activityId },
          }))
      );
    } else {
      setEvents([]);
    }
  }, [monthlyStats]);

  //  체험 선택 핸들러
  const handleSelectActivity = (selected: string) => {
    const activity = myActivities.activities.find((a) => a.title === selected);
    if (activity) {
      setSelectedActivity(activity.id);
      setSelectedActivityName(activity.title);
    }
  };

  //  이벤트 클릭 시 API 요청 및 모달 열기
  const handleEventClick = async (info: EventClickArg) => {
    if (!selectedActivity) return;

    const formattedDate = format(info.event.start!, "yyyyMM");

    if (!selectedActivity || !formattedDate) return;

    await refetchDailyStats();

    const matchedReservation = dailyStats.find(
      (stat) =>
        stat.scheduleId &&
        format(new Date(stat.startTime), "yyyyMM") === formattedDate
    );
    if (!matchedReservation) return;

    setSelectedDate(formattedDate);
    setSelectedScheduleId(matchedReservation.scheduleId);
    setModalOpen(true);
  };

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
      <div>
        <UserProfileSidebar page="/profile/activity/reservation" />
      </div>
      <div className="w-[80rem] h-[81.3rem] ml-[2.4rem]">
        <h1 className="text-[3.2rem] font-bold mb-[3.8rem]">예약 현황</h1>

        {/* 드롭다운 */}
        <div className="mb-[3rem]">
          <SelectDropdown
            options={myActivities?.activities?.map((a) => a.title) ?? []}
            description={selectedActivityName}
            value={selectedActivityName}
            onChange={handleSelectActivity}
          />
        </div>

        {/* 예약 X */}
        {selectedActivity && events.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <Image
              src="/image/empty.svg"
              alt="No Activity"
              width={150}
              height={150}
            />
            <p className="text-lg text-gray-500 mt-4">
              아직 등록한 체험이 없어요
            </p>
          </div>
        ) : (
          selectedActivity && (
            <>
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
                headerToolbar={false}
                height="auto"
                locale="en"
                eventClick={handleEventClick}
                aspectRatio={1.35}
                dayMaxEventRows={true}
                fixedWeekCount={false}
                showNonCurrentDates={false}
              />
            </>
          )
        )}
      </div>

      {modalOpen && selectedActivity && selectedScheduleId !== null && (
        <ReservationModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          activityId={selectedActivity}
          selectedDate={selectedDate}
          scheduleId={selectedScheduleId}
        />
      )}
    </div>
  );
}
