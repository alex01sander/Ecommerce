import CustomButton from '../../custom-button/custom-button.component'
import Header from '../../header/header.components'
import { LoginContainer, LoginContent, LoginHeadline, LoginInputContainer, LoginSubtitle } from './login.styles'
import { BsGoogle } from 'react-icons/bs'
const LoginPage = () => {
  return (
    <>
        <Header/>

        <LoginContainer>
            <LoginContent>
                <LoginHeadline>Entre com a sua conta</LoginHeadline>

                <CustomButton startIcon={<BsGoogle size={18}/>}>Entrar com o Google</CustomButton>

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
