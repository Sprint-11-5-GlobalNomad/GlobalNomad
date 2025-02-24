"use client";

import { EmptyContent } from "@/components/common/layout/profile/empty-content";
import { MyActivityCard } from "@/components/common/layout/profile/my-activity-card";
import UserProfileSidebar from "@/components/common/layout/profile/my-page-card";
import Button from "@/components/common/ui/button";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useInfinityMyActivities } from "@/app/react-query/use-infinite-scroll";

export default function MyActivities() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinityMyActivities();

  const router = useRouter();
  const { ref, inView } = useInView();

  function ToPostPage() {
    router.push("/profile/my-activities/post");
  }

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  const isEmpty =
    !data ||
    !data.pages ||
    data.pages.length === 0 ||
    data.pages.every(
      (page) => !page.activities || page.activities.length === 0
    );

  return (
    <div className="flex flex-row justify-center gap-[2.4rem] mt-[14.4rem] mobile:mt-[9rem] mb-[18.3rem] mobile:mb-[10rem]">
      <div className="mobile:hidden">
        <UserProfileSidebar page={"/profile/my-activities"} />
      </div>
      <div className="flex flex-col">
        <div className="h-[5.3rem] flex flex-row justify-between items-center">
          <h2 className="text-[3.2rem] font-bold">내 체험 관리</h2>
          <Button
            ButtonType="profileSave"
            label="체험 등록하기"
            onClick={ToPostPage}
          />
        </div>
        <div className="flex flex-col gap-[2.4rem] mt-[1.6rem] h-auto desktop:w-[79.2rem] tablet:w-[42.9rem] mobile:w-[34.4rem]">
          {isLoading ? (
            <div className="flex flex-col gap-[2.4rem]">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="mobile:w-[34.4rem] mobile:h-[12.8rem] desktop:w-[80rem] desktop:h-[20.4rem] tablet:w-[42.9rem] tablet:h-[15.6rem] rounded-[2.4rem] skeleton"
                />
              ))}
            </div>
          ) : isEmpty ? (
            <div className="mt-[5rem] mb-[4.1rem]">
              <EmptyContent />
            </div>
          ) : (
            data.pages.map((page) =>
              page.activities.map((activity, index) => {
                const lastPage = data?.pages?.[data.pages.length - 1]; // ✅ 안전한 접근
                const isLastItem =
                  index === page.activities.length - 1 && lastPage === page; // ✅ 안전한 비교

                return (
                  <MyActivityCard
                    key={activity.id}
                    bannerImageUrl={activity.bannerImageUrl}
                    rating={activity.rating}
                    reviewCount={activity.reviewCount}
                    title={activity.title}
                    price={activity.price}
                    id={activity.id}
                    ref={isLastItem ? ref : null}
                  />
                );
              })
            )
          )}

          {isFetchingNextPage && (
            <div className="flex flex-col gap-[2.4rem]">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="mobile:w-[34.4rem] mobile:h-[12.8rem] desktop:w-[80rem] desktop:h-[20.4rem] tablet:w-[42.9rem] tablet:h-[15.6rem] rounded-[2.4rem] skeleton"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
