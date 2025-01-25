import { activityData } from "@/data/activity-data";
import Image from "next/image";
import Link from "next/link";

export default function AllExperiences() {
  return (
    <ul
      className="grid grid-cols-4 gap-[4.8rem] w-[120rem] mb-[6rem]
    tablet:w-[80rem] tablet:px-[4rem] tablet:gap-[3.2rem]
    mobile:w-[38.8rem] mobile:mb-[4.6rem] mobile:px-[2rem] mobile:gap-[1.6rem]"
    >
      {activityData.map((activity) => (
        <li
          key={activity.id}
          className="border rounded-[2rem] flex-column gap-[1.6rem]
          mobile:w-[18.4rem] mobile:h-[18.4rem]"
        >
          <Link href="/">
            <div className="h-[28.3rem] w-[28.3rem]">
              <Image
                src={activity.bannerImageUrl}
                alt={activity.title}
                width={283}
                height={283}
                className="w-full h-full rounded-[2rem] object-cover"
              />
            </div>

            <div
              className="flex-column items-start w-[28.3rem] gap-[1.5rem] px-[2rem] py-[3rem]
          transform -translate-x-1/2 translate-y-0 bottom-0 left-1/2 text-white
          mobile:pt-[3rem] mobile:pr-[2rem] mobile:pb-[1.2rem] mobile:gap-[0.5rem]"
            >
              <div className="flex-column items-start gap-[1rem]">
                <div className="flex-between gap-[0.5rem]">
                  <Image
                    src="/image/rating-star.svg"
                    alt="평균 별점 아이콘"
                    width={18}
                    height={18}
                  />
                  <p className="text-lg">4.9 (793)</p>
                </div>
                <p className="text-[2.4rem] leading-[3.2rem] font-semiBold break-keep">
                  {activity.title}
                </p>
              </div>
              <p className="text-xl font-bold flex-between gap-[0.5rem]">
                ₩ {Number(activity.price).toLocaleString("ko-KR")}
                <span className="text-xl font-regular text-gray-900">/인</span>
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
