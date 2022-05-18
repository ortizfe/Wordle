import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

const Letter = ({ letterPos, attemptVal }) => {
  const {
    board,
    correctWord,
    currAttempt,
    setDisabledLetters,
    almostLetters,
    setAlmostLetters,
    setCorrectLetters,
  } = useContext(AppContext);
  const letter = board[attemptVal][letterPos];

  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost =
    !correct && letter !== "" && correctWord.toUpperCase().includes(letter);
  const letterState =
    currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : "error");

  if (
    letterState === "correct" &&
    almostLetters.includes(letter) &&
    almostLetters.length > 0
  ) {
    for (let i = 0; i < almostLetters.length; i++) {
      if (almostLetters[i] === letter) almostLetters.splice(i, 1);
    }
    setAlmostLetters(almostLetters);
  }

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter]);
    } else if (letter !== "" && !correct && almost) {
      setAlmostLetters((prev) => [...prev, letter]);
    } else if (letter !== "" && correct && !almost) {
      setCorrectLetters((prev) => [...prev, letter]);
    }
  }, [currAttempt.attempt]);

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
};

export default Letter;
