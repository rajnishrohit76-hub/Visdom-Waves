import React from "react";

function TodayNews() {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-6xl mx-auto rounded-3xl shadow-2xl border border-gray-200 overflow-hidden transform transition hover:scale-105 duration-300 backdrop-blur-lg bg-white/10">
        
        {/* Top accent gradient */}
        <div className="h-2 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400"></div>

        <div className="p-4 sm:p-6 md:p-8">
          {/* News Badge */}
          <span className="inline-block bg-pink-500 text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide shadow-md">
            Latest
          </span>

          {/* News Title */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 mb-4">
            Today's News
          </h3>

          {/* News Content */}
          <p className="text-gray-100 text-sm sm:text-base md:text-lg leading-relaxed">
            The Central Board of Secondary Education recently announced the schedule
            for CBSE Class 10 board exam 2024. The Class 10 English exam is scheduled
            for February 26, 2024. The Board of Secondary Education Andhra Pradesh has
            released the AP SSC Time Table 2024. Students can download the AP Class
            10 Date Sheet 2024 PDF from the official website. Exams will begin on
            March 19 and end on March 30, 2024. Over 5 lakh students are expected to
            appear in the AP Board Exams 2024.
          </p>

          {/* Footer Accent */}
          <div className="mt-4 sm:mt-6 h-1 w-20 sm:w-24 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default TodayNews;