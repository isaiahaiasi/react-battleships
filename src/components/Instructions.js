export default function Instructions({ onContinue }) {
  return (
    <div>
      <h2>How to play</h2>
      <p>Battleship is a strategic guessing game.</p>
      <p>
        Try to figure out where the enemy ships are hiding, and sink their fleet
        before they can sink yours!
      </p>
      <button onClick={onContinue}>Continue</button>
    </div>
  );
}
