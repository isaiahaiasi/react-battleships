import vec2 from "../vec2";

// get a random legal position
const getValidPos = (board) => {
  let pos;
  do {
    pos = vec2(
      Math.floor(Math.random() * board.size),
      Math.floor(Math.random() * board.size)
    );
  } while (!board.isValidMove(pos));

  return pos;
};

const getSmartPos = (board) => {
  // not sure how smart to make this...
  // should know if a hit sunk a ship,
  // but should have to infer the bounds of the ship based on sinking hit &
  // surrounding positions
};

const getValidShip = (board) => {
  // should return a valid ship to add to the board
  //
};

export { getValidPos, getSmartPos, getValidShip };
