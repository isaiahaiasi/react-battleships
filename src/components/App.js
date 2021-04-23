import React, { useState } from "react";
import gameboard from "../logic/gameboard";
import MainGame from "./MainGame";
import * as ai from "../logic/playerAi";
import GameSetup from "./GameSetup";

const GAME_MODES = {
  rules: "rules",
  setup: "setup",
  main: "main",
  gameOver: "game over",
};

export default function App() {
  const useBoardPlayer = useState(() => gameboard(10));

  const useBoardNpc = useState(() =>
    gameboard(10).addShips(ai.getShips(gameboard(10)))
  );

  const [gameScene, setGameScene] = useState({ mode: GAME_MODES.setup });

  const initializeGame = () => {
    const [, setPlayerBoard] = useBoardPlayer;
    const [, setNpcBoard] = useBoardNpc;

    setPlayerBoard(gameboard(10));
    setNpcBoard(gameboard(10).addShips(ai.getShips(gameboard(10))));
    setGameScene({ mode: GAME_MODES.setup });
  };

  const onGameOver = (winner) => {
    setGameScene({ mode: GAME_MODES.gameOver, winner });
  };

  const renderSetup = () => (
    <GameSetup
      useBoard={useBoardPlayer}
      onAllShipsPlaced={() => setGameScene({ mode: GAME_MODES.main })}
    />
  );

  const renderMainGame = () => (
    <MainGame
      useBoardPlayer={useBoardPlayer}
      useBoardNpc={useBoardNpc}
      onGameOver={onGameOver}
    />
  );

  const renderGameOver = () => (
    <>
      <h2>Congratulations, {gameScene.winner}! You won!</h2>
      <button onClick={() => initializeGame()}>Play again?</button>
    </>
  );

  const selectRenderMode = (mode) => {
    switch (mode) {
      case GAME_MODES.main:
        return renderMainGame();
      case GAME_MODES.setup:
        return renderSetup();
      case GAME_MODES.gameOver:
        return renderGameOver();
      default:
        throw new Error(`Unhandled game mode: ${mode}!`);
    }
  };

  return (
    <div
      className="App"
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>REACT-BATTLESHIP</h1>
      {selectRenderMode(gameScene.mode)}
    </div>
  );
}
