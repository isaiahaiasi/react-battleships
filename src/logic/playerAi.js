import vec2, { indexedDirection as iDir } from "../vec2";
import ship from "./ship";

// get a random legal position
const getValidPos = (board) => {
  let pos;
  do {
    pos = vec2(
      Math.floor(Math.random() * board.size),
      Math.floor(Math.random() * board.size)
    );
  } while (!board.isValidMovePos(pos));

  return pos;
};

const getSmartPos = (board) => {
  // not sure how smart to make this...
  // should know if a hit sunk a ship,
  // but should have to infer the bounds of the ship based on sinking hit &
  // surrounding positions
};

const getValidShip = (board, shipLength) => {
  if (board.size < shipLength) {
    throw new Error(
      `Cannot get valid ship of length ${shipLength} from board of length ${board.size}`
    );
  }

  let possibleShip;
  let i = 0;
  const MAX_ITERATIONS = 999;
  // TODO: shouldn't reattempt failed positions
  do {
    possibleShip = ship(
      shipLength,
      getValidPos(board),
      iDir[Math.floor(Math.random() * iDir.length)]
    );
    i++;
  } while (!board.isValidShipPos(possibleShip) && i < MAX_ITERATIONS);

  if (i >= MAX_ITERATIONS) {
    console.log(
      "Could not find valid position to place ship! There are likely not enough free positions on the board"
    );
    return;
  }

  return possibleShip;
};

export { getValidPos, getSmartPos, getValidShip };
