"use client";

import { useParams } from "next/navigation";
import BookingSection from "./booking-section";
import { useActivityDetail } from "@/app/react-query/activity-state";
import Image from "next/image";
import ReviewSection from "./review-section";
import { useAuth } from "@/app/api/use-auth";
import { EmptyContent } from "@/components/common/layout/profile/empty-content";
import Script from "next/script";
import { useEffect } from "react";

const KAKAO_MAP = process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY;

const getSatisfactionLevel = (rating?: number) => {
  if (rating === undefined || rating === 0) return "평가 없음";
  if (rating >= 4.0) return "매우 만족";
  if (rating >= 3.0) return "만족";
  if (rating >= 2.0) return "불만족";
  return "매우 불만족";
};

interface GeocodeResult {
  address_name: string;
  x: string;
  y: string;
}

export default function ActivityDetails() {
  const { id } = useParams();
  const { data: activity } = useActivityDetail(Number(id));

  const { user } = useAuth();
  const isOwner = user?.id === activity?.userId;
  const isRated = activity?.rating !== undefined && activity?.rating !== 0;

  useEffect(() => {
    if (!activity?.address) return;

    if (typeof window !== "undefined" && window.kakao) {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        const address = activity?.address;
        console.log("주소", activity?.address);

        geocoder.addressSearch(
          address,
          (result: GeocodeResult[], status: number) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const lat = result[0].y;
              const lng = result[0].x;

              const container = document.getElementById("map");
              const options = {
                center: new window.kakao.maps.LatLng(lat, lng),
                level: 3,
                // marker: marker,
              };
              new window.kakao.maps.Map(container, options);
            } else {
              console.error("주소 변환 실패:", status);
            }
          }
        );
      });
    }
  }, [activity?.address]);

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
          <Script
            type="text/javascript"
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP}&autoload=false&libraries=services`}
            strategy="beforeInteractive"
            onLoad={() => console.log("카카오 맵 스크립트 로드 완료")}
          />
          <div id="map" className="w-[79rem] h-[45rem] rounded-[1.6rem]"></div>
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
              className="my-[30rem] w-[80rem]"
            />
          )}
        </div>
      </div>
      {isOwner ? <></> : <BookingSection />}
    </div>
  );
}
