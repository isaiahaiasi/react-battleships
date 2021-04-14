import { useState } from "react";
import gameboard from "../logic/gameboard";
import Gameboard from "./Gameboard";
// Not sure I'm okay with this approach
function App() {
  const [testBoard, updateTestBoard] = useState(gameboard(5));

  const handleMove = (num) => {
    console.log(`handling move (${num.x}, ${num.y})`);
    updateTestBoard((prev) => prev.receiveHit(num));
  };

  return (
    <div className="App">
      <Gameboard handleMove={handleMove} gameboard={testBoard} />
    </div>
  );
}

export default App;
