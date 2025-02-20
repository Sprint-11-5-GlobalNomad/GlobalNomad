"use client";

import React, { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import UserProfileSidebar from "@/components/common/layout/profile/my-page-card";
import SelectDropdown from "@/components/common/ui/dropdown/select-dropdown";
import ReservationModal from "./reservation-modal";
import { EventClickArg, EventInput } from "@fullcalendar/core";
import {
  useMyActivities,
  useMonthlyReservationStats,
  useDailyReservationStats,
} from "@/app/react-query/my-activity-state";
import { format, isValid } from "date-fns";
import Image from "next/image";
import "@/styles/fullcalendar.css";

/** 스케줄 정보 타입 */
type IDailyStat = {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count?: {
    pending?: number;
    confirmed?: number;
    completed?: number;
    declined?: number;
  };
};

/** 월간 예약 통계 타입 */
interface IMonthlyStat {
  date?: string;
  activityId?: number;
  reservations: {
    confirmed: number;
    pending: number;
    completed: number;
  };
}

export default function ReservationPage() {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const [selectedActivityName, setSelectedActivityName] =
    useState<string>("체험을 선택하세요");
  const [events, setEvents] = useState<EventInput[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null
  );
  const [dailyStatsForModal, setDailyStatsForModal] = useState<IDailyStat[]>(
    []
  );
  const [currentDate, setCurrentDate] = useState(new Date());
  const getSafeActivityId = () => selectedActivity ?? undefined;

  const getFormattedDate = (date: string | null) =>
    date && isValid(new Date(date))
      ? format(new Date(date), "yyyy-MM-dd")
      : null;

  const { data: myActivitiesData } = useMyActivities();
  const myActivities = myActivitiesData ?? { activities: [] };

  const currentYear = String(new Date().getFullYear());
  const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0");

  // 월간 예약 통계
  const { data: monthlyStats, refetch: refetchMonthlyStats } =
    useMonthlyReservationStats(
      getSafeActivityId() ?? 0,
      currentYear,
      currentMonth
    );

  // 일별 스케줄 조회
  const { refetch: refetchDailyStats } = useDailyReservationStats(
    getSafeActivityId() ?? 0,
    getFormattedDate(selectedDate) ?? ""
  );

  // 체험 바뀌면 월별 예약불러오기기
  useEffect(() => {
    if (selectedActivity) {
      refetchMonthlyStats();
    }
  }, [selectedActivity, refetchMonthlyStats]);

  // 월별 예약
  const getEventLabel = (stat: IMonthlyStat) => {
    if (stat.reservations.confirmed > 0) {
      return {
        label: `승인 ${stat.reservations.confirmed}`,
        className: "confirmed-event",
      };
    }
    if (stat.reservations.pending > 0) {
      return {
        label: `예약 ${stat.reservations.pending}`,
        className: "pending",
      };
    }
    if (stat.reservations.completed > 0) {
      return {
        label: `완료 ${stat.reservations.completed}`,
        className: "completed",
      };
    }
    return { label: "", className: "" };
  };

  useEffect(() => {
    if (Array.isArray(monthlyStats) && monthlyStats.length > 0) {
      const newEvents = monthlyStats.map((stat) => {
        const { label, className } = getEventLabel(stat);
        return {
          title: label,
          start: stat.date ? format(new Date(stat.date), "yyyy-MM-dd") : "",
          classNames: ["fc-event", className],
          extendedProps: { activityId: stat.activityId },
        };
      });
      setEvents(newEvents);
    } else {
      setEvents([]);
    }
  }, [monthlyStats]);

  // 체험명 선택
  const handleSelectActivity = (selected: string) => {
    const activity = myActivities.activities.find((a) => a.title === selected);
    if (activity) {
      setSelectedActivity(activity.id);
      setSelectedActivityName(activity.title);
    }
  };

  const handleEventClick = async (info: EventClickArg) => {
    if (!selectedActivity || !info.event.start) return;

    const clickedDate = format(info.event.start, "yyyy-MM-dd");
    setSelectedDate(clickedDate);

    const updatedDailyStats =
      ((await refetchDailyStats().then((res) => res?.data)) as IDailyStat[]) ||
      [];

    const matched = updatedDailyStats.find(
      (stat) =>
        (stat.count?.pending ?? 0) > 0 || (stat.count?.confirmed ?? 0) > 0
    );
    if (matched) {
      setSelectedScheduleId(matched.scheduleId);
    } else if (updatedDailyStats.length > 0) {
      setSelectedScheduleId(updatedDailyStats[0].scheduleId);
    } else {
      setSelectedScheduleId(null);
    }
    setDailyStatsForModal(updatedDailyStats);
    setModalOpen(true);
  };

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
    <div className="relative flex min-h-screen bg-gray-100 justify-center mt-[14.2rem] pb-[30rem]">
      <div>
        <UserProfileSidebar page="/profile/activity/reservation" />
      </div>
      <div className="w-[80rem] h-[81.3rem] ml-[2.4rem]">
        <h1 className="text-[3.2rem] font-bold mb-[3.8rem]">예약 현황</h1>

        {/* 체험 드롭다운 */}
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

        {/* 달력 */}
        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Image
              src="/image/empty.svg"
              alt="empty"
              width={150}
              height={150}
            />
            <p className="text-gray-500 mt-4 text-[1.8rem]">
              아직 등록한 체험이 없어요
            </p>
          </div>
        ) : (
          <>
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

            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              height="auto"
              locale="en"
              headerToolbar={false}
              dayMaxEventRows={true}
              aspectRatio={1.35}
              fixedWeekCount={false}
              showNonCurrentDates={false}
              eventClick={handleEventClick}
              eventClassNames={(arg) => {
                return ["fc-event", arg.event.extendedProps.className];
              }}
              dayCellClassNames={(arg) => {
                if (
                  events.some(
                    (event) =>
                      event.start === arg.date.toISOString().split("T")[0]
                  )
                ) {
                  return ["has-event"];
                }
                return [];
              }}
            />
          </>
        )}
      </div>

      {/* 모달 */}
      {modalOpen && selectedActivity && selectedScheduleId !== null && (
        <ReservationModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          activityId={selectedActivity}
          selectedDate={selectedDate ?? ""}
          scheduleId={selectedScheduleId}
          dailyStatsForThisDate={dailyStatsForModal}
          onUpdated={() => {
            refetchMonthlyStats();
          }}
        />
      )}
    </div>
  );
}
