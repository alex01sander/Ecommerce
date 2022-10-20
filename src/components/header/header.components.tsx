import { useNavigate } from 'react-router-dom'

// icons
import { BsCart3 } from 'react-icons/bs'
import { HeaderContainer, HeaderItem, HeaderItems, HeaderTile } from './header.styles'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase.config'
import { useContext } from 'react'
import { UserContext } from '../../contexts/user.context'

// styles

const Header = () => {
  const navigate = useNavigate()
  const handleHomeClick = () => {
    navigate('/')
  }
  const handleExploreClick = () => {
    navigate('/explore')
  }

  const handleLoginClick = () => {
    navigate('/login')
  }
  const handleSignUoClick = () => {
    navigate('/sign-up')
  }

  const { isAuthenticated } = useContext(UserContext)

  return (
    <HeaderContainer>
        <HeaderTile onClick={handleHomeClick}>Sander Shop</HeaderTile>
        <HeaderItems>

                <HeaderItem onClick={handleExploreClick}>Explorar</HeaderItem>
                {!isAuthenticated && (
                    <>
                    <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
                    <HeaderItem onClick={handleSignUoClick}>Criar Conta</HeaderItem>
                    </>
                )}
                {isAuthenticated && (
                    <>
                    <HeaderItem onClick={() => signOut(auth)}>Sair</HeaderItem>
                    </>
                )}
                <HeaderItem><BsCart3 size={25}/>5</HeaderItem>

        </HeaderItems>
    </HeaderContainer>
  )
}

export default Header
