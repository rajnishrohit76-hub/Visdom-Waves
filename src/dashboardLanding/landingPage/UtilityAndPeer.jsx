  import React, { useState, useEffect, useRef } from "react";

function UtilityAndPeer() {
  // -------------------
  // States
  // -------------------
  const [showNotes, setShowNotes] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [notes, setNotes] = useState("");
    const [calcInput, setCalcInput] = useState("");
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUpgrading, setIsUpgrading] = useState(false);

  const notesRef = useRef(null);
   const calcRef = useRef(null);

  // -------------------
  // Drag Logic
  // -------------------
  const startDrag = (e, type) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setDragging(type);
  };

  const onDrag = (e) => {
    if (!dragging) return;
    const ref = dragging === "notes" ? notesRef.current : calcRef.current;
    if (!ref) return;

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    // Keep inside viewport
    const maxX = window.innerWidth - ref.offsetWidth - 20;
    const maxY = window.innerHeight - ref.offsetHeight - 20;

    ref.style.left = `${Math.min(Math.max(newX, 10), maxX)}px`;
    ref.style.top = `${Math.min(Math.max(newY, 10), maxY)}px`;
  };

  const stopDrag = () => setDragging(null);

  useEffect(() => {
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", stopDrag);
    return () => {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", stopDrag);
    };
  });

  // -------------------
  // Calculator Logic
  // -------------------
  const calcButtons = ["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+","C"];

  const handleCalcButton = (value) => {
    if (value === "C") setCalcInput("");
    else if (value === "=") {
      try {
        setCalcInput(eval(calcInput).toString());
      } catch {
        setCalcInput("Error");
      }
    } else {
      setCalcInput((prev) => prev + value);
    }
  };

  // -------------------
  // Peer Upgrade Logic
  // -------------------
  useEffect(() => {
    let interval;
    if (isUpgrading && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + Math.floor(Math.random() * 10) + 5, 100));
      }, 500);
    }
    if (progress === 100) setIsUpgrading(false);
    return () => clearInterval(interval);
  }, [isUpgrading, progress]);

  const handleUpgrade = () => {
    setProgress(0);
    setIsUpgrading(true);
  };

  // -------------------
  // Render Logic (maps)
  // -------------------
  const renderCalcButtons = calcButtons.map((btn, idx) => (
    <button
      key={idx}
      onClick={() => handleCalcButton(btn)}
      className={`py-2 rounded-md font-medium text-white ${
        btn === "C"
          ? "bg-red-500 hover:bg-red-600"
          : btn === "="
          ? "bg-green-500 hover:bg-green-600"
          : "bg-purple-600 hover:bg-purple-700"
      } transition`}
    >
      {btn}
    </button>
  ));

  // -------------------
  // JSX
  // -------------------
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-tr flex flex-col md:flex-row gap-6 relative ">
      
      {/* Utilities Card */}
      <div className="flex-1  backdrop-blur-md rounded-xl shadow-lg p-4 sm:p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-purple-400">Utilities</h2>
        <div className="flex flex-wrap gap-3 mt-2">
          <button
            onClick={() => setShowNotes(true)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow transition"
          >
            Notepad
          </button>
          <button
            onClick={() => setShowCalculator(true)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow transition"
          >
            Calculator
          </button>
        </div>
      </div>

      {/* Peer Upgrade Card */}
      <div className="flex-1  backdrop-blur-md rounded-xl shadow-lg p-4 sm:p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-purple-400">Peer Upgrade</h2>
        <div className="text-white font-semibold text-lg">Vijay</div>
        <div className="text-gray-300 text-sm">{isUpgrading ? `Upgrading... ${progress}%` : "Idle"}</div>
        <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden mt-2">
          <div
            className={`h-4 bg-purple-500 transition-all duration-500`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        {!isUpgrading && (
          <button
            onClick={handleUpgrade}
            className="mt-3 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow transition"
          >
            Start Upgrade
          </button>
        )}
      </div>

      {/* Notepad Window */}
      {showNotes && (
        <div
          ref={notesRef}
          className="absolute w-72 sm:w-80 md:w-96 bg-gray-900/90 rounded-xl shadow-2xl border border-gray-700 p-4 z-50"
          style={{ left: "10%", top: "10%" }}
        >
          <div
            className="bg-gray-800 px-3 py-2 rounded-t-lg cursor-move text-white font-semibold select-none"
            onMouseDown={(e) => startDrag(e, "notes")}
          >
            Notepad
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your notes..."
            className="w-full h-40 mt-2 p-2 rounded-md bg-gray-800 text-white outline-none resize-none"
          />
          <button
            onClick={() => setShowNotes(false)}
            className="absolute top-2 right-2 text-white hover:text-red-400 font-bold"
          >
            X
          </button>
        </div>
      )}

      {/* Calculator Window */}
      {showCalculator && (
        <div
          ref={calcRef}
          className="absolute w-64 sm:w-72 md:w-80 bg-gray-900/90 rounded-xl shadow-2xl border border-gray-700 p-4 z-50"
          style={{ left: "50%", top: "10%" }}
        >
          <div
            className="bg-gray-800 px-3 py-2 rounded-t-lg cursor-move text-white font-semibold select-none"
            onMouseDown={(e) => startDrag(e, "calculator")}
          >
            Calculator
          </div>
          <input
            type="text"
            value={calcInput}
            readOnly
            placeholder="0"
            className="w-full mt-2 p-2 rounded-md bg-gray-800 text-white text-right font-mono text-lg outline-none"
          />
          <div className="grid grid-cols-4 gap-2 mt-3">
            {renderCalcButtons}
          </div>
          <button
            onClick={() => setShowCalculator(false)}
            className="absolute top-2 right-2 text-white hover:text-red-400 font-bold"
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}

  export default UtilityAndPeer;