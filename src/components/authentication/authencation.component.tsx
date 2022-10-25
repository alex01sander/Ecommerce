import { FunctionComponent, ReactNode, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/user.context'
import Header from '../header/header.components'
import LoadingComponent from '../loading/loading.components'

interface children{
    children: ReactNode
}

const Authentication:FunctionComponent<children> = ({ children }) => {
  const { isAuthenticated } = useContext(UserContext)

  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => {
        navigate('/login')
      }, 5000)
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <LoadingComponent message='Você precisa estar logando para está página.
        Você será redirecionado para a página de login em instantes...  '/>
      </>
    )
  }
  return (
    <>{children}</>
  )
}

export default Authentication
