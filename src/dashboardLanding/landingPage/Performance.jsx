import React, { useEffect, useState } from "react";
import "../Styles/PerformanceCard.css";

function PerformanceCard() {
  const [stats, setStats] = useState({
    completed: 0,
    pending: 0,
    score: 0,
    rank: 0,
  });

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

  return (
    <div className="performance-card">
      <div className="progress-circle">
        <svg>
          <circle cx="60" cy="60" r="54" />
          <circle cx="60" cy="60" r="54" />
        </svg>
        <div className="circle-text">
          <h2>82%</h2>
          <span>Overall</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
          <h3>{stats.completed}</h3>
          <p>Completed</p>
        </div>
        <div className="stat-box">
          <h3>{stats.pending}</h3>
          <p>Pending</p>
        </div>
        <div className="stat-box">
          <h3>{stats.score}</h3>
          <p>Score</p>
        </div>
        <div className="stat-box">
          <h3>#{stats.rank}</h3>
          <p>Rank</p>
        </div>
      </div>

      <div className="progress-bars">
        <div className="bar">
          <span>Attendance</span>
          <div className="track">
            <div className="fill" style={{ width: "90%" }} />
          </div>
        </div>

        <div className="bar">
          <span>Learning</span>
          <div className="track">
            <div className="fill blue" style={{ width: "75%" }} />
          </div>
        </div>

        <div className="bar">
          <span>Tasks</span>
          <div className="track">
            <div className="fill orange" style={{ width: "65%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerformanceCard;
