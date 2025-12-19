import React, { useEffect, useState } from "react";

function Greeting() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 17) {
      setGreeting("Good Afternoon");
    } else if (hour < 21) {
      setGreeting("Good Evening");
    } else {
      setGreeting("Good Night");
    }
  }, []);

  return (
    <div className="max-w-300 mx-auto mt-10 p-6 bg-white/20 backdrop-blur-lg rounded-3xl shadow-lg border border-white/30 transition-all hover:scale-105 duration-300 text-center">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 flex items-center justify-center gap-3">
        <span className="text-yellow-300 animate-bounce">🌞</span>
        {greeting}, <span className="text-cyan-300">Vijay</span>
      </h1>
      <p className="text-white/80 text-lg md:text-xl mt-2">
        Let’s explore, learn, and have fun today!
      </p>
      <div className="mt-4 h-1 w-16 bg-cyan-300 rounded-full mx-auto animate-pulse"></div>
    </div>
  );
}

export default Greeting;