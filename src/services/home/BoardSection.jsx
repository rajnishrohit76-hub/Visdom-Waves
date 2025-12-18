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

    const scrollAmount = 200;
    const interval = setInterval(() => {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Boards Section */}
      <section className="homepage-boardAndClass-Section px-4 sm:px-6 lg:px-12 py-10 bg-slate-50">
        <h2 className="text-xl text-center sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
          Visdom Waves Supports All the Boards
        </h2>
        <div
          ref={boardsRef}
          className="flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto pb-4 mb-10 scrollbar-hide"
        >
          {boards.map((board, idx) => (
            <div key={idx} className="homepage-board-item">
              {board}
            </div>
          ))}
        </div>

        <h2 className="text-xl text-center sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">
          All Classes Available Here
        </h2>
        <p className="text-xs text-center sm:text-sm md:text-base text-white mb-6 sm:mb-8 max-w-full">
          Get access to notes, videos, worksheets, and quizzes for your class.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {classes.map((cls, idx) => (
            <div key={idx} className="homepage-class-item">
              <h3>{cls}</h3>
              <button>Demo</button>
            </div>
          ))}
        </div>
      </section>

      {/* Courses Section */}
      <section className="homepage-boardAndClass-Section px-4 sm:px-6 lg:px-12 py-12 bg-slate-50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 sm:gap-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            Vidom Waves Provides All Courses
          </h2>
          <a href="#" className="text-white font-medium hover:underline">
            View All →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {courses.map((course, idx) => (
            <div key={idx} className="homepage-course-card">
              <img src={course.img} alt={course.title} />
              <div className="overlay">
                <button>View Details</button>
              </div>
              <h3>{course.title}</h3>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default BoardSection;
