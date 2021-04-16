// my "turn manager"
const getCurrentPlayer = (players, turn) => players[turn % players.length];

const takeTurn = (boardState, pos, updater) =>
  updater(() => boardState.receiveHit(pos));

export { getCurrentPlayer, takeTurn };
