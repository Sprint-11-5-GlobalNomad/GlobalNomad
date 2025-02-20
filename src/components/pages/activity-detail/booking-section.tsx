import {
  useActivityDetail,
  useAvailableSchedules,
  useCreateReservation,
} from "@/app/react-query/activity-state";
import BookingCalendar from "@/components/common/ui/booking-calendar";
import Button from "@/components/common/ui/button";
import MessageModal from "@/components/common/ui/modal/message-modal";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import BookingModal from "./media-components/booking-modal";
import { formatTwoDigits } from "@/utils/date-utils";
import { ScheduleResponseDto } from "@/app/types/schedule-schemas";
import HeadcountSelectModal from "./media-components/headcount-select-modal";

export default function BookingSection() {
  const { id } = useParams();
  const { data: activity } = useActivityDetail(Number(id));

  const [headCount, setHeadCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isHeadcountSelectModalOpen, setIsHeadcountSelectModalOpen] =
    useState(false);

  const handleDateChange = (day: Date) => {
    setSelectedDate(day);
    setSelectedTime(0);
  };

  const { data: schedules } = useAvailableSchedules({
    filters: {
      activityId: Number(id),
      year: selectedDate ? selectedDate.getFullYear().toString() : "",
      month: selectedDate
        ? (selectedDate.getMonth() + 1).toString().padStart(2, "0")
        : "",
    },
  });

  const handleIncrease = () => setHeadCount((prev) => prev + 1);
  const handleDecrease = () => setHeadCount((prev) => Math.max(prev - 1, 1));

  const availableTimes: ScheduleResponseDto[] = selectedDate
    ? (schedules ?? [])
        ?.filter(
          (schedule) =>
            new Date(schedule.date).toLocaleDateString("sv-SE") ===
            selectedDate.toLocaleDateString("sv-SE")
        )
        .flatMap((schedule) => ({
          date: schedule.date,
          times: schedule.times.map((time) => ({
            id: time.id,
            startTime: time.startTime,
            endTime: time.endTime,
          })),
        }))
    : [];

  const selectedSchedule = availableTimes?.find((schedule) =>
    schedule.times.some((time) => time.id === selectedTime)
  );

  const totalPrice = (activity?.price ?? 1) * headCount;

  const { mutate: createReservation } = useCreateReservation();

  const isReservationAvailable = selectedTime > 0 && headCount > 0;

  const handleConfirm = (newValue: number) => {
    setHeadCount(newValue);
    setIsHeadcountSelectModalOpen(false);
  };

  const handleBooking = () => {
    const reservationData = {
      scheduleId: selectedTime,
      headCount,
    };

    createReservation(
      { activityId: Number(id), reservationData },
      { onSuccess: () => setIsModalOpen(true) }
    );
  };

  return (
    <div
      className="border border-solid border-gray-300 rounded-[1.2rem]
    bg-white w-[38.4rem] h-[78rem] shadow-container
    flex flex-col items-start px-[2.4rem] pt-[2.4rem] pb-[1.8rem]
    tablet:w-[25.1rem] tablet:h-[43rem] mobile:w-0 mobile:h-0 mobile:p-0"
    >
      <form className="flex flex-col gap-[1.6rem] mobile:hidden">
        <div className="flex flex-col gap-[1.6rem]">
          {/* 가격 섹션 */}
          <div>
            <p className="text-3xl font-bold flex items-center gap-[0.5rem]">
              ₩ {Number(activity?.price).toLocaleString("ko-KR")}
              <span className="text-xl font-regular text-gray-900">/ 인</span>
            </p>
          </div>

          {/* 캘린더 섹션 */}
          <div
            className="border-t border-solid border-gray-300
          w-[33.6rem] pt-[1.6rem] tablet:w-full"
          >
            <h2 className="text-xl font-bold">날짜</h2>
            <div className="ml-[1.6rem] mt-[1.6rem] tablet:hidden mobile:hidden">
              <BookingCalendar
                schedules={schedules}
                selectedDate={selectedDate}
                onSelectDate={handleDateChange}
              />
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsCalendarOpen(true);
              }}
              className="desktop:hidden text-lg font-semiBold cursor-pointer mt-[0.5rem]"
            >
              {selectedTime > 0
                ? `${formatTwoDigits(String(selectedDate))} ${selectedSchedule?.times[0].startTime} ~ ${selectedSchedule?.times[0].endTime}`
                : "날짜 선택하기"}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-[2.4rem]">
          {/* 예약 가능한 시간 */}
          <div
            className="flex flex-col gap-[2.4rem] w-[33.6rem]
          tablet:w-full"
          >
            <div className="flex flex-col gap-[2.4rem]">
              <div className="flex flex-col gap-[1.2rem]">
                <div
                  className="flex flex-col gap-[0.8rem]
              border-b border-solid border-gray-300 pb-[1.6rem]
              tablet:w-full tablet:hidden"
                >
                  <div className="flex flex-col gap-[1.4rem]">
                    <h3 className="text-2lg font-bold">예약 가능한 시간</h3>
                    <div className="flex gap-[1.2rem] overflow-x-auto hide-scrollbar">
                      {availableTimes && availableTimes.length > 0 ? (
                        availableTimes.map((schedule) =>
                          schedule.times.map((time) => (
                            <Button
                              key={time.id}
                              ButtonType="availableTime"
                              type="button"
                              variant={
                                selectedTime === time.id
                                  ? "selected"
                                  : "category"
                              }
                              label={`${time.startTime}~${time.endTime}`}
                              className="flex-shrink-0"
                              onClick={() => setSelectedTime(time.id)}
                            />
                          ))
                        )
                      ) : selectedDate ? (
                        <span className="text-2lg">
                          이 날짜에는 예약 가능한 시간이 없습니다.
                        </span>
                      ) : (
                        <span className="text-2lg">
                          날짜를 선택하면 해당 날짜의 예약 가능한 시간이
                          조회됩니다
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {/* 참여 인원 수 */}

                <div className="flex flex-col gap-[0.8rem]">
                  <h3 className="text-2lg font-bold">참여 인원 수</h3>
                  {/* 참여 인원 수 선택 */}
                  <div
                    className="border border-solid border-gray-500 rounded-[0.6rem]
                  w-[12rem] flex-between shadow-stepperInset"
                  >
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDecrease();
                      }}
                      className="p-[1rem] rounded-tl-[0.6rem] rounded-bl-[0.6rem]"
                    >
                      <Image
                        src="/image/Subtract.svg"
                        alt="참여 인원 수 빼기"
                        width={20}
                        height={20}
                      />
                    </button>
                    <input
                      value={headCount}
                      onChange={(e) =>
                        setHeadCount(Number(e.target.value) || 1)
                      }
                      className="w-[4rem] p-[0.6rem] text-md text-gray-900
                    font-regular text-center focus:outline-none"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleIncrease();
                      }}
                      className="p-[1rem] rounded-tr-[0.6rem] rounded-br-[0.6rem]"
                    >
                      <Image
                        src="/image/Add.svg"
                        alt="참여 인원 수 빼기"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </div>
              </div>
              {/* 예약하기 버튼 */}
              <Button
                ButtonType="reservation"
                type="submit"
                label="예약하기"
                onClick={(e) => {
                  e.preventDefault();
                  handleBooking();
                }}
                disabled={!isReservationAvailable}
              />
            </div>
          </div>
          {/* 총 합계 섹션 */}
          <div className="pt-[1.6rem] border-t border-solid border-gray-300">
            <div className="flex-between">
              <h4 className="text-xl font-bold">총 합계</h4>
              <span className="text-xl font-bold">
                ₩ {Number(totalPrice).toLocaleString("ko-KR")}
              </span>
            </div>
          </div>
        </div>
      </form>

      {/* 모바일 전용 예약 섹션 */}
      <form
        className="desktop:hidden tablet:hidden bg-white
      w-full h-[8.3rem] border-t border-solid border-gray-700
      fixed left-0 bottom-0 z-10 flex-between p-[1.6rem] pb-[0.3rem]"
      >
        <div className="flex flex-col gap-[0.8rem]">
          <span className="text-2lg font-bold text-center">
            ₩ {Number(totalPrice).toLocaleString("ko-KR")}
            <span className="text-2lg font-semiBold"> / </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsHeadcountSelectModalOpen(true);
              }}
              className="text-2lg text-green-dark font-medium"
            >
              {`${headCount > 1 ? `총 ${headCount} 인` : "1명"}`}
            </button>
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsCalendarOpen(true);
            }}
            className="text-md font-semiBold cursor-pointer underline
            text-green-dark flex justify-start"
          >
            {selectedTime > 0
              ? `${formatTwoDigits(String(selectedDate))} ${selectedSchedule?.times[0].startTime} ~ ${selectedSchedule?.times[0].endTime}`
              : "날짜 선택하기"}
          </button>
        </div>
        <Button
          ButtonType="reservation"
          type="submit"
          label="예약하기"
          onClick={(e) => {
            e.preventDefault();
            handleBooking();
          }}
          disabled={!isReservationAvailable}
        />
      </form>

      {isCalendarOpen && (
        <BookingModal
          schedules={schedules}
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
          availableTimes={availableTimes}
          selectedTime={selectedTime}
          onSelectTime={setSelectedTime}
          onClose={() => setIsCalendarOpen(false)}
        />
      )}

      {isHeadcountSelectModalOpen && (
        <HeadcountSelectModal
          onClose={() => {
            setIsHeadcountSelectModalOpen(false);
            setHeadCount(headCount);
          }}
          onConfirm={handleConfirm}
        />
      )}

      {isModalOpen && (
        <MessageModal
          onClose={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
          message="예약이 완료되었습니다."
        />
      )}
    </div>
  );
}
