"use client";

import { useParams } from "next/navigation";
import BookingSection from "./booking-section";
import { useActivityDetail } from "@/app/react-query/activity-state";
import Image from "next/image";
import ReviewSection from "./review-section";

export default function ActivityDetails() {
  const { id } = useParams();
  const { data: activity } = useActivityDetail(Number(id));

  return (
    <div className="w-[120rem] flex justify-between">
      <div>
        <hr
          className="w-[79rem] h-[0.1rem] bg-nomad-black
        opacity-25 mb-[4rem]"
        ></hr>

        <div className="w-[79rem] h-auto flex flex-col justify-start">
          <h2 className="text-xl font-bold mb-[1.6rem]">체험 설명</h2>
          <p className="text-lg font-regular opacity-75">
            {activity?.description}
          </p>
        </div>

        <hr
          className="w-[79rem] h-[0.1rem] bg-nomad-black
        opacity-25 mt-[3.4rem] mb-[4rem]"
        ></hr>

        <div className="w-[80rem] flex flex-col gap-[0.8rem]">
          <Image
            src="/image/map-sample.svg"
            alt="카카오 맵 샘플 이미지"
            width={790}
            height={450}
            className="w-[79rem] rounded-[1.6rem]"
          />
          <div className="flex items-center gap-[0.2rem]">
            <Image
              src="/image/location.svg"
              alt="체험 위치 옆 아이콘"
              width={18}
              height={18}
            />
            <span className="font-regular text-md text-nomad-black opacity-75">
              {activity?.address}
            </span>
          </div>
        </div>

        <hr
          className="w-[79rem] h-[0.1rem] bg-nomad-black
        opacity-25 mt-[4rem] mb-[4rem]"
        ></hr>

        <div className="w-[80rem]">
          <div className="flex flex-col gap-[2.4rem] mb-[2.4rem]">
            <h2 className="text-xl font-bold mb-[1.6rem]">후기</h2>
            <div className="flex items-center gap-[1.6rem]">
              <span className="text-[5rem] leading-[6rem] font-semiBold">
                {activity?.rating}
              </span>
              <div className="flex flex-col gap-[0.8rem]">
                <span className="text-2lg font-regular">매우 만족</span>
                <span className="flex items-center gap-[0.6rem]">
                  <Image
                    src="/image/rating-star.svg"
                    alt="평균 별점 아이콘"
                    width={16}
                    height={16}
                  />
                  {Number(activity?.reviewCount).toLocaleString("ko-KR")}개 후기
                </span>
              </div>
            </div>
          </div>

          <ReviewSection />
        </div>
      </div>
      <BookingSection />
    </div>
  );
}
