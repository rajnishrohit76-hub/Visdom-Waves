import React, { useMemo } from "react";
import { FaUserGraduate, FaClipboardList, FaVideo, FaFileAlt } from "react-icons/fa";

const statsData = [
  {
    number: "15M+",
    label: "Happy Students",
    icon: <FaUserGraduate />,
    light: "bg-[#FFF3E6]",
    dark: "bg-[#2E2E2E] text-white",
  },
  {
    number: "24K+",
    label: "Mock Tests",
    icon: <FaClipboardList />,
    light: "bg-[#FFECEC]",
    dark: "bg-[#3A3A3A] text-white",
  },
  {
    number: "14K+",
    label: "Video Lectures",
    icon: <FaVideo />,
    light: "bg-[#E6F8FF]",
    dark: "bg-[#1F1F1F] text-white",
  },
  {
    number: "80K+",
    label: "Practice Papers",
    icon: <FaFileAlt />,
    light: "bg-[#EFE8FF]",
    dark: "bg-[#2B2B2B] text-white",
  },
];

function PlatformTrusted() {
  const statsCards = useMemo(
    () =>
      statsData.map((item, index) => (
        <div key={index} className="w-full sm:w-1/2 lg:w-1/4 flex justify-center mt-5">
          <div
            className={`trusted-card relative p-10 rounded-3xl shadow-lg transition-transform duration-500 hover:-translate-y-3 hover:scale-105 group ${item.light}`}
          >
            {/* Icon */}
            <div className="text-4xl mb-4 flex justify-center items-center text-[#ff9f43] group-hover:text-[#00d2ff] transition-colors duration-300">
              {item.icon}
            </div>

            {/* Number */}
            <h3 className="text-4xl font-extrabold text-gray-900 group-hover:text-yellow-400">
              {item.number}
            </h3>

            {/* Label */}
            <p className="text-lg font-medium text-gray-700 mt-2 group-hover:text-yellow-400">
              {item.label}
            </p>
          </div>
        </div>
      )),
    []
  );

  return (
    <>
      <section className="homepage-trusted-partner-section relative py-20">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3.5">Platform Trusted</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-full mx-auto text-center">
            Visdom Waves delivers real impact through measurable learning outcomes.
          </p>

          <div className="flex flex-wrap justify-center mt-2">{statsCards}</div>
        </div>
      </section>
    </>
  );
}

export default PlatformTrusted;
