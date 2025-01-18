"use client";

import Image from "next/image";
import { ActivityBasicDto } from "@/stores/types/activity-schemas";
import Link from "next/link";
import { useState } from "react";

type ActivityCardProps = Pick<
  ActivityBasicDto,
  "bannerImageUrl" | "rating" | "reviewCount" | "title" | "price"
>;

export function MyActivityCard(ActivityProps: ActivityCardProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row w-full lg:w-[80rem] lg:h-[20.4rem] md:w-[42.9rem] md:h-[15.6rem] sm:w-full rounded-[2.4rem] bg-white border border-gray-200 shadow-md lg:gap-[1rem] md:gap-0 p-[0.4rem]">
      <div className="flex-shrink-0 w-full lg:w-[20.4rem] lg:h-[20.4rem] md:w-[15.6rem] md:h-[15.6rem] sm:w-full sm:h-full rounded-[2.4rem] overflow-hidden">
        <Image
          src={ActivityProps.bannerImageUrl}
          alt="체험 이미지"
          width={204}
          height={204}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col justify-between flex-1 p-2">
        <div className="flex flex-col gap-4">
          <div className="text-[1.4rem] lg:text-[1.6rem] md:text-[1.4rem] leading-[2.4rem] lg:leading-[2.6rem] font-pretendard-regular flex items-center gap-[0.2rem]">
            <Image
              src="/image/rating-star.svg"
              alt="레이팅 이미지"
              width={19}
              height={19}
            />
            <span>
              {ActivityProps.rating} (
              {ActivityProps.reviewCount.toLocaleString()})
            </span>
          </div>
          <div className="text-[1.4rem] lg:text-[2rem] md:text-[1.8rem] leading-[2.4rem] lg:leading-[3.2rem] md:leading-[2.6rem] font-bold">
            {ActivityProps.title}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-[1.6rem] lg:text-[2rem] md:text-[2rem] leading-[2.6rem] lg:leading-[3.2rem] font-medium text-right">
            ₩{ActivityProps.price.toLocaleString()}/인
          </div>

          <div className="relative">
            <button
              className="w-[4rem] h-[4rem] flex justify-center items-center text-[1.6rem] font-bold"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              ···
            </button>
            {dropdownOpen && (
              <ul className="absolute right-0 mt-[0.2rem] w-[16rem] bg-white border border-gray-100 rounded-[0.6rem] shadow-lg">
                <li className="h-[4.6rem] flex items-center justify-center cursor-pointer hover:bg-[var(--color-gray-100)] border-b border-gray-100">
                  <Link
                    href="/edit"
                    className="text-[1.8rem] font-medium leading-[2.6rem] font-pretendard"
                  >
                    수정하기
                  </Link>
                </li>
                <li className="h-[4.6rem] flex items-center justify-center cursor-pointer hover:bg-[var(--color-gray-100)]">
                  <span className="text-[1.8rem] font-medium leading-[2.6rem] font-pretendard">
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
