import React from "react";
import { FaGlobe } from "react-icons/fa";

function Footer() {
  return (
    <footer className="relative bg-black bg-opacity-80 text-white">
      {/* Background Image with overlay */}
      <div
        className="absolute inset-0 bg-center bg-cover opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
          // You can replace above URL with your own image
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Study Materials */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Study Materials</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>NCERT TextBooks</li>
            <li>NCERT Solutions</li>
            <li>CBSE Materials</li>
            <li>State Boards</li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Community</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Learning Network</li>
            <li>FAQ's</li>
            <li>Support</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>About Us</li>
            <li>What Makes Us Different?</li>
            <li>Partners</li>
            <li>Careers</li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
          <address className="not-italic text-sm text-gray-300 space-y-1">
            <p>
              Corporate Office: Building 3A & 3B, Raheja Mindspace,
            </p>
            <p>HUDA Techno Enclave, HITEC City, Telangana 500081</p>
            <p>info@vidyasphere.com</p>
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 text-gray-400 text-xs">
          <span>©2025 Vidya Sphere. All rights reserved</span>
          <FaGlobe />
          <span>
            Terms & Conditions | Privacy Policy
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
