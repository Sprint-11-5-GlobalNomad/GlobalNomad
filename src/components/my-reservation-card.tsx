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
    <div className="flex flex-row mobile:w-[34.4rem] mobile:h-[12.8rem] desktop:w-[80rem] desktop:h-[20.4rem] tablet:w-[42.9rem] tablet:h-[15.6rem] rounded-[2.4rem] bg-white border border-gray-200 shadow-md gap-0 p-[0.4rem]">
      <div className="flex-shrink-0 w-full h-[12.8rem] mobile:w-[12rem] mobile:h-[12rem] tablet:w-[14.8rem] tablet:h-[14.8rem] desktop:w-[19.6rem] desktop:h-[19.6rem] rounded-[2.4rem] overflow-hidden">
        <Image
          src={ReservationProps.activity.bannerImageUrl}
          alt="체험 이미지"
          width={200}
          height={200}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col justify-between flex-1 p-[0.9rem]">
        <div className="flex flex-col gap-[0.4rem]">
          <div
            className={`mobile:text-[1.4rem] tablet:text-[1.6rem] desktop:text-[1.6rem] leading-[2.6rem] font-bold ${getStatusClasses(
              ReservationProps.status
            )}`}
          >
            {getStatusText(ReservationProps.status)}
          </div>
          <div className="mobile:text-[1.4rem] desktop:text-[2rem] tablet:text-[1.8rem] leading-[2.4rem] desktop:leading-[3.2rem] tablet:leading-[2.6rem] font-bold">
            {ReservationProps.activity.title}
          </div>
          <div className="mobile:text-[1.2rem] tablet:text-[1.4rem] desktop:text-[1.8rem] leading-[2.4rem] mobile:leading-[2.4rem] tablet:leading-[2.4rem] desktop:leading-[2.6rem] font-pretendard-regular">
            {ReservationProps.date}·{ReservationProps.startTime}~
            {ReservationProps.endTime}·{ReservationProps.headCount}명
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="mobile:text-[1.6rem] desktop:text-[2rem] tablet:text-[2rem] leading-[2.6rem] desktop:leading-[3.2rem] font-medium text-right">
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
