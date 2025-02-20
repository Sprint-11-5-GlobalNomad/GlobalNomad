"use client";

import { useActivityDetail } from "@/app/react-query/activity-state";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ErrorIndicator } from "../../common/layout/indicator/error-indicator";
import { useEffect, useState } from "react";

export default function ActivityImages() {
  const { id } = useParams();
  const { data: activity, isLoading, isError } = useActivityDetail(Number(id));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 743);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const totalImages = activity?.subImages
    ? activity.subImages.length + 1
    : activity?.bannerImageUrl
      ? 1
      : 0;

  if (isLoading)
    return (
      <div
        className="w-[119.8rem] h-[53.4rem] mb-[8.5rem]
    tablet:w-[72rem] tablet:h-[31rem] tablet:mb-[3.2rem] skeleton rounded-[1.2rem]"
      />
    );
  if (isError) return <ErrorIndicator width={100} height={100} />;

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  return (
    <div
      className="w-[119.8rem] h-[53.4rem] mb-[8.5rem]
    tablet:w-[72rem] tablet:h-[31rem] tablet:mb-[3.2rem]
    mobile:w-full mobile:h-[31rem] mobile:mb-[1.5rem]"
    >
      {isMobile ? (
        <div className="relative">
          <button
            onClick={prevImage}
            className={`w-[2.4rem] h-[4.7rem]
    absolute top-1/2 translate-y-[-50%] left-[1.6rem] ${totalImages === 1 ? "hidden" : ""}`}
          >
            <Image
              src="/image/btn_pagination_arrow_left.svg"
              alt="이전 이미지 보기"
              width={24}
              height={47}
            />
          </button>
          {currentIndex === 0 ? (
            <div className="mobile:w-full mobile:h-[31rem]">
              <Image
                src={activity!.bannerImageUrl}
                alt={`${activity?.title} 이미지 ${currentIndex + 1}`}
                width={595}
                height={310}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="mobile:w-full mobile:h-[31rem]">
              <Image
                src={activity?.subImages?.[currentIndex - 1]?.imageUrl || ""}
                alt={`${activity?.title} 이미지 ${currentIndex + 1}`}
                width={595}
                height={310}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <button
            onClick={nextImage}
            className={`w-[2.4rem] h-[4.7rem]
          absolute top-1/2 translate-y-[-50%] right-[1.6rem] ${totalImages === 1 ? "hidden" : ""}`}
          >
            <Image
              src="/image/btn_pagination_arrow_right.svg"
              alt="다음 이미지 보기"
              width={24}
              height={47}
            />
          </button>
        </div>
      ) : (
        <div>
          {totalImages > 1 ? (
            <Image
              src={activity!.bannerImageUrl}
              alt={`${activity?.title} 배너 이미지`}
              width={1198}
              height={534}
              className="rounded-[1.2rem] w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-[119.8rem] h-[53.4rem] flex gap-[0.8rem] mb-[8.5rem]
        tablet:w-[72rem] tablet:h-[31rem] tablet:mb-[3.2rem]"
            >
              <Image
                src={activity!.bannerImageUrl}
                alt={`${activity?.title} 이미지 ${currentIndex + 1}`}
                width={595}
                height={534}
                className="rounded-[1.2rem] tablet:w-[40vw] tablet:h-[31rem]"
              />

              <div
                className={`grid gap-[0.8rem] ${
                  totalImages === 2
                    ? "grid-cols-1 grid-rows-1"
                    : totalImages === 3
                      ? "grid-cols-1 grid-rows-2"
                      : "grid-cols-2 grid-rows-2"
                } w-full h-full`}
              >
                {activity?.subImages.map((subImage, index) => {
                  const isThirdImageWithFullWidth =
                    totalImages === 4 && index === 2;

                  return (
                    <Image
                      key={subImage.id}
                      src={subImage.imageUrl}
                      alt={`${activity.title} 이미지 ${currentIndex + 1}`}
                      width={isThirdImageWithFullWidth ? 595 : 293.5}
                      height={263}
                      className={`${isThirdImageWithFullWidth ? "col-span-2 w-full" : "w-full h-full"}
                  w-full h-full object-cover rounded-[1.2rem]`}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
