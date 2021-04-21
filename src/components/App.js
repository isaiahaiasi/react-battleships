import React, { useState } from "react";
import gameboard from "../logic/gameboard";
import MainGame from "./MainGame";
import * as ai from "../logic/playerAi";

export default function App() {
  const useBoardPlayer = useState(() =>
    gameboard(10).addShips(ai.getShips(gameboard(10)))
  );

  const useBoardNpc = useState(() =>
    gameboard(10).addShips(ai.getShips(gameboard(10)))
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
