// COMPONENTS
import CustomButton from '../../custom-button/custom-button.component'
import Header from '../../header/header.components'

// STYLES
import { LoginContainer, LoginContent, LoginHeadline, LoginInputContainer, LoginSubtitle } from './login.styles'

// ICONS
import { useForm } from 'react-hook-form'
import { BsGoogle } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'
import CustomInput from '../../custom-input/custom-input.component'
import InputErrorMessage from '../../input-error-message/input-error-message'
import validator from 'validator'

interface LoginForm {
    email: string
    password: string
}

const LoginPage = () => {
  const { register, formState: { errors }, handleSubmit } = useForm<LoginForm>()

  const handleSubmitPress = (data: any) => {
    console.log({ data })
  }

  console.log(errors)

  return (
    <>
        <Header/>

        <LoginContainer>
            <LoginContent>
                <LoginHeadline>Entre com a sua conta</LoginHeadline>

                <CustomButton startIcon={<BsGoogle size={18}/>}>Entrar com o Google</CustomButton>

                <LoginSubtitle>ou entre com o seu e-mail</LoginSubtitle>

                <LoginInputContainer>
                    <p>E-mail</p>
                    <CustomInput hasError={!!errors?.email}
                    placeholder='Digite o seu e-mail' {...register('email', {
                      required: true,
                      validate: (value) => {
                        return validator.isEmail(value)
                      }
                    })}/>
                    {errors?.email?.type === 'required' && (
                        <InputErrorMessage>O e-mail é obrigatório</InputErrorMessage>
                    )}
                    {errors?.email?.type === 'validate' && (
                        <InputErrorMessage>E-mail inválido</InputErrorMessage>
                    )}
                </LoginInputContainer>
                <LoginInputContainer>
                    <p>Senha</p>
                    <CustomInput type="password" hasError={!!errors?.password}
                    placeholder='Digite sua senha ' {...register('password', { required: true })}/>
                     {errors?.password?.type === 'required' && (
                        <InputErrorMessage>A senha é obrigatória</InputErrorMessage>
                     )}
                </LoginInputContainer>

                <CustomButton startIcon={<FiLogIn size={18}/>} onClick={() => handleSubmit(handleSubmitPress)()}>Entrar</CustomButton>
            </LoginContent>

        </LoginContainer>
    </>
  )
}

export default LoginPage
