import React, { useState } from "react";
import { FaBook, FaHeart, FaUser, FaPalette, FaRunning, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

// Menu data
const menuData = [
  {
    title: "Academics",
    icon: <FaBook />,
    submenu: [
      { name: "Math", path: "/academics/math" },
      { name: "Science", path: "/academics/science" },
      { name: "English", path: "/academics/english" },
      { name: "Hindi", path: "/academics/hindi" },
      { name: "Social Science", path: "/academics/social-science" },
    ],
  },
  {
    title: "Life Skills",
    icon: <FaBook />,
    submenu: [
      { name: "Organization Skills", path: "/life-skills/organization" },
      { name: "Leadership Skills", path: "/life-skills/leadership" },
      { name: "Cultural Competence", path: "/life-skills/cultural-competence" },
      { name: "Time Management", path: "/life-skills/time-management" },
    ],
  },
  {
    title: "Health & Wellness",
    icon: <FaHeart />,
    submenu: [
      { name: "Physical Health", path: "/health/physical" },
      { name: "Mental Health", path: "/health/mental" },
      { name: "Nutrition", path: "/health/nutrition" },
      { name: "Exercise", path: "/health/exercise" },
    ],
  },
  {
    title: "Platform Support",
    icon: <FaBook />,
    submenu: [
      { name: "Learner as Inventor", path: "/platform/inventor" },
      { name: "Learner as Teacher", path: "/platform/teacher" },
      { name: "Learner as Writer", path: "/platform/writer" },
      { name: "Learner as Director", path: "/platform/director" },
      { name: "Responsible Citizen", path: "/platform/responsible-citizen" },
    ],
  },
  {
    title: "Fine Arts",
    icon: <FaPalette />,
    submenu: [
      { name: "Painting", path: "/fine-arts/painting" },
      { name: "Dance", path: "/fine-arts/dance" },
      { name: "Music", path: "/fine-arts/music" },
    ],
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
      { name: "Problem Solving", path: "/skills/problem-solving" },
    ],
  },
  {
    title: "Language Lab",
    icon: <FaBook />,
    submenu: [
      { name: "Digital Video Dictionary", path: "/language-lab/video-dictionary" },
      { name: "Vocabulary Test", path: "/language-lab/vocabulary" },
      { name: "Two Words a Day", path: "/language-lab/two-words" },
      { name: "Communication Skills", path: "/language-lab/communication" },
    ],
  },
  {
    title: "Sports",
    icon: <FaRunning />,
    submenu: [
      { name: "Cricket", path: "/sports/cricket" },
      { name: "Football", path: "/sports/football" },
      { name: "Basketball", path: "/sports/basketball" },
      { name: "Swimming", path: "/sports/swimming" },
      { name: "Athletics", path: "/sports/athletics" },
    ],
  },
  {
    title: "My Account",
    icon: <FaUser />,
    submenu: [
      { name: "Profile", path: "/account/profile" },
      { name: "Settings", path: "/account/settings" },
    ],
  },
];

function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleSubmenu = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  const profile = (
    <div className="mb-5 text-center">
      <div className="mx-auto mb-3 h-[70px] w-[70px] overflow-hidden rounded-2xl">
        <img
          src="https://plus.unsplash.com/premium_photo-1762456151035-471fcfd891fd?w=600&auto=format&fit=crop&q=60"
          alt="Avatar"
          className="h-full w-full object-cover"
        />
      </div>
      <h4 className="text-[17px] font-semibold">Vijay</h4>
      <span className="mt-1 inline-block rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold">
        Class X
      </span>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed left-4 top-4 z-[3000] rounded-lg bg-black p-3 text-white shadow-lg lg:hidden"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <aside
        className={`absolute left-0 top-16 z-[500] flex h-[calc(111vh-4rem)] w-[250px] flex-col bg-black px-5 py-6 text-white shadow-[12px_0_40px_rgba(0,0,0,0.6)] transition-all duration-300
        ${sidebarOpen ? "left-0" : "-left-full lg:left-0"}`}
      >
        {profile}
        <ul className="flex-1 space-y-1">
          {menuData.map((item, index) => {
            const isActive = activeMenu === index;

            return (
              <li key={index} className="relative group">
                {/* Menu header */}
                <div
                  onClick={() => toggleSubmenu(index)}
                  className="flex cursor-pointer items-center justify-between rounded-2xl bg-white/5 px-4 py-3 transition hover:bg-white/10"
                >
                  <div className="flex items-center">
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                  <span
                    className={`transition-transform duration-300 ${
                      isActive ? "rotate-90" : ""
                    }`}
                  >
                    ›
                  </span>
                </div>

                {/* Submenu */}
                <ul
                  className={`transition-all duration-300 overflow-hidden
                  ${isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                  lg:absolute lg:left-[100%] lg:top-0 lg:min-w-[220px] lg:rounded-xl lg:bg-white lg:text-black lg:shadow-xl
                  lg:opacity-0 lg:translate-x-[-10px] lg:group-hover:opacity-100 lg:group-hover:translate-x-0`}
                >
                  {item.submenu.map((sub, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        to={sub.path}
                        onClick={() => setSidebarOpen(false)}
                        className="block px-5 py-2 text-sm transition hover:bg-black/10 lg:hover:bg-black/10 lg:text-black text-white"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;