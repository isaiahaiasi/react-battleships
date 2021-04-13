import { vec2 } from "../direction";

export default function gameboard(length, boardArray = []) {
  const getBoardIndex = (pos) => pos.y * length + pos.x;

  const addShip = (ship, origin, orientation) => {
    const newBoardArray = [...boardArray];
    for (let i = 0; i < ship.length; i++) {
      const pos = vec2(
        origin.x + orientation.x * i,
        origin.y + orientation.y * i
      );

      if (pos.x < 0 || pos.x > length - 1 || pos.y < 0 || pos.y > length - 1) {
        throw new Error(
          `Tried to add ship at illegal board position(${pos.x}, ${pos.y})`
        );
      }
      const index = getBoardIndex(pos);
      newBoardArray[index] = ship;
    }
    return gameboard(length, newBoardArray);
  };

  const getCoords = (pos) => boardArray[getBoardIndex(pos)];

  return { addShip, getCoords, boardArray };
}
