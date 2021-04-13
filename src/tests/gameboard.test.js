import board from "../logic/gameboard";
import ship from "../logic/ship";
import dir, { vec2 } from "../direction";

test("added ships should be visible at their coordinates (facing down)", () => {
  // test a ship pointing down
  const testShip = ship(3);
  let testBoard = board(4);
  testBoard = testBoard.addShip(testShip, vec2(0, 0), dir.down);

  const expectedPositions = [vec2(0, 0), vec2(0, 1), vec2(0, 2)];
  const unexpectedPositions = [
    vec2(1, 0), // right of where it should be
    vec2(0, 3), // past where it should be
  ];

  expectedPositions.forEach((pos) => {
    expect(testBoard.getCoords(pos)).toEqual(testShip);
  });

  unexpectedPositions.forEach((pos) => {
    expect(testBoard.getCoords(pos)).toBeUndefined();
  });
});

test("added ships should be visible at their coordinates (facing right)", () => {
  // test a ship pointing down
  const testShip = ship(4);
  let testBoard = board(5);
  testBoard = testBoard.addShip(testShip, vec2(1, 1), dir.right);

  const expectedPositions = [vec2(1, 1), vec2(2, 1), vec2(3, 1), vec2(4, 1)];
  const unexpectedPositions = [vec2(0, 1), vec2(1, 0)];

  expectedPositions.forEach((pos) => {
    expect(testBoard.getCoords(pos)).toEqual(testShip);
  });

  unexpectedPositions.forEach((pos) => {
    expect(testBoard.getCoords(pos)).toBeUndefined();
  });
});

test("added ships should be visible at their coordinates (facing up)", () => {
  // test a ship pointing down
  const testShip = ship(3);
  let testBoard = board(5);
  testBoard = testBoard.addShip(testShip, vec2(4, 3), dir.up);

  const expectedPositions = [vec2(4, 3), vec2(4, 2), vec2(4, 1)];
  const unexpectedPositions = [vec2(0, 3), vec2(4, 0)];

  expectedPositions.forEach((pos) => {
    expect(testBoard.getCoords(pos)).toEqual(testShip);
  });

  unexpectedPositions.forEach((pos) => {
    expect(testBoard.getCoords(pos)).toBeUndefined();
  });
});

test("added ships should be visible at their coordinates (facing left)", () => {
  // test a ship pointing down
  const testShip = ship(3);
  let testBoard = board(5);
  testBoard = testBoard.addShip(testShip, vec2(4, 3), dir.left);

  const expectedPositions = [vec2(4, 3), vec2(3, 3), vec2(2, 3)];
  const unexpectedPositions = [vec2(0, 3), vec2(4, 0)];

  expectedPositions.forEach((pos) => {
    expect(testBoard.getCoords(pos)).toEqual(testShip);
  });

  unexpectedPositions.forEach((pos) => {
    expect(testBoard.getCoords(pos)).toBeUndefined();
  });
});

xtest("should not be able to place a ship beyond bounds of array", () => {});

xtest("should not be able to place board at illegal position.", () => {});

xtest("should be able to receive hit", () => {});

xtest("should report if all ships have been sunk", () => {});
