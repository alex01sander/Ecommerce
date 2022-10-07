import Header from '../../header/header.components'
import { LoginContainer, LoginContent, LoginHeadline, LoginInputContainer, LoginSubtitle } from './login.styles'

const LoginPage = () => {
  return (
    <>
        <Header/>

        <LoginContainer>
            <LoginContent>
                <LoginHeadline>Entre com a sua conta</LoginHeadline>

                {/* button */}

                <LoginSubtitle>ou entre com o seu e-mail</LoginSubtitle>

                <LoginInputContainer>{/*  Email input */} </LoginInputContainer>
                <LoginInputContainer>{/*  Password input */} </LoginInputContainer>

                {/* Button */}
            </LoginContent>

        </LoginContainer>
    </>
  )
}

export default LoginPage
