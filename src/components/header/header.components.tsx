import React from 'react'
// components
import './header.styles.css'

// icons
import { BsCart3 } from 'react-icons/bs'
const Header = () => {
  return (
    <div className="header-container">
        <h2 className="header-title">Sander Shop</h2>
        <div className="header-items-container">
            <div className="header-items">
                <div className="header-item">Explorar</div>
                <div className="header-item">Login</div>
                <div className="header-item">Login</div>
                <div className="header-item"><BsCart3 size={25}/></div>
            </div>
        </div>
    </div>
  )
}

export default Header
