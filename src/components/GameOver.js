import React, { useContext } from "react";
import { AppContext } from "../App";

const GameOver = (props) => {
  const { gameOver, correctWord, currAttempt } = useContext(AppContext);

  return (
    <div className="gameOver">
      <h3>{gameOver.guessedWord ? "Congrats!" : "Unlucky!"}</h3>
      <h1>Correct word: {correctWord}</h1>
      {gameOver.guessedWord && (
        <h3>You guessed in {currAttempt.attempt} attempts</h3>
      )}
      <button className="play-again" onClick={props.reset}>
        Play Again
      </button>
    </div>
  );
};

export default GameOver;
