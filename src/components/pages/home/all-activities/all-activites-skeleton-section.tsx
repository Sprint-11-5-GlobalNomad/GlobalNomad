import { useEffect, useState } from "react";

export default function AllActivitiesSkeletonSection() {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024 // 초기값을 적당한 값으로 설정
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const displayedActivities =
    windowWidth >= 1200
      ? [0, 1, 2, 3, 4, 5, 6, 7]
      : windowWidth < 744
        ? [0, 1, 2, 3]
        : [0, 1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div
      className="grid grid-cols-4 gap-[2rem] w-[120rem] mb-[6rem]
    tablet:w-[69.5rem] tablet:mx-[2rem] tablet:gap-[3.2rem] tablet:grid-cols-3
    mobile:grid-cols-2 mobile:grid-rows-2 mobile:grid-auto-rows-[1fr]
    mobile:w-[38.8rem] mobile:mb-[4.6rem] mobile:px-[2rem] mobile:gap-[1.6rem]"
    >
      {displayedActivities.map((_, index) => (
        <div
          key={index}
          className="h-[41.4rem] w-[28.3rem] tablet:w-[22.1rem] rounded-[2rem]
            tablet:h-[34.7rem] mobile:w-[16.8rem] mobile:h-[28.3rem] skeleton"
        />
      ))}
    </div>
  );
}
