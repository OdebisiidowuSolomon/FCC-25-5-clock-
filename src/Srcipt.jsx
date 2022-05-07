   import React from 'react';
import './App.css';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerOn: false,
      break: false,
      timer: 1500, //in seconds, default is 1500
      breakTime: 5, //in minutes, default is 5
      sessionTime: 25, //in minutes, default is 25
    };
    this.reset = this.reset.bind(this);
    this.startStopTimer = this.startStopTimer.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  };

  reset() {
    this.setState({
      timerOn: false,
      break: false,
      timer: 1500,
      breakTime: 5,
      sessionTime: 25,
    });
    clearInterval(this.timer);
    let beep = document.getElementById('beep');
    beep.pause();
    beep.currentTime = 0;
  };

  startStopTimer() {
    if (this.state.timerOn === true) {
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

  increment(e, timerType) {
    /* Adds one minute to a timer.  Can reach but not go above 60.
    */
    //if timer is running then no time can be added
    if (this.state.timerOn === true) {
      return;
    }

    switch (timerType) {
      case 'session':
        if (this.state.sessionTime < 60) {
          let newSession = this.state.sessionTime + 1;
          this.setState({
            sessionTime: newSession,
            timer: newSession * 60
          });
        };
        break;
      case 'break':
        if (this.state.breakTime < 60) {
          this.setState({ breakTime: this.state.breakTime + 1 });
        };
        break;
    };
  };

  decrement(e, timerType){
    //Removes one minute from a timer.  Timer cannot equal zero.
    if (this.state.timerOn === true) {
      return;
    }
    switch (timerType) {
      case 'session':
        if (this.state.sessionTime > 1) {
          let newSession = this.state.sessionTime - 1;
          this.setState({
            sessionTime: newSession,
            timer: newSession * 60
          });
        };
        break;
      case 'break':
        if (this.state.breakTime > 1) {
          this.setState({ breakTime: this.state.breakTime - 1});
        };
        break;
    };
  };

  render() {
    return(
      <div class="container text-center">
        < TimerDisplay timerOn ={this.state.timerOn} timer={this.state.timer} startStop={this.startStopTimer} reset={this.reset} break={this.state.break} />
        < TimerSetting breakTime={this.state.breakTime} sessionTime={this.state.sessionTime} increment={this.increment} decrement={this.decrement} />
      </div>
    );
  };

};

const TimerDisplay = (props) => {

  let currMin = Math.floor(props.timer / 60);
  let currSec = Math.floor(props.timer % 60);
  if (currMin < 10) {
    currMin = '0'.concat(currMin.toString());
  } else {
    currMin = currMin.toString();
  };
  if (currSec < 10) {
    currSec = '0'.concat(currSec.toString());
  } else {
    currSec = currSec.toString();
  };

  let currTime = currMin.concat(':').concat(currSec);

  let beep = document.getElementById('beep');
  if (props.timer === 0) {
    beep.play();
  }


  return(
    <div class="wrapper">
      <div class="row justify-content-center" id="timer-label">
        {props.break ? "BREAK" : "SESSION"}
      </div>
      <div class="row justify-content-center num" id="time-left">
        {currTime}
      </div>
      <div class="row justify-content-center">
        <button class="btn btn-light" id="start_stop" onClick={props.startStop}>{props.timerOn? 'Pause' : 'Play'}<i class="fa fa-play" aria-hidden="true" /><i class="fa fa-pause" aria-hidden="true" /></button>
        <button class="btn btn-light ml-1" id="reset" onClick={props.reset}>reset<i class="fa fa-refresh" aria-hidden="true" /></button>
      </div>
      <audio id="beep" src="http://www.trekcore.com/audio/computer/hailalert_1.mp3" />
    </div>
  );
};

const TimerSetting = (props) => {
  return(
    <div class="wrapper">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div id="session-label">
            SESSION LENGTH
          </div>
          <div id="session-length" class="timer-set">
            <button class="btn btn-light" id="session-increment" onClick={(e) => {props.increment(e, "session")}}><i class="fa fa-plus" aria-hidden="true" /></button>
            <span class="num">{props.sessionTime}</span>
            <button class="btn btn-light" id="session-decrement" onClick={(e) => {props.decrement(e, "session")}}><i class="fa fa-minus" aria-hidden="true" /></button>
          </div>
        </div>
        <div class="col-md-6">
          <div id="break-label">
            BREAK LENGTH
          </div>
          <div id="break-length" class="timer-set">
            <button class="btn btn-light" id="break-increment" onClick={(e) => {props.increment(e, "break")}}><i class="fa fa-plus" aria-hidden="true"  /></button>
            <span class="num">{props.breakTime}</span>
            <button class="btn btn-light" id="break-decrement" onClick={(e) => {props.decrement(e, "break")}}><i class="fa fa-minus" aria-hidden="true" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};


/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

export default App;