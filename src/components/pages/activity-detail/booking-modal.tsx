import { ScheduleResponseDto } from "@/app/types/schedule-schemas";
import BookingCalendar from "@/components/common/ui/booking-calendar";
import Button from "@/components/common/ui/button";
import UseOutsideClick from "@/hooks/use-outside-click";
import Image from "next/image";

interface BookingModalProps {
  schedules?: ScheduleResponseDto[];
  selectedDate: Date;
  handleDateChange: (date: Date) => void;
  availableTimes?: ScheduleResponseDto[];
  selectedTime: number;
  onSelectTime: (timeId: number) => void;
  handleBooking: () => void;
  onClose: () => void;
}

export default function BookingModal({
  schedules,
  selectedDate,
  handleDateChange,
  availableTimes,
  selectedTime,
  onSelectTime,
  handleBooking,
  onClose,
}: BookingModalProps) {
  const outsideClickRef = UseOutsideClick(onClose);
  return (
    <form
      className="w-[48rem] bg-white rounded-[2.4rem] z-10 absolute top-[62.4rem] left-[35vw]
    px-[2.4rem] pt-[2.8rem] pb-[3.2rem] flex flex-col desktop:hidden"
    >
      {/* 날짜 선택 */}
      <div ref={outsideClickRef}>
        <div className="flex-between">
          <h2 className="text-2xl font-bold">날짜</h2>
          <button onClick={onClose}>
            <Image
              src="/image/btn_X.svg"
              alt="예약 모달 닫기"
              width={40}
              height={40}
            />
          </button>
        </div>
        <div className="ml-[1.6rem] mt-[1.6rem] flex justify-center">
          <BookingCalendar
            schedules={schedules}
            selectedDate={selectedDate}
            onSelectDate={handleDateChange}
          />
        </div>
      </div>

      {/* 예약 가능한 시간 */}
      <div className="flex flex-col gap-[2.4rem]">
        <div
          className="flex flex-col gap-[2.4rem] w-[33.6rem]
          tablet:w-full"
        >
          <div className="flex flex-col gap-[2.4rem]">
            <div className="flex flex-col gap-[1.2rem]">
              <div
                className="flex flex-col gap-[0.8rem]
                pb-[1.6rem] tablet:w-full"
              >
                <div className="flex flex-col gap-[1.4rem] pt-[3.2rem]">
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
                              selectedTime === time.id ? "selected" : "category"
                            }
                            label={`${time.startTime}~${time.endTime}`}
                            className="flex-shrink-0"
                            onClick={() => onSelectTime(time.id)}
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
            </div>
            {/* 예약하기 버튼 */}
            <Button
              ButtonType="dateReservation"
              type="submit"
              label="예약하기"
              onClick={(e) => {
                e.preventDefault();
                handleBooking();
              }}
              disabled={selectedTime === 0}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
