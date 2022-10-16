import { useNavigate } from 'react-router-dom'

// icons
import { BsCart3 } from 'react-icons/bs'
import { HeaderContainer, HeaderItem, HeaderItems, HeaderTile } from './header.styles'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase.config'

// styles

const Header = () => {
  const navigate = useNavigate()
  const handleHomeClick = () => {
    navigate('/')
  }

  const handleLoginClick = () => {
    navigate('/login')
  }
  const handleSignUoClick = () => {
    navigate('/sign-up')
  }

  return (
    <HeaderContainer>
        <HeaderTile onClick={handleHomeClick}>Sander Shop</HeaderTile>
        <HeaderItems>

                <HeaderItem>Explorar</HeaderItem>
                <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
                <HeaderItem onClick={handleSignUoClick}>Criar Conta</HeaderItem>
                <HeaderItem onClick={() => signOut(auth)}>Sair</HeaderItem>
                <HeaderItem><BsCart3 size={25}/>5</HeaderItem>

        </HeaderItems>
    </HeaderContainer>
  )
}

export default Header
