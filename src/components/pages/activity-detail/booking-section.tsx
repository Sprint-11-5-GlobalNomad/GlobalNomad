import { useActivityDetail } from "@/app/react-query/activity-state";
import Button from "@/components/common/ui/button";
import { useParams } from "next/navigation";

export default function BookingSection() {
  const { id } = useParams();
  const { data: activity } = useActivityDetail(Number(id));

  return (
    <div
      className="border border-solid border-gray-300 rounded-[1.2rem]
    bg-white w-[38.4rem] h-[74.6rem] shadow-container
    flex flex-col items-start px-[2.4rem] pt-[2.4rem] pb-[1.8rem]"
    >
      <div className="flex flex-col gap-[1.6rem]">
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
          w-[33.6rem] pt-[1.6rem]"
          >
            <h2 className="text-xl font-bold">날짜</h2>
            <div className="ml-[1.6rem] mt-[1.6rem]">달력 이미지</div>
          </div>
        </div>

        {/* 예약 가능한 시간 */}
        <div className="flex flex-col gap-[2.4rem] w-[33.6rem]">
          <div className="flex flex-col gap-[2.4rem]">
            <div className="flex flex-col gap-[1.2rem]">
              <div
                className="flex flex-col gap-[0.8rem]
              border-b border-solid border-gray-300 pb-[1.6rem]"
              >
                <div className="flex flex-col gap-[1.4rem]">
                  <h3 className="text-2lg font-bold">예약 가능한 시간</h3>
                  <div className="flex gap-[1.2rem] overflow-x-auto hide-scrollbar">
                    {activity?.schedules.map((schedule) => (
                      <Button
                        key={schedule.id}
                        type="availableTime"
                        variant="category"
                        label={`${schedule.startTime}~${schedule.endTime}`}
                        className="flex-shrink-0"
                      />
                    ))}
                  </div>
                </div>
              </div>
              {/* 참여 인원 수 */}
              <h3 className="text-2lg font-bold">참여 인원 수</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
