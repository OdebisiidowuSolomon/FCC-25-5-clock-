import React from 'react'
import Sidebar from './Sidebar'

function Currency({curr}) {
    if(!curr) {
        window.location.pathname = '/'
    }
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
                    <span className="curr">{card}</span>
                        )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Currency