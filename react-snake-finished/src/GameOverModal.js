// GameOverModal.js
import React,  { useState } from "react";
import "./css/style.css";

const GameOverModal = ({ score, startGame }) => {
  const [isVisible, setIsVisible] = useState(true);

  const closeModal = () => {
    setIsVisible(false);
  };

  const handlePlayAgain = () => {
    setIsVisible(false);
    startGame();
  };

  return (
    isVisible && (
      <div className="modal">
        <div className="modal--content">
          <h2>GAME OVER</h2>
          <p>Your Score: {score}</p>
          <div className="modal--footer">
            <button className="m-btn btn--primary" onClick={handlePlayAgain}>
              Play Again
            </button>
            <button className="m-btn btn--outline" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default GameOverModal;
