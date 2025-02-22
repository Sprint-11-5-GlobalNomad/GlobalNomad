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
  const { data, isLoading } = useReviews({
    filters: { activityId: Number(id), page: 1, size: SIZE },
  });

  const [page, setPage] = useState(1);
  const totlaPages = Math.ceil((data?.totalCount || 0) / SIZE);

  return (
    <div className="flex flex-col items-center mobile:w-[32.7rem]">
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
              <li className="flex items-start gap-[1.6rem] mb-[2.4rem] tablet:ml-[2.4rem] mobile:w-full">
                <div>
                  <Image
                    src={
                      review.user.profileImageUrl ||
                      "/image/profile_default.svg"
                    }
                    alt="유저 프로필 이미지"
                    width={45}
                    height={45}
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-[0.8rem] tablet:w-[36.8rem]">
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
              {data?.reviews.length === 2
                ? index === 0 && (
                    <hr className="w-[80rem] h-[0.1rem] bg-nomad-black opacity-25 tablet:w-[46.9rem] mobile:w-full" />
                  )
                : data?.reviews.length > 2
                  ? index % 3 !== 0 && (
                      <hr className="w-[80rem] h-[0.1rem] bg-nomad-black opacity-25 tablet:w-[46.9rem] mobile:w-full" />
                    )
                  : null}
            </div>
          ))
        ) : (
          <EmptyContent
            description="아직 등록한 리뷰가 없어요"
            className="my-[10rem] w-[80rem] tablet:w-[49.3rem] mobile:w-[32.7rem]"
          />
        )}
      </ul>
      <div className="flex gap-[1rem] tablet:translate-x-1/2">
        <Pagination
          totalPages={totlaPages}
          currentPage={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
}
