import HeroBanner from "@/components/pages/home/hero-banner";
import SearchSection from "@/components/pages/home/search-section";
import React from "react";
import AllActivitiesSection from "@/components/pages/home/all-activities/all-activities-section";
import PopularActivitiesSection from "@/components/pages/home/popular-activities/popular-activities-section";

export default function Home() {
  return (
    <div className="mt-[7rem] flex-column">
      <HeroBanner />
      <SearchSection />

      <PopularActivitiesSection />

      <AllActivitiesSection />
    </div>
  );
}
