import React, { useState } from "react";
import "../Styles/TodayActivities.css";

function TodayActivities() {
  const [activeTodayTab, setActiveTodayTab] = useState("india");
  const [activeActivityTab, setActiveActivityTab] = useState("sports");

  const todayContent = {
    india:
      "On this day in India, several historical events took place that shaped the nation’s culture, politics, and heritage.",
    world:
      "On this day in 1999, 12 years after an agreement was reached between China and Portugal, several centuries of Portuguese rule ended in Macau when it became a special administrative region under Chinese sovereignty.",
  };

  const activitiesContent = {
    sports: [
      "23 Dec Hyderabad Runners: Kids Run 2023",
      "22 Dec Open Selections In The Boys Under 14 Category Cricket Tournament.",
      "23 Dec Referees Seminar On Football For Men & Women",
    ],
    events: [
      "23 Dec Cultural Fest – Annual Celebration",
      "22 Dec Science Exhibition for School Students",
      "21 Dec National Level Quiz Competition",
    ],
  };

  return (
    <div className="today-activities-container">
      {/* About Today Card */}
      <div className="know-border today-card">
        <div className="know-box">
          <div className="know-header">
            <h3>Know about Today</h3>
            <div className="tab-buttons">
              <button
                className={`tab-btn ${activeTodayTab === "india" ? "active" : ""}`}
                onClick={() => setActiveTodayTab("india")}
              >
                India
              </button>
              <button
                className={`tab-btn ${activeTodayTab === "world" ? "active" : ""}`}
                onClick={() => setActiveTodayTab("world")}
              >
                World
              </button>
            </div>
          </div>
          <p className="know-text">{todayContent[activeTodayTab]}</p>
        </div>
      </div>

      {/* Activities Card */}
      <div className="activity-border today-card">
        <div className="activity-box">
          <div className="activity-header">
            <div>
              <h3>Activities</h3>
              <p className="sub-title">(What Happened Today)</p>
            </div>
            <div className="tab-buttons">
              <button
                className={`tab-btn ${activeActivityTab === "sports" ? "active" : ""}`}
                onClick={() => setActiveActivityTab("sports")}
              >
                Sports
              </button>
              <button
                className={`tab-btn ${activeActivityTab === "events" ? "active" : ""}`}
                onClick={() => setActiveActivityTab("events")}
              >
                Events
              </button>
            </div>
          </div>
          <ul className="activity-list">
            {activitiesContent[activeActivityTab].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodayActivities;
