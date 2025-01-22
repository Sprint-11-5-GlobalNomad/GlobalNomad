"use client";

import Image from "next/image";
import { ActivityBasicDto } from "@/stores/types/activity-schemas";
import EditDeleteDropdown from "./common/ui/edit-delete-dropdown";
import { useState } from "react";

type ActivityCardProps = Pick<
  ActivityBasicDto,
  "bannerImageUrl" | "rating" | "reviewCount" | "title" | "price" | "id"
>;

async function canDeleteActivity(activityId: number): Promise<boolean> {
  try {
    //데이터 받아오기 로직 임시로 넣어놓고 나중에 수정 예정
    const response = await fetch(`~~`);
    const data = await response.json;
    const { pending, confirmed } = data;
    if (pending > 0 || confirmed > 0) return false;

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export function MyActivityCard(ActivityProps: ActivityCardProps) {
  const [isDeleteable, setIsDeleteAble] = useState(false);

  async function handleDelete() {
    if (isDeleteable) return;
    setIsDeleteAble(true);

    const canDelete = await canDeleteActivity(ActivityProps.id);

    if (!canDelete) {
      alert("삭제할 수 없습니다.");
      setIsDeleteAble(false);
      return;
    }
    try {
      const response = await fetch(``, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("체험이 성공적으로 삭제되었습니다.");
      } else {
        alert("체험 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error deleting activity:", error);
      alert("체험 삭제 중 오류가 발생했습니다.");
    } finally {
      setIsDeleteAble(false);
    }
  }

  return (
    <div className="flex flex-row mobile:w-[34.4rem] mobile:h-[12.8rem] desktop:w-[80rem] desktop:h-[20.4rem] tablet:w-[42.9rem] tablet:h-[15.6rem] rounded-[2.4rem] bg-white border border-gray-200 shadow-md gap-0 p-[0.4rem]">
      <div className="flex-shrink-0 w-full h-[12.8rem] mobile:w-[12rem] mobile:h-[12rem] tablet:w-[14.8rem] tablet:h-[14.8rem] desktop:w-[19.6rem] desktop:h-[19.6rem] rounded-[2.4rem] overflow-hidden">
        <Image
          src={ActivityProps.bannerImageUrl}
          alt="체험 이미지"
          width={200}
          height={200}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-[0.9rem]">
        <div>
          <div className="flex items-center gap-[0.4rem] text-[1.4rem] mobile:text-[1.4rem] tablet:text-[1.4rem] desktop:text-[1.6rem] leading-[2rem] mobile:leading-[2.4rem] desktop:leading-[2.6rem] font-pretendard-regular text-gray-800">
            <Image
              src="/image/rating-star.svg"
              alt="평균 별점"
              width={16}
              height={16}
            />
            <span className="font-bold">{ActivityProps.rating}</span>
            <span className="text-gray-600">({ActivityProps.reviewCount})</span>
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
            onDelete={handleDelete}
            EditRoute={`/profile/activity/${ActivityProps.id}/edit`}
          />
        </div>
      </div>
    </div>
  );
}
