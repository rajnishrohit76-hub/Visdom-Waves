import React, { useState, useEffect, useMemo } from "react";

const testimonialsData = [
  {
    name: "Manav",
    class: "Class 9",
    location: "Bangalore",
    feedback: "Visdom Waves helped Manav pick up his learning pace in Science.",
    image:
      "https://t3.ftcdn.net/jpg/06/62/89/52/240_F_662895219_kD86egJjNFJen200GN3YYyvg64SL5o5y.jpg",
  },
  {
    name: "Harshita",
    class: "Class 4",
    location: "Mumbai",
    feedback: "Visdom Waves videos have helped me understand and be more confident.",
    image:
      "https://t3.ftcdn.net/jpg/01/87/83/26/240_F_187832626_Z0K54NuFDzPM10NZw6gWdRYMC763xJQM.jpg",
  },
  {
    name: "Atri",
    class: "Class 9",
    location: "Kolkata",
    feedback: "I can balance my studies and sports well with Visdom Waves - The Learning Platform.",
    image:
      "https://t3.ftcdn.net/jpg/06/26/63/72/240_F_626637222_vTb3dAhrpb47oskhaCQjXFGPAygwDaD8.jpg",
  },
];

const statsData = [
  { label: "downloads", value: "150+ Million" },
  { label: "app rating", value: "4.7+ Star" },
  { label: "worldwide", value: "1701+ Cities" },
  { label: "avg. time spent daily", value: "71 mins" },
];

function StudentLove() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0); // progress 0-100
  const length = testimonialsData.length;
  const intervalTime = 5000; // 5 seconds per slide

  // Auto-slide with progress bar
  useEffect(() => {
    const progressInterval = 50; // update progress every 50ms
    let start = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.min((elapsed / intervalTime) * 100, 100);
      setProgress(percent);
      if (percent >= 100) {
        setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
        start = Date.now();
      }
    }, progressInterval);

    return () => clearInterval(timer);
  }, [current, length]);

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
    setProgress(0);
  };

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
    setProgress(0);
  };

  // Memoized testimonial slides
  const testimonialSlides = useMemo(
    () =>
      testimonialsData.map((testimonial, index) => (
        <div
          key={index}
          className={`absolute transition-opacity duration-700 ease-in-out w-full md:w-1/3 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="student-card bg-white/90 p-8 rounded-2xl shadow-xl transform transition-transform hover:-translate-y-2 text-center mx-auto">
            <div className="student-img flex justify-center mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white object-cover"
              />
            </div>
            <p className="text-lg font-semibold text-gray-800">{testimonial.name}</p>
            <p className="text-gray-600 mb-4">
              {testimonial.class} | {testimonial.location}
            </p>
            <p className="text-gray-700">{testimonial.feedback}</p>
          </div>
        </div>
      )),
    [current]
  );

  // Memoized stats
  const stats = useMemo(
    () =>
      statsData.map((stat, idx) => (
        <div key={idx}>
          <h3 className="text-3xl font-extrabold text-white">{stat.value}</h3>
          <p className="text-white mt-2">{stat.label}</p>
        </div>
      )),
    []
  );

  // Dots navigation
  const dots = useMemo(
    () =>
      testimonialsData.map((_, idx) => (
        <span
          key={idx}
          onClick={() => {
            setCurrent(idx);
            setProgress(0);
          }}
          className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
            current === idx ? "bg-white" : "bg-white/50"
          }`}
        />
      )),
    [current]
  );

  return (
    <section className="homePage-studentlove-section relative py-20 min-h-screen bg-cover bg-fixed">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
          Our Students Love Us
        </h2>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center mb-16">{stats}</div>

        {/* Carousel */}
        <div className="relative w-full flex justify-center items-center mt-50">
          {testimonialSlides}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-3xl md:text-4xl font-bold px-4 py-2 hover:text-gray-300 transition"
            aria-label="Previous Slide"
          >
            &#10094;
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-3xl md:text-4xl font-bold px-4 py-2 hover:text-gray-300 transition"
            aria-label="Next Slide"
          >
            &#10095;
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-30 space-x-3">{dots}</div>
      </div>
    </section>
  );
}

export default StudentLove;
