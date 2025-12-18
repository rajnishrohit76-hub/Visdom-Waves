import React, { useState, useEffect, useRef } from "react";
import "../Styles/UtilityPeer.css";

function UtilityAndPeer() {
  const [showNotes, setShowNotes] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [notes, setNotes] = useState("");
  const [calcInput, setCalcInput] = useState("");

  const notesRef = useRef(null);
  const calcRef = useRef(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(null);

  const startDrag = (e, type) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setDragging(type);
  };

  const onDrag = (e) => {
    if (!dragging) return;
    const ref = dragging === "notes" ? notesRef.current : calcRef.current;
    if (ref) {
      ref.style.left = `${e.clientX - dragOffset.x}px`;
      ref.style.top = `${e.clientY - dragOffset.y}px`;
    }
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

  const handleCalcButton = (value) => {
    if (value === "C") {
      setCalcInput("");
    } else if (value === "=") {
      try {
        setCalcInput(eval(calcInput).toString());
      } catch {
        setCalcInput("Error");
      }
    } else {
      setCalcInput((prev) => prev + value);
    }
  };

  const calcButtons = [
    "7","8","9","/",
    "4","5","6","*",
    "1","2","3","-",
    "0",".","=","+",
    "C"
  ];

  const [progress, setProgress] = useState(0);
  const [isUpgrading, setIsUpgrading] = useState(false);

  useEffect(() => {
    let interval;
    if (isUpgrading && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + Math.floor(Math.random() * 10) + 5, 100));
      }, 500);
    }
    if (progress === 100) {
      setIsUpgrading(false);
    }
    return () => clearInterval(interval);
  }, [isUpgrading, progress]);

  const handleUpgrade = () => {
    setProgress(0);
    setIsUpgrading(true);
  };

  return (
    <div className="utility-peer-merged-container">
      <div className="utility-peer-card">
        <h2>Utilities</h2>
        <div className="utility-peer-buttons">
          <button className="utility-peer-btn" onClick={() => setShowNotes(true)}>Notepad</button>
          <button className="utility-peer-btn" onClick={() => setShowCalculator(true)}>Calculator</button>
        </div>
      </div>

      <div className="utility-peer-card">
        <h2>Peer Upgrade</h2>
        <div className="utility-peer-title">Vijay</div>
        <div className="utility-peer-status">
          {isUpgrading ? `Upgrading... ${progress}%` : "Idle"}
        </div>
        <div className="utility-peer-progress-bar">
          <div
            className="utility-peer-progress"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        {!isUpgrading && (
          <button className="utility-peer-button" onClick={handleUpgrade}>
            Start Upgrade
          </button>
        )}
      </div>

      {showNotes && (
        <div
          ref={notesRef}
          className="utility-peer-system-window"
          style={{ left: "100px", top: "100px" }}
        >
          <div className="utility-peer-window-title" onMouseDown={(e) => startDrag(e, "notes")}>
            Notepad
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your notes..."
          />
          <button className="utility-peer-close-btn" onClick={() => setShowNotes(false)}>X</button>
        </div>
      )}

      {showCalculator && (
        <div
          ref={calcRef}
          className="utility-peer-system-window"
          style={{ left: "450px", top: "100px" }}
        >
          <div className="utility-peer-window-title" onMouseDown={(e) => startDrag(e, "calculator")}>
            Calculator
          </div>
          <input type="text" value={calcInput} readOnly placeholder="0" />
          <div className="utility-peer-buttons-grid">
            {calcButtons.map((btn, idx) => (
              <button
                key={idx}
                onClick={() => handleCalcButton(btn)}
                className={
                  btn === "C" ? "utility-peer-clear" :
                  btn === "=" ? "utility-peer-equals" : ""
                }
              >
                {btn}
              </button>
            ))}
          </div>
          <button className="utility-peer-close-btn" onClick={() => setShowCalculator(false)}>X</button>
        </div>
      )}
    </div>
  );
}

export default UtilityAndPeer;
