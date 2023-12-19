// GameOverModal.js
import React from "react";
import "./css/style.css";

const GameOverModal = ({ score, startGame }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>GAME OVER</h2>
        <p>Your Score: {score}</p>
        <p>PLAY AGAIN</p>
        <button onClick={startGame}>Play Again</button>
      </div>
    </div>
  );
};

export default GameOverModal;
