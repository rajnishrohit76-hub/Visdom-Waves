import React, { useState, useEffect, useMemo } from "react";

const parentTestimonials = [
  {
    name: "Rohit",
    child: "Class 5",
    location: "Delhi",
    feedback:
      "Visdom Waves has made learning fun for my child and improved their confidence.",
    image: "/home/parentImage/class5.jpg",
  },
  {
    name: "Sneha",
    child: "Class 8",
    location: "Chennai",
    feedback:
      "I trust Visdom Waves to provide quality education and help my child excel.",
    image: "/home/parentImage/class8.jpg",
  },
  {
    name: "Amit",
    child: "Class 6",
    location: "Bihar",
    feedback:
      "The personalized approach and engaging content make learning effective.",
    image: "/home/parentImage/class6.jpg",
  },
  {
    name: "Priya",
    child: "Class 7",
    location: "Bangalore",
    feedback:
      "My child loves the lessons and asks for more every day!",
    image: "/home/parentImage/class7.jpg",
  },
  {
    name: "Ankit",
    child: "Class 10",
    location: "Mumbai",
    feedback:
      "Excellent support for parents and kids, highly recommended!",
    image: "/home/parentImage/class10.jpg",
  },
];

const statsData = [
  { label: "Happy parents", value: "1M+" },
  { label: "App rating", value: "4.8+ Star" },
  { label: "Cities covered", value: "1200+" },
  { label: "Avg. learning time daily", value: "75 mins" },
];

function ParentTrust() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  const length = parentTestimonials.length;
  const intervalTime = 5000;

  // Auto-slide with progress
  useEffect(() => {
    const progressInterval = 50;
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

  // Parent testimonial slides
  const testimonialSlides = useMemo(
    () =>
      parentTestimonials.map((testimonial, index) => (
        <div
          key={index}
          className={`absolute transition-opacity duration-700 ease-in-out w-full md:w-1/3 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="bg-white/90 p-8 rounded-2xl shadow-xl text-center mx-auto hover:-translate-y-2 transition-transform">
            <div className="flex justify-center mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white object-cover"
              />
            </div>
            <p className="text-lg font-semibold text-gray-800">
              {testimonial.name}
            </p>
            <p className="text-gray-600 mb-4">
              Child: {testimonial.child} | {testimonial.location}
            </p>
            <p className="text-gray-700">{testimonial.feedback}</p>
          </div>
        </div>
      )),
    [current]
  );

  // Stats
  const stats = useMemo(
    () =>
      statsData.map((stat, idx) => (
        <div key={idx} className="text-center">
          <h3 className="text-3xl font-extrabold text-white">
            {stat.value}
          </h3>
          <p className="text-white mt-2">{stat.label}</p>
        </div>
      )),
    []
  );

  // Dots
  const dots = useMemo(
    () =>
      parentTestimonials.map((_, idx) => (
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
    <section className="homepage-parent-trust-section relative py-20 min-h-screen bg-cover bg-fixed">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
          Parents Trust Us
        </h2>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {stats}
        </div>

        {/* Carousel */}
        <div className="relative w-full flex justify-center items-center mt-50">
          {testimonialSlides}

          {/* Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-3xl md:text-4xl font-bold px-4 hover:text-gray-300 transition"
            aria-label="Previous"
          >
            &#10094;
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-white text-3xl md:text-4xl font-bold px-4 hover:text-gray-300 transition"
            aria-label="Next"
          >
            &#10095;
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-16 space-x-3">
          {dots}
        </div>
      </div>
    </section>
  );
}

export default ParentTrust;