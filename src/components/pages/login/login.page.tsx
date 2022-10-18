// COMPONENTS
import CustomButton from '../../custom-button/custom-button.component'
import Header from '../../header/header.components'

// STYLES
import { LoginContainer, LoginContent, LoginHeadline, LoginInputContainer, LoginSubtitle } from './login.styles'

// ICONS
import { useForm } from 'react-hook-form'
import { BsGoogle } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'

// utilitis
import CustomInput from '../../custom-input/custom-input.component'
import InputErrorMessage from '../../input-error-message/input-error-message'
import validator from 'validator'

// Firebase/Firestone
import { AuthError, AuthErrorCodes, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, db, googleProvider } from '../../../config/firebase.config'
import { addDoc, collection, getDocs, query, where } from '@firebase/firestore'

interface LoginForm {
    email: string
    password: string
}

const LoginPage = () => {
  const { register, setError, formState: { errors }, handleSubmit } = useForm<LoginForm>()

  const handleSubmitPress = async (data: LoginForm) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)

      console.log(userCredential)
    } catch (error) {
      const _error = error as AuthError

      if (_error.code === AuthErrorCodes.INVALID_PASSWORD) {
        return setError('password', { type: 'invalida' })
      }

      if (_error.code === AuthErrorCodes.USER_DELETED) {
        return setError('email', { type: 'emailInvalido' })
      }
    }
  }

  const handleSignInWithGooglePress = async () => {
    try {
      const userCredentials = await signInWithPopup(auth, googleProvider)

      const querySnapshot = await getDocs(query(collection(db, 'users'), where('id', '==', userCredentials.user.uid)))

      const user = querySnapshot.docs[0]?.data()

      if (!user) {
        const firstName = userCredentials.user.displayName?.split(' ')[0]
        const lastName = userCredentials.user.displayName?.split(' ')[1]
        await addDoc(collection(db, 'users'), {
          id: userCredentials.user.uid,
          email: userCredentials.user.email,
          firstName,
          lastName,
          provider: 'google'
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
        <Header/>

        <LoginContainer>
            <LoginContent>
                <LoginHeadline>Entre com a sua conta</LoginHeadline>

                <CustomButton startIcon={<BsGoogle size={18}/>} onClick={handleSignInWithGooglePress}>Entrar com o Google</CustomButton>

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
                     {errors?.email?.type === 'emailInvalido' && (
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
                     {errors?.password?.type === 'invalida' && (
                        <InputErrorMessage>Senha inválida</InputErrorMessage>
                     )}
                </LoginInputContainer>

                <CustomButton startIcon={<FiLogIn size={18}/>} onClick={() => handleSubmit(handleSubmitPress)()}>Entrar</CustomButton>
            </LoginContent>

        </LoginContainer>
    </>
  )
}

export default LoginPage
