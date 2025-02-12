import { useState } from "react";
import TimeDropdown from "./time-dropdown";
import Button from "@/components/common/ui/button";
import { TIME_TABLE } from "../../../app/profile/my-activities/post/_constants/constants";
import DateSelector from "./date-selector";

type ReservationAvailableTime = {
  date: string;
  startTime: string;
  endTime: string;
};

type Props = {
  reservationTimes: ReservationAvailableTime[];
  setReservationTimes: React.Dispatch<
    React.SetStateAction<ReservationAvailableTime[]>
  >;
};

export default function ReservationTimeSelector({
  reservationTimes,
  setReservationTimes,
}: Props) {
  const [newReservationTime, setNewReservationTime] =
    useState<ReservationAvailableTime>({
      date: "",
      startTime: "",
      endTime: "",
    });

  const [errorMessage, setErrorMessage] = useState("");

  const addReservationTime = () => {
    if (
      !newReservationTime.date ||
      !newReservationTime.startTime ||
      !newReservationTime.endTime
    ) {
      setErrorMessage("모든 값을 입력해주세요.");
      return;
    }

    // 시작 시간이 종료 시간보다 크거나 같으면 오류
    if (newReservationTime.startTime >= newReservationTime.endTime) {
      setErrorMessage("시작 시간은 종료 시간보다 이전이어야 합니다.");
      return;
    }

    // 시간 범위 겹침 확인
    const isOverlapping = reservationTimes.some((time) => {
      if (time.date !== newReservationTime.date) return false;

      const newStart = new Date(
        `1970-01-01T${newReservationTime.startTime}:00`
      );
      const newEnd = new Date(`1970-01-01T${newReservationTime.endTime}:00`);
      const existingStart = new Date(`1970-01-01T${time.startTime}:00`);
      const existingEnd = new Date(`1970-01-01T${time.endTime}:00`);

      return (
        (newStart >= existingStart && newStart < existingEnd) || // 새로운 시작이 기존 범위 안에 있는 경우
        (newEnd > existingStart && newEnd <= existingEnd) || // 새로운 종료가 기존 범위 안에 있는 경우
        (newStart <= existingStart && newEnd >= existingEnd) // 새로운 범위가 기존 범위를 완전히 포함하는 경우
      );
    });

    if (isOverlapping) {
      setErrorMessage("이미 겹치는 시간대가 있습니다.");
      return;
    }

    setReservationTimes((prev) => [...prev, newReservationTime]);
    setNewReservationTime({ date: "", startTime: "", endTime: "" });
    setErrorMessage(""); // 오류 메시지 초기화
  };

  const removeReservationTime = (index: number) => {
    setReservationTimes((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-[2.4rem]">
      <h3 className="font-pretendard text-2xl font-bold">예약 가능한 시간대</h3>
      <div className="flex flex-col gap-[2.1rem]">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-[2rem] tablet:gap-[0.5rem] mobile:gap-[0.4rem]">
            <DateSelector
              selectedDate={newReservationTime.date}
              onDateChange={(formattedDate, rawDate) =>
                setNewReservationTime({ ...newReservationTime, date: rawDate })
              }
            />
            <div className="flex flex-row gap-[1.2rem] tablet:gap-[0.5rem] mobile:gap-[0.4rem] relative">
              <div className="flex flex-col gap-[1rem]">
                <label className="font-pretendard text-xl font-medium text-gray-900">
                  시작 시간
                </label>
                <TimeDropdown
                  options={TIME_TABLE}
                  description="0:00"
                  selectedOption={newReservationTime.startTime}
                  onSelect={(startTime) =>
                    setNewReservationTime({ ...newReservationTime, startTime })
                  }
                />
              </div>
              <div className="hidden desktop:block">
                <div className="relative top-[5.9rem] font-pretendard text-[2rem] font-bold">
                  ~
                </div>
              </div>
              <div className="flex flex-col gap-[1rem]">
                <label className="font-pretendard text-xl font-medium text-gray-900">
                  종료 시간
                </label>
                <TimeDropdown
                  options={TIME_TABLE}
                  description="0:00"
                  selectedOption={newReservationTime.endTime}
                  onSelect={(endTime) =>
                    setNewReservationTime({ ...newReservationTime, endTime })
                  }
                />
              </div>
            </div>
            <div className="relative top-[4.2rem]">
              <Button
                ButtonType="reservationTime"
                variant="reservationTimeAdd"
                label="+"
                onClick={addReservationTime}
              />
            </div>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
        </div>

        {reservationTimes.length > 0 && <hr />}
        {reservationTimes.map((reservationTime, index) => (
          <div
            className="flex flex-row gap-[2rem] tablet:gap-[0.5rem] mobile:gap-[0.4rem]"
            key={index}
          >
            <input
              type="text"
              className="w-[37.9rem] tablet:w-[14.9rem] mobile:w-[13rem] h-[5.6rem] mobile:h-[4.4rem] rounded-[0.4rem] border-black border-[0.1rem] p-[1.6rem] text-lg font-normal"
              disabled
              value={
                reservationTime.date
                  ? reservationTime.date.slice(2).replace(/-/g, "/")
                  : ""
              }
            />

            <div className="flex flex-row gap-[1.2rem] tablet:gap-[0.5rem] mobile:gap-[0.4rem]">
              <input
                type="text"
                className="w-[14rem] tablet:w-[10.4rem] mobile:w-[7.9rem] h-[5.6rem] mobile:h-[4.4rem] rounded-[0.4rem] border-black border-[0.1rem] p-[1.6rem] text-lg font-normal"
                disabled
                value={reservationTime.startTime}
              />
              <div className="hidden desktop:block">
                <div className="relative top-[1.6rem] font-pretendard text-[2rem] font-bold">
                  ~
                </div>
              </div>

              <input
                type="text"
                className="w-[14rem] tablet:w-[10.4rem] mobile:w-[7.9rem] h-[5.6rem] mobile:h-[4.4rem] rounded-[0.4rem] border-black border-[0.1rem] p-[1.6rem] text-lg font-normal"
                disabled
                value={reservationTime.endTime}
              />
            </div>
            <Button
              ButtonType="reservationTime"
              variant="reservationTimeDelete"
              label="-"
              onClick={() => removeReservationTime(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
