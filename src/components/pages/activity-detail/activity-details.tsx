"use client";

import { useParams } from "next/navigation";
import BookingSection from "./booking-section";
import { useActivityDetail } from "@/app/react-query/activity-state";
import Image from "next/image";
import ReviewSection from "./review-section";
import { useAuth } from "@/app/(primary)/api/use-auth";
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
  const { data: activity, isLoading } = useActivityDetail(Number(id));

  const { user } = useAuth();
  const isOwner = user?.id === activity?.userId;
  const isRated = activity?.rating !== undefined && activity?.rating !== 0;

  return (
    <div className="w-[120rem] flex tablet:w-[72rem] tablet:mr-[2.4rem] mobile:w-full mobile:mx-auto">
      <div className="tablet:w-full mobile:w-full mobile:mx-[2.4rem]">
        <hr
          className="w-[79rem] h-[0.1rem] bg-nomad-black
        opacity-25 mb-[4rem] tablet:w-[46.9rem] mobile:hidden"
        ></hr>

        <div
          className="w-[79rem] h-auto flex flex-col justify-start
        tablet:w-full tablet:ml-[2.4rem] mobile:w-full"
        >
          <h2 className="text-xl font-bold mb-[1.6rem]">체험 설명</h2>
          {isLoading ? (
            <div className="skeleton w-[79rem] h-[15rem] tablet:w-[42.8rem] tablet:h-[20rem] mobile:w-full mobile:h-[30rem]" />
          ) : (
            <p className="text-lg font-regular opacity-75 tablet:w-[42.8rem]">
              {activity?.description}
            </p>
          )}
        </div>

        <hr
          className="w-[79rem] h-[0.1rem] bg-nomad-black
        opacity-25 mt-[3.4rem] mb-[4rem] tablet:w-[46.9rem]
        mobile:hidden mobile:my-[1.6rem]"
        ></hr>

        {/* 지도 섹션 */}
        <div
          className="w-[80rem] flex flex-col gap-[0.8rem]
        tablet:w-[42.9rem] tablet:ml-[2.4rem] mobile:w-full"
        >
          {isLoading ? (
            <div
              className="skeleton w-[79rem] h-[45rem] rounded-[1.6rem]
      tablet:w-[42.9rem] tablet:h-[30.8rem] mobile:w-full mobile:h-[45rem]"
            />
          ) : (
            <KakaoMaps address={activity?.address} />
          )}

          <div className="flex items-center gap-[0.2rem]">
            <Image
              src="/image/location.svg"
              alt="체험 위치 옆 아이콘"
              width={18}
              height={18}
            />
            {isLoading ? (
              <div className="skeleton w-[20rem] h-[2.4rem] rounded-[0.7rem]" />
            ) : (
              <span className="font-regular text-md text-nomad-black opacity-75">
                {activity?.address}
              </span>
            )}
          </div>
        </div>

        <hr
          className="w-[79rem] h-[0.1rem] bg-nomad-black
        opacity-25 mt-[4rem] mb-[4rem] tablet:w-[46.9rem] mobile:hidden"
        ></hr>

        <div className="w-[80rem] tablet:w-[46.9rem] mobile:w-full mobile:mt-[4rem]">
          <div
            className="flex flex-col gap-[2.4rem] mb-[2.4rem]
            tablet:gap-[1.8rem] tablet:ml-[2.4rem]"
          >
            <h2 className="text-xl font-bold mb-[1.6rem] tablet:mb-0">후기</h2>
            <div className="flex items-center gap-[1.6rem]">
              {isLoading ? (
                <div className="skeleton w-[7.5rem] h-[6rem] rounded-[0.5rem]" />
              ) : (
                <span className="text-[5rem] leading-[6rem] font-semiBold">
                  {activity?.rating}
                </span>
              )}
              <div className="flex flex-col gap-[0.8rem]">
                {isLoading ? (
                  <div className="skeleton w-[7rem] h-[2.6rem] rounded-[0.5rem]" />
                ) : (
                  <span className="text-2lg font-regular">
                    {getSatisfactionLevel(activity?.rating)}
                  </span>
                )}
                <span className="flex items-center gap-[0.6rem]">
                  <Image
                    src="/image/rating-star.svg"
                    alt="평균 별점 아이콘"
                    width={16}
                    height={16}
                  />
                  {isLoading ? (
                    <div className="skeleton w-[7.4rem] h-[2.4rem] rounded-[0.5rem]" />
                  ) : (
                    <div>
                      {Number(activity?.reviewCount).toLocaleString("ko-KR")}개
                      후기
                    </div>
                  )}
                </span>
              </div>
            </div>
          </div>

          <ReviewSection isRated={isRated} />
        </div>
      </div>
      {isOwner ? <></> : <BookingSection />}
    </div>
  );
}
