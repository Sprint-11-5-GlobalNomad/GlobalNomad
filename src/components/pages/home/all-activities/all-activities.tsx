import { ActivityBasicDto } from "@/app/types/activity-schemas";
import Image from "next/image";
import Link from "next/link";

interface AllActivitiesProps {
  activities: ActivityBasicDto[];
}

export default function AllActivities({ activities }: AllActivitiesProps) {
  return (
    <ul
      className="grid grid-cols-4 gap-[2rem] w-[120rem] mb-[6rem]
    tablet:w-[69.5rem] tablet:gap-[3.2rem] tablet:grid-cols-3
    mobile:grid-cols-2 mobile:grid-rows-2 mobile:grid-auto-rows-[1fr]
    mobile:w-[38.8rem] mobile:mb-[4.6rem] mobile:px-[2rem] mobile:gap-[1.6rem]"
    >
      {activities.map((activity) => (
        <li
          key={activity.id}
          className="rounded-[2rem] flex-column gap-[1.6rem]"
        >
          <Link
            href={`/activity/${activity.id}`}
            className="flex-column gap-[1.6rem]"
          >
            <div
              className="h-[28.3rem] w-[28.3rem] tablet:w-[22.1rem]
            tablet:h-[22.1rem] mobile:w-[16.8rem] mobile:h-[16.8rem]"
            >
              <Image
                src={activity.bannerImageUrl}
                alt={activity.title}
                width={283}
                height={283}
                className="w-full h-full rounded-[2rem] object-cover"
              />
            </div>

            <div
              className="flex-column items-start w-[28.3rem] gap-[1.5rem]
              tablet:w-[22.1rem] tablet:gap-[1rem] mobile:w-[16.4rem] mobile:gap-[0.5rem]"
            >
              <div className="flex-column items-start gap-[1rem]">
                <div className="flex-between gap-[0.5rem]">
                  <Image
                    src="/image/rating-star.svg"
                    alt="평균 별점 아이콘"
                    width={18}
                    height={18}
                  />
                  <p className="text-lg">
                    {activity.rating}{" "}
                    <span className="text-lg text-gray-700">
                      ({Number(activity.reviewCount).toLocaleString("ko-KR")})
                    </span>
                  </p>
                </div>
                <p className="text-2xl font-semiBold break-keep mobile:text-2lg">
                  {activity.title}
                </p>
              </div>
              <p className="text-xl font-bold flex-between gap-[0.5rem]">
                ₩ {Number(activity.price).toLocaleString("ko-KR")}
                <span className="text-xl font-regular text-gray-900 mobile:text-lg">
                  /인
                </span>
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
