import { useReviews } from "@/app/react-query/activity-state";
import Pagination from "@/components/common/ui/pagination";
import { formatDate } from "@/utils/date-utils";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

const SIZE = 3;

export default function ReviewSection() {
  const { id } = useParams();
  const { data } = useReviews({
    filters: { activityId: Number(id), page: 1, size: SIZE },
  });

  const [page, setPage] = useState(1);

  const totlaPages = Math.ceil((data?.totalCount || 0) / SIZE);

  return (
    <div className="flex flex-col items-center">
      <ul className="flex flex-col gap-[2.4rem] mb-[7.2rem]">
        {data?.reviews.map((review, index) => (
          <div key={review.id}>
            <li className="flex items-start gap-[1.6rem] mb-[2.4rem]">
              <div>
                <Image
                  src={
                    review.user.profileImageUrl || "/image/profile_default.svg"
                  }
                  alt="유저 프로필 이미지"
                  width={45}
                  height={45}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-[0.8rem]">
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

            {index % 3 !== 2 && (
              <hr
                className="w-[80rem] h-[0.1rem] bg-nomad-black
        opacity-25"
              />
            )}
          </div>
        ))}
      </ul>
      <div className="flex gap-[1rem]">
        <Pagination
          totalPages={totlaPages}
          currentPage={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
}
