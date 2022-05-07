import { useState, useEffect, useRef, Component } from "react";
import "./App.css";
var t;

// change variable names accordingly

class App extends Component {
  state = {
    timerOn: false,
    break: false,
    timer: 1500,
    breakTime:5,
    sessionTime: 25
  }

  audio = document.getElementsByTagName('audio')[0]

   handleBreakDec = () => {
    if (this.state.breakTime <= 1 || this.state.breakTime > 60) return;
    this.setState({breakTime : this.state.breakTime - 1});
  };
   handleBreakInc = () => {
    if (this.state.breakLength < 1 || this.state.breakLength >= 60) return;
    this.setState({breakTime : this.state.breakTime + 1});
  };
   handleSessionDec = () => {
    if (this.state.sessionTime <= 1 || this.state.sessionTime > 60) return;
    this.setState({sessionTime: this.state.sessionTime - 1})
  };
   handleSessionInc = () => {
    if (this.state.sessionTime < 1 || this.state.sessionTime >= 60) return;
    this.setState({sessionTime: this.state.sessionTime + 1})
  };


  startStopTimer = () => {
    if (this.state.timerOn === true) {
      console.log(this.state);
      this.setState({ timerOn: false});
      clearInterval(this.timer);
    } else if (this.state.timerOn === false) {
      this.setState({ timerOn: true });
      if (this.state.timer > 0) {
        this.timer = setInterval(() => {
          let currTimer = this.state.timer;
          let breakStatus = this.state.break;
          if (currTimer > 0) {
            currTimer -= 1;
          } else if (currTimer === 0 && breakStatus === false) {
            currTimer = this.state.breakTime * 60;
            breakStatus = true;
          } else if (currTimer === 0 && breakStatus === true) {
            currTimer = this.state.sessionTime * 60;
            breakStatus = false;
          }
          this.setState({
            timer: currTimer,
            break: breakStatus
          });
        }, 1000);
      };
    };
  };


  reset = () => {
    this.setState({
      timerOn: false,
      break: false,
      timer: 1500,
      breakTime: 5,
      sessionTime: 25,
    });
    clearInterval(this.timer);
    let beep = document.getElementsByTagName('audio')[0];
    beep.pause();
    beep.currentTime = 0;
  };

  
  
  render() {
    let minute = Math.floor(this.state.timer / 60);
    let second = this.state.timer % 60;

  return (
    <>
      <div className="container">
        <p>25 + 5 Clock</p>
        <div className="controls">
          <div id="break">
            <div id="break-label">Break Length</div>
            <span id="break-decrement" onClick={this.handleBreakDec}>
              -
            </span>
            <span id="break-length">{this.state.breakTime}</span>
            <span id="break-increment" onClick={this.handleBreakInc}>
              +
            </span>
          </div>
          <div id="session">
            <div id="session-label">Session Length</div>
            <span id="session-decrement" onClick={this.handleSessionDec}>
              -
            </span>
            <span id="session-length">{this.state.sessionTime}</span>
            <span id="session-increment" onClick={this.handleSessionInc}>
              +
            </span>
          </div>
        </div>
        <div className="timer">
          <div className="inner">
            <div id="timer-label">{this.state.break === true ? "Break" : "Session"}</div>
            <div id="timer-left">
              {minute?.toString().length === 1
                ? `0${minute}`
                : minute || this.state.sessionTime}
              :{second?.toString().length === 1 ? `0${second}` : second || 0}
            </div>
          </div>
          <div className="outer">
            <div id="start_stop" onClick={this.startStopTimer}>
              Start
            </div>
            <div id="reset" onClick={this.reset}>
              reset
            </div>
          </div>
        </div>
      </div>
      {/* <audio ref={audio} style={{ display: "none" }} src="https://goo.gl/65cBl1"></audio> */}
      {/* <audio ref={audio} style={{ display: "none" }} src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"></audio> */}
      <audio ref={this.audio} style={{ display: "none" }} src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </>
  );
}
}

export default App;
