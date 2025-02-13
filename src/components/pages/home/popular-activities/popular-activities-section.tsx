// "use client";

import { LoadingIndicator } from "@/components/common/layout/indicator/loading-indicator";
import { ErrorIndicator } from "@/components/common/layout/indicator/error-indicator";
import { useInfiniteActivities } from "@/app/react-query/use-infinite-scroll";
import Image from "next/image";
import Link from "next/link";

const SIZE = 9;

export default function PopularActivitiesSection() {
  const {
    data,
    isLoading,
    isError,
    // fetchNextPage,
    // hasNextPage,
    // isFetchingNextPage,
  } = useInfiniteActivities({
    method: "cursor",
    cursorId: null,
    size: SIZE,
    sort: "most_reviewed",
  });

  const activities = data?.pages.flatMap((page) => page.activities) || [];

  console.log("data", data);

  return (
    <>
      <div
        className="flex-between w-[120rem] mt-[15.8rem] mb-[3.2rem]
    tablet:w-[69.6rem] mobile:w-[34.3rem] mobile:mt-[9.4rem] mobile:mb-[1.6rem]"
      >
        <h2
          className="text-3xl font-bold mobile:text-[1.8rem]
      mobile:leading-[2.1rem]"
        >
          🔥 인기 체험
        </h2>
        <div className="flex gap-[1.2rem]">
          <button
            className="tablet:hidden mobile:hidden"
            // onClick={handlePrevCursor}
            // disabled={pageIndex === 0}
          >
            <Image
              src="/image/unactivated_left_arrow.svg"
              alt="인기체험 이전 목록"
              width={44}
              height={44}
            />
          </button>
          <button
            className="tablet:hidden mobile:hidden"
            // onClick={handleNextCursor}
            // disabled={!hasNextPage}
          >
            <Image
              src="/image/activated_right_arrow.svg"
              alt="인기체험 다음 목록"
              width={44}
              height={44}
            />
          </button>
        </div>
      </div>

      {isLoading ? (
        <LoadingIndicator width={80} height={80} />
      ) : isError ? (
        <ErrorIndicator width={80} height={80} />
      ) : (
        <ul
          className="flex flex-nowrap gap-[2.4rem] w-[120rem] mb-[6rem] overflow-x-auto hide-scrollbar
    tablet:w-[80rem] tablet:px-[4rem] tablet:gap-[3.2rem]
    mobile:w-[38.8rem] mobile:mb-[4.6rem] mobile:px-[2rem] mobile:gap-[1.6rem]"
        >
          {activities.map((activity) => (
            <li
              key={activity.id}
              className="relative h-[38.4rem] w-[38.4rem] border rounded-[2rem] flex-shrink-0 flex-grow-0
          mobile:w-[18.4rem] mobile:h-[18.4rem]"
            >
              <Link href={`/activity/${activity.id}`}>
                <Image
                  src={activity.bannerImageUrl}
                  alt={activity.title}
                  width={384}
                  height={384}
                  className="absolute inset-0 w-full h-full rounded-[2rem] object-cover"
                />
                <div
                  className="flex-column items-start w-full gap-[2rem] px-[2rem] py-[3rem]
          absolute transform -translate-x-1/2 translate-y-0 bottom-0 left-1/2 text-white
          mobile:pt-[3rem] mobile:pr-[2rem] mobile:pb-[1.2rem] mobile:gap-[0.5rem]"
                >
                  <div className="flex-between gap-[0.5rem]">
                    <Image
                      src="/image/rating-star.svg"
                      alt="평균 별점 아이콘"
                      width={18}
                      height={18}
                    />
                    <p className="text-md font-semiBold">
                      {activity.rating} (
                      {Number(activity.reviewCount).toLocaleString("ko-KR")})
                    </p>
                  </div>
                  <p
                    className="w-[25.1rem] text-3xl font-bold break-keep
              mobile:text-[1.8rem] mobile:leading-[2.6rem]"
                  >
                    {activity.title}
                  </p>
                  <p className="text-xl font-bold flex-between gap-[0.5rem]">
                    ₩ {Number(activity.price).toLocaleString("ko-KR")}
                    <span className="text-md font-regular text-gray-700">
                      /인
                    </span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
