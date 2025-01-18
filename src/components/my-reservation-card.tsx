import Image from "next/image";
import { ReservationResponseDto } from "@/stores/types/reservation-schemas";

type ReservationCardProps = Pick<
  ReservationResponseDto,
  | "activity"
  | "status"
  | "date"
  | "startTime"
  | "endTime"
  | "headCount"
  | "totalPrice"
>;

export function MyReservationCard(ReservationProps: ReservationCardProps) {
  return (
    <div className="flex flex-col sm:flex-row w-[34.4rem] h-[12.8rem] sm:h-full md:flex-row lg:w-[80rem] lg:h-[20.4rem] md:w-[42.9rem] md:h-[15.6rem] rounded-[2.4rem] bg-white border border-gray-200 shadow-md gap-0 sm:gap-[1rem] p-[0.4rem]">
      <div className="flex-shrink-0 w-full h-[12.8rem] sm:w-[15.6rem] sm:h-[15.6rem] lg:w-[20.4rem] lg:h-[20.4rem] rounded-[2.4rem] overflow-hidden">
        <Image
          src={ReservationProps.activity.bannerImageUrl}
          alt={"체험 이미지"}
          width={204}
          height={204}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col justify-between flex-1 p-2">
        <div className="flex flex-col gap-4">
          <div
            className={`text-[1.4rem] sm:text-[1.4rem] md:text-[1.6rem] lg:text-[1.6rem] leading-[2.6rem] font-bold ${
              ReservationProps.status === "pending"
                ? "text-[var(--color-blue-light)]"
                : ReservationProps.status === "confirmed"
                  ? "text-[var(--color-orange)]"
                  : ReservationProps.status === "declined"
                    ? "text-[var(--color-red)]"
                    : "text-[var(--color-gray-800)]"
            }`}
          >
            {ReservationProps.status === "pending"
              ? "예약 완료"
              : ReservationProps.status === "confirmed"
                ? "예약 승인"
                : ReservationProps.status === "declined"
                  ? "예약 거절"
                  : ReservationProps.status === "canceled"
                    ? "예약 취소"
                    : "체험 완료"}
          </div>
          <div className="text-[1.4rem] lg:text-[2rem] md:text-[1.8rem] leading-[2.4rem] lg:leading-[3.2rem] md:leading-[2.6rem] font-bold">
            {ReservationProps.activity.title}
          </div>
          <div className="text-[1.2rem] sm:text-[1.2rem] md:text-[1.4rem] lg:text-[1.8rem] leading-[2.4rem] sm:leading-[2.4rem] md:leading-[2.4rem] lg:leading-[2.6rem] font-pretendard-regular">
            {ReservationProps.date}·{ReservationProps.startTime}~
            {ReservationProps.endTime}·{ReservationProps.headCount}명
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-[1.6rem] lg:text-[2rem] md:text-[2rem] leading-[2.6rem] lg:leading-[3.2rem] font-medium text-right">
            ₩{ReservationProps.totalPrice.toLocaleString()}
          </div>
          {/* 예약내역이고 예약상태가 confirmed일 때 <div>예약 취소</div> 나중에 버튼 태그로 바꿔야함 */}
          {/* 예약내역이고 예약상태가 completed일 때 <div>후기 작성</div> 나중에 버튼 태그로 바꿔야 함 */}
        </div>
      </div>
    </div>
  );
}
