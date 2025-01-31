import HeroBanner from "@/components/pages/home/hero-banner";
import SearchSection from "@/components/pages/home/search-section";
import React from "react";
import PopularActivitiesTitle from "@/components/pages/home/popular-activities-title";
import PopularActivities from "@/components/pages/home/popular-activities";
import AllActivitiesSection from "@/components/pages/home/all-activities/all-activities-section";

export default function Home() {
  return (
    <div className="mt-[7rem] flex-column">
      <HeroBanner />
      <SearchSection />

      <PopularActivitiesTitle />
      <PopularActivities />

      <AllActivitiesSection />
    </div>
  );
}
