import ActivityDetails from "@/components/pages/activity-detail/activity-details";
import ActivityImages from "@/components/pages/activity-detail/activity-images";
import ActivityInfoHeader from "@/components/pages/activity-detail/activity-info-header";

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
