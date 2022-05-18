import React, { useState, createContext, useEffect } from "react";

import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault, generateWordSet } from "./Words";
import GameOver from "./components/GameOver";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [almostLetters, setAlmostLetters] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [correctWord, setCorrectWord] = useState("");

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;

    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
  };

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;

    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  };

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;
    console.log(correctWord);

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
      if (currAttempt.attempt === 5) {
        setGameOver({ gameOver: true, guessedWord: false });
      }
    } else {
      setCurrAttempt({ attempt: currAttempt.attempt, letterPos: 0 });
      const newBoard = [...board];
      for (let i = 0; i < 5; i++) {
        newBoard[currAttempt.attempt][i] = "";
      }
      console.log(currAttempt.attempt);
      setBoard(newBoard);
      alert("Not a Valid Word");
    }

    if (currWord.toLowerCase() === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }
  };

  const playAgain = () => {
    console.log("New Game");
    window.location.reload();
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          onDelete,
          onSelectLetter,
          onEnter,
          correctWord,
          setDisabledLetters,
          disabledLetters,
          gameOver,
          setGameOver,
          almostLetters,
          setAlmostLetters,
          correctLetters,
          setCorrectLetters,
        }}
      >
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver reset={playAgain} /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
