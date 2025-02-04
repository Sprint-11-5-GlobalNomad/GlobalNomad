"use client";

import { useDeleteMyActivity } from "@/app/react-query/my-activity-state";
import { ActivityWithSubImagesAndSchedulesDto } from "@/app/types/activity-schemas";
import EditDeleteDropdown from "@/components/common/ui/dropdown/edit-delete-dropdown";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ActivityInfoHeaderProps {
  activity: ActivityWithSubImagesAndSchedulesDto;
}

export default function ActivityInfoHeader({
  activity,
}: ActivityInfoHeaderProps) {
  const { mutate: deleteMyActivity } = useDeleteMyActivity();
  const router = useRouter();

  const handleDelete = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteMyActivity(activity.id);
      router.push("/");
    }
  };

  return (
    <div className="w-[120rem] flex-between mt-[14.8rem]">
      <div className="flex flex-col justify-start gap-[1rem]">
        <span className="font-regular text-md text-nomad-black text-opacity-75">
          {activity.category}
        </span>
        <div className="flex flex-col gap-[1.6rem]">
          <h1 className="font-bold text-3xl text-nomad-black m-0">
            {activity.title}
          </h1>
          <div className="flex items-center gap-[0.8rem]">
            <span className="flex items-center gap-[0.6rem] font-regular text-md">
              <Image
                src="/image/rating-star.svg"
                alt="평균 별점 아이콘"
                width={16}
                height={16}
              />
              4.9(293)
            </span>
            <div className="flex items-center gap-[0.6rem]">
              <Image
                src="/image/location.svg"
                alt="체험 위치 옆 아이콘"
                width={16}
                height={16}
              />
              <span className="font-regular text-md text-nomad-black text-opacity-75">
                주소
              </span>
            </div>
          </div>
        </div>
      </div>
      <EditDeleteDropdown
        EditRoute={`/profile/activity/${activity.id}/edit`}
        onDelete={handleDelete}
      />
    </div>
  );
}
