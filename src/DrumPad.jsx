import { useEffect, useRef } from "react";
import { data } from "./data";

export default function DrumPad({
  pad: { keyCode, keyTrigger, id, url },
  keyPress,
  handleClick,
}) {
  const audio = useRef("audio");
  const onClick = ({ id, keyCode }) => {
    let a = audio.current;
    a.play();
    handleClick({ id, keyCode });
  };

    useEffect(() => {
        if(keyPress === keyCode) {
            console.log(keyPress,id,keyCode,'>>')
            console.log(audio.current)
            onClick({id,keyCode})
        }
    },[keyPress,id,keyCode])


  return (
    <div className="drum-pad" id={id} onClick={() => onClick({ id, keyCode })}>
      {keyTrigger}
      <audio ref={audio} src={url} className="clip" id={keyTrigger}></audio>
    </div>
  );
}
