"use client";

import Image from "next/image";
import { ActivityBasicDto } from "@/app/types/activity-schemas";
import EditDeleteDropdown from "../../ui/dropdown/edit-delete-dropdown";
import { useState, forwardRef } from "react";
import { useDeleteMyActivity } from "@/app/react-query/my-activity-state";
import ConfirmationModal from "../../ui/modal/confirmation-modal";
import { fetchFiveMonthsStats } from "@/hooks/use-can-delete-activity";
import Link from "next/link";

type ActivityCardProps = Pick<
  ActivityBasicDto,
  "bannerImageUrl" | "rating" | "reviewCount" | "title" | "price" | "id"
>;

export const MyActivityCard = forwardRef<HTMLDivElement, ActivityCardProps>(
  (ActivityProps, ref) => {
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [isDeleteable, setIsDeleteAble] = useState(false);
    const deleteMyActivity = useDeleteMyActivity();

    async function handleModalOpen() {
      try {
        const stats = await fetchFiveMonthsStats(ActivityProps.id);
        const hasReservations = stats.some(
          (stat: { reservations: { pending: number; confirmed: number } }) =>
            stat.reservations.pending > 0 || stat.reservations.confirmed > 0
        );

        if (hasReservations) {
          alert("예약 대기 또는 승인 상태의 체험은 삭제할 수 없습니다.");
          return;
        }

        setIsCancelModalOpen(true);
      } catch (error) {
        console.error("예약 정보를 불러오는 중 오류 발생:", error);
        alert("예약 정보를 확인할 수 없습니다. 나중에 다시 시도해 주세요.");
      }
    }

    function handleModalClose() {
      setIsCancelModalOpen(false);
    }

    async function handleDelete() {
      if (isDeleteable) return;
      setIsDeleteAble(true);

      deleteMyActivity.mutate(ActivityProps.id, {
        onSuccess: () => {
          alert("체험이 성공적으로 삭제되었습니다.");
          window.location.reload();
        },
        onSettled: () => {
          setIsDeleteAble(false);
          setIsCancelModalOpen(false);
        },
      });
    }

    return (
      <div ref={ref} className="relative">
        <Link href={`/activity/${ActivityProps.id}`}>
          <div className="flex flex-row mobile:w-[34.4rem] mobile:h-[12.8rem] w-[80rem] h-[20.4rem] tablet:w-[42.9rem] tablet:h-[15.6rem] rounded-[2.4rem] bg-white border border-gray-200 shadow-md desktop:gap-[2.4rem] tablet:gap-[1.2rem] mobile:gap-[0.8rem] p-[0.4rem]">
            <div className="flex-shrink-0 w-full h-[12.8rem] mobile:w-[12rem] mobile:h-[12rem] tablet:w-[14.8rem] tablet:h-[14.8rem] desktop:w-[19.6rem] desktop:h-[19.6rem] rounded-[2.4rem] overflow-hidden">
              <Image
                src={ActivityProps.bannerImageUrl}
                alt="체험 이미지"
                width={200}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between py-[1.4rem]">
              <div className="flex flex-col gap-[0.6rem] mobile:gap-0">
                <div className="flex items-center gap-[0.4rem]">
                  <Image
                    src="/image/rating-star.svg"
                    alt="평균 별점"
                    width={16}
                    height={16}
                  />
                  <span className="mobile:text-md text-lg font-pretendard text-black font-regular">
                    {ActivityProps.rating} ({ActivityProps.reviewCount})
                  </span>
                </div>
                <div className="tablet:text-2lg text-xl mobile:text-md font-pretendard font-bold text-nomad-black">
                  {ActivityProps.title}
                </div>
              </div>
              <div className="items-center mt-[0.6rem]">
                <div className="mobile:text-lg tablet:text-xl text-2xl font-bold text-gray-900">
                  ₩{ActivityProps.price.toLocaleString()} / 인
                </div>
              </div>
            </div>
          </div>
        </Link>

        <div className="absolute mobile:right-[1.4rem] mobile:bottom-[0.95rem] tablet:right-[1.7rem] tablet:bottom-[1.3rem] right-[2.3rem] bottom-[2rem]">
          <EditDeleteDropdown
            onDelete={handleModalOpen}
            EditRoute={`/profile/my-activities/${ActivityProps.id}/edit`}
          />
        </div>

        <ConfirmationModal
          isOpen={isCancelModalOpen}
          onClose={handleModalClose}
          onConfirm={handleDelete}
          message={"삭제하시겠습니까?"}
          buttonMessage={"삭제하기"}
        />
      </div>
    );
  }
);

MyActivityCard.displayName = "MyActivityCard";
