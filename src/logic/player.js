// my "turn manager"
const getCurrentPlayer = (players, turn) => players[turn % players.length];

const takeTurn = (boardState, pos, updater) =>
  updater(() => boardState.receiveHit(pos));

// might need to think about turnhandler first...
// need something to keep a list of 2 players
// tell the first to take its turn,
// wait for it to complete,
// then tell the second to take its turn

export { getCurrentPlayer, takeTurn };
