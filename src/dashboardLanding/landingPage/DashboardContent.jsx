import { useEffect, useState } from "react";
import InspirationCard from "./InspirationCard";
import Greetings from "./Greetings"

import "../dashboardCssCode/Dashboard.css"

import TodayNews from "./TodayNews"
import TodayActivities from "./TodayActivities";
import PuzzleJoke from "./PuzzleJoke";
import UtilityPeer from "./UtilityAndPeer";
import PerformanceCard from "./Performance";

function DashboardContent() {
  return (
    <>
    <div className="background">
      <section>
        <Greetings />
      </section>

      <section className="mt-3">
        <PerformanceCard />
      </section>

      <section>
          <InspirationCard />
      </section>

      <section>
        <TodayActivities />
      </section>

      <section>
        <TodayNews />
      </section>

      <section>
        <PuzzleJoke />
      </section>

      <section>
        <UtilityPeer />
      </section>
    </div>
    </>
    
  );
};

export default DashboardContent;
