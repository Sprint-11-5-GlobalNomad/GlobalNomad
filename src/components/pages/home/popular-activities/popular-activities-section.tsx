import { ErrorIndicator } from "@/components/common/layout/indicator/error-indicator";
import { useInfiniteActivities } from "@/app/react-query/use-infinite-scroll";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

const SIZE = 9;

export default function PopularActivitiesSection() {
  const [startIndex, setStartIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteActivities({
    method: "cursor",
    cursorId: null,
    size: SIZE,
    sort: "most_reviewed",
  });

  const activities = useMemo(() => {
    return data?.pages.flatMap((page) => page.activities) || [];
  }, [data]);

  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      const itemWidth = itemRefs.current[0]?.offsetWidth || 0;
      const newStartIndex = Math.floor(scrollContainer.scrollLeft / itemWidth);

      setStartIndex(newStartIndex);
    }
  };

  const [debouncedHandleScroll] = useDebounce(handleScroll, 200);

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isLoading]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    scrollContainer?.addEventListener("scroll", debouncedHandleScroll);

    return () => {
      scrollContainer?.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [debouncedHandleScroll]);

  const scrollToIndex = (index: number) => {
    const targetElement = itemRefs.current[index];

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  const handleNext = () => {
    if (scrollContainerRef.current && startIndex < activities.length - 1) {
      const nextIndex = startIndex + 1;
      setStartIndex(nextIndex);
      scrollToIndex(nextIndex);
    }
  };

  const handlePrev = () => {
    if (scrollContainerRef.current && startIndex > 0) {
      const prevIndex = startIndex - 1;
      setStartIndex(prevIndex);
      scrollToIndex(prevIndex);
    }
  };

  const setCombinedRef = (index: number, el: HTMLLIElement | null) => {
    itemRefs.current[index] = el;
    ref(el);
  };

  return (
    <>
      <div
        className="flex-between w-[120rem] mt-[15.8rem] mb-[3.2rem]
    tablet:w-[74.4rem] mobile:w-[37.5rem] mobile:mt-[9.4rem] mobile:mb-[1.6rem]"
      >
        <h2
          className="text-3xl font-bold tablet:ml-[2.4rem]
          mobile:text-2lg mobile:ml-[1.6rem]"
        >
          🔥 인기 체험
        </h2>
        <div className="flex gap-[1.2rem]">
          <button
            className="tablet:hidden mobile:hidden"
            onClick={handlePrev}
            disabled={startIndex === 0}
          >
            <Image
              src={`${startIndex === 0 ? "/image/unactivated_left_arrow.svg" : "/image/activated_left_arrow.svg"}`}
              alt="인기체험 이전 목록"
              width={44}
              height={44}
            />
          </button>
          <button className="tablet:hidden mobile:hidden" onClick={handleNext}>
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
        <div
          className="flex flex-nowrap gap-[2.4rem] w-[120rem] mb-[6rem] overflow-x-auto hide-scrollbar
        tablet:w-[78rem] tablet:ml-[2.4rem] tablet:gap-[3.2rem]
        mobile:w-[37.5rem] mobile:mb-[4rem] mobile:ml-[1.6rem] mobile:gap-[1.6rem]"
        >
          <div
            className="relative h-[38.4rem] w-[38.4rem] border rounded-[2rem] flex-shrink-0 flex-grow-0
          mobile:w-[18.4rem] mobile:h-[18.4rem] skeleton"
          />
          <div
            className="relative h-[38.4rem] w-[38.4rem] border rounded-[2rem] flex-shrink-0 flex-grow-0
        mobile:w-[18.4rem] mobile:h-[18.4rem] skeleton"
          />
          <div
            className="relative h-[38.4rem] w-[38.4rem] border rounded-[2rem] flex-shrink-0 flex-grow-0
      mobile:w-[18.4rem] mobile:h-[18.4rem] skeleton"
          />
        </div>
      ) : isError ? (
        <ErrorIndicator width={80} height={80} />
      ) : (
        <ul
          ref={scrollContainerRef}
          className="flex flex-nowrap gap-[2.4rem] w-[120rem] mb-[6rem] overflow-x-auto hide-scrollbar
    tablet:w-[74.4rem] tablet:ml-[2.4rem] tablet:gap-[3.2rem]
    mobile:w-[37.5rem] mobile:mb-[4rem] mobile:pl-[1.6rem] mobile:gap-[1.6rem]"
        >
          {activities.map((activity, index) => {
            return (
              <li
                key={activity.id}
                ref={(el) => setCombinedRef(index, el)}
                className="relative h-[38.4rem] w-[38.4rem] border rounded-[2rem] flex-shrink-0 flex-grow-0
          mobile:w-[18.4rem] mobile:h-[18.4rem]"
              >
                <Link href={`/activity/${activity.id}`}>
                  <div
                    className="h-full w-full bg-center bg-cover rounded-[2rem]"
                    style={{
                      backgroundImage: `url(${activity.bannerImageUrl})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-black opacity-20 rounded-[2rem]" />
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
                          {Number(activity.reviewCount).toLocaleString("ko-KR")}
                          )
                        </p>
                      </div>
                      <p
                        className="text-3xl font-bold break-keep
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
                  </div>
                </Link>
              </li>
            );
          })}
          {(isFetchingNextPage || isLoading) && (
            <div
              className="relative h-[38.4rem] w-[38.4rem] border rounded-[2rem] flex-shrink-0 flex-grow-0
          mobile:w-[18.4rem] mobile:h-[18.4rem] skeleton"
            />
          )}
        </ul>
      )}
    </>
  );
}
