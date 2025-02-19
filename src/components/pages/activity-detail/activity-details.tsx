"use client";

import { useParams } from "next/navigation";
import BookingSection from "./booking-section";
import { useActivityDetail } from "@/app/react-query/activity-state";
import Image from "next/image";
import ReviewSection from "./review-section";
import { useAuth } from "@/app/(primary)/api/use-auth";
import { EmptyContent } from "@/components/common/layout/profile/empty-content";
import KakaoMaps from "./kakomaps/kakaomaps";

const getSatisfactionLevel = (rating?: number) => {
  if (rating === undefined || rating === 0) return "평가 없음";
  if (rating >= 4.0) return "매우 만족";
  if (rating >= 3.0) return "만족";
  if (rating >= 2.0) return "불만족";
  return "매우 불만족";
};

export default function ActivityDetails() {
  const { id } = useParams();
  const { data: activity } = useActivityDetail(Number(id));

  const { user } = useAuth();
  const isOwner = user?.id === activity?.userId;
  const isRated = activity?.rating !== undefined && activity?.rating !== 0;

  return (
    <div
      className="w-[120rem] flex justify-center
    tablet:w-full tablet:mr-[2rem]"
    >
      <div className="tablet:w-[49.3rem]">
        <hr
          className="w-[79rem] h-[0.1rem] bg-nomad-black
        opacity-25 mb-[4rem] tablet:w-[49.3rem]"
        ></hr>

        <div
          className="w-[79rem] h-auto flex flex-col justify-start
        tablet:w-[45.5rem] tablet:ml-[2.4rem]"
        >
          <h2 className="text-xl font-bold mb-[1.6rem]">체험 설명</h2>
          <p className="text-lg font-regular opacity-75 tablet:w-[42.8rem]">
            {activity?.description}
          </p>
        </div>

        <hr
          className="w-[79rem] h-[0.1rem] bg-nomad-black
        opacity-25 mt-[3.4rem] mb-[4rem] tablet:w-[49.3rem]"
        ></hr>

        {/* 지도 섹션 */}
        <div
          className="w-[80rem] flex flex-col gap-[0.8rem]
        tablet:w-[42.9rem] tablet:ml-[2.4rem]"
        >
          <KakaoMaps address={activity?.address} />
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
        opacity-25 mt-[4rem] mb-[4rem] tablet:w-[49.3rem]"
        ></hr>

        <div className="w-[80rem] tablet:w-[49.3rem]">
          <div
            className="flex flex-col gap-[2.4rem] mb-[2.4rem]
            tablet:gap-[1.8rem] tablet:ml-[2.4rem]"
          >
            <h2 className="text-xl font-bold mb-[1.6rem] tablet:mb-0">후기</h2>
            <div className="flex items-center gap-[1.6rem]">
              <span className="text-[5rem] leading-[6rem] font-semiBold">
                {activity?.rating}
              </span>
              <div className="flex flex-col gap-[0.8rem]">
                <span className="text-2lg font-regular">
                  {getSatisfactionLevel(activity?.rating)}
                </span>
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

          {isRated ? (
            <ReviewSection />
          ) : (
            <EmptyContent
              description="아직 등록한 리뷰가 없어요"
              className="my-[10rem] w-[80rem] tablet:w-[49.3rem]"
            />
          )}
        </div>
      </div>
      {isOwner ? <></> : <BookingSection />}
    </div>
  );
}
