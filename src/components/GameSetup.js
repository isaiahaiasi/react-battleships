import { useState } from "react";
import ship from "../logic/ship";
import Gameboard from "./Gameboard";
import RenderShips from "./RenderShips";
import RenderShipPreview from "./RenderShipPreview";
import vec2, { direction } from "../vec2";

export default function GameSetup({ useBoard, onAllShipsPlaced }) {
  const shipLengths = [5, 4, 3, 3, 2];
  const [shipIndex, setShipIndex] = useState(0);
  const [currentShip, setCurrentShip] = useState(
    ship(shipLengths[shipIndex], vec2(-10, -10), direction.right)
  );

  const [board, setBoard] = useBoard;

  const setShipPos = (_ship, pos) => ship(_ship.length, pos, _ship.rotation);

  const setCurrentShipPos = (pos) => {
    setCurrentShip((prevShip) => setShipPos(prevShip, pos));
  };

  const placeShip = (pos) => {
    const mostCurrentShip = setShipPos(currentShip, pos);
    setBoard((prevBoard) => prevBoard.addShip(mostCurrentShip));

    if (shipIndex < shipLengths.length - 1) {
      // Set the next "preview" ship to:
      // next length in array, current pos, & rotation of previous ship
      setCurrentShip(
        ship(shipLengths[shipIndex + 1], pos, mostCurrentShip.rotation)
      );
      setShipIndex((prevIndex) => prevIndex + 1);
    } else {
      onAllShipsPlaced();
    }
  };

  return (
    <div>
      <h2>Place your ships!</h2>
      <Gameboard
        gameboard={board}
        onCellMouseEnter={setCurrentShipPos}
        onCellClick={placeShip}
      >
        <RenderShipPreview previewShip={currentShip} />
        <RenderShips ships={board.ships} />
      </Gameboard>
    </div>
  );
}
