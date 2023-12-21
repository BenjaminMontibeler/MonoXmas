import React, { useState, useRef, useEffect } from "react";
import { useInterval } from "./useInterval";
import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS
} from "./constants";
import "./css/style.css";
import GameOverModal from "./GameOverModal";
import ReactDOM from 'react-dom'
import Snowfall from 'react-snowfall'
import useAnimationFrame from './useAnimationFrame';
// import '@fortawesome/fontawesome-free/css/all.css';

const App = () => {
  const canvasRef = useRef();
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [currentDirection, setCurrentDirection] = useState(38);

  useInterval(() => gameLoop(), speed);

  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
  };

  const moveSnake = ({ keyCode }) => {
    if(!(keyCode >= 37 && keyCode <= 40)) {
      return;
    }
    if(currentDirection === 37 ) {
      if(keyCode === currentDirection+2) {
        return; 
      } 
    }
    if(currentDirection === 38 ) {
      if(keyCode === currentDirection+2) {
        return; 
      } 
    }
    if(currentDirection === 39) {
      if(keyCode === currentDirection-2) {
        return;
      } 
    }
    if(currentDirection === 40) {
      if(keyCode === currentDirection-2) {
        return;
      } 
    }
    setCurrentDirection(keyCode);
    keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]);
  }

  const createApple = () =>
    apple.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));

  const checkCollision = (piece, snk = snake) => {
    if (
      piece[0] * SCALE >= CANVAS_SIZE[0] ||
      piece[0] < 0 ||
      piece[1] * SCALE >= CANVAS_SIZE[1] ||
      piece[1] < 0
    )
      return true;

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
    }
    return false;
  };

  const checkAppleCollision = newSnake => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple();
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      setApple(newApple);
      return true;
    }
    return false;
  };

  const [rotationAngle, setRotationAngle] = useState(0);

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);

    const newRotationAngle =
    dir[0] === 1 ? 90 : dir[0] === -1 ? -90 : dir[1] === 1 ? 180 : 0;

    setRotationAngle(newRotationAngle);

    if (checkCollision(newSnakeHead)) endGame();
    if (checkAppleCollision(snakeCopy)) {
      setScore(prevScore => prevScore + 1);
      let newApple = createApple();
      while (checkCollision(newApple, snakeCopy)) {
        newApple = createApple();
      }
      setApple(newApple);
      setSpeed(prevSpeed => Math.max(150, prevSpeed - 2));
    } else {
      snakeCopy.pop();
    }
    setSnake(snakeCopy);
  };


  const startGame = () => {
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -1]);
    setSpeed(SPEED);
    setGameOver(false);
    setScore(0);
    canvasRef.current.focus();
  };
  
  useEffect(() => {
  const context = canvasRef.current.getContext("2d");
  context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
  context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]);

  // Draw snake body
  const bodyImg = new Image();
  bodyImg.src = "/icons/gift.svg";
  snake.slice(1).forEach(([x, y]) => context.drawImage(bodyImg, x, y, 1, 1));

  // Draw apple
  const [appleX, appleY] = apple;
  const appleImg = new Image();
  appleImg.src = "/icons/gift.svg";
  context.drawImage(appleImg, appleX, appleY, 1, 1);

  // Draw snake head with rotation
  const [headX, headY] = snake[0];
  const headImg = new Image();
  headImg.src = "/icons/sleigh.svg";
  context.save(); // Save the current transformation state
  context.translate(headX + 0.5, headY + 0.5); // Translate to the center of the head
  context.rotate((rotationAngle * Math.PI) / 180); // Apply rotation
  context.drawImage(headImg, -0.5, -0.5, 1, 1); // Draw the rotated head
  context.restore(); // Restore the original transformation state
}, [snake, apple, gameOver, rotationAngle]);

  return (
    <div className="container" role="button" tabIndex="0" onKeyDown={e => moveSnake(e)}>
      <h1 style={{ color: '#ffffff' }}>Merry Christmas</h1>
      <Snowfall snowflakeCount={100} className="canvas--snow" />
      <canvas
        className="game-canvas"
        ref={canvasRef}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
        tabIndex="0"
        style={{ outline: 'none' }}
      />
      <div className="c-btn">
        <button className="btn btn--up" onClick={() => moveSnake({ keyCode: 38 })}>
          <i className="arrow arrow-up"></i>
        </button>
        <button className="btn btn--right" onClick={() => moveSnake({ keyCode: 39 })}>
          <i className="arrow arrow-right"></i>
        </button>
        <button className="btn btn--down" onClick={() => moveSnake({ keyCode: 40 })}>
          <i className="arrow arrow-down"></i>
        </button>
        <button className="btn btn--left" onClick={() => moveSnake({ keyCode: 37 })}>
        <i className="arrow arrow-left"></i>
        </button>
      </div>
      <div className="actions--wrapper">
        <button className="m-btn btn--outline score">Score: {score}</button>
        {gameOver && <GameOverModal score={score} startGame={startGame} />}
        <button className="m-btn btn--primary" onClick={startGame}>Start Game</button>
      </div>
    </div>
  );
};

export default App;
