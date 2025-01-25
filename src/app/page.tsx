import CategoryPriceFilter from "@/components/pages/home/category-price-filter";
import HeroBanner from "@/components/pages/home/hero-banner";
import SearchSection from "@/components/pages/home/search-section";
import Pagination from "@/components/common/ui/pagination";
import React from "react";
import PopularActivitiesTitle from "@/components/pages/home/popular-activities-title";
import PopularActivities from "@/components/pages/home/popular-activities";
import AllActivitiesTitle from "@/components/pages/home/all-activities-title";
import AllActivities from "@/components/pages/home/all-activities";

export default function Home() {
  return (
    <div className="mt-[7rem] flex-column">
      <HeroBanner />
      <SearchSection />

      <PopularActivitiesTitle />
      <PopularActivities />

      <CategoryPriceFilter />

      <AllActivitiesTitle />
      <AllActivities />

      <Pagination />
    </div>
  );
}
