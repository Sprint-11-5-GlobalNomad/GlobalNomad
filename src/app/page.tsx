import CategoryPriceFilter from "@/components/common/pages/home/category-price-filter";
import HeroBanner from "@/components/common/pages/home/hero-banner";
import PopularExperiences from "@/components/common/pages/home/popular-experiences";
import PopularExperiencesTitle from "@/components/common/pages/home/popular-experiences-title";
import SearchSection from "@/components/common/pages/home/search-section";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="mt-[7rem] flex-column">
      <HeroBanner />
      <SearchSection />

      <PopularExperiencesTitle />
      <PopularExperiences />

      <CategoryPriceFilter />

      {/* 모든 체험 목록 */}
      <div>
        <h2>🛼 모든 체험</h2>
        <ul>
          {/* map 배열로 감싸주기 */}
          <li>
            <Link href="/">
              <Image
                src="/image/cliff.svg"
                alt="피오르 체험 이미지"
                width={283}
                height={283}
              />
              {/* 여기 아래 부분 컴포넌트로 해서 쓸 수도 있겠다 */}
              <div>
                <Image
                  src="/image/rating-star.svg"
                  alt="평균 별점 아이콘"
                  width={18}
                  height={18}
                />
                <p>3.9 (108)</p>
                {/* 251px 넘으면 overflow */}
                {/* li 태그 이렇게 하면 괜찮으려나? */}
                <p>피오르 체험</p>
                <p>
                  ₩ <span>/인</span>
                </p>
              </div>
            </Link>
          </li>
        </ul>
      </div>

      {/* 페이지네이션 */}
      <div className="text-[1.4rem]">1 2 3 4 5</div>
    </div>
  );
}
