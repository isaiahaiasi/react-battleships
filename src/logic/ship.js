export default function ship(length) {
  // declare and populate hits array
  const hits = [];
  for (let i = 0; i < length; i++) {
    hits[i] = false;
  }

  const getHits = () => [...hits];

  const hit = (i) => {
    if (i > length - 1 || i < 0) {
      throw new Error(`Tried to hit a ship at illegal position ${i}`);
    }
    hits[i] = true;
  };

  const isSunk = () => !hits.includes(false);

  return { length, hit, getHits, isSunk };
}
