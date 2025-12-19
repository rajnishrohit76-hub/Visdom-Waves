
import React, { useRef, useState } from "react";

const videos = [
  {
    src: "/Landing Video/VisdomWaves1.mp4",
    title: "This Week's Inspiring Personality",
    quote:
      "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
    author: "- Christian D. Larson",
  },
  {
    src: "video2.mp4",
    title: "Next Inspiring Personality",
    quote: "Your limitation—it’s only your imagination.",
    author: "- Unknown",
  },
  {
    src: "video3.mp4",
    title: "Another Inspiring Personality",
    quote: "Push yourself, because no one else is going to do it for you.",
    author: "- Unknown",
  },
];

function InspirationCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const nextVideo = () =>
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  const prevVideo = () =>
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const currentVideo = videos[currentIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 ">
      
      {/* Quote Card */}
      <div className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl  backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 md:p-8 text-center">
        <p className="text-white text-base sm:text-lg md:text-xl italic">
          "{currentVideo.quote}"
        </p>
        <p className="mt-2 text-white/70 text-sm sm:text-base">{currentVideo.author}</p>
      </div>

      {/* Video Title */}
      <h2 className="mt-4 sm:mt-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center px-2 sm:px-0">
        {currentVideo.title}
      </h2>

      {/* Video Player Section */}
      <div className="w-full max-w-xl sm:max-w-2xl md:max-w-4xl mt-4 sm:mt-6 flex flex-col items-center space-y-4">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">

          {/* Previous Button */}
          <button
            onClick={prevVideo}
            className="p-3 sm:p-4 bg-gray-700/60 hover:bg-gray-700/80 rounded-full text-white text-lg sm:text-xl transition-shadow shadow-md"
          >
            ‹
          </button>

          {/* Video */}
          <video
            ref={videoRef}
            className="w-full sm:w-[calc(100%-120px)] md:w-[calc(100%-140px)] rounded-xl border border-gray-300 shadow-lg hover:shadow-2xl transition-shadow"
            src={currentVideo.src}
            autoPlay
            loop
            muted
            playsInline
          />

          {/* Next Button */}
          <button
            onClick={nextVideo}
            className="p-3 sm:p-4 bg-gray-700/60 hover:bg-gray-700/80 rounded-full text-white text-lg sm:text-xl transition-shadow shadow-md"
          >
            ›
          </button>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="mt-2 px-6 sm:px-8 py-2 sm:py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md text-sm sm:text-base md:text-lg transition-transform transform hover:scale-105 flex items-center justify-center"
        >
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>

        {/* Video Progress Dots */}
        <div className="flex space-x-2 mt-4">
          {videos.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full transition-colors ${
                idx === currentIndex ? "bg-purple-500" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default InspirationCard;