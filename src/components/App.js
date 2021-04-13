import { useState } from "react";
import TestShip from "./testship";
import ship from "../logic/ship";

// Not sure I'm okay with this approach
function App() {
  const [testShip, setTestShip] = useState(ship(3));

  const handleHit = (num) => {
    setTestShip((prev) => prev.hit(num));
  };

  return (
    <div className="App">
      <TestShip handleHit={handleHit} ship={testShip} />
    </div>
  );
}

export default App;
