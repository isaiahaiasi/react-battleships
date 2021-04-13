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

  const hit = (num) => {
    if (num > length - 1 || num < 0) {
      throw new Error(`Tried to hit a ship at illegal position ${num}`);
    }
    const newHits = getHits();
    newHits[num] = true;
    return ship(length, newHits);
  };

  const isSunk = () => !hits.includes(false);

  return { length, hit, getHits, isSunk };
}
