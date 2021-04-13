const getEmptyArray = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr[i] = false;
  }
  return arr;
};

// going to try to make this in a "functional" way
// (or at least--make it not have any mutable state)
// for React compatibility...
export default function ship(length, hits = getEmptyArray(length)) {
  const getHits = () => [...hits];

  const hit = (hitPos) => {
    if (hitPos > length - 1 || hitPos < 0) {
      throw new Error(`Tried to hit a ship at illegal position ${hitPos}`);
    }
    const newHits = getHits();
    newHits[hitPos] = true;
    return ship(length, newHits);
  };

  const isSunk = () => !hits.includes(false);

  return {
    length,
    hit,
    getHits,
    isSunk,
  };
}
