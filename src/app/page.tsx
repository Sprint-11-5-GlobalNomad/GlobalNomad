import AllExperiences from "@/components/common/pages/home/all-experiences";
import AllExperiencesTitle from "@/components/common/pages/home/all-experiences-title";
import CategoryPriceFilter from "@/components/common/pages/home/category-price-filter";
import HeroBanner from "@/components/common/pages/home/hero-banner";
import PopularExperiences from "@/components/common/pages/home/popular-experiences";
import PopularExperiencesTitle from "@/components/common/pages/home/popular-experiences-title";
import SearchSection from "@/components/common/pages/home/search-section";
import React from "react";

export default function Home() {
  return (
    <div className="mt-[7rem] flex-column">
      <HeroBanner />
      <SearchSection />

      <PopularExperiencesTitle />
      <PopularExperiences />

      <CategoryPriceFilter />

      <AllExperiencesTitle />
      <AllExperiences />

      {/* 페이지네이션 */}
      <div className="text-[1.4rem]">1 2 3 4 5</div>
    </div>
  );
}
