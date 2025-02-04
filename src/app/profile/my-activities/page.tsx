"use client";

import { useMyActivities } from "@/app/react-query/my-activity-state";
import { EmptyActivity } from "@/components/common/layout/profile/empty-activity";
import { MyActivityCard } from "@/components/common/layout/profile/my-activity-card";
import UserProfileSidebar from "@/components/common/layout/profile/my-page-card";
import Button from "@/components/common/ui/button";

export default function MyActivities() {
  const { isLoading, data } = useMyActivities();

  return (
    <div className="flex flex-row justify-center gap-[2.4rem] mt-[14.4rem] mobile:mt-[9rem] mb-[18.3rem] mobile:mb-[10rem]">
      <div className="mobile:hidden">
        <UserProfileSidebar page={"/profile/my-activities"} />
      </div>
      <div className="flex flex-col">
        <div className="h-[5.3rem] flex flex-row justify-between items-center">
          <h2 className="text-[3.2rem] font-bold">내 체험 관리</h2>
          <Button type="profileSave" label="체험 등록하기" />
        </div>
        <div className="flex flex-col gap-[2.4rem] mt-[1.6rem] h-auto desktop:w-[79.2rem] tablet:w-[42.9rem] mobile:w-[34.4rem]">
          {isLoading ? (
            <p>로딩 중...</p>
          ) : data && data.activities.length > 0 ? (
            data.activities.map((activity) => (
              <MyActivityCard
                key={activity.id}
                bannerImageUrl={activity.bannerImageUrl}
                rating={activity.rating}
                reviewCount={activity.reviewCount}
                title={activity.title}
                price={activity.price}
                id={activity.id}
              />
            ))
          ) : (
            <div className="mt-[5rem] mb-[4.1rem]">
              <EmptyActivity />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
