import Button from "@/components/common/ui/button";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <div>
      {/* 상단 배너 */}
      <div>
        <Image
          src="/image/main_banner.jpg"
          alt="메인 배너 이미지"
          width={1920}
          height={550}
          quality={100}
        />
        <h1 className="text-[6.8rem] leading-[8.115rem] font-bold text-white">
          상단 배너 문구
        </h1>
        <span className="text-2xl font-bold">2월의 인기 체험 BEST 🔥</span>
      </div>

      {/* 검색 영역 */}
      <div>
        <h2>무엇을 체험하고 싶으신가요?</h2>
        <div>
          <Button type="button" label="체험 검색하기 버튼">
            검색하기
          </Button>
        </div>
      </div>

      <div className="text-[5rem]">함께 배우면 즐거운 스트릿 댄스</div>
      <div className="text-[1.6rem]">무엇을 체험하고 싶으신가요?</div>
      <div className="text-[2rem]">인기 체험</div>
      <div className="text-[2rem]">모든 체험</div>
      <div className="text-[1.4rem]">1 2 3 4 5</div>
    </div>
  );
}
