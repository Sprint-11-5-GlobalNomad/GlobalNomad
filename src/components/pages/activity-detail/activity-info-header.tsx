"use client";

import { useAuth } from "@/app/(primary)/api/use-auth";
import { useActivityDetail } from "@/app/react-query/activity-state";
import { useDeleteMyActivity } from "@/app/react-query/my-activity-state";
import EditDeleteDropdown from "@/components/common/ui/dropdown/edit-delete-dropdown";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

export default function ActivityInfoHeader() {
  const { id } = useParams();
  const { data: activity, isLoading } = useActivityDetail(Number(id));
  const { mutate: deleteMyActivity } = useDeleteMyActivity();
  const router = useRouter();
  const { user } = useAuth();

  const isOwner = user?.id === activity?.userId;

  const handleDelete = () => {
    if (activity?.id && confirm("정말 삭제하시겠습니까?")) {
      deleteMyActivity(activity.id);
      router.push("/");
    }
  };

  return (
    <div className="mobile:w-full">
      {isLoading ? (
        <div>
          <div
            className="w-[120rem] flex-between mt-[14.8rem] mb-[2.5rem]
    tablet:w-[69.6rem] tablet:mt-[9.4rem] tablet:mb-[1.5rem]
    mobile:w-full mobile:mt-[8.6rem] mobile:mb-0 mobile:mx-[1.6rem]"
          >
            <div className="flex flex-col justify-start gap-[1rem]">
              <div className="skeleton w-[35rem] h-[2.4rem] rounded-[0.7rem]" />
              <div className="flex flex-col gap-[1.6rem]">
                <div className="skeleton w-[40rem] h-[4.2rem] mobile:h-[3.2rem] rounded-[0.7rem]" />
                <div className="flex items-center gap-[0.8rem]">
                  <div className="flex items-center gap-[0.6rem] font-regular text-md">
                    <Image
                      src="/image/rating-star.svg"
                      alt="평균 별점 아이콘"
                      width={16}
                      height={16}
                    />
                    <div className="skeleton w-[4.5rem] h-[2.4rem] rounded-[0.7rem]" />
                  </div>
                  <div className="flex items-center gap-[0.2rem]">
                    <Image
                      src="/image/location.svg"
                      alt="체험 위치 아이콘"
                      width={18}
                      height={18}
                    />
                    <div className="skeleton w-[20rem] h-[2.4rem] rounded-[0.7rem]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="w-[120rem] flex-between mt-[14.8rem] mb-[2.5rem]
    tablet:w-[69.6rem] tablet:mt-[9.4rem] tablet:mb-[1.5rem]
    mobile:w-full mobile:mt-[8.6rem] mobile:mb-0 mobile:mx-[1.6rem]"
        >
          <div className="flex flex-col justify-start gap-[1rem]">
            <span className="font-regular text-md text-nomad-black opacity-75">
              {activity?.category}
            </span>
            <div className="flex flex-col gap-[1.6rem]">
              <h1
                className="font-bold text-3xl text-nomad-black m-0
                mobile:text-2xl"
              >
                {activity?.title}
              </h1>
              <div className="flex items-center gap-[0.8rem]">
                <span className="flex items-center gap-[0.6rem] font-regular text-md">
                  <Image
                    src="/image/rating-star.svg"
                    alt="평균 별점 아이콘"
                    width={16}
                    height={16}
                  />
                  {activity?.rating} (
                  {Number(activity?.reviewCount).toLocaleString("ko-KR")})
                </span>
                <div className="flex items-center gap-[0.2rem]">
                  <Image
                    src="/image/location.svg"
                    alt="체험 위치 아이콘"
                    width={18}
                    height={18}
                  />
                  <span className="font-regular text-md text-nomad-black opacity-75">
                    {activity?.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {isOwner ? (
            <EditDeleteDropdown
              EditRoute={`/profile/my-activities/${activity?.id}/edit`}
              onDelete={handleDelete}
            />
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}
