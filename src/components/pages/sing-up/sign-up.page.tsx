// Icons
import { FiLogIn } from 'react-icons/fi'

// utilitis
import { useForm } from 'react-hook-form'
import validator from 'validator'
import InputErrorMessage from '../../input-error-message/input-error-message'
import { useContext, useEffect } from 'react'

// Components
import CustomButton from '../../custom-button/custom-button.component'
import CustomInput from '../../custom-input/custom-input.component'
import Header from '../../header/header.components'

// STYLES
import { SignUpContainer, SignUpContent, SignUpHeadline, SignUpInputContainer } from './sing-up.styles'

// Firasebase/Firestore
import { auth, db } from '../../../config/firebase.config'
import { AuthError, AuthErrorCodes, createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from '@firebase/firestore'
import { UserContext } from '../../../contexts/user.context'
import { useNavigate } from 'react-router-dom'

interface SignUpForm {
    firstName: string
    lastName: string
    email:string
    password: string
    passwordConfirmation: string
}

const SignUpPage = () => {
  const { register, handleSubmit, watch, setError, formState: { errors } } = useForm<SignUpForm>()

  const handleSubmitPress = async (data: SignUpForm) => {
    try {
      const userCrendentials = await createUserWithEmailAndPassword(auth, data.email, data.password)

      await addDoc(collection(db, 'users'), {
        id: userCrendentials.user.uid,
        firstName: data.firstName,
        lastName: data.lastName,
        email: userCrendentials.user.email,
        provider: 'firebase'
      })
    } catch (error) {
      const _error = error as AuthError

      if (_error.code === AuthErrorCodes.EMAIL_EXISTS) {
        return setError('email', { type: 'alreadyInUse' })
      }
    }
  }

  const watchPassword = watch('password')

  const { isAuthenticated } = useContext(UserContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  return (
    <>
        <Header/>

        <SignUpContainer>
                <SignUpContent>
                    <SignUpHeadline>Crie sua Conta </SignUpHeadline>

                        <SignUpInputContainer>
                            <p>Nome</p>
                            <CustomInput hasError={!!errors?.firstName}
                            placeholder='Digite seu nome' {...register('firstName',
                              { required: true })}/>

                        {errors?.firstName?.type === 'required' && (
                        <InputErrorMessage>O nome é obrigatório.</InputErrorMessage>
                        )}

                        </SignUpInputContainer>

                        <SignUpInputContainer>
                            <p>Sobrenome</p>
                            <CustomInput hasError={!!errors?.lastName}
                             placeholder='Digite seu sobrenome'
                             {...register('lastName', { required: true })}/>

                            {errors?.lastName?.type === 'required' && (
                            <InputErrorMessage>O Sobrenome é obrigatório.</InputErrorMessage>
                            )}
                        </SignUpInputContainer>

                        <SignUpInputContainer>
                            <p>E-mail</p>
                            <CustomInput hasError={!!errors?.email}
                            placeholder='Digite seu e-mail' {...register('email', {
                              required: true,
                              validate: (value) => {
                                return validator.isEmail(value)
                              }
                            })}/>

                            {errors?.email?.type === 'required' && (
                            <InputErrorMessage>O E-mail é obrigatório.</InputErrorMessage>
                            )}

                            {errors?.email?.type === 'alreadyInUse' && (
                            <InputErrorMessage>Esse e-mail já está sendo usado...</InputErrorMessage>
                            )}
                        </SignUpInputContainer>

                        <SignUpInputContainer>
                            <p>Senha</p>
                            <CustomInput hasError={!!errors?.password}
                            placeholder='Digite sua senha' type="password" {...register('password', {
                              required: true, minLength: 6
                            })}/>

                        {errors?.password?.type === 'required' && (
                        <InputErrorMessage>A Senha é obrigatória.</InputErrorMessage>
                        )}
                        {errors?.password?.type === 'minLength' && (
                        <InputErrorMessage>A Senha tem que ter no minimo 6 caracteres.</InputErrorMessage>
                        )}
                        </SignUpInputContainer>

                        <SignUpInputContainer>
                            <p>Confimação de Senha</p>
                            <CustomInput hasError={!!errors?.passwordConfirmation}
                            placeholder='Confirme sua senha' type="password" {...register('passwordConfirmation', {
                              required: true,
                              minLength: 6,
                              validate: (value) => {
                                return value === watchPassword
                              }
                            })}/>
                            {errors?.passwordConfirmation?.type === 'required' && (
                        <InputErrorMessage>Confirme sua Senha é obrigatório.</InputErrorMessage>
                            )}

                            {errors?.passwordConfirmation?.type === 'validate' && (
                        <InputErrorMessage>As senhas não conferem.</InputErrorMessage>
                            )}
                            {errors?.password?.type === 'minLength' && (
                        <InputErrorMessage>A Senha tem que ter no minimo 6 caracteres.</InputErrorMessage>
                            )}
                        </SignUpInputContainer>

                        <CustomButton startIcon={<FiLogIn size={18}/>} onClick={() => handleSubmit(handleSubmitPress)()}>Entrar</CustomButton>

                </SignUpContent>
        </SignUpContainer>
    </>
  )
}

export default SignUpPage
