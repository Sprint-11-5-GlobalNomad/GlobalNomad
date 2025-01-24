import HeroBanner from "@/components/common/pages/home/hero-banner";
import SearchSection from "@/components/common/pages/home/search-section";
import FilterDropdown from "@/components/common/ui/filter-dropdown";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="mt-[7rem]">
      <HeroBanner />
      <SearchSection />

      {/* 인기 체험 목록 */}
      <div>
        <div>
          <h2>🔥 인기 체험</h2>
          <button>
            <Image
              src="/image/unactivated_left_arrow.svg"
              alt="인기체험 이전 목록"
              width={44}
              height={44}
            />
          </button>
          <button>
            <Image
              src="/image/activated_right_arrow.svg"
              alt="인기체험 다음 목록"
              width={44}
              height={44}
            />
          </button>
        </div>
        <ul>
          {/* map 배열로 감싸주기 */}
          {/* 이미지 크기 왜 제멋대로야 */}
          <Link href="/">
            <Image
              src="/image/dance.svg"
              alt="스트릿 댄스 체험 이미지"
              width={384}
              height={384}
            />
            <div>
              <Image
                src="/image/rating-star.svg"
                alt="평균 별점 아이콘"
                width={18}
                height={18}
              />
              <p>4.9 (793)</p>
              {/* 251px 넘으면 overflow */}
              {/* li 태그 이렇게 하면 괜찮으려나? */}
              <li>함께 배우면 즐거운 스트릿 댄스</li>
              <p>
                ₩ <span>/인</span>
              </p>
            </div>
          </Link>
        </ul>
      </div>

      {/* 필터링 섹션 */}
      <div>
        <div>{/* 버튼들 자리 */}</div>
        <FilterDropdown
          description="가격"
          options={["가격이 낮은 순", "가격이 높은 순"]}
          size="small"
          // onSelect={}
        />
      </div>

      {/* 모든 체험 목록 */}
      <div>
        <h2>🛼 모든 체험</h2>
        <ul>
          {/* map 배열로 감싸주기 */}
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
              <li>피오르 체험</li>
              <p>
                ₩ <span>/인</span>
              </p>
            </div>
          </Link>
        </ul>
      </div>

      {/* 페이지네이션 */}
      <div className="text-[1.4rem]">1 2 3 4 5</div>
    </div>
  );
}
