import React, { useRef, useState } from "react";
import "../Styles/InspirationCard.css";

const videos = [
  "/Landing Video/VisdomWaves1.mp4",
  "video2.mp4",
  "video3.mp4",
];

function InspirationCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? videos.length - 1 : prev - 1
    );
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <>
      <div className="inspiration-container">
        {/* QUOTE SECTION */}
        <div className="quote-section">
          <p className="quote-text">
            <span className="quote-icon">❝</span>
            Believe in yourself and all that you are. Know that there is something
            inside you that is greater than any obstacle.
            <span className="quote-icon">❞</span>
          </p>

          <p className="quote-author">- Christian D. Larson</p>

          {/* <button className="mute-btn" onClick={toggleMute}>
            {isMuted ? "🔇" : "🔊"}
          </button> */}
        </div>

        {/* VIDEO SECTION */}
        <h2 className="video-title">This week's Inspiring Personality</h2>

        <div className="carousel-wrapper">
          <button className="nav-btn left" onClick={prevVideo}>
            ‹
          </button>

          <div className="video-border">
            <video
              ref={videoRef}
              className="carousel-video"
              src={videos[currentIndex]}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              controls
            />
          </div>

          <button className="nav-btn right" onClick={nextVideo}>
            ›
          </button>
        </div>
      </div>
    </>
  );
}

export default InspirationCard;
