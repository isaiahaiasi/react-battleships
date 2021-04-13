import { vec2 } from "../direction";

// I want to make the full constructor private
export default function gameboardCaller(length) {
  return gameboard(length);
}

function gameboard(length, boardArray = [], ships = [], misses = []) {
  const getBoardIndex = (pos) => pos.y * length + pos.x;

  const posOutOfBounds = (pos) =>
    pos.x < 0 || pos.x > length - 1 || pos.y < 0 || pos.y > length - 1;

  // I'm pretty sure this is a "reducible" functional pattern
  const getCoords = (pos) => boardArray[getBoardIndex(pos)];

  const addShip = (ship, origin, orientation) => {
    const newBoardArray = [...boardArray];
    for (let i = 0; i < ship.length; i++) {
      const pos = vec2(
        origin.x + orientation.x * i,
        origin.y + orientation.y * i
      );

      if (posOutOfBounds(pos)) {
        throw new Error(
          `Tried to add ship at illegal board position(${pos.x}, ${pos.y})`
        );
      }
      const index = getBoardIndex(pos);

      // Don't like this, but this seems like the simplest way to hold this info
      newBoardArray[index] = { ship, i };
    }
    return gameboard(length, newBoardArray, [...ships, ship], misses);
  };

  const receiveHit = (pos) => {
    if (posOutOfBounds(pos)) {
      throw new Error(
        `Tried to receive hit at illegal board position (${pos.x}, ${pos.y})`
      );
    }

    const posInfo = boardArray[getBoardIndex(pos)];

    if (posInfo) {
      const newShip = posInfo.ship.hit(posInfo.i);
      // get new ships array
      const newShips = ships.filter((ship) => ship !== posInfo.ship);
      console.log(newShips);
      newShips.push(newShip);
      // return new board
      return gameboard(length, boardArray, newShips, misses);
    } else {
      const newMisses = [...misses, pos];
      return gameboard(length, boardArray, ships, newMisses);
    }
  };

  const isEveryShipSunk = () => ships.every((ship) => ship.isSunk());

  return { addShip, getCoords, receiveHit, misses, isEveryShipSunk };
}
