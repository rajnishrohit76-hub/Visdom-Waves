import React, { useState } from "react";

function TodayActivities() {
  // -------------------
  // States
  // -------------------
  const [activeTodayTab, setActiveTodayTab] = useState("india");
  const [activeActivityTab, setActiveActivityTab] = useState("sports");

  // -------------------
  // Content Data
  // -------------------
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

  // -------------------
  // Buttons Mapping
  // -------------------
  const todayTabs = [
    { key: "india", label: "India" },
    { key: "world", label: "World" },
  ];

  const activityTabs = [
    { key: "sports", label: "Sports" },
    { key: "events", label: "Events" },
  ];

  const renderTodayButtons = todayTabs.map((tab) => (
    <button
      key={tab.key}
      onClick={() => setActiveTodayTab(tab.key)}
      className={`px-4 sm:px-5 py-2 rounded-full font-semibold transition-transform transform hover:scale-105 ${
        activeTodayTab === tab.key
          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
          : "bg-white text-black hover:bg-purple-500 hover:text-white"
      }`}
    >
      {tab.label}
    </button>
  ));

  const renderActivityButtons = activityTabs.map((tab) => (
    <button
      key={tab.key}
      onClick={() => setActiveActivityTab(tab.key)}
      className={`px-4 sm:px-5 py-2 rounded-full font-semibold transition-transform transform hover:scale-105 ${
        activeActivityTab === tab.key
          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
          : "bg-white text-black hover:bg-purple-500 hover:text-white"
      }`}
    >
      {tab.label}
    </button>
  ));

  const renderActivityList = activitiesContent[activeActivityTab].map((item, idx) => (
    <li
      key={idx}
      className="p-3 rounded-xl hover:bg-white/20 transition duration-300 shadow-sm text-sm sm:text-base"
    >
      {item}
    </li>
  ));

  // -------------------
  // JSX
  // -------------------
  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 flex flex-col space-y-8">
      {/* Today Card */}
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl hover:scale-105 transform transition duration-500 overflow-hidden">
        <div className="h-2 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 animate-pulse"></div>
        <div className="p-4 sm:p-6 flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400">
              Know about Today
            </h3>
            <div className="flex space-x-3">{renderTodayButtons}</div>
          </div>
          <p className="text-white text-sm sm:text-lg">{todayContent[activeTodayTab]}</p>
          <div className="mt-4 sm:mt-6 h-1 w-24 sm:w-32 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Activities Card */}
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl hover:scale-105 transform transition duration-500 overflow-hidden">
        <div className="h-2 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 animate-pulse"></div>
        <div className="p-4 sm:p-6 flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400">
                Activities
              </h3>
              <p className="text-white text-xs sm:text-sm">(What Happened Today)</p>
            </div>
            <div className="flex space-x-3">{renderActivityButtons}</div>
          </div>
          <ul className="list-disc list-inside text-white space-y-2">{renderActivityList}</ul>
          <div className="mt-4 sm:mt-6 h-1 w-24 sm:w-32 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default TodayActivities;