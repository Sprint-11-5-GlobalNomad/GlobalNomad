"use client";

import React, { useRef, useState, useEffect } from "react";
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

export default function ReservationPage() {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const [selectedActivityName, setSelectedActivityName] =
    useState<string>("체험을 선택하세요");
  const [events, setEvents] = useState<
    { title: string; start: string; classNames: string[] }[]
  >([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null
  );

  const { data: myActivitiesData } = useMyActivities();
  const myActivities = myActivitiesData ?? { activities: [] };

  const formattedSelectedDate =
    selectedDate && isValid(new Date(selectedDate))
      ? format(new Date(selectedDate), "yyyy-MM-dd")
      : "";

  const currentYear = String(currentDate.getFullYear());
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");

  // ✅ 초기 렌더링 시 API 호출 방지 (enabled 조건 추가)
  const { data: monthlyStats, refetch: refetchMonthlyStats } =
    useMonthlyReservationStats(
      selectedActivity ? selectedActivity : undefined,
      selectedActivity ? currentYear : undefined,
      selectedActivity ? currentMonth : undefined,
      { enabled: !!selectedActivity }
    );

  const { data: dailyStats, refetch: refetchDailyStats } =
    useDailyReservationStats(
      selectedActivity && formattedSelectedDate ? selectedActivity : undefined,
      selectedActivity && formattedSelectedDate
        ? formattedSelectedDate
        : undefined,
      { enabled: !!selectedActivity && !!formattedSelectedDate }
    );

  // ✅ 디버깅 로그 추가
  useEffect(() => {
    console.log("🔍 선택된 체험 ID:", selectedActivity);
    console.log("🔍 현재 연도:", currentYear);
    console.log("🔍 현재 월:", currentMonth);
  }, [selectedActivity, currentYear, currentMonth]);

  // ✅ 체험 선택 후 API 호출
  useEffect(() => {
    if (selectedActivity) {
      console.log("📡 월별 예약 현황 API 호출:", {
        activityId: selectedActivity,
        year: currentYear,
        month: currentMonth,
      });
      refetchMonthlyStats();
    }
  }, [selectedActivity]);

  useEffect(() => {
    if (selectedActivity && formattedSelectedDate) {
      console.log("📡 일별 예약 현황 API 호출:", {
        activityId: selectedActivity,
        date: formattedSelectedDate,
      });
      refetchDailyStats();
    }
  }, [selectedActivity, formattedSelectedDate]);

  // ✅ 월별 예약 데이터를 캘린더 이벤트로 변환
  useEffect(() => {
    if (Array.isArray(monthlyStats) && monthlyStats.length > 0) {
      setEvents(
        monthlyStats.map((stat) => ({
          title: `예약 ${stat.reservations?.confirmed ?? 0}`,
          start: format(new Date(stat.date), "yyyy-MM-dd"),
          classNames:
            stat.reservations?.confirmed > 0 ? ["confirmed"] : ["pending"],
        }))
      );
    } else {
      setEvents([]);
    }
  }, [monthlyStats]);

  const handleSelectActivity = (selected: string) => {
    const activity = myActivities.activities.find((a) => a.title === selected);
    if (activity) {
      console.log("✅ 사용자가 선택한 체험:", activity);
      setSelectedActivity(activity.id);
      setSelectedActivityName(activity.title);
    }
  };

  return (
    <div className="relative flex min-h-screen bg-gray-100 justify-center mt-[14.2rem] mb-[13rem]">
      <div>
        <UserProfileSidebar page="/profile/activity/reservation" />
      </div>
      <div className="w-[80rem] h-[81.3rem] ml-[2.4rem]">
        <h1 className="text-[3.2rem] font-bold mb-[3.8rem]">예약 현황</h1>
        <div className="mb-[3rem] relative w-full">
          <label className="absolute top-[-0.6rem] left-3 px-1 text-sm font-semibold text-nomad-black bg-white z-10">
            체험명
          </label>
          <div className="relative border border-gray-300 rounded-md">
            <SelectDropdown
              options={myActivities?.activities?.map((a) => a.title) ?? []}
              description={selectedActivityName}
              value={selectedActivityName}
              onChange={handleSelectActivity}
            />
          </div>
        </div>
        {selectedActivity && (
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            locale="en"
            headerToolbar={false}
            height="auto"
          />
        )}
      </div>
    </div>
  );
}
