import React, { useState } from "react";

export default function TestShip({ hits, handleHit }) {
  const [count, setCount] = useState(0);

  const onHit = () => {
    handleHit(count);
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <ol>
        {hits.map((h, i) => (
          <li key={i}>{h.toString()}</li>
        ))}
      </ol>
      <button onClick={onHit}>Hit</button>
    </div>
  );
}
