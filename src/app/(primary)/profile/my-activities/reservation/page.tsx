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
  const [currentDate, setCurrentDate] = useState(new Date());

  interface ReservationStats {
    reservations: {
      confirmed: number;
      pending: number;
      completed: number;
    };
  }

  // Activity ID 변환
  const getSafeActivityId = () => selectedActivity ?? undefined;

  // 날짜 변환
  const getFormattedDate = (date: string | null) =>
    date && isValid(new Date(date))
      ? format(new Date(date), "yyyy-MM-dd")
      : null;

  // API 호출
  const { data: myActivitiesData } = useMyActivities();
  const myActivities = myActivitiesData ?? { activities: [] };

  const formattedSelectedDate = getFormattedDate(selectedDate);

  const currentYear = String(new Date().getFullYear());
  const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0");

  const { data: monthlyStats, refetch: refetchMonthlyStats } =
    useMonthlyReservationStats(
      getSafeActivityId() ?? 0,
      currentYear,
      currentMonth
    );

  const { data: dailyStats = [], refetch: refetchDailyStats } =
    useDailyReservationStats(
      getSafeActivityId() ?? 0,
      formattedSelectedDate ?? ""
    );

  useEffect(() => {
    console.log(dailyStats);
  }, [dailyStats]);

  // 월간 예약 통계 갱신
  useEffect(() => {
    if (selectedActivity) {
      refetchMonthlyStats();
    }
  }, [selectedActivity, refetchMonthlyStats]);

  // 일별 예약 통계 갱신
  useEffect(() => {
    if (selectedActivity && formattedSelectedDate) {
      refetchDailyStats();
    }
  }, [selectedActivity, formattedSelectedDate, refetchDailyStats]);

  // 이벤트 상태 라벨 처리
  const getEventLabel = (stat: ReservationStats) => {
    if (stat.reservations?.confirmed > 0) {
      return {
        label: `승인 ${stat.reservations.confirmed}`,
        className: "confirmed-event",
      };
    }
    if (stat.reservations?.pending > 0) {
      return {
        label: `예약 ${stat.reservations.pending}`,
        className: "pending",
      };
    }
    if (stat.reservations?.completed > 0) {
      return {
        label: `완료 ${stat.reservations.completed}`,
        className: "completed",
      };
    }
    return { label: "", className: "" };
  };

  // 캘린더 이벤트 업데이트
  useEffect(() => {
    if (Array.isArray(monthlyStats) && monthlyStats.length > 0) {
      const newEvents = monthlyStats.map((stat) => {
        const { label, className } = getEventLabel(stat);
        return {
          title: label,
          start: format(new Date(stat.date), "yyyy-MM-dd"),
          classNames: ["fc-event", className],
          eventClassNaems: className,
          extendedProps: { activityId: stat.activityId },
        };
      });

      setEvents(newEvents);
    } else {
      setEvents([]);
    }
  }, [monthlyStats]);

  // 체험 선택 핸들러
  const handleSelectActivity = (selected: string) => {
    const activity = myActivities.activities.find((a) => a.title === selected);
    if (activity) {
      setSelectedActivity(activity.id);
      setSelectedActivityName(activity.title);
    }
  };
  console.log("myActivities 데이터:", myActivities);

  // 이벤트 클릭 핸들러
  const handleEventClick = async (info: EventClickArg) => {
    if (!selectedActivity || !info.event.start) return;

    const formattedDate = format(info.event.start, "yyyy-MM-dd");
    setSelectedDate(formattedDate);

    const updatedDailyStats =
      (await refetchDailyStats().then((res) => res?.data)) || [];

    if (!Array.isArray(updatedDailyStats)) return;

    const matchedReservation = updatedDailyStats.find(
      (stat) => stat.count?.pending > 0 || stat.count?.confirmed > 0
    );

    if (matchedReservation) {
      setSelectedScheduleId(matchedReservation.scheduleId);
      setModalOpen(true);
    }
  };

  //네비게이션 버튼
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
        {/* 드롭다운 */}
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
              eventClick={handleEventClick}
              dayMaxEventRows={true}
              aspectRatio={1.35}
              fixedWeekCount={false}
              showNonCurrentDates={false}
              eventClassNames={(arg) => {
                return ["fc-event", arg.event.extendedProps.className];
              }}
              dayCellClassNames={(arg) => {
                const dateString = format(arg.date, "yyyy-MM-dd");
                if (
                  events.some(
                    (event) =>
                      format(new Date(event.start), "yyyy-MM-dd") === dateString
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

      {modalOpen && selectedActivity && selectedScheduleId !== null && (
        <ReservationModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          activityId={selectedActivity}
          selectedDate={selectedDate ?? ""}
          scheduleId={selectedScheduleId}
        />
      )}
    </div>
  );
}
