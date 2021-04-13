import { useState } from "react";
import TestShip from "./testship";
import ship from "../logic/ship";

// This sucks. I hate this.
const test = ship(5);
function App() {
  const [hits, setHits] = useState(test.getHits());

  const handleHit = (num) => {
    test.hit(num);
    console.log(test.getHits());
    setHits(test.getHits());
  };

  return (
    <div className="App">
      <TestShip handleHit={handleHit} hits={hits} />
    </div>
  );
}

export default App;
