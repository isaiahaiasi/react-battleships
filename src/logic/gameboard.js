import { vec2 } from "../direction";

export default function gameboard(length, boardArray = []) {
  const getBoardIndex = (pos) => pos.y * length + pos.x;

  const addShip = (ship, origin, orientation) => {
    const newBoardArray = [...boardArray];
    for (let i = 0; i < ship.length; i++) {
      const index = getBoardIndex(
        vec2(origin.x + orientation.x * i, origin.y + orientation.y * i)
      );
      newBoardArray[index] = ship;
    }
    return gameboard(length, newBoardArray);
  };

  const getCoords = (pos) => boardArray[getBoardIndex(pos)];

  return { addShip, getCoords, boardArray };
}
