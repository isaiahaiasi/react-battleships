import ship from "../logic/ship";

test("Should have length", () => {
  expect(ship(3).length).toBe(3);
});

test("Should know whether or not it's been sunk", () => {
  const testShip = ship(3);
  expect(testShip.isSunk()).toBe(false);
  testShip.hit(0);
  expect(testShip.isSunk()).toBe(false);
  testShip.hit(1);
  expect(testShip.isSunk()).toBe(false);
  testShip.hit(2);
  expect(testShip.isSunk()).toBe(true);
});

test("getHits() should return expected value", () => {
  const testShip = ship(3);
  expect(testShip.getHits()).toEqual([false, false, false]);
  testShip.hit(0);
  expect(testShip.getHits()).toEqual([true, false, false]);
  testShip.hit(2);
  expect(testShip.getHits()).toEqual([true, false, true]);
});
