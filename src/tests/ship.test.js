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
