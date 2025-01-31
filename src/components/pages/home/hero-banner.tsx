import Image from "next/image";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <Link href="/activity/3697" className="relative w-full h-[40vh] block">
      <div className="relative w-full h-full bg-gradient-to-r from-black/60 to-black/40">
        <Image
          src="/image/main_banner.jpg"
          alt="히어로(메인) 배너 이미지"
          quality={100}
          layout="fill"
          objectFit="cover"
          className="z-[-1]"
        />
      </div>
      <div
        className="absolute top-1/2 left-[35vw] flex flex-col gap-[2rem]
          transform -translate-x-1/2 -translate-y-1/2 text-white
          w-[50.2rem] tablet:w-[44rem] tablet:gap-[0.8rem] mobile:w-[18.4rem] mobile:gap-[0.8rem]"
      >
        <h1
          className="text-[6.8rem] leading-[8.115rem] font-bold m-0
          tablet:text-[5.4rem] tablet:leading-[6.444rem]
          mobile:text-[2.4rem] mobile:leading-[2.864rem]"
        >
          함께 배우면 즐거운 축구 교실
        </h1>
        <p
          className="text-[2.4rem] leading-[2.864rem] font-bold 
          tablet:text-xl tablet:ledaing-[2.6rem]
          mobile:text-lg"
        >
          2월의 인기 체험 BEST 🔥
        </p>
      </div>
    </Link>
  );
}
