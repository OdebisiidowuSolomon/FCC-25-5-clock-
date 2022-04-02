import { useEffect, useState } from 'react';
import './App.css';
import Currency from './currency';
import { allGiftCards } from './data';
import Home from './Home';

function App() {

  const [pathname] = useState(window.location.pathname)
  const [curr, setCurr] = useState(null)

  useEffect(() => {
    if(pathname) {
      const path = pathname.split('/')[1].split('-').join(' ')
      let card = allGiftCards.filter(card => card.title ===path)
      if(card) {
        console.log(card)
        setCurr(card)
      }
    }
  }, [pathname])


  const renderComponent = () => {
    if(curr?.length > 0){
      return <Currency curr= {curr}/>
    } else {
      return <Home curr = {curr}/>
    }
  }

  return (
    <div className="App">
      {renderComponent()}
    </div>
  );
}

export default App;
