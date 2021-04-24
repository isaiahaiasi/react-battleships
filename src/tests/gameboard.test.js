import board from "../logic/gameboard";
import ship from "../logic/ship";
import vec2, { direction as dir } from "../vec2";

describe("gameboard properties", () => {
  test("size - should be accurate", () => {
    const testBoard = board(3);
    expect(testBoard.size).toBe(3);
  });

  test("ships - should be accurate", () => {
    const ships = [ship(3, vec2(0, 6), dir.up), ship(4, vec2(3, 4), dir.right)];
    const gb = board(10).addShip(ships[0]).addShip(ships[1]);

    expect(gb.ships).not.toBeUndefined();
    expect(gb.ships).not.toEqual([ships[0]]);
    expect(gb.ships).toEqual(ships);
  });

  test("misses - should be accurate", () => {
    const ships = [ship(3, vec2(0, 6), dir.up), ship(4, vec2(3, 4), dir.right)];
    const gb = board(10).addShips(ships);

    // hits should not show up in misses
    const gbHit = gb.receiveHit(vec2(0, 6));
    expect(gbHit.misses.length).toBe(0);

    const gbMiss = gbHit.receiveHit(vec2(1, 6)).receiveHit(vec2(3, 5));
    expect(gbMiss.misses.length).toBe(2);
    expect(JSON.stringify(gbMiss.misses)).toEqual(
      JSON.stringify([vec2(1, 6), vec2(3, 5)])
    );
  });

  test("hits - should be accurate", () => {
    const ships = [ship(3, vec2(0, 6), dir.up), ship(4, vec2(3, 4), dir.right)];
    const gb = board(10).addShips(ships);

    const gbHit = gb.receiveHit(vec2(0, 6));
    expect(gbHit.hits.length).toBe(1);
  });
});

// TODO: rewrite to use #ships instead of #isHitPos()
describe("addShip()", () => {
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
});

describe("addShips()", () => {
  test("should add multiple ships from array", () => {
    const ships = [
      ship(5, vec2(0, 2), dir.down),
      ship(2, vec2(0, 0), dir.right),
      ship(4, vec2(8, 4), dir.left),
    ];

    const testBoard = board(10).addShips(ships);

    expect(testBoard.ships.length).toBe(3);
    expect(testBoard.ships[0]).toEqual(ships[0]);
  });

  test("should throw error when trying to add overlapping ships", () => {
    const ships = [
      ship(5, vec2(3, 0), dir.down),
      ship(5, vec2(0, 2), dir.right),
    ];

    expect(() => board(10).addShips(ships)).toThrowError();
  });
});

describe("receiveHit()", () => {
  test("should throw error when attempting to hit outside array bounds", () => {
    const testBoard = board(3);
    expect(() => {
      testBoard.receiveHit(vec2(4, 0));
    }).toThrowError();
  });
});

describe("isEveryShipSunk()", () => {
  test("should not give false positives", () => {
    const testBoard = board(3).addShip(ship(3, vec2(0, 0), dir.right));

    expect(testBoard.isEveryShipSunk()).toBe(false);
  });

  test("should return true when all ships are sunk", () => {
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
});

describe("isValidShipPos()", () => {
  test("should return false ship would be out of bounds", () => {
    const gb = board(10);
    expect(gb.isValidShipPos(ship(3, vec2(-2, 0), dir.up))).toBe(false);
  });
  test("should return false if ship would intersect another ship", () => {
    const gb = board(10).addShip(ship(6, vec2(3, 0), dir.down));
    expect(gb.isValidShipPos(ship(4, vec2(5, 3), dir.left))).toBe(false);
  });

  test("should return true if ship position is valid", () => {
    const gb = board(10).addShip(ship(6, vec2(3, 0), dir.down));
    expect(gb.isValidShipPos(ship(4, vec2(5, 3), dir.right))).toBe(true);
  });
});

describe("isValidMovePos()", () => {
  test("should return false if position is out of bounds", () => {
    const testBoard = board(5);
    expect(testBoard.isValidMovePos(vec2(-1, 0))).toBe(false);
    expect(testBoard.isValidMovePos(vec2(3, 8))).toBe(false);
  });

  test("should return false if position is previous miss", () => {
    const testBoard = board(5).receiveHit(vec2(3, 3));
    expect(testBoard.isValidMovePos(vec2(3, 3))).toBe(false);
  });

  test("should return false if position is previous hit", () => {
    const testBoard = board(5)
      .addShip(ship(3, vec2(0, 0), dir.right))
      .receiveHit(vec2(0, 0));

    expect(testBoard.isValidMovePos(vec2(0, 0))).toBe(false);
    expect(testBoard.isValidMovePos(vec2(0, 0))).toBe(false);
  });

  test("should return true if not out of bounds or a previous miss/hit", () => {
    const testBoard = board(5).addShip(ship(3, vec2(0, 0), dir.right));

    expect(testBoard.isValidMovePos(vec2(1, 0))).toBe(true);
    expect(testBoard.isValidMovePos(vec2(2, 3))).toBe(true);
  });
});
