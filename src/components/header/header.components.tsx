import React from 'react'
// components
// import './header.styles.css'

// icons
import { BsCart3 } from 'react-icons/bs'
import { HeaderContainer, HeaderItem, HeaderItems, HeaderTile } from './header.styles'

// styles

const Header = () => {
  return (
    <HeaderContainer>
        <HeaderTile>Sander Shop</HeaderTile>
        <HeaderItems>

                <HeaderItem>Explorar</HeaderItem>
                <HeaderItem>Login</HeaderItem>
                <HeaderItem>Login</HeaderItem>
                <HeaderItem><BsCart3 size={25}/>5</HeaderItem>

        </HeaderItems>
    </HeaderContainer>
  )
}

export default Header
