import React, {useState} from 'react'
import { Link } from 'react-router-dom'
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
          <div className="sidebar__title" style={{cursor:'pointer'}}>
          <Link to={'/'}>
          Xchange
          </Link>
          </div>
          <div className="close" onClick={() => handleToggle()}>Toogle Menu</div>
        </div>
        <div className="sidebar__container">
        <div className="sidebar__img">
        <img src={image} alt="" />
        <p className='sidebar__username'>Joseph</p>
        </div>
        <div className="sidebar__links">
          <div className={`sidebar__link ${handleActive() === 'Dashboard' && 'sidebar__active'}`} style={{cursor:'pointer'}}>
            <Link to='/'>
            Dashboard
            </Link>
            </div>
          <div className={`sidebar__link ${handleActive() === 'Exchange' && 'sidebar__active'}`} style={{cursor:'pointer'}}>
            <Link to='/Steam'>
            Exchange
            </Link>
            </div>
          <div className="sidebar__link">
            <Link to={'#'}>
            Bank rates
            </Link>
            </div>
          <div className="sidebar__link">
            <Link to={'#'}>
            Currency info
            </Link>
            </div>
        </div>
        </div>
    </div>
  )
}
