import gameboard from "../logic/gameboard";
import { getValidPos } from "../logic/playerAi";

test("getValidPos() should return a valid position from a board", () => {
  // I'm pretty sure I should use a mock for this, but... oh well
  const board = gameboard(10);
  const pos = getValidPos(board);
  expect(board.isValidMove(pos)).toBe(true);
});
