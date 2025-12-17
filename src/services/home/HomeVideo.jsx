import React from 'react'

function HomeVideo() {
  return (
    <>
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
          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            <span className="block text-emerald-400">
              Education • Empower • Elevate
            </span>
            <span className="mt-2 block">
              AI-Enhanced Learning for the 21st Century
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-200 md:text-xl">
            Journey into a New Learning Era: Embrace Our Voice-Interactive AI
            Platform for a Brighter Educational Future.
          </p>
        </div>
      </div>
    </section>
    </>
  )
}

export default HomeVideo;