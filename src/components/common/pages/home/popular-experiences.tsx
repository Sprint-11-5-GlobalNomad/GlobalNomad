import { activityData } from "@/data/activity-data";
import Image from "next/image";
import Link from "next/link";

export default function PopularExperiences() {
  return (
    <ul
      className="flex flex-nowrap gap-[2.4rem] w-[120rem] mb-[6rem] overflow-x-auto hide-scrollbar
    tablet:w-[80rem] tablet:px-[4rem] tablet:gap-[3.2rem]
    mobile:w-[38.8rem] mobile:mb-[4.6rem] mobile:px-[2rem] mobile:gap-[1.6rem]"
    >
      {activityData.map((activity) => (
        <li
          key={activity.id}
          className="relative h-[38.4rem] w-[38.4rem] border rounded-[2rem] flex-shrink-0 flex-grow-0
          mobile:w-[18.4rem] mobile:h-[18.4rem]"
          // tablet:flex-shrink-0 mobile:flex-shrink-0
        >
          <Link href="/">
            <Image
              src={activity.bannerImageUrl}
              alt={activity.title}
              width={384}
              height={384}
              className="absolute inset-0 w-full h-full rounded-[2rem] object-cover"
            />
            <div
              className="flex-column items-start w-full gap-[2rem] px-[2rem] py-[3rem]
          absolute transform -translate-x-1/2 translate-y-0 bottom-0 left-1/2 text-white
          mobile:pt-[3rem] mobile:pr-[2rem] mobile:pb-[1.2rem] mobile:gap-[0.5rem]"
            >
              <div className="flex-between gap-[0.5rem]">
                <Image
                  src="/image/rating-star.svg"
                  alt="평균 별점 아이콘"
                  width={18}
                  height={18}
                />
                <p className="text-md font-semiBold">4.9 (793)</p>
              </div>
              <p
                className="w-[25.1rem] text-3xl font-bold break-keep
              mobile:text-[1.8rem] mobile:leading-[2.6rem]"
              >
                {activity.title}
              </p>
              <p className="text-xl font-bold flex-between gap-[0.5rem]">
                ₩ {Number(activity.price).toLocaleString("ko-KR")}
                <span className="text-md font-regular text-gray-700">/인</span>
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
