"use client";

import { useMyActivities } from "@/app/react-query/my-activity-state";
import { EmptyActivity } from "@/components/common/layout/profile/empty-activity";
import { MyActivityCard } from "@/components/common/layout/profile/my-activity-card";
import UserProfileSidebar from "@/components/common/layout/profile/my-page-card";
import Button from "@/components/common/ui/button";

export default function MyActivities() {
  const { isLoading, data } = useMyActivities();

  return (
    <div className="flex flex-row justify-center min-h-[700px] h-auto mt-[14.2rem] pb-[10rem]">
      <UserProfileSidebar page="/profile/my-activities" />
      <div className="pl-[2.4rem]">
        <div className=" flex flex-row justify-between items-center">
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
            <div className="mt-[5rem]">
              <EmptyActivity />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
