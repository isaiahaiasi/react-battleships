import React, { useState } from "react";
import ship from "../logic/ship";
import vec2, { direction as dir } from "../vec2";
import gameboard from "../logic/gameboard";
import MainGame from "./MainGame";

export default function App() {
  const useBoardPlayer = useState(() =>
    gameboard(10)
      .addShip(ship(3, vec2(0, 0), dir.right))
      .addShip(ship(4, vec2(1, 2), dir.right))
      .addShip(ship(3, vec2(9, 9), dir.up))
      .addShip(ship(5, vec2(8, 3), dir.left))
      .addShip(ship(2, vec2(6, 5), dir.down))
  );

  const useBoardNpc = useState(() =>
    gameboard(10)
      .addShip(ship(3, vec2(0, 0), dir.down))
      .addShip(ship(4, vec2(1, 2), dir.right))
      .addShip(ship(3, vec2(9, 9), dir.up))
  );

  const [gameScene, setGameScene] = useState({ mode: "main" });

  const onGameOver = (winner) => {
    setGameScene({ mode: "game-over", winner });
  };

  const renderMainGame = () => (
    <MainGame
      useBoardPlayer={useBoardPlayer}
      useBoardNpc={useBoardNpc}
      onGameOver={onGameOver}
    />
  );

  const renderGameOver = () => (
    <h1>Congratulations, {gameScene.winner}! You won!</h1>
  );

  return gameScene.mode === "main" ? renderMainGame() : renderGameOver();
}
