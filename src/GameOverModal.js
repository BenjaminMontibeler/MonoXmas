// GameOverModal.js
import React,  { useState } from "react";
import "./css/style.css";
import { BsTwitterX } from "react-icons/bs";

const GameOverModal = ({ score, startGame, handleClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const closeModal = () => {
    setIsVisible(false);
    handleClose(true)
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
          <div class="socials-wrapper">
            <div class="flex"><i class="social-icon facebook"></i><span><a href="https://www.facebook.com/mono.software">@mono.software</a></span></div>
            <div class="flex"><i class="social-icon instagram"></i><span><a href="https://www.instagram.com/mono.software/">@mono.software</a></span></div>
            <div class="flex"><BsTwitterX /><span><a href="https://x.com/monosoftware?s=20">@mono.software</a></span></div>
          </div>
          <div className="modal--footer">
            <button className="m-btn btn--primary" onClick={handlePlayAgain}>
              Play Again
            </button>
            <button className="m-btn btn--outline" onClick={closeModal}>
              Close to take screenshot
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default GameOverModal;
