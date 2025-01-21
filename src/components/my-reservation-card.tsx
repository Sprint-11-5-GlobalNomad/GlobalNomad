import Image from "next/image";
import { ReservationResponseDto } from "@/app/types/reservation-schemas";

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
  const getStatusClasses = (status: string) => {
    switch (status) {
      case "pending":
        return "text-blue-light";
      case "confirmed":
        return "text-orange";
      case "declined":
        return "text-red";
      default:
        return "text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "예약 완료";
      case "confirmed":
        return "예약 승인";
      case "declined":
        return "예약 거절";
      case "canceled":
        return "예약 취소";
      default:
        return "체험 완료";
    }
  };

  return (
    <div className="flex flex-col sm:flex-row w-[34.4rem] h-[12.8rem] sm:h-full md:flex-row lg:w-[80rem] lg:h-[20.4rem] md:w-[42.9rem] md:h-[15.6rem] rounded-[2.4rem] bg-white border border-gray-200 shadow-md gap-0 sm:gap-[1rem] p-[0.4rem]">
      <div className="flex-shrink-0 w-full h-[12.8rem] sm:w-[15.6rem] sm:h-[15.6rem] lg:w-[20.4rem] lg:h-[20.4rem] rounded-[2.4rem] overflow-hidden">
        <Image
          src={ReservationProps.activity.bannerImageUrl}
          alt="체험 이미지"
          width={204}
          height={204}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col justify-between flex-1 p-2">
        <div className="flex flex-col gap-4">
          <div
            className={`text-[1.4rem] sm:text-[1.4rem] md:text-[1.6rem] lg:text-[1.6rem] leading-[2.6rem] font-bold ${getStatusClasses(
              ReservationProps.status
            )}`}
          >
            {getStatusText(ReservationProps.status)}
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

          {ReservationProps.status === "pending" && (
            <button className="text-[1.6rem] text-red-500 font-medium hover:underline">
              예약 취소
            </button>
          )}
          {ReservationProps.status === "completed" && (
            <button className="text-[1.6rem] text-blue-500 font-medium hover:underline">
              후기 작성
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
