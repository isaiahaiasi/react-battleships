// I need to double-freeze, or else you could still assign dir.up[0]
const vec2 = (x, y) => {
  const equals = (v) => v.x === x && v.y === y;

  const isVec2 = (v) => v.x != null && v.y != null;

  const add = (v) => (isVec2(v) ? vec2(x + v.x, y + v.y) : vec2(x + v, y + v));

  const multiply = (v) =>
    isVec2(v) ? vec2(x * v.x, y * v.y) : vec2(x * v, y * v);

  return Object.freeze({
    x,
    y,
    equals,
    add,
    multiply,
  });
};

export const direction = Object.freeze({
  up: vec2(0, -1),
  right: vec2(1, 0),
  down: vec2(0, 1),
  left: vec2(-1, 0),
});

export default vec2;
