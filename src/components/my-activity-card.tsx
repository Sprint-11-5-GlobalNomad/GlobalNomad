import Image from "next/image";
import { ActivityBasicDto } from "@/stores/types/activity-schemas";
import Link from "next/link";

type ActivityCardProps = Pick<
  ActivityBasicDto,
  "bannerImageUrl" | "rating" | "reviewCount" | "title" | "price"
>;

export function myActivityCard(ActivityProps: ActivityCardProps) {
  return (
    <div>
      <Image src={ActivityProps.bannerImageUrl} alt={"체험 이미지"} />
      <div>
        <div>
          <div>
            <Image src={"/image/rating-star.svg"} alt={"레이팅 이미지"} />
            {ActivityProps.rating} ({ActivityProps.reviewCount})
          </div>
          <div>{ActivityProps.title}</div>
        </div>
        <div>
          <div>{ActivityProps.price}</div>
          <div>
            <button>···</button>
            <ul>
              <li>
                <Link href={"/profile/activity/{id}/post"}>수정하기</Link>
              </li>
              <li>삭제하기</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
