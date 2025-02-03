import HeroBanner from "@/components/pages/home/hero-banner";
import ActivityExplorer from "@/components/pages/home/search/activity-explorer";
import React from "react";

export default function Home() {
  return (
    <div className="mt-[7rem] flex-column">
      <HeroBanner />
      <ActivityExplorer />
    </div>
  );
}
