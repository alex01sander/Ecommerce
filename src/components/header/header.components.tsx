import { useNavigate } from 'react-router-dom'

// icons
import { BsCart3 } from 'react-icons/bs'
import { HeaderContainer, HeaderItem, HeaderItems, HeaderTile } from './header.styles'

// styles

const Header = () => {
  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate('/login')
  }

  return (
    <HeaderContainer>
        <HeaderTile>Sander Shop</HeaderTile>
        <HeaderItems>

                <HeaderItem>Explorar</HeaderItem>
                <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
                <HeaderItem>Login</HeaderItem>
                <HeaderItem><BsCart3 size={25}/>5</HeaderItem>

        </HeaderItems>
    </HeaderContainer>
  )
}

export default Header
