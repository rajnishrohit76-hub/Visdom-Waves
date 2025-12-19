// GamesDashboard.js
import React, { useState, useEffect } from "react";
import "../dashboardCssCode/Dashboard.css"

function GamesDashboard() {
  // ========== BOARDS ==========
  const STARTER_BOARD = [
    [5, 3, "", "", 7, "", "", "", ""],
    [6, "", "", 1, 9, 5, "", "", ""],
    ["", 9, 8, "", "", "", "", 6, ""],
    [8, "", "", "", 6, "", "", "", 3],
    [4, "", "", 8, "", 3, "", "", 1],
    [7, "", "", "", 2, "", "", "", 6],
    ["", 6, "", "", "", "", 2, 8, ""],
    ["", "", "", 4, 1, 9, "", "", 5],
    ["", "", "", "", 8, "", "", 7, 9],
  ];

  const SOLUTION_BOARD = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
  ];

  // ========== STATES ==========
  const [board, setBoard] = useState(STARTER_BOARD);
  const [wrongCells, setWrongCells] = useState([]);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [solved, setSolved] = useState(false);
  const [sudokuTime, setSudokuTime] = useState(0);

  const [activeBox, setActiveBox] = useState(null);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  const [gameStartedSudoku, setGameStartedSudoku] = useState(false);
  const [gameStartedWhack, setGameStartedWhack] = useState(false);

  // ========== EFFECTS ==========
  useEffect(() => {
    if (!gameStartedSudoku || success || solved) return;
    const timer = setInterval(() => setSudokuTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, [gameStartedSudoku, success, solved]);

  useEffect(() => {
    if (!gameStartedWhack || gameOver) return;
    if (time === 0) {
      setGameOver(true);
      return;
    }
    const countdown = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(countdown);
  }, [time, gameStartedWhack, gameOver]);

  useEffect(() => {
    if (!gameStartedWhack || gameOver) return;
    const moleTimer = setInterval(
      () => setActiveBox(Math.floor(Math.random() * 9)),
      700
    );
    return () => clearInterval(moleTimer);
  }, [gameStartedWhack, gameOver]);

  // ========== HANDLERS ==========
  const handleChange = (row, col, value) => {
    if (value === "" || /^[1-9]$/.test(value)) {
      setBoard((prev) =>
        prev.map((r, i) => r.map((c, j) => (i === row && j === col ? value : c)))
      );
    }
  };

  const checkBoard = () => {
    const errors = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === "") {
          setMessage("⚠️ Board incomplete");
          return;
        }
        if (+board[i][j] !== SOLUTION_BOARD[i][j]) {
          errors.push(`${i}-${j}`);
        }
      }
    }
    if (errors.length) {
      setWrongCells(errors);
      setMessage("❌ Wrong cells highlighted");
      setSuccess(false);
    } else {
      setWrongCells([]);
      setSuccess(true);
      setMessage("🎉 PERFECT SOLVE!");
    }
  };

  const resetBoard = () => {
    setBoard(STARTER_BOARD);
    setWrongCells([]);
    setMessage("");
    setSuccess(false);
    setHintsLeft(3);
    setSolved(false);
    setSudokuTime(0);
    setGameStartedSudoku(false);
  };

  const giveHint = () => {
    if (hintsLeft === 0) return;
    const empty = [];
    board.forEach((r, i) =>
      r.forEach((c, j) => {
        if (c === "") empty.push([i, j]);
      })
    );
    if (!empty.length) return;
    const [r, c] = empty[Math.floor(Math.random() * empty.length)];
    setBoard((prev) =>
      prev.map((row, i) =>
        row.map((cell, j) => (i === r && j === c ? SOLUTION_BOARD[r][c] : cell))
      )
    );
    setHintsLeft((h) => h - 1);
  };

  const solveBoard = () => {
    setBoard(SOLUTION_BOARD);
    setSolved(true);
    setSuccess(true);
    setMessage("🎉 Sudoku Solved");
  };

  const hitMole = (i) => {
    if (!gameStartedWhack || gameOver) return;
    if (i === activeBox) {
      setScore((s) => s + 1);
      setActiveBox(null);
    }
  };

  const resetGame = () => {
    setScore(0);
    setTime(30);
    setGameOver(false);
    setActiveBox(null);
    setGameStartedWhack(false);
  };

  // ========== JSX ELEMENTS ==========
  const sudokuInputs = board.map((row, i) =>
    row.map((cell, j) => (
      <input
        key={`${i}-${j}`}
        value={cell}
        disabled={STARTER_BOARD[i][j] !== "" || solved || !gameStartedSudoku}
        maxLength={1}
        onChange={(e) => handleChange(i, j, e.target.value)}
        className={`h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-center font-bold outline-none
        ${wrongCells.includes(`${i}-${j}`) ? "bg-red-500/40" : "bg-black/40"}
        border border-white/20 text-white`}
      />
    ))
  );

  const whackBoxes = Array(9)
    .fill(0)
    .map((_, i) => (
      <div
        key={i}
        onClick={() => hitMole(i)}
        className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-white/20 rounded-xl flex items-center justify-center cursor-pointer hover:scale-110 transition"
      >
        {activeBox === i && !gameOver && gameStartedWhack && (
          <span className="text-2xl sm:text-3xl md:text-4xl animate-bounce">👾</span>
        )}
      </div>
    ));

  // ========== RETURN ==========
  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      
      {/* ========== SUDOKU ========== */}
      <div className="relative backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col items-center">
        {!gameStartedSudoku && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-3xl z-10">
            <button
              onClick={() => setGameStartedSudoku(true)}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-lg sm:text-xl font-bold transition"
            >
              START SUDOKU
            </button>
          </div>
        )}

        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-purple-300 mb-2">
          NEON SUDOKU
        </h2>
        <p className="text-center text-white mb-4 text-sm sm:text-base">⏱ {sudokuTime}s</p>

        <div className="grid grid-cols-9 gap-[2px] justify-center">{sudokuInputs}</div>

        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mt-4">
          <button onClick={resetBoard} className="btn gray text-xs sm:text-sm">RESET</button>
          <button onClick={checkBoard} className="btn purple text-xs sm:text-sm">CHECK</button>
          <button onClick={giveHint} disabled={hintsLeft === 0} className="btn yellow text-xs sm:text-sm">
            HINT 💡 {hintsLeft}
          </button>
          <button onClick={solveBoard} disabled={solved} className="btn green text-xs sm:text-sm">
            SOLVE 🔒
          </button>
        </div>

        {message && (
          <p className={`mt-3 text-center font-bold text-sm sm:text-base ${success ? "text-green-400" : "text-red-400"}`}>
            {message}
          </p>
        )}
      </div>

      {/* ========== WHACK GAME ========== */}
      <div className="relative backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col items-center">
        {!gameStartedWhack && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-3xl z-10">
            <button
              onClick={() => setGameStartedWhack(true)}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-lg sm:text-xl font-bold transition"
            >
              START WHACK
            </button>
          </div>
        )}

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 text-center">
          👾 Whack The Monster
        </h2>

        <div className="flex flex-wrap justify-center gap-4 text-white mb-4 text-sm sm:text-base">
          <span>⏱ {time}s</span>
          <span>⭐ {score}</span>
        </div>

        <div className={`grid grid-cols-3 gap-3 sm:gap-4 ${!gameStartedWhack ? "filter blur-sm pointer-events-none" : ""}`}>
          {whackBoxes}
        </div>

        {gameOver && (
          <div className="mt-4 sm:mt-5 text-center">
            <p className="text-lg sm:text-xl mb-2">Game Over</p>
            <button onClick={resetGame} className="btn purple text-xs sm:text-sm">
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GamesDashboard;