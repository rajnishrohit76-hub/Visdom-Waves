import React, { useEffect, useRef } from "react";

function BoardSection() {
  const boards = [
    "CBSE","ICSE","Andhra Pradesh State Board","Assam SEBA","Assam AHSEC",
    "Bihar School Examination Board (BSEB)","Chhattisgarh Board of Secondary Education",
    "Goa Board of Secondary & Higher Secondary Education",
    "Gujarat Secondary & Higher Secondary Education Board","Haryana Board of School Education",
    "Himachal Pradesh Board of School Education","Jammu & Kashmir State Board",
    "Jharkhand Academic Council","Karnataka Secondary Education Examination Board",
    "Kerala Board of Public Examinations","Madhya Pradesh Board of Secondary Education",
    "Maharashtra State Board of Secondary & Higher Secondary Education","Manipur Board of School Education",
    "Meghalaya Board of School Education","Mizoram Board of School Education","Nagaland Board of School Education",
    "Odisha Council of Higher Secondary Education","Punjab School Education Board",
    "Rajasthan Board of Secondary Education","Sikkim Board of School Education","Tamil Nadu State Board",
    "Telangana State Board","Tripura Board of Secondary Education",
    "Uttar Pradesh Board of High School & Intermediate Education","Uttarakhand Board of School Education",
    "West Bengal Board of Secondary Education"
  ];

  const earlyClasses = ["LKG", "UKG"];
  const schoolClasses = Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`);
  const classes = [...earlyClasses, ...schoolClasses];

  const courses = [
    { title: "UX/UI Design", img: "https://images.unsplash.com/photo-1560785496-3c9d27877182?w=600&auto=format&fit=crop&q=60" },
    { title: "Web Design", img: "https://plus.unsplash.com/premium_photo-1681681082090-05b32857cbca?w=600&auto=format&fit=crop&q=60" },
    { title: "Web Development", img: "https://images.unsplash.com/photo-1760267973986-5370a55550f4?w=600&auto=format&fit=crop&q=60" },
    { title: "Digital Marketing", img: "https://images.unsplash.com/photo-1706456873949-f7651c55a562?w=600&auto=format&fit=crop&q=60" }
  ];

  const boardsRef = useRef(null);

  useEffect(() => {
    const el = boardsRef.current;
    if (!el) return;

    const scrollAmount = 220;
    const interval = setInterval(() => {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const boardItems = boards.map((board, idx) => (
    <div
      key={idx}
      className="min-w-[140px] sm:min-w-[180px] md:min-w-[220px] px-3 sm:px-4 py-3 bg-white rounded-xl shadow text-center text-xs sm:text-sm md:text-base font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition cursor-pointer"
    >
      {board}
    </div>
  ));

  const classItems = classes.map((cls, idx) => (
    <div
      key={idx}
      className="bg-white p-3 sm:p-4 md:p-6 rounded-2xl shadow-md text-center hover:shadow-xl hover:-translate-y-1 transition duration-300"
    >
      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-slate-800 mb-2 sm:mb-3 md:mb-4">
        {cls}
      </h3>
      <button className="px-2 sm:px-3 py-1 sm:py-2 rounded-lg bg-sky-600 text-white text-xs sm:text-sm md:text-base font-medium hover:bg-sky-700 transition">
        Demo
      </button>
    </div>
  ));

  const courseCards = courses.map((course, index) => (
    <div
      key={index}
      className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
    >
      <img
        src={course.img}
        alt={course.title}
        className="w-full h-48 sm:h-56 md:h-60 object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition">
        <button className="px-3 sm:px-4 py-1 sm:py-2 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition text-xs sm:text-sm md:text-base">
          View Details
        </button>
      </div>
      <h3 className="p-2 sm:p-4 text-base sm:text-lg md:text-xl font-semibold text-slate-800 text-center">
        {course.title}
      </h3>
    </div>
  ));

  return (
    <>
      {/* Boards Section */}
      <section className="px-4 sm:px-6 lg:px-12 py-10 bg-slate-50">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-4 sm:mb-6">
          Visdom Waves Supports All the Boards
        </h2>
        <div
          ref={boardsRef}
          className="flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto pb-4 mb-10 scrollbar-hide"
        >
          {boardItems}
        </div>

        <h2 className="text-xl text-center sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-2 sm:mb-4">
          All Classes Available Here
        </h2>
        <p className="text-xs text-center sm:text-sm md:text-base text-slate-600 mb-6 sm:mb-8 max-w-full ">
          Get access to notes, videos, worksheets, and quizzes for your class.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {classItems}
        </div>
      </section>

      {/* Courses Section */}
      <section className="px-4 sm:px-6 lg:px-12 py-12 bg-slate-50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 sm:gap-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800">
            Get Choice of Your Best Courses
          </h2>
          <a href="#" className="text-sky-600 font-medium hover:underline">
            View All →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {courseCards}
        </div>
      </section>
    </>
  );
}

export default BoardSection;
