import React, { useEffect, useRef, useState } from "react";

const AUTO_SLIDE_INTERVAL = 6000;

const leaders = [
  {
    text:
      "This voice-interactive AI platform is a game-changer. It revolutionizes education, engages students like never before, and prepares them for success in the future.",
    name: "Nambi Narayanan – Rocketry",
    videoUrl: "https://www.youtube.com/embed/z7C4qjp25Zc?enablejsapi=1",
  },
  {
    text:
      "By seamlessly integrating technology into the educational landscape, this platform becomes a game-changer with far-reaching implications.",
    name: "Rakesh Sharma",
    videoUrl: "https://www.youtube.com/embed/xb1pkqrhd2E?enablejsapi=1",
  },
  {
    text:
      "By seamlessly integrating technology into the educational landscape, this platform becomes a game-changer with far-reaching implications.",
    name: "Tessy Thomas",
    videoUrl: "https://www.youtube.com/embed/PMqLC4AbHeE?enablejsapi=1",
  },
  {
    text:
      "By seamlessly integrating technology into the educational landscape, this platform becomes a game-changer with far-reaching implications.",
    name: "Sunita Williams",
    videoUrl: "https://www.youtube.com/embed/uYmUTjlkV2I?enablejsapi=1",
  },
  {
    text:
      "By seamlessly integrating technology into the educational landscape, this platform becomes a game-changer with far-reaching implications.",
    name: "Venkatapathi Raju",
    videoUrl: "https://www.youtube.com/embed/SKvJYy8aSmg?enablejsapi=1",
  },
];

export default function LeaderVoice() {
  const [index, setIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const iframeRefs = useRef([]);
  const autoSlideRef = useRef(null);
  const touchStartX = useRef(0);

  /* Typing animation */
  useEffect(() => {
    let i = 0;
    setTypedText("");
    const text = leaders[index].text;

    const timer = setInterval(() => {
      setTypedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, 20);

    return () => clearInterval(timer);
  }, [index]);

  /* Stop YouTube videos */
  const stopVideos = () => {
    iframeRefs.current.forEach((iframe) => {
      if (!iframe) return;
      iframe.contentWindow?.postMessage(
        '{"event":"command","func":"stopVideo","args":""}',
        "*"
      );
    });
  };

  /* Navigation */
  const next = () => {
    stopVideos();
    setIndex((prev) => (prev + 1) % leaders.length);
  };

  const prev = () => {
    stopVideos();
    setIndex((prev) => (prev === 0 ? leaders.length - 1 : prev - 1));
  };

  /* Auto slide */
  const startAutoSlide = () => {
    clearInterval(autoSlideRef.current);
    autoSlideRef.current = setInterval(next, AUTO_SLIDE_INTERVAL);
  };

  const stopAutoSlide = () => clearInterval(autoSlideRef.current);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  /* Swipe gestures */
  const handleTouchStart = (e) => {
    stopAutoSlide();
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(deltaX) > 50) {
      deltaX > 0 ? next() : prev();
    }
    startAutoSlide();
  };

  const leader = leaders[index];

  return (
    <>
      <section className="py-16 bg-cover bg-center homepage-leaderVoice-section">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-8 relative">
          Leader&apos;s Voice
          <span className="block w-20 h-1 bg-indigo-600 mx-auto mt-2 rounded"></span>
        </h2>

        <div
          className="max-w-7xl mx-auto px-4"
          onMouseEnter={stopAutoSlide}
          onMouseLeave={startAutoSlide}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="homepage-leaderVoice-background relative rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row gap-8 p-6 md:p-10 transition-transform duration-500 ease-in-out">
            
            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <p className="text-gray-300 text-base md:text-lg leading-relaxed min-h-[120px]">
                {typedText}
              </p>
              <h5 className="mt-6 text-white font-semibold text-lg">
                {leader.name}
              </h5>
            </div>

            {/* Video */}
            <div className="flex-1 w-full max-w-xl mx-auto">
              <div className="homepage-leaderVoice-video relative w-full rounded-xl shadow-lg">
                <iframe
                  ref={(el) => (iframeRefs.current[index] = el)}
                  src={leader.videoUrl}
                  title={leader.name}
                  className="absolute inset-0 w-full h-full rounded-xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex justify-center gap-6">
            <button
              onClick={prev}
              className="px-6 py-2 rounded-full bg-yellow-600 hover:bg-indigo-700 transition text-white text-sm font-medium"
            >
              Previous
            </button>
            <button
              onClick={next}
              className="px-6 py-2 rounded-full bg-yellow-600 hover:bg-indigo-700 transition text-white text-sm font-medium"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
