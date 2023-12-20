// GameOverModal.js
import React from "react";
import "./css/style.css";

const GameOverModal = ({ score, startGame }) => {
  return (
    <div className="modal">
      <div className="modal--content">
        <h2>GAME OVER</h2>
        <p>Your Score: {score}</p>
        <div className="modal--footer">
          <button className="btn--primary btn--modal" onClick={startGame}>Play Again</button>
          <button className="btn--primary btn--modal" onClick={startGame}>Home page</button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
