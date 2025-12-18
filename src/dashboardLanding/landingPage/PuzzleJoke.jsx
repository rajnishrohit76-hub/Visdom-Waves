import React, { useState, useEffect, useRef } from "react";
import "../Styles/PuzzleJoke.css";

function PuzzleJoke() {
  // ====== Sudoku Setup ======
  const emptyBoard = Array(9).fill(null).map(() => Array(9).fill(""));
  const starterBoard = [
    [5, 3, "", "", 7, "", "", "", ""],
    [6, "", "", 1, 9, 5, "", "", ""],
    ["", 9, 8, "", "", "", "", 6, ""],
    [8, "", "", "", 6, "", "", "", 3],
    [4, "", "", 8, "", 3, "", "", 1],
    [7, "", "", "", 2, "", "", "", 6],
    ["", 6, "", "", "", "", 2, 8, ""],
    ["", "", "", 4, 1, 9, "", "", 5],
    ["", "", "", "", 8, "", "", 7, 9]
  ];

  const solutionBoard = [
    [5,3,4,6,7,8,9,1,2],
    [6,7,2,1,9,5,3,4,8],
    [1,9,8,3,4,2,5,6,7],
    [8,5,9,7,6,1,4,2,3],
    [4,2,6,8,5,3,7,9,1],
    [7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4],
    [2,8,7,4,1,9,6,3,5],
    [3,4,5,2,8,6,1,7,9]
  ];

  const [board, setBoard] = useState(emptyBoard);
  const [message, setMessage] = useState("");

  useEffect(() => setBoard(starterBoard), []);

  const handleChange = (row, col, value) => {
    if (value === "" || /^[1-9]$/.test(value)) {
      const newBoard = board.map((r, i) =>
        r.map((cell, j) => (i === row && j === col ? value : cell))
      );
      setBoard(newBoard);
    }
  };

  const checkBoard = () => {
    for (let i = 0; i < 9; i++) {
      const rowSet = new Set();
      const colSet = new Set();
      for (let j = 0; j < 9; j++) {
        const rowVal = parseInt(board[i][j]);
        const colVal = parseInt(board[j][i]);
        if (isNaN(rowVal) || isNaN(colVal)) return setMessage("Board is incomplete! ⏳");
        if (rowSet.has(rowVal) || colSet.has(colVal)) return setMessage("Invalid solution! ❌");
        rowSet.add(rowVal); colSet.add(colVal);
      }
    }
    for (let r = 0; r < 9; r += 3) {
      for (let c = 0; c < 9; c += 3) {
        const squareSet = new Set();
        for (let i = 0; i < 3; i++)
          for (let j = 0; j < 3; j++) {
            const val = parseInt(board[r+i][c+j]);
            if (squareSet.has(val) || isNaN(val)) return setMessage("Invalid solution! ❌");
            squareSet.add(val);
          }
      }
    }
    setMessage("🎉 Congratulations! Sudoku solved correctly ✅");
  };

  const resetBoard = () => { setBoard(starterBoard); setMessage(""); };
  const giveHint = () => {
    const emptyCells = [];
    board.forEach((row, i) => row.forEach((cell, j) => { if(cell==="") emptyCells.push([i,j]); }));
    if(!emptyCells.length) return;
    const [row, col] = emptyCells[Math.floor(Math.random()*emptyCells.length)];
    setBoard(board.map((r,i)=>r.map((c,j)=> (i===row && j===col ? solutionBoard[row][col]:c))));
  };
  const solveBoard = () => { setBoard(solutionBoard); setMessage("🎉 Sudoku solved ✅"); };

  // ====== Joke Setup ======
  const jokes = [
    "Teacher: Why are you late for class? Student: My alarm clock needed coffee ☕😂",
    "Wife: You're so quiet today. Husband: I'm conserving my sarcasm 😏",
    "Mom: How was your test? Kid: Great! I got 60 out of 99! 📊😄",
    "Doctor: You need more rest. Patient: But I already slept all day! 🛌😴",
    "Dad: Why did you eat your homework? Kid: Because it was a piece of cake 🎂😂",
    "Why did the scarecrow win an award? Because he was outstanding in his field 🌾😆",
    "Why don’t scientists trust atoms? Because they make up everything ⚛️😂",
    "Why did the bicycle fall over? Because it was two-tired 🚲😜",
    "Why did the computer go to the doctor? Because it caught a virus 💻🤒",
    "Why did the math book look sad? Because it had too many problems 📚😅"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if(!paused) intervalRef.current = setInterval(()=>setCurrentIndex(prev=> (prev+1)%jokes.length), 5000);
    return ()=> clearInterval(intervalRef.current);
  }, [paused,jokes.length]);

  return (
    <div className="pj-container">
      {/* Sudoku Card */}
      <div className="pj-cards pj-sudoku-wrapper">
        <h2>Puzzle Of the Day</h2>
        <div className="pj-sudoku-grid pj-gradient-border">
          {board.map((row,i)=>
            row.map((cell,j)=>{
              const isStarter = starterBoard[i][j]!==""; 
              return (
                <input
                  key={`${i}-${j}`}
                  type="text"
                  maxLength="1"
                  className={`pj-sudoku-cell ${((Math.floor(i/3)+Math.floor(j/3))%2===0)? "pj-block-shade":""}`}
                  value={cell}
                  onChange={(e)=>handleChange(i,j,e.target.value)}
                  disabled={isStarter}
                />
              );
            })
          )}
        </div>
        <div className="pj-sudoku-controls">
          <button onClick={checkBoard}>Check</button>
          <button onClick={resetBoard}>Reset</button>
          <button onClick={giveHint}>Hint 💡</button>
          <button onClick={solveBoard}>Solve</button>
        </div>
        {message && <p className="pj-sudoku-message">{message}</p>}
      </div>

      {/* Joke Card */}
      <div className="pj-cards pj-joke-wrapper" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
        <h2>Joke Of the Day</h2>
        <h1>😜</h1>
        <p className="pj-joke-text">{jokes[currentIndex]}</p>
        <div className="pj-dots">
          {jokes.map((_,index)=>(
            <span key={index} className={`pj-dot ${currentIndex===index? "active":""}`}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PuzzleJoke;
