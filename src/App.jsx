import { useState, useEffect, useRef } from "react";
import Button from "./Button";
import "./App.css";

function App() {
  const [inputArr, setInputArr] = useState([]);
  const [output, setOutput] = useState(0);

  let outputRef = useRef();

  useEffect(() => {
    if(output) {
      outputRef.current.innerText = output
    }
  }, [output])

  const handleChange = (e) => {
    setOutput(e)
    if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 0].includes(Number(e))) {
      if (Number(e) === 0 && inputArr[0] === "0" && inputArr.length === 1)
        return;
      setInputArr((prev) => [...prev, e]);
    } else if (e === "C") {
      setInputArr((prev) => []);
    } else if (["/", "+", "-", "*", "%"].includes(e)) {
      if (inputArr.length === 0 && (e === '/' || e === '*'|| e === '+' || e === '%')) return;
      if (inputArr[inputArr.length -1] === e ) return;
      if ((["/", "+", "-", "*",'%'].includes(inputArr[inputArr.length -1]) && ["/", "+", "-", "*", '%'].includes(inputArr[inputArr.length -2])) 
        && (e !== inputArr[inputArr.length -1] && (e !== inputArr[inputArr.length -2]))) {
          let tempArr = [...inputArr]
          tempArr.splice(inputArr.length - 1, 1, e)
          setInputArr(() => tempArr)
        };
      if (["/", "+", "-", "*",'%'].includes(inputArr[inputArr.length -1]) && ["/", "+", "-", "*",'%'].includes(inputArr[inputArr.length -2])) return;

        setInputArr((prev) => [...prev, e]);
      }
     else if (e === "Del") {
      setInputArr((prev) =>
        [...prev]
          .join("")
          .substring(0, prev.length - 1)
          .split("")
      );
    } else if (e === "=") {
        let inputArr2 = [...inputArr]
        for(let char of inputArr2) {
          let charIndex = inputArr2.indexOf(char)
          if(["/", "+", "-", "*",'%'].includes(inputArr2[charIndex-1]) 
          && ["/", "+", "-", "*",'%'].includes(char)) {
            if(char === '-') {
              break
            } else if(["/", "+","*",'%']) {
              inputArr2.splice(charIndex -1, 1)
            }
          }
        
      }

      // Making sure the last element does not trail by .
      if(inputArr2[inputArr2.length -1] === '.') {
        inputArr2 = inputArr2.concat('0')
      }

      let arrString = eval(inputArr2.join(""))
      setOutput(arrString)
      setInputArr((prev) => [arrString]);
    } else if (e === ".") {
      let mul = inputArr.lastIndexOf("*");
      let add = inputArr.lastIndexOf("+");
      let sub = inputArr.lastIndexOf("-");
      let div = inputArr.lastIndexOf("/");
      let maxOperator = Math.max(mul, add, sub, div);
      if (inputArr.length === 0) {
        setInputArr((prev) => [...prev, 0, e]);
      } else if (inputArr.slice(maxOperator + 1).includes(".")) {
        return;
      } else if (inputArr[inputArr.length - 1] !== ".") {
        setInputArr((prev) => [...prev, e]);
      }
    }
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="screen">
          {/* <div id="display" ref={display}>2000</div> */}
          <input id="display" disabled value={inputArr.join('')||0}/>
          <div id="output" ref={outputRef}></div>
        </div>
        <div className="keypads">
          <div className="row">
            <Button id="clear" name="C" onChange={handleChange} />
            <Button id="delete" name="Del" onChange={handleChange} />
            <Button id="modulus" name="%" onChange={handleChange} />
            <Button id="divide" name="/" onChange={handleChange} />
          </div>
          <div className="row">
            <Button id="seven" name="7" onChange={handleChange} />
            <Button id="eight" name="8" onChange={handleChange} />
            <Button id="nine" name="9" onChange={handleChange} />
            <Button id="multiply" name="*" onChange={handleChange} />
          </div>
          <div className="row">
            <Button id="four" name="4" onChange={handleChange} />
            <Button id="five" name="5" onChange={handleChange} />
            <Button id="six" name="6" onChange={handleChange} />
            <Button id="add" name="+" onChange={handleChange} />
          </div>
          <div className="row">
            <Button id="one" name="1" onChange={handleChange} />
            <Button id="two" name="2" onChange={handleChange} />
            <Button id="three" name="3" onChange={handleChange} />
            <Button id="subtract" name="-" onChange={handleChange} />
          </div>
          <div className="row">
            <Button id="zero" name="0" onChange={handleChange} />
            <Button id="decimal" name="." onChange={handleChange} />
            <Button id="equals" name="=" onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
