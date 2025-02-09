"use client";

import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import UserProfileSidebar from "@/components/common/layout/profile/my-page-card";
import SelectDropdown from "@/components/common/ui/dropdown/select-dropdown";
import "@/styles/fullcalendar.css";

const ReservationPage = () => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  // 체험 리스트 (현재는 하드코딩, 추후 API 연동 가능)
  const experiences = ["댄스", "여행", "자전거", "열기구"];
  const [selectedExperience, setSelectedExperience] = useState(experiences[0]); // 기본 선택값

  const events = [
    {
      title: "예약 5",
      start: "2025-02-10",
      end: "2025-02-10",
      className: "event-blue",
    },
    {
      title: "예약 2",
      start: "2025-02-11",
      end: "2025-02-11",
      className: "event-blue",
    },
    {
      title: "승인 8",
      start: "2025-02-12",
      end: "2025-02-12",
      className: "event-orange",
    },
    {
      title: "승인 10",
      start: "2025-02-12",
      end: "2025-02-12",
      className: "event-orange",
    },
  ];

  // 달력 이전/다음 이동
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

      {/* 오른쪽 캘린더 영역 */}
      <div className="w-[80rem] h-[81.3rem] ml-[2.4rem]">
        <h1 className="text-[3.2rem] font-bold mb-[3.8rem] text-start mt-0">
          예약 현황
        </h1>

        {/* 체험명 선택 드롭다운 */}
        <div className="mb-[3rem] relative">
          <div className="relative border border-gray-300 rounded-md p-[1.6rem] bg-white w-full">
            <label
              className={`absolute left-[1.6rem] top-[1.6rem] text-[1.4rem] text-gray-500 transition-all ${
                selectedExperience
                  ? "top-[0.6rem] text-[1.2rem] text-gray-800"
                  : ""
              }`}
            >
              체험명
            </label>
            <SelectDropdown
              options={experiences}
              description={selectedExperience || "체험을 선택하세요"}
              onChange={(value) => setSelectedExperience(value)}
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
        <div className="bg-white rounded-lg shadow-md">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={(info) =>
              alert(`예약 정보:\n\n제목: ${info.event.title}`)
            }
            locale="en" // 요일 영어
            headerToolbar={false}
            height="auto"
            aspectRatio={1.35}
            dayMaxEventRows={true}
            fixedWeekCount={false} // 추가 행 제거
            showNonCurrentDates={false} // 이전, 다음 달 날짜 숨김
          />
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
