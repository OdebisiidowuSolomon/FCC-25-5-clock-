import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { allGiftCards } from './data';


function Currency(props) {

    const [curr, setCurr] = useState([])
    const [pathname] = useState(window.location.pathname)

    useEffect(() => {
        // console.log(path);
        if(pathname) {
          const path = window.location.hash.split('#')[1].split('/')[1].split('-').join(' ')
          let card = allGiftCards.filter(card => card.title ===path)
          if(card) {
            console.log(card)
            setCurr(card)
          }
        }
      }, [pathname])

  return (
    <div className='currency'>
        <Sidebar cur={curr}/>
        <div className="card">
            <h2>Currency Exchange</h2>
            <p>Exchange your currencies seamlessly</p>
            <h1 className='h1'>{curr[0]?.title}</h1>
            <button>Exchange</button>
        </div>
        <div className="currencies">
            <div className="top">
                <h2>Search</h2>
                <p>Lagos, 01/04/2022</p>
            </div>
            <div className="details">
                <h2>Available Currencies That Can Be Exchange</h2>

                <div className="currencies__option">
                    <span className='span'>Currencies</span>
                    <span className='span1'>Details</span>
                </div>

                <div className="currs">
                    {curr[0]?.currencies?.map(card =>
                    <span className="curr" key={card}>{card}</span>
                        )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Currency