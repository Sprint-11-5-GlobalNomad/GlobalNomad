"use client";

import React, { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import UserProfileSidebar from "@/components/common/layout/profile/my-page-card";
import SelectDropdown from "@/components/common/ui/dropdown/select-dropdown";
import "@/styles/fullcalendar.css";
import Image from "next/image";
import ReservationModal from "./reservation-modal";
import { EventClickArg } from "@fullcalendar/core";
import {
  useMonthlyReservationStats,
  useMyActivities,
} from "@/app/react-query/my-activity-state";

export default function ReservationPage() {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const [events, setEvents] = useState<
    { title: string; start: string; classNames: string[] }[]
  >([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");

  // 🎯 체험 목록 불러오기
  const {
    data: activitiesData,
    isLoading: isActivitiesLoading,
    error: activitiesError,
  } = useMyActivities();

  const activities = activitiesData?.activities ?? [];

  // 🎯 체험 선택 후 월별 예약 현황 불러오기
  const {
    data: monthlyReservations,
    isLoading: isMonthlyLoading,
    refetch,
    error: reservationsError,
  } = useMonthlyReservationStats(selectedActivity ?? 0, year, month, {
    enabled: !!selectedActivity, // 체험 선택 후 API 호출
  });

  // 🎯 체험 선택 시 예약 데이터 갱신
  const handleActivityChange = (activityId: number) => {
    setSelectedActivity(activityId);
    refetch();
  };

  // 🎯 월별 예약 데이터를 FullCalendar에 반영
  useEffect(() => {
    if (monthlyReservations) {
      setEvents(
        monthlyReservations.map((reservation) => ({
          title: `예약 ${reservation.reservations.pending}, 승인 ${reservation.reservations.confirmed}, 완료 ${reservation.reservations.completed}`,
          start: reservation.date,
          classNames: ["reservation-event"],
        }))
      );
    } else {
      setEvents([]);
    }
  }, [monthlyReservations]);

  // 🎯 달력 이전/다음 월 이동
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

        {/* 드롭다운 - 체험 선택 */}
        <div className="mb-[3rem] relative w-full">
          <label className="absolute top-[-0.6rem] left-3 px-1 text-sm font-semibold text-nomad-black bg-white z-10">
            체험명
          </label>
          <div className="relative border border-gray-300 rounded-md">
            {isActivitiesLoading ? (
              <p className="text-center p-3 text-gray-500">
                체험 정보를 불러오는 중...
              </p>
            ) : activities.length > 0 ? (
              <SelectDropdown
                options={activities.map((activity) => ({
                  value: activity.id,
                  label: activity.title,
                }))}
                description={
                  selectedActivity
                    ? activities.find((a) => a.id === selectedActivity)?.title
                    : "체험을 선택하세요"
                }
                onSelect={(value) => handleActivityChange(value)}
                className="p-3"
              />
            ) : (
              <p className="text-center p-3 text-gray-500">
                등록된 체험이 없습니다.
              </p>
            )}
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

        {/* FullCalendar - 예약 현황 */}
        {selectedActivity === null ? (
          <p className="text-center text-gray-500">
            체험을 선택하면 예약 현황이 표시됩니다.
          </p>
        ) : isMonthlyLoading ? (
          <p className="text-center text-gray-500">
            예약 정보를 불러오는 중...
          </p>
        ) : reservationsError ? (
          <p className="text-center text-red-500">
            월별 예약 현황을 가져오는 중 오류가 발생했습니다.
          </p>
        ) : events.length > 0 ? (
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={(info: EventClickArg) => {
              setSelectedDate(info.event.startStr);
              setModalOpen(true);
            }}
            locale="ko"
            headerToolbar={false}
            height="auto"
            aspectRatio={1.35}
            dayMaxEventRows={true}
            fixedWeekCount={false}
            showNonCurrentDates={false}
          />
        ) : (
          <div className="flex flex-col items-center mt-10">
            <Image
              src="/image/empty.svg"
              alt="등록된 체험 없음"
              className="w-40 h-40"
              width={160}
              height={160}
            />
            <p className="text-gray-500 text-lg mt-4">
              아직 등록된 체험이 없어요
            </p>
          </div>
        )}
      </div>

      {modalOpen && (
        <ReservationModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          activityId={selectedActivity!}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
}
