"use client";

import { useActivityDetail } from "@/app/react-query/activity-state";
import ActivityImages from "@/components/common/layout/activity-detail/activity-images";
import { ErrorIndicator } from "@/components/common/layout/indicator/error-indicator";
import { LoadingIndicator } from "@/components/common/layout/indicator/loading-indicator";
import { EmptyActivity } from "@/components/common/layout/profile/empty-activity";
import ActivityInfoHeader from "@/components/pages/activity-detail/activity-info-header";
import { useParams } from "next/navigation";

export default function ActivityDetailPage() {
  const { id } = useParams();
  const { data: activity, isLoading, isError } = useActivityDetail(Number(id));

  if (isLoading) return <LoadingIndicator width={100} height={100} />;
  if (isError) return <ErrorIndicator width={100} height={100} />;

  return (
    <>
      {activity ? (
        <div className="flex-column">
          <ActivityInfoHeader activity={activity} />
          <ActivityImages activity={activity} />
        </div>
      ) : (
        <EmptyActivity />
      )}
    </>
  );
}
