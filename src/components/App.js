import React, { useState } from "react";
import ship from "../logic/ship";
import vec2, { direction } from "../vec2";
import gameboard from "../logic/gameboard";
import MainGame from "./MainGame";

export default function App() {
  const startingBoard = gameboard(10)
    .addShip(ship(3, vec2(0, 0), direction.down))
    .addShip(ship(4, vec2(1, 2), direction.right))
    .addShip(ship(3, vec2(9, 9), direction.up));

  const [gameScene, setGameScene] = useState({ mode: "main" });

  const onGameOver = (winner) => {
    setGameScene({ mode: "game-over", winner });
  };

  const renderMainGame = () => (
    <MainGame startingBoard={startingBoard} onGameOver={onGameOver} />
  );

  const renderGameOver = () => (
    <h1>Congratulations, {gameScene.winner}! You won!</h1>
  );

  return gameScene.mode === "main" ? renderMainGame() : renderGameOver();
}
