// GameOverModal.js
import React,  { useState } from "react";
import "./css/style.css";
import { BsTwitterX } from "react-icons/bs";


const GameStartModal = ({ startGame }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleButton = () => {
    setIsOpen(false);
    startGame(); // Start the game when the modal is closed
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
            <div className="modal-inner">
                <h2>Sleigh Gift Snake Game</h2>
                <ol className="modal-ol">
                    <li>
                        The object of the game is to collect as many gifts as possible without hitting the edge of the screen
                        or the already collected gifts.
                    </li>

                    <li>
                        To play, use your arrow keys on your keyboard. Use arrow buttons if on mobile.
                    </li>

                    <li>
                        Share your score with the rest of the world and tag Mono at social networks.
                    </li>

                    <li>
                        The best sent score will get our bag of goodies.
                    </li>

                    <li>
                        Have a holly jolly fun from Mono!
                    </li>
                </ol>
                <span className="futnote">* Santa is shipping only to Croatia!</span>
                <hr />


                  <div class="socials-wrapper">
              <div class="flex"><i class="social-icon facebook"></i><span><a href="https://www.facebook.com/mono.software">@mono.software</a></span></div>
              <div class="flex"><i class="social-icon instagram"></i><span><a href="https://www.instagram.com/mono.software/">@mono.software</a></span></div>
              <div class="flex"><BsTwitterX /><span><a href="https://x.com/monosoftware?s=20">@mono.software</a></span></div>
                  </div>


                <button className="m-btn btn--primary btn--full" onClick={handleButton}>
                    Play!
                </button>
            </div>
        </div>
      </div>
    )
  );
};

export default GameStartModal;
