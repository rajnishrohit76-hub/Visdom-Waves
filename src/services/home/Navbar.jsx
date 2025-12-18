import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className="relative homepage-navbar-section bg-cover bg-center shadow-lg">
        {/* Overlay */}
        <div className="bg-black bg-opacity-50">
          <div className="container mx-auto flex justify-between items-center px-6 py-5">

            {/* Logo */}
            <Link 
              to="/home" 
              className="text-white text-2xl font-bold hover:text-yellow-400 transition-colors"
            >
              Visdom Waves
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center gap-6">
              <li>
                <Link to="/parent" className="text-white font-medium hover:text-yellow-400 transition-colors">Parents</Link>
              </li>
              <li>
                <Link to="/patent" className="text-white font-medium hover:text-yellow-400 transition-colors">Patents</Link>
              </li>
              <li>
                <Link to="/student" className="text-white font-medium hover:text-yellow-400 transition-colors">Students</Link>
              </li>
             
              <li>
                <Link to="/contact" className="text-white font-medium hover:text-yellow-400 transition-colors">Contact</Link>
              </li>

              <li>
                <Link to="/dashboard" className="text-white font-medium hover:text-yellow-400 transition-colors">Dashboard</Link>
              </li>
              <li>
                <select className="bg-black bg-opacity-30 text-white font-medium rounded px-2 py-1 cursor-pointer outline-none">
                  <option>Account</option>
                  <option>SignUp</option>
                  <option>SignIn</option>
                </select>
              </li>
              <li>
                <IoSearch className="text-white text-xl cursor-pointer hover:text-yellow-400 transition-colors" />
              </li>
            </ul>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} className="text-white text-2xl focus:outline-none">
                {isOpen ? <HiX /> : <HiMenu />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden bg-black bg-opacity-80 px-6 py-4">
              <ul className="flex flex-col gap-4">
                <li>
                  <Link to="/parent" className="text-white font-medium hover:text-yellow-400 transition-colors">Parents</Link>
                </li>
                <li>
                  <Link to="/patent" className="text-white font-medium hover:text-yellow-400 transition-colors">Patents</Link>
                </li>
                <li>
                  <Link to="/student" className="text-white font-medium hover:text-yellow-400 transition-colors">Students</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-white font-medium hover:text-yellow-400 transition-colors">Contact</Link>
                </li>
                <li>
                  <select className="bg-black bg-opacity-30 text-white font-medium rounded px-2 py-1 cursor-pointer outline-none w-full">
                    <option disabled>Account</option>
                    <option>SignUp</option>
                    <option>SignIn</option>
                  </select>
                </li>
                <li>
                  <IoSearch className="text-white text-xl cursor-pointer hover:text-yellow-400 transition-colors" />
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
