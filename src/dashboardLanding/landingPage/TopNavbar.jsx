import React from "react";
import "../styles/TopNavbar.css";
import {
  FaBell,
  FaSignOutAlt,
  FaSearch,
  FaTable,
  FaNetworkWired,
  FaThLarge
} from "react-icons/fa";
import { Link } from "react-router-dom";

function TopNavbar() {
  return (
    <>
      <nav className="landing-nav">

        <div className="nav-middle">

          <button className="nav-btn active">
            <FaThLarge />
            <span>Dashboard</span>
          </button>

          <button className="nav-btn">
            <FaTable />
            <span>Dynamic Time Table</span>
          </button>

          <button className="nav-btn">
            <FaNetworkWired />
            <span>Learning Network</span>
          </button>

          <div className="search-box">
            <FaSearch />
            <input type="text" placeholder="Search..." />
          </div>

        </div>

        <div className="nav-right">
          <button className="icon-btn">
            <FaBell />
          </button>

          {/* <button className="logout-btn">
            <FaSignOutAlt />
            <span> <Link to={"/home"}>Logout </Link></span>
          </button> */}
        </div>

      </nav>
    </>
  );
}

export default TopNavbar;
