import React, { useState } from "react";
import { FaBell, FaSignOutAlt, FaSearch, FaTable, FaNetworkWired, FaThLarge } from "react-icons/fa";
import { Link } from "react-router-dom";

function TopNavbar() {
  const [active, setActive] = useState("Dashboard"); // Track active menu

  const menuItems = [
    { name: "Dashboard", icon: <FaThLarge /> },
    { name: "Dynamic Time Table", icon: <FaTable /> },
    { name: "Learning Network", icon: <FaNetworkWired /> },
  ];

  return (
    <nav className="flex items-center justify-between bg-gray-900 p-4 shadow-lg sticky top-0 z-50">
      
      {/* Left - Navigation buttons */}
      <div className="flex items-center space-x-3 md:space-x-6">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActive(item.name)}
            className={`flex items-center space-x-2 rounded-lg px-4 py-2 text-white font-medium shadow-sm transition 
              ${active === item.name ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}
      </div>

      {/* Middle - Search box */}
      <div className="hidden md:flex items-center bg-gray-700 rounded-full px-3 py-1 shadow-md w-64 focus-within:ring-2 focus-within:ring-gray-500 transition">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent outline-none text-white placeholder-gray-400"
        />
      </div>

      {/* Right - Notifications & Logout */}
      <div className="flex items-center space-x-4">
        <button className="relative text-white p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition">
          <FaBell size={18} />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
        </button>

        <Link
          to="/home"
          className="flex items-center space-x-1 rounded-lg bg-red-600 px-3 py-2 text-white font-medium hover:bg-gray-700 transition "
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
}

export default TopNavbar;
