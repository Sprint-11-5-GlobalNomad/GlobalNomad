import { useState } from "react";
import TimeDropdown from "./time-dropdown";
import Button from "@/components/common/ui/button";
import { timeTable } from "../../../app/profile/my-activities/post/_constants/constants";

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

  const addReservationTime = () => {
    if (
      newReservationTime.date &&
      newReservationTime.startTime &&
      newReservationTime.endTime
    ) {
      setReservationTimes((prev) => [...prev, newReservationTime]);
      setNewReservationTime({ date: "", startTime: "", endTime: "" });
    }
  };

  const removeReservationTime = (index: number) => {
    setReservationTimes((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-[2.4rem]">
      <h3 className="font-pretendard text-2xl font-bold">예약 가능한 시간대</h3>
      <div className="flex flex-col gap-[2.1rem]">
        <div className="flex flex-row gap-[2rem] tablet:gap-[0.5rem] mobile:gap-[0.4rem]">
          <label className="flex flex-col gap-[1rem]">
            <div className="font-pretendard text-xl font-medium text-gray-900">
              날짜
            </div>
            <input
              type="date"
              value={newReservationTime.date}
              onChange={(e) =>
                setNewReservationTime({
                  ...newReservationTime,
                  date: e.target.value,
                })
              }
              className="w-[37.9rem] tablet:w-[14.9rem] mobile:w-[13rem] h-[5.6rem] mobile:h-[4.4rem] rounded-[0.4rem] border-black border-[0.1rem] p-[1.6rem] text-lg font-normal"
            />
          </label>
          <div className="flex flex-row gap-[1.2rem] tablet:gap-[0.5rem] mobile:gap-[0.4rem] relative">
            <div className="flex flex-col gap-[1rem]">
              <label className="font-pretendard text-xl font-medium text-gray-900">
                시작 시간
              </label>
              <TimeDropdown
                options={timeTable}
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
                options={timeTable}
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
              value={reservationTime.date}
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
