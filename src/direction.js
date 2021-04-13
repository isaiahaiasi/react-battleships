// I need to double-freeze, or else you could still assign dir.up[0]
const vec2 = (x, y) => Object.freeze({ x, y });

const dir = Object.freeze({
  up: vec2(0, -1),
  right: vec2(1, 0),
  down: vec2(0, 1),
  left: vec2(-1, 0),
});

export default dir;
export { vec2 };
