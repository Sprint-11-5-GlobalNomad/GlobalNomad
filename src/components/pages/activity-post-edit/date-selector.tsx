import { useState, useEffect, useRef } from "react";
import { FiCalendar } from "react-icons/fi"; // 캘린더 아이콘

type DateSelectorProps = {
  selectedDate: string;
  onDateChange: (formattedDate: string, rawDate: string) => void;
};

const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const [rawDate, setRawDate] = useState(selectedDate); // 내부적으로 YYYY-MM-DD 유지
  const inputRef = useRef<HTMLInputElement | null>(null);

  // ✅ 부모에서 selectedDate가 변경되면 rawDate도 업데이트
  useEffect(() => {
    setRawDate(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (!dateValue) return;

    const [year, month, day] = dateValue.split("-");
    const shortYear = year.slice(2);
    const formattedDate = `${shortYear}/${month}/${day}`;

    setRawDate(dateValue);
    onDateChange(formattedDate, dateValue);
  };

  return (
    <div className="flex flex-col gap-[1rem]">
      <label className="font-pretendard text-xl font-medium text-gray-900">
        날짜
      </label>
      <div
        className="relative flex items-center w-[37.9rem] tablet:w-[14.9rem] mobile:w-[13rem] h-[5.6rem] bg-white mobile:h-[4.4rem] rounded-[0.4rem] border border-solid border-black px-[1.6rem] text-lg font-normal cursor-pointer"
        onClick={() => inputRef.current?.showPicker?.()}
      >
        {/* 선택된 날짜 표시 */}
        <span
          className={`font-pretendard font-normal text-lg ${
            rawDate ? "text-gray-900" : "text-gray-400"
          }`}
        >
          {rawDate ? rawDate.slice(2).replace(/-/g, "/") : "YY/MM/DD"}
        </span>

        {/* 달력 아이콘 */}
        <FiCalendar className="absolute right-[1.2rem] text-gray-500 text-2xl" />

        {/* ✅ input을 absolute + full size로 변경해 어디를 클릭해도 작동하도록 수정 */}
        <input
          ref={inputRef}
          type="date"
          value={rawDate}
          onChange={handleDateChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
      </div>
    </div>
  );
};

export default DateSelector;
