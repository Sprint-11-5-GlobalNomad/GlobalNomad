import AllExperiences from "@/components/common/pages/home/all-experiences";
import AllExperiencesTitle from "@/components/common/pages/home/all-experiences-title";
import CategoryPriceFilter from "@/components/common/pages/home/category-price-filter";
import HeroBanner from "@/components/common/pages/home/hero-banner";
import PopularExperiences from "@/components/common/pages/home/popular-experiences";
import PopularExperiencesTitle from "@/components/common/pages/home/popular-experiences-title";
import SearchSection from "@/components/common/pages/home/search-section";
import Pagination from "@/components/common/ui/pagination";
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

      <Pagination />
    </div>
  );
}
