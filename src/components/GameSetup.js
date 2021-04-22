import { useState } from "react";
import ship from "../logic/ship";
import Gameboard from "./Gameboard";
import RenderShips from "./RenderShips";
import RenderShipPreview from "./RenderShipPreview";

export default function GameSetup({ useBoardPlayer, onAllShipsPlaced }) {
  const [board, setBoard] = useBoardPlayer;
  const [currentShip, setCurrentShip] = useState();
  const [shipIndex, setShipIndex] = useState(0);

  const shipLengths = [5, 4, 3, 3, 2];

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
    }
  };

  return (
    <div>
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
