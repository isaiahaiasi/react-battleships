import board from "../logic/gameboard";
import ship from "../logic/ship";
import vec2, { direction as dir } from "../vec2";

test("gameboard size should be accurate", () => {
  const testBoard = board(3);
  expect(testBoard.size).toBe(3);
});

test("should be able to receive hit", () => {
  const testBoard = board(3);
  const testBoardHit = testBoard.receiveHit(vec2(0, 0));
  expect(testBoardHit).not.toBe(testBoard);
  expect(testBoardHit.misses.length).toBe(1);
});

test("should throw error when attempting to hit outside array bounds", () => {
  const testBoard = board(3);
  expect(() => {
    testBoard.receiveHit(vec2(4, 0));
  }).toThrowError();
});

test("isEveryShipSunk() should not give false positives", () => {
  const testBoard = board(3).addShip(ship(3, vec2(0, 0), dir.right));

  expect(testBoard.isEveryShipSunk()).toBe(false);
});

test("isEveryShipSunk() should return true when all ships are sunk", () => {
  const testBoard = board(3)
    .addShip(ship(3, vec2(0, 0), dir.right))
    .receiveHit(vec2(0, 0))
    .receiveHit(vec2(1, 0))
    .receiveHit(vec2(2, 0))
    .addShip(ship(2, vec2(0, 1), dir.down))
    .receiveHit(vec2(0, 1))
    .receiveHit(vec2(0, 2));

  expect(testBoard.isEveryShipSunk()).toBe(true);
});

test("should throw error when placing a ship on top of another ship", () => {
  expect(() =>
    board(5)
      .addShip(ship(4, vec2(4, 4), dir.down))
      .addShip(ship(5, vec2(4, 4), dir.right))
  ).toThrowError();
});

// this one is always ~10x slower than the others, and I have no idea why
test("should throw error when adding ship outside array bounds", () => {
  let testBoard = board(5);
  expect(() => {
    testBoard.addShip(ship(3, vec2(4, 3), dir.down));
  }).toThrowError();
});

test("isValidMove should return false if position is out of bounds", () => {
  const testBoard = board(5);
  expect(testBoard.isValidMove(vec2(-1, 0))).toBe(false);
  expect(testBoard.isValidMove(vec2(3, 8))).toBe(false);
});

test("isValidMove should return false if position is previous miss", () => {
  const testBoard = board(5).receiveHit(vec2(3, 3));
  expect(testBoard.isValidMove(vec2(3, 3))).toBe(false);
});

test("isValidMove should return false if position is previous hit", () => {
  const testBoard = board(5)
    .addShip(ship(3, vec2(0, 0), dir.right))
    .receiveHit(vec2(0, 0));

  expect(testBoard.isValidMove(vec2(0, 0))).toBe(false);
  expect(testBoard.isValidMove(vec2(0, 0))).toBe(false);
});

test("isValidMove should return true if not out of bounds or a previous miss/hit", () => {
  const testBoard = board(5).addShip(ship(3, vec2(0, 0), dir.right));

  expect(testBoard.isValidMove(vec2(1, 0))).toBe(true);
  expect(testBoard.isValidMove(vec2(2, 3))).toBe(true);
});
