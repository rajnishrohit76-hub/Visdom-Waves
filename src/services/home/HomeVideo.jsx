import { useState } from "react";

function HomeVideo() {
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    const video = document.getElementById("motivationVideo");
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <>
      {/* ================= HERO VIDEO ================= */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/landingVideo/landingPage.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Overlay */}
        <div className="homepage-landingvideo-overlay">
          <div className="max-w-5xl px-6 text-center">
            <h1 className="text-white font-bold leading-[1.2] mb-4 text-[clamp(2rem,5vw,3.5rem)]">
              <span className="text-emerald-400">
                Education • Empower • Elevate
              </span>
              <br />
              AI-Enhanced Learning for the 21st Century
            </h1>

            <p className="text-[clamp(1rem,2.5vw,1.25rem)] text-neutral-300 max-w-[720px] mt-50 mx-auto">
              Journey into a New Learning Era — embrace our voice-interactive
              AI platform for a smarter, brighter educational future.
            </p>
          </div>
        </div>
      </section>

      {/* =================VISDOM WAVES VIDEO ================= */}
      <section className="homepage-visdomwaves-video py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <video
              id="motivationVideo"
              className="w-full object-cover"
              src="/landingVideo/VisdomWaves.mp4"
              autoPlay
              loop
              muted
              playsInline
            />

            {/* Mute Button */}
            <button
              onClick={toggleMute}
              className="mute-toggle-btn"
              aria-label="Toggle audio"
            >
              {isMuted ? "🔊 Unmute" : "🔇 Mute"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeVideo;
