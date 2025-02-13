"use client";

import { EmptyContent } from "@/components/common/layout/profile/empty-content";
import { MyActivityCard } from "@/components/common/layout/profile/my-activity-card";
import UserProfileSidebar from "@/components/common/layout/profile/my-page-card";
import Button from "@/components/common/ui/button";
import { useRouter } from "next/navigation";
// import { useInView } from "react-intersection-observer";
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

  // ✅ 콘솔 로그 추가하여 API 응답 확인
  console.log("Fetched Data:", data);

  // ✅ 마지막 아이템이 보이면 다음 페이지 데이터 불러오기
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      console.log("Fetching next page..."); // ✅ fetchNextPage 호출 확인
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  // ✅ 안전한 `isEmpty` 판별 로직
  const isEmpty =
    !data || // 데이터가 없거나
    !data.pages || // pages 배열이 없거나
    data.pages.length === 0 || // 페이지가 하나도 없거나
    data.pages.every(
      (page) => !page.activities || page.activities.length === 0
    ); // activities가 비어 있음

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
            <p>로딩 중...</p>
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
                    ref={isLastItem ? ref : null} // ✅ 무한 스크롤 적용
                  />
                );
              })
            )
          )}

          {isFetchingNextPage && <p>추가 로딩 중...</p>}
        </div>
      </div>
    </div>
  );
}
