export default function ship(
  length,
  origin,
  rotation,
  hits = Array(length).fill(false)
) {
  const getHits = () => [...hits];

  const getBoardSpaceCoords = () => {
    const boardSpaceCoords = [];
    for (let i = 0; i < length; i++) {
      boardSpaceCoords.push(rotation.multiply(i).add(origin));
    }
    return boardSpaceCoords;
  };

  const hit = (hitPos) => {
    if (hitPos > length - 1 || hitPos < 0) {
      throw new Error(`Tried to hit a ship at illegal position ${hitPos}`);
    }
    const newHits = getHits();
    newHits[hitPos] = true;
    return ship(length, origin, rotation, newHits);
  };

  const isSunk = () => !hits.includes(false);

  return {
    length,
    hit,
    getHits,
    isSunk,
    getBoardSpaceCoords,
  };
}
