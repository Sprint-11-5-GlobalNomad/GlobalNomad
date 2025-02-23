import ActivityDetails from "@/components/pages/activity-detail/activity-details";
import ActivityImages from "@/components/pages/activity-detail/activity-images";
import ActivityInfoHeader from "@/components/pages/activity-detail/activity-info-header";
import { Metadata } from "next";
import { fetchActivityDetail } from "../../api/activities-api";

type generateMetadataProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: generateMetadataProps): Promise<Metadata> {
  const activityParams = await params;
  const activity = await fetchActivityDetail(Number(activityParams.id));

  return {
    title: activity ? `${activity.title} - GlobalNomad` : "GlobalNomad",
    description:
      activity.description || "당신의 일상을 특별하게 만드는 한 번의 클릭",
  };
}

export default function ActivityDetailPage() {
  return (
    <>
      <div className="flex-column">
        <ActivityInfoHeader />
        <ActivityImages />
        <ActivityDetails />
      </div>
    </>
  );
}
