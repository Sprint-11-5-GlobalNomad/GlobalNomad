import { useCancelReservation } from "@/app/react-query/reservation-state";
import { useState, forwardRef } from "react";
import Image from "next/image";
import { ReservationResponseDto } from "@/app/types/reservation-schemas";
import { ReviewModal } from "@/app/profile/my-reservations/component/review-modal";
import Button from "@/components/common/ui/button";
import ConfirmationModal from "@/components/common/ui/modal/confirmation-modal";
import Link from "next/link";

type ReservationCardProps = Pick<
  ReservationResponseDto,
  | "activity"
  | "status"
  | "date"
  | "startTime"
  | "endTime"
  | "headCount"
  | "totalPrice"
  | "id"
>;

// forwardRef를 사용하여 ref를 받을 수 있도록 수정
export const MyReservationCard = forwardRef<
  HTMLDivElement,
  ReservationCardProps
>(
  (
    { activity, status, date, startTime, endTime, headCount, totalPrice, id },
    ref
  ) => {
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const cancelReservationMutation = useCancelReservation();

    const handleCancelReservation = () => {
      cancelReservationMutation.mutate({
        reservationId: id,
        status: { status: "canceled" },
      });
      setIsCancelModalOpen(false);
    };

    const getStatusClasses = (status: string) => {
      switch (status) {
        case "pending":
          return "text-blue-light";
        case "confirmed":
          return "text-orange";
        case "declined":
          return "text-red";
        case "canceled":
          return "text-gray-500";
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
      <div>
        <Link href={`/activity/${activity.id}`} passHref>
          <div
            ref={ref}
            className="flex flex-row mobile:w-[34.4rem] mobile:h-[12.8rem] desktop:w-[80rem] desktop:h-[20.4rem] tablet:w-[42.9rem] tablet:h-[15.6rem] rounded-[2.4rem] bg-white border border-gray-200 shadow-md gap-0 p-[0.4rem] cursor-pointer"
          >
            <div className="flex-shrink-0 w-full h-[12.8rem] mobile:w-[12rem] mobile:h-[12rem] tablet:w-[14.8rem] tablet:h-[14.8rem] desktop:w-[19.6rem] desktop:h-[19.6rem] rounded-[2.4rem] overflow-hidden">
              <Image
                src={activity.bannerImageUrl}
                alt="체험 이미지"
                width={200}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex flex-col justify-between flex-1 desktop:py-[2.1rem] desktop:px-[2.4rem] tablet:py-[1.2rem] tablet:pl-[1.2rem] tablet:pr-[1.8rem] mobile:py-[1.1rem] mobile:pl-[0.8rem] mobile:pr-[1.5rem]">
              <div className="flex flex-col desktop:gap-[0.8rem]">
                <div
                  className={`font-bold text-[1.6rem] mobile:text-[1.4rem] ${getStatusClasses(
                    status
                  )}`}
                >
                  {getStatusText(status)}
                </div>
                <div className="flex flex-col desktop:gap-[1.2rem] tablet:gap-[0.4rem]">
                  <div className="desktop:text-[2rem] tablet:text-[1.8rem] mobile:text-[1.4rem] font-bold">
                    {activity.title}
                  </div>
                  <div className="desktop:text-[1.8rem] tablet:text-[1.4rem] mobile:text-[1.2rem]">
                    {date}ㆍ{startTime}~{endTime}ㆍ{headCount}명
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="desktop:text-[2.4rem] tablet:text-[2rem] mobile:text-[1.6rem] font-medium text-right">
                  ₩{totalPrice.toLocaleString()}
                </div>
                {status === "pending" && (
                  <Button
                    ButtonType="review"
                    label="예약 취소"
                    variant="outlined"
                    onClick={(event) => {
                      event.stopPropagation(); // Link 이동 방지
                      setIsCancelModalOpen(true);
                    }}
                  />
                )}
                {status === "completed" && (
                  <Button
                    ButtonType="review"
                    label="후기 작성"
                    onClick={(event) => {
                      event.stopPropagation(); // Link 이동 방지
                      setIsReviewModalOpen(true);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </Link>

        <ConfirmationModal
          isOpen={isCancelModalOpen}
          onClose={() => setIsCancelModalOpen(false)}
          onConfirm={handleCancelReservation}
          message="정말 예약을 취소하시겠습니까?"
        />
        <ReviewModal
          activity={activity}
          date={date}
          startTime={startTime}
          endTime={endTime}
          headCount={headCount}
          totalPrice={totalPrice}
          id={id}
          isOpen={isReviewModalOpen}
        />
      </div>
    );
  }
);

MyReservationCard.displayName = "MyReservationCard";
