import React, {useState} from 'react'
import image from './avatar.jpg'

export default function Sidebar({cur}) {
  const [toggle, setToogle] = useState(false)
  const handleToggle = () => {
    setToogle(prev => !prev)
  }

  const handleActive = () => {
    if(!cur) {
      return 'Dashboard'
    }
    return 'Exchange'
  }

  return (
    <div className={`sidebar ${toggle}`}>
        <div className="sidebar__name">
          <div className="sidebar__title" onClick={() => window.location.pathname='/'} style={{cursor:'pointer'}}>
          Xchange
          </div>
          <div className="close" onClick={() => handleToggle()}>Toogle Menu</div>
        </div>
        <div className="sidebar__container">
        <div className="sidebar__img">
        <img src={image} alt="" />
        <p className='sidebar__username'>Joseph</p>
        </div>
        <div className="sidebar__links">
          <div className={`sidebar__link ${handleActive() === 'Dashboard' && 'sidebar__active'}`} onClick={() => window.location.pathname='/'} style={{cursor:'pointer'}}>Dashboard</div>
          <div className={`sidebar__link ${handleActive() === 'Exchange' && 'sidebar__active'}`} onClick={() => window.location.pathname='/Steam'} style={{cursor:'pointer'}}>Exchange</div>
          <div className="sidebar__link">Bank rates</div>
          <div className="sidebar__link">Currency info</div>
        </div>
        </div>
    </div>
  )
}
