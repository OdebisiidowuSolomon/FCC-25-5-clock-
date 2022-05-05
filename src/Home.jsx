import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./styles.css";
import { allGiftCards } from "./data";
import { Link } from "react-router-dom";

function Home({cur}) {
  const [action, setAction] = useState(null);
  const [curr, setCurr] = useState(null);

  const colors = [
    "#485563",
    " #2a5298",
    "#ffafbd",
    "#50A7C2",
    "#fad0c4",
    "#fcb69f",
    "#fecfef",
    "#c2e9fb",
    "#e2ebf0",
    "#764ba2",
  ];

  const handleSelect = (action) => {
    console.log(action);
    setAction(action);
  };

  const handleCurrSelect = (action) => {
    console.log(action);
    setCurr(action);
  };

  const handleRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length - 1)];
  }

  const handlePageChange = (data) => {
    window.location.pathname = `/${data.split(' ').join('-')}`
  }

  return (
    <div className="home">
      <div style={{flex: '0.25 1'}}>
      <Sidebar cur={cur}/>
      </div>
      <div className="home__main">
        <p className="home__cta">
          Find and compare the best cryptocurrency exchange
        </p>
        <div className="home__exchange">
          <div className="home__exchange__action">
            <div style={{display:'inline', flex: .4}}>
            Want to :{" "}
            <button
              className={`home_action ${action === "buy" ? "active" : ""}`}
              onClick={() => handleSelect("buy")}
              >
              Buy
            </button>
            |{" "}
            <button
              className={`home__action ${action === "sell" ? "active" : ""}`}
              onClick={() => handleSelect("sell")}
              >
              Sell
            </button>
              </div>
            <div className="home__available__currs" style={{display:'inline', flex: .8}}>
              {allGiftCards[3].currencies.map((data) => (
                <button
                key={data}
                  className={`home__available__curr ${
                    curr === data ? "active" : ""
                  }`}
                  onClick={() => handleCurrSelect(data)}
                  style={{ textTransform: "uppercase" }}
                >
                  {data}
                </button>
              ))}
            </div>
          </div>
          <button className="btn home__search">SEARCH</button>
        </div>
        <div className="home__cards">
          {allGiftCards.filter(data => {
            if(!curr) {
              return data
            }
            return data.currencies.includes(curr
              )}).map((card) => (
            <div
            key={card.id}
              className="home__card"
              style={{ backgroundColor: handleRandomColor() }}
            >
              <div className="backdrop"></div>
              <Link to={`/${card.title.split(' ').join('-')}`}>
              <h3>{card.title}</h3>
              <p>View Currencies {`>>`} </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;


// https://OdebisiidowuSolomon.github.io/Kodecamp-react-task-1/