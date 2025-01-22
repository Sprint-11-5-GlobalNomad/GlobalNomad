"use client";

import Image from "next/image";
import { ActivityBasicDto } from "@/stores/types/activity-schemas";
import EditDeleteDropdown from "./common/ui/edit-delete-dropdown";

type ActivityCardProps = Pick<
  ActivityBasicDto,
  "bannerImageUrl" | "rating" | "reviewCount" | "title" | "price" | "id"
>;

export function MyActivityCard(ActivityProps: ActivityCardProps) {
  return (
    <div className="flex flex-row mobile:w-[34.4rem] mobile:h-[12.8rem] desktop:w-[80rem] desktop:h-[20.4rem] tablet:w-[42.9rem] tablet:h-[15.6rem] rounded-[2.4rem] bg-white border border-gray-200 shadow-md gap-0 mobile:gap-[1rem] p-[0.4rem]">
      <div className="flex-shrink-0 w-full h-[12.8rem] mobile:w-[12rem] mobile:h-[12rem] tablet:w-[14.8rem] tablet:h-[14.8rem] desktop:w-[19.6rem] desktop:h-[19.6rem] rounded-[2.4rem] overflow-hidden">
        <Image
          src={ActivityProps.bannerImageUrl}
          alt="체험 이미지"
          width={200}
          height={200}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-[1.2rem]">
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
          <div className="mt-[0.6rem] text-[1.6rem] mobile:text-[1.6rem] tablet:text-[1.8rem] desktop:text-[2rem] leading-[2.4rem] mobile:leading-[2.4rem] desktop:leading-[3.2rem] font-bold text-gray-900">
            {ActivityProps.title}
          </div>
        </div>
        <div className="flex justify-between items-center mt-[0.6rem]">
          <div className="text-[1.6rem] mobile:text-[1.6rem] tablet:text-[2rem] desktop:text-[2rem] leading-[2.4rem] mobile:leading-[2.4rem] desktop:leading-[3.2rem] font-bold text-gray-900">
            ₩{ActivityProps.price.toLocaleString()}
          </div>
          <EditDeleteDropdown
            onDelete={function (): void {
              throw new Error("Function not implemented.");
            }}
            EditRoute={`/profile/activity/${ActivityProps.id}/edit`}
          />
        </div>
      </div>
    </div>
  );
}
