import React, { useState } from "react";
import "../Styles/Sidebar.css";
import {
  FaBook,
  FaHeart,
  FaUser,
  FaPalette,
  FaRunning,
  FaBars
} from "react-icons/fa";
import { Link } from "react-router-dom";

const menuData = [
  {
    title: "Academics",
    icon: <FaBook />,
    submenu: [
      { name: "Math", path: "/academics/math" },
      { name: "Science", path: "/academics/science" },
      { name: "English", path: "/academics/english" },
      { name: "Hindi", path: "/academics/hindi" },
      { name: "Social Science", path: "/academics/social-science" }
    ]
  },
  {
    title: "Life Skills",
    icon: <FaBook />,
    submenu: [
      { name: "Organization Skills", path: "/life-skills/organization" },
      { name: "Leadership Skills", path: "/life-skills/leadership" },
      { name: "Cultural Competence", path: "/life-skills/cultural-competence" },
      { name: "Time Management", path: "/life-skills/time-management" }
    ]
  },
  {
    title: "Health & Wellness",
    icon: <FaHeart />,
    submenu: [
      { name: "Physical Health", path: "/health/physical" },
      { name: "Mental Health", path: "/health/mental" },
      { name: "Nutrition", path: "/health/nutrition" },
      { name: "Exercise", path: "/health/exercise" }
    ]
  },
  {
    title: "Platform Support",
    icon: <FaBook />,
    submenu: [
      { name: "Learner as Inventor", path: "/platform/inventor" },
      { name: "Learner as Teacher", path: "/platform/teacher" },
      { name: "Learner as Writer", path: "/platform/writer" },
      { name: "Learner as Director", path: "/platform/director" },
      { name: "Responsible Citizen", path: "/platform/responsible-citizen" }
    ]
  },
  {
    title: "Fine Arts",
    icon: <FaPalette />,
    submenu: [
      { name: "Painting", path: "/fine-arts/painting" },
      { name: "Dance", path: "/fine-arts/dance" },
      { name: "Music", path: "/fine-arts/music" }
    ]
  },
  {
    title: "Special Skills",
    icon: <FaBook />,
    submenu: [
      { name: "Listening Skills", path: "/skills/listening" },
      { name: "Memory Skills", path: "/skills/memory" },
      { name: "Observation Skills", path: "/skills/observation" },
      { name: "Public Speaking", path: "/skills/public-speaking" },
      { name: "Emotional Intelligence", path: "/skills/emotional-intelligence" },
      { name: "Problem Solving", path: "/skills/problem-solving" }
    ]
  },
  {
    title: "Language Lab",
    icon: <FaBook />,
    submenu: [
      { name: "Digital Video Dictionary", path: "/language-lab/video-dictionary" },
      { name: "Vocabulary Test", path: "/language-lab/vocabulary" },
      { name: "Two Words a Day", path: "/language-lab/two-words" },
      { name: "Communication Skills", path: "/language-lab/communication" }
    ]
  },
  {
    title: "Sports",
    icon: <FaRunning />,
    submenu: [
      { name: "Cricket", path: "/sports/cricket" },
      { name: "Football", path: "/sports/football" },
      { name: "Basketball", path: "/sports/basketball" },
      { name: "Swimming", path: "/sports/swimming" },
      { name: "Athletics", path: "/sports/athletics" }
    ]
  },
  {
    title: "My Account",
    icon: <FaUser />,
    submenu: [
      { name: "Profile", path: "/account/profile" },
      { name: "Settings", path: "/account/settings" }
    ]
  }
];

function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleSubmenu = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  return (
    <>
      <button
        className="menu-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FaBars />
      </button>

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* PROFILE (FIXED) */}
        <div className="sidebar-profile">
          <div className="profile-avatar">
            <img
              src="https://plus.unsplash.com/premium_photo-1762456151035-471fcfd891fd?w=600&auto=format&fit=crop&q=60"
              alt="Avatar"
            />
          </div>
          <h4 className="profile-name">Vijay</h4>
          <span className="profile-class">Class X</span>
        </div>

        {/* SCROLLABLE MENU */}
        <ul className="sidebar-menu">
          {menuData.map((item, index) => (
            <li
              key={index}
              className={`menu-item ${activeMenu === index ? "active" : ""}`}
            >
              <div
                className="menu-header"
                onClick={() => toggleSubmenu(index)}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-text">{item.title}</span>
                <span className="menu-arrow">›</span>
              </div>

              {item.submenu && (
                <ul className="submenu">
                  {item.submenu.map((sub, subIndex) => (
                    <li key={subIndex} className="submenu-item">
                      <Link
                        to={sub.path}
                        onClick={() => setSidebarOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
