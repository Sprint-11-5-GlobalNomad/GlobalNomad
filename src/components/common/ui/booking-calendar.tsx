import Image from "next/image";
import { useState } from "react";

const DAYSOFWEEK = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function BookingCalendar() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0: 1월, 11: 12월
  const [selectedDate, setSelectedDate] = useState(today);

  // 📌 달력 데이터 생성 함수
  const generateCalendar = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 이번 달 1일의 요일
    const lastDateOfMonth = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate(); // 이번 달 마지막 날짜
    const prevMonthLastDate = new Date(currentYear, currentMonth, 0).getDate(); // 이전 달 마지막 날짜

    const days = [];
    // 📌 이전 달 날짜 채우기
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({ date: prevMonthLastDate - i, isCurrentMonth: false });
    }
    // 📌 현재 달 날짜 채우기
    for (let i = 1; i <= lastDateOfMonth; i++) {
      days.push({ date: i, isCurrentMonth: true });
    }
    // 📌 다음 달 날짜 채우기 (총 42칸 맞추기)
    while (days.length % 7 !== 0) {
      days.push({
        date: days.length - lastDateOfMonth - firstDayOfMonth + 1,
        isCurrentMonth: false,
      });
    }

    return days;
  };

  // 📌 월 이동 함수
  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) setCurrentYear((prev) => prev - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) setCurrentYear((prev) => prev + 1);
  };

  // 📌 날짜 선택 함수
  const handleSelectDate = (day: number) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  return (
    <div
      className="border border-solid border-gray-200 rounded-[0.8rem]
      w-[30.465rem] h-[24.1rem] flex-column"
    >
      {/* 📌 헤더 (월 변경 버튼) */}
      <div className="flex-between w-[25rem] mt-[1rem]">
        <button
          onClick={(e) => {
            e.preventDefault();
            handlePrevMonth();
          }}
        >
          <Image
            src="/image/Prev.svg"
            alt="이전 달 이동 버튼"
            width={16}
            height={16}
          />
        </button>
        <span className="font-bold text-md">
          {MONTHS[currentMonth]} {currentYear}
        </span>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleNextMonth();
          }}
        >
          <Image
            src="/image/Next.svg"
            alt="다음 달 이동 버튼"
            width={16}
            height={16}
          />
        </button>
      </div>

      {/* 📌 요일 */}
      <div className="grid grid-cols-7 w-[25rem] justify-items-center">
        {DAYSOFWEEK.map((day) => (
          <span
            key={day}
            className="text-md font-bold
            text-gray-900 h-[3.2rem] flex items-center"
          >
            {day}
          </span>
        ))}
      </div>

      {/* 📌 날짜들 */}
      <div className="grid grid-cols-7 w-[25rem]">
        {generateCalendar().map((day, index) => (
          <button
            key={index}
            className={`h-[3.2rem] text-[1.3rem] leading-[1.77rem] p-[1rem] w-[3.571rem]
                flex justify-center items-center rounded-[0.8rem] ${
                  day.isCurrentMonth ? "text-gray-900" : "text-gray-600"
                } ${
                  selectedDate.getDate() === day.date &&
                  selectedDate.getMonth() === currentMonth
                    ? "bg-green-dark text-white"
                    : "hover:bg-green-light hover:text-green-dark"
                }`}
            onClick={(e) => {
              e.preventDefault();
              if (day.isCurrentMonth) handleSelectDate(day.date);
            }}
          >
            {day.date}
          </button>
        ))}
      </div>
    </div>
  );
}
