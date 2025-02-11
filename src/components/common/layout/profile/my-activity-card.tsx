"use client";

import Image from "next/image";
import { ActivityBasicDto } from "@/app/types/activity-schemas";
import EditDeleteDropdown from "../../ui/dropdown/edit-delete-dropdown";
import { useState, forwardRef } from "react"; // ✅ forwardRef 추가
import { useDeleteMyActivity } from "@/app/react-query/my-activity-state";
import ConfirmationModal from "../../ui/modal/confirmation-modal";
import { useCanDeleteActivity } from "@/hooks/use-can-delete-activity";

type ActivityCardProps = Pick<
  ActivityBasicDto,
  "bannerImageUrl" | "rating" | "reviewCount" | "title" | "price" | "id"
>;

// ✅ forwardRef 적용
export const MyActivityCard = forwardRef<HTMLDivElement, ActivityCardProps>(
  (ActivityProps, ref) => {
    const { canDelete } = useCanDeleteActivity(ActivityProps.id);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [isDeleteable, setIsDeleteAble] = useState(false);
    const deleteMyActivity = useDeleteMyActivity();

    function handleModalClose() {
      setIsCancelModalOpen(false);
    }

    function handleModalOpen() {
      if (!canDelete) {
        alert("예약 대기 또는 승인 상태의 체험은 삭제할 수 없습니다.");
        return;
      }
      setIsCancelModalOpen(true);
    }

    async function handleDelete() {
      if (isDeleteable) return;
      setIsDeleteAble(true);

      deleteMyActivity.mutate(ActivityProps.id, {
        onSuccess: () => {
          alert("체험이 성공적으로 삭제되었습니다.");
        },
        onSettled: () => {
          setIsDeleteAble(false);
          setIsCancelModalOpen(false);
        },
      });
    }

    return (
      // ✅ ref 추가하여 Intersection Observer에서 감지 가능하게 함
      <div
        ref={ref}
        className="flex flex-row mobile:w-[34.4rem] mobile:h-[12.8rem] desktop:w-[80rem] desktop:h-[20.4rem] tablet:w-[42.9rem] tablet:h-[15.6rem] rounded-[2.4rem] bg-white border border-gray-200 shadow-md desktop:gap-[2.4rem] tablet:gap-[1.2rem] mobile:gap-[0.8rem] p-[0.4rem]"
      >
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
          <div className="flex flex-col gap-[0.6rem]">
            <div className="flex items-center gap-[0.4rem] text-[1.4rem] mobile:text-[1.4rem] tablet:text-[1.4rem] desktop:text-[1.6rem] leading-[2rem] mobile:leading-[2.4rem] desktop:leading-[2.6rem] font-pretendard-regular text-gray-800">
              <Image
                src="/image/rating-star.svg"
                alt="평균 별점"
                width={16}
                height={16}
              />
              <span className="font-bold">{ActivityProps.rating}</span>
              <span className="text-gray-600">
                ({ActivityProps.reviewCount})
              </span>
            </div>
            <div className="mobile:text-[1.4rem] tablet:text-[1.8rem] desktop:text-[2rem] font-bold text-gray-900">
              {ActivityProps.title}
            </div>
          </div>
          <div className="flex justify-between items-center mt-[0.6rem]">
            <div className="text-[1.6rem] mobile:text-[1.6rem] tablet:text-[2rem] desktop:text-[2rem] leading-[2.4rem] mobile:leading-[2.4rem] desktop:leading-[3.2rem] font-bold text-gray-900">
              ₩{ActivityProps.price.toLocaleString()} / 인
            </div>
            <EditDeleteDropdown
              onDelete={handleModalOpen}
              EditRoute={`/profile/my-activities/${ActivityProps.id}/edit`}
            />
          </div>
        </div>
        <ConfirmationModal
          isOpen={isCancelModalOpen}
          onClose={handleModalClose}
          onConfirm={handleDelete}
          message={"삭제하시겠습니까?"}
        />
      </div>
    );
  }
);

// ✅ forwardRef를 사용할 때 displayName 추가 (디버깅 용이)
MyActivityCard.displayName = "MyActivityCard";
