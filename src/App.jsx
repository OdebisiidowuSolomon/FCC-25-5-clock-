import { useState, useEffect, useRef } from "react";
import "./App.css";
import { data } from "./data";
import DrumPad from "./DrumPad";



function App() {
  const [pad, setPad] = useState(null)
  const [keyPress, setKeyPress] = useState(null)
  
  const handleClick = (e) => {
    setPad(e)
  };

  window.addEventListener("keyup", (e) => {
    setKeyPress(e.keyCode);
  });


  return (
    <div id="drum-machine">
      <div className="drumpads">
        {data.map((pad) => (
          <DrumPad key={pad.id} keyPress={keyPress} pad={pad}  handleClick={handleClick} />
        ))}
      </div>
      <div id="display">{pad?.id}</div>
    </div>
  );
}

export default App;
