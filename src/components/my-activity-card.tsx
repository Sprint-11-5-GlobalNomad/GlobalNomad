"use client";

import Image from "next/image";
import { ActivityBasicDto } from "@/stores/types/activity-schemas";
import { useState } from "react";
import Link from "next/link";

type ActivityCardProps = Pick<
  ActivityBasicDto,
  "bannerImageUrl" | "rating" | "reviewCount" | "title" | "price"
>;

export function MyActivityCard(ActivityProps: ActivityCardProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col mobile:flex-row w-[34.4rem] h-[12.8rem] mobile:h-full tablet:flex-row desktop:w-[80rem] desktop:h-[20.4rem] tablet:w-[42.9rem] tablet:h-[15.6rem] rounded-[2.4rem] bg-white border border-gray-200 shadow-md gap-0 mobile:gap-[1rem] p-[0.4rem]">
      <div className="flex-shrink-0 w-full h-[12.8rem] mobile:w-[15.6rem] mobile:h-[15.6rem] desktop:w-[20.4rem] desktop:h-[20.4rem] rounded-[2.4rem] overflow-hidden">
        <Image
          src={ActivityProps.bannerImageUrl}
          alt="체험 이미지"
          width={204}
          height={204}
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
          <div className="relative">
            <button
              className="w-[4rem] h-[4rem] flex justify-center items-center text-gray-500 hover:text-gray-800"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              ···
            </button>
            {dropdownOpen && (
              <ul className="absolute right-0 mt-[0.2rem] w-[16rem] bg-white border border-gray-200 rounded-[0.6rem] shadow-lg">
                <li className="h-[4.6rem] flex items-center justify-center cursor-pointer hover:bg-gray-100 border-b border-gray-200">
                  <Link
                    href="/edit"
                    className="text-[1.6rem] font-medium leading-[2.4rem] text-gray-900"
                  >
                    수정하기
                  </Link>
                </li>
                <li className="h-[4.6rem] flex items-center justify-center cursor-pointer hover:bg-gray-100">
                  <span className="text-[1.6rem] font-medium leading-[2.4rem] text-red-500">
                    삭제하기
                  </span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
