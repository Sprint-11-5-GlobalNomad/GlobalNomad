"use client";

import React, { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useSearchParams } from "next/navigation";
import UserProfileSidebar from "@/components/common/layout/profile/my-page-card";
import SelectDropdown from "@/components/common/ui/dropdown/select-dropdown";
import {
  useMyActivities,
  useMonthlyReservationStats,
} from "@/app/react-query/my-activity-state";
import "@/styles/fullcalendar.css";
import Image from "next/image";

interface ActivityBasicDto {
  id: number;
  name?: string;
}

export default function ReservationPage() {
  const searchParams = useSearchParams();
  const calendarRef = useRef<FullCalendar | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const [events, setEvents] = useState<{ title: string; start: string }[]>([]);
  const [activityIdFromParams, setActivityIdFromParams] = useState<
    number | null
  >(null);

  const { data: activitiesData } = useMyActivities();
  const activities: ActivityBasicDto[] = activitiesData?.activities || [];

  // ✅ URL에서 체험 ID 가져오기 (searchParams 의존성 최소화)
  useEffect(() => {
    const activityId = searchParams.get("activityId");
    if (activityId) {
      setActivityIdFromParams(Number(activityId));
    }
  }, [searchParams]);

  // ✅ 체험 ID 설정 (불필요한 API 호출 방지)
  useEffect(() => {
    if (activityIdFromParams) {
      setSelectedActivity(activityIdFromParams);
    } else if (activities.length > 0) {
      setSelectedActivity(activities[0].id);
    }
  }, [activityIdFromParams, activities]);

  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");

  // ✅ `enabled` 조건 강화 → 불필요한 API 요청 방지
  const { data: reservationsData, isLoading: isReservationsLoading } =
    useMonthlyReservationStats(selectedActivity ?? 0, year, month, {
      enabled: selectedActivity !== null && selectedActivity > 0,
    });

  // ✅ `setEvents` 최적화 → 중복 실행 방지
  useEffect(() => {
    if (!reservationsData || reservationsData.length === 0) return;

    setEvents((prevEvents) => {
      const formattedEvents = reservationsData.map((reservation) => ({
        title: `예약 ${reservation.reservations.confirmed}`,
        start: reservation.date,
        className: "event-blue",
      }));

      return JSON.stringify(prevEvents) === JSON.stringify(formattedEvents)
        ? prevEvents
        : formattedEvents;
    });
  }, [reservationsData]);

  // 🔄 달력 이동 핸들러
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
    <div className="flex min-h-screen bg-gray-100 justify-center mt-[14.2rem] mb-[13rem]">
      {/* 왼쪽 사이드바 */}
      <div>
        <UserProfileSidebar page="/profile/activity/reservation" />
      </div>

      {/* ✅ 예약 데이터가 없는 경우 */}
      {!isReservationsLoading &&
      (!reservationsData || reservationsData.length === 0) ? (
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
        // ✅ 예약 데이터가 있는 경우
        <div className="w-[80rem] h-[81.3rem] ml-[2.4rem]">
          <h1 className="text-[3.2rem] font-bold mb-[3.8rem] text-start mt-0">
            예약 현황
          </h1>

          {/* ✅ 체험명 선택 드롭다운 */}
          <div className="mb-[3rem] relative w-full">
            <SelectDropdown
              options={activities.map(
                (activity) => activity.name ?? "이름 없음"
              )}
              description={
                activities.find((a) => a.id === selectedActivity)?.name ||
                "체험을 선택하세요"
              }
              onSelect={(value: string) => {
                const selected = activities.find((a) => a.name === value);
                if (selected) setSelectedActivity(selected.id);
              }}
            />
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
          <div className="bg-white rounded-lg shadow-md">
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              eventClick={(info) =>
                alert(`예약 정보:\n\n제목: ${info.event.title}`)
              }
              locale="ko"
              headerToolbar={false}
              height="auto"
              aspectRatio={1.35}
              dayMaxEventRows={true}
              fixedWeekCount={false}
              showNonCurrentDates={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}
