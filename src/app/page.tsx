import Button from "@/components/common/ui/button";
import FilterDropdown from "@/components/common/ui/filter-dropdown";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    // 섹션 별로 컴포넌트화 해야 함
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
        <div>
          <h1 className="text-[6.8rem] leading-[8.115rem] font-bold text-white">
            상단 배너 문구
          </h1>
          <p className="text-2xl font-bold">2월의 인기 체험 BEST 🔥</p>
        </div>
      </div>

      {/* 검색 영역 */}
      <div>
        <h2>무엇을 체험하고 싶으신가요?</h2>
        <div>
          {/* absolute 로 겹쳐넣기? */}
          <Image
            src="/image/search.svg"
            alt="검색하기 아이콘"
            width={48}
            height={48}
          />
          <input placeholder="내가 원하는 체험은" />
          <Button type="search" label="검색하기" variant="default" />
        </div>
      </div>

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
        </ul>
      </div>

      {/* 페이지네이션 */}
      <div className="text-[1.4rem]">1 2 3 4 5</div>
    </div>
  );
}
