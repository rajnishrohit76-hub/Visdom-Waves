
import React, { useEffect, useState } from "react";

function PerformanceCard() {
  const [stats, setStats] = useState({
    completed: 0,
    pending: 0,
    score: 0,
    rank: 0,
  });

  // Animate stats incrementally
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        completed: Math.min(prev.completed + 1, 24),
        pending: Math.min(prev.pending + 1, 6),
        score: Math.min(prev.score + 5, 850),
        rank: Math.min(prev.rank + 1, 12),
      }));
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // Stats boxes
  const statsBoxes = [
    { label: "Completed", value: stats.completed, color: "text-cyan-400" },
    { label: "Pending", value: stats.pending, color: "text-orange-400" },
    { label: "Score", value: stats.score, color: "text-green-400" },
    { label: "Rank", value: `#${stats.rank}`, color: "text-purple-400" },
  ].map((stat, index) => (
    <div
      key={index}
      className="bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <h3 className={`text-2xl sm:text-3xl font-extrabold ${stat.color} glow-text mb-1`}>
        {stat.value}
      </h3>
      <p className="text-white/70 text-sm sm:text-base">{stat.label}</p>
    </div>
  ));

  // Progress bars
  const progressBars = [
    { name: "Attendance", value: 90, gradient: "from-cyan-400 to-blue-400" },
    { name: "Learning", value: 75, gradient: "from-purple-400 to-pink-400" },
    { name: "Tasks", value: 65, gradient: "from-orange-400 to-red-400" },
  ].map((bar, index) => (
    <div key={index}>
      <div className="flex justify-between text-white/70 mb-2 font-medium text-sm sm:text-base">
        <span>{bar.name}</span>
        <span>{bar.value}%</span>
      </div>
      <div className="w-full h-3 sm:h-4 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${bar.gradient} rounded-full transition-all duration-1000`}
          style={{ width: `${bar.value}%` }}
        />
      </div>
    </div>
  ));

  // Animated Circle Progress
  const circleRadius = 70;
  const circumference = 2 * Math.PI * circleRadius;
  const overallPercentage = Math.min(Math.floor((stats.score / 850) * 100), 100);
  const strokeOffset = circumference - (circumference * overallPercentage) / 100;

  const circleProgress = (
    <div className="flex justify-center mb-6 sm:mb-8 relative">
      <div className="relative w-36 sm:w-40 h-36 sm:h-40">
        <svg className="w-full h-full">
          <circle
            cx={circleRadius + 2}
            cy={circleRadius + 2}
            r={circleRadius}
            className="stroke-white/20 stroke-4 fill-none"
          />
          <circle
            cx={circleRadius + 2}
            cy={circleRadius + 2}
            r={circleRadius}
            className="stroke-cyan-400 stroke-4 fill-none stroke-linecap-round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeOffset}
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h2 className="text-3xl sm:text-4xl font-extrabold glow-text">{overallPercentage}%</h2>
          <span className="text-xs sm:text-sm text-white/70 mt-1">Overall</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10 ">
      <div className="w-full max-w-6xl bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-10 transition-transform hover:scale-105 duration-300">
        {circleProgress}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-10">
          {statsBoxes}
        </div>
        <div className="space-y-4 sm:space-y-5">{progressBars}</div>
      </div>
    </div>
  );
}

export default PerformanceCard;