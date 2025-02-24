import { useReviews } from "@/app/react-query/activity-state";
import { EmptyContent } from "@/components/common/layout/profile/empty-content";
import Pagination from "@/components/common/ui/pagination";
import { formatDate } from "@/utils/date-utils";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

const SIZE = 3;

export default function ReviewSection({ isRated }: { isRated: boolean }) {
  const { id } = useParams();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useReviews({
    filters: { activityId: Number(id), page, size: SIZE },
  });

  const totlaPages = Math.ceil((data?.totalCount || 0) / SIZE);

  return (
    <div className="flex flex-col mobile:w-full">
      <ul className="flex flex-col gap-[2.4rem] mb-[7.2rem] mobile:w-full mobile:mb-[1.6rem]">
        {isLoading ? (
          <div className="flex flex-col gap-[2.4rem] mb-[7.2rem] mobile:w-full">
            <div className="skeleton w-[79rem] h-[14rem] tablet:w-[43rem] tablet:h-[20rem] mobile:w-[32.7rem] mobile:h-[25rem] rounded-[1.5rem]" />
            <hr className="w-[80rem] h-[0.1rem] bg-nomad-black opacity-25 tablet:w-[46.9rem] mobile:w-full" />
            <div className="skeleton w-[79rem] h-[14rem] tablet:w-[43rem] tablet:h-[20rem] mobile:w-[32.7rem] mobile:h-[25rem] rounded-[1.5rem]" />
            <hr className="w-[80rem] h-[0.1rem] bg-nomad-black opacity-25 tablet:w-[46.9rem] mobile:w-full" />
            <div className="skeleton w-[79rem] h-[14rem] tablet:w-[43rem] tablet:h-[20rem] mobile:w-[32.7rem] mobile:h-[25rem] rounded-[1.5rem]" />
          </div>
        ) : isRated ? (
          data?.reviews.map((review, index) => (
            <div key={review.id}>
              <li className="flex items-start gap-[1.6rem] mb-[2.4rem] tablet:ml-[2.4rem]">
                <div className="w-[4.5rem] h-[4.5rem] mobile:flex-shrink-0">
                  <Image
                    src={
                      review.user.profileImageUrl ||
                      "/image/profile_default.svg"
                    }
                    alt="유저 프로필 이미지"
                    width={45}
                    height={45}
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
                <div className="flex flex-col gap-[0.8rem] desktop:w-[72.9rem] tablet:w-[36.8rem] mobile:w-full">
                  <div className="flex items-center gap-[0.8rem]">
                    <span className="text-lg font-semiBold">
                      {review.user.nickname}
                    </span>
                    <span className="text-md font-regular">|</span>
                    <time
                      dateTime={review.updatedAt}
                      className="text-lg font-regular text-gray-600"
                    >
                      {formatDate(review.updatedAt)}
                    </time>
                  </div>
                  <p className="text-lg font-regular">{review.content}</p>
                </div>
              </li>
              {index !== data.reviews.length - 1 && (
                <hr className="w-[80rem] h-[0.1rem] bg-nomad-black opacity-25 tablet:w-[46.9rem] mobile:w-full" />
              )}
            </div>
          ))
        ) : (
          <EmptyContent
            description="아직 등록한 리뷰가 없어요"
            className="my-[10rem] w-[80rem] tablet:w-[49.3rem] mobile:w-[32.7rem]"
          />
        )}
      </ul>
      <div className="flex justify-center gap-[1rem]">
        {data?.reviews.length === 0 ? (
          ""
        ) : (
          <Pagination
            totalPages={totlaPages}
            currentPage={page}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
}
