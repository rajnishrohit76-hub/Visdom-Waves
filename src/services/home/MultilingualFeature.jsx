import React from "react";
import { ArrowRight } from "react-feather";
import MultiLangVideo from "/home/multilingualFeature/MultiLang.mp4";
import image1 from "/home/multilingualFeature/SchoolStudents.jpg";
import image2 from "/home/multilingualFeature/StudentLearning.jpg";
import image3 from "/home/multilingualFeature/StudentReading.jpg";
import image4 from "/home/multilingualFeature/StudentWithTeacher.jpg";
import image5 from "/home/multilingualFeature/champStudents.jpeg";
import image6 from "/home/multilingualFeature/studentStudy.jpeg";
import image7 from "/home/multilingualFeature/students.jpg";


const images = [image1, image2, image3, image4, image5, image6, image7];

const title = "Empowering Multilingual Future";
const description =
  "Master three languages, unlock global opportunities, and prepare for a successful, interconnected future ahead.";

function MultilingualFuture() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover brightness-60 z-[-1]"
        src={MultiLangVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-5 h-full flex flex-col justify-center">
        <div className="text-center sm:text-left">

          {/* Title */}
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Empowering <br className="hidden md:block" />
            <span className="text-green-500">Multilingual Future</span>
          </h1>

          {/* Description */}
          <p className="text-gray-200 text-base sm:text-lg md:text-xl max-w-full sm:max-w-lg lg:max-w-xl mx-auto sm:mx-0 mb-6 sm:mb-8">
            {description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
            <button className="bg-gray-900 text-white py-2 sm:py-3 px-5 sm:px-7 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
              Enroll Now
            </button>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer">
              <ArrowRight className="text-gray-900" size={24} />
            </div>
          </div>

          {/* Scrolling Image Gallery */}
          <div className="overflow-hidden mt-6 md:mt-10">
            <div className="homepage-multilingualImage-animate-scroll">
              {images.concat(images).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default MultilingualFuture;
