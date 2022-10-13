import React from 'react'
// Icons
import { FiLogIn } from 'react-icons/fi'

// utilitis
import { useForm } from 'react-hook-form'
import validator from 'validator'

// Components
import CustomButton from '../../custom-button/custom-button.component'
import CustomInput from '../../custom-input/custom-input.component'
import Header from '../../header/header.components'

// STYLES
import { SignUpContainer, SignUpContent, SignUpHeadline, SignUpInputContainer } from './sing-up.styles'
import InputErrorMessage from '../../input-error-message/input-error-message'

interface SignUpForm {
    name: string
    lastName: string
    email:string
    password: string
    passwordConfirmation: string
}

const SignUpPage = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpForm>()

  const handleSubmitPress = (data: SignUpForm) => {
    console.log({ data })
  }

  const watchPassword = watch('password')

  console.log({ errors })

  return (
    <>
        <Header/>

        <SignUpContainer>
                <SignUpContent>
                    <SignUpHeadline>Crie sua Conta </SignUpHeadline>

                        <SignUpInputContainer>
                            <p>Nome</p>
                            <CustomInput hasError={!!errors?.name}
                            placeholder='Digite seu nome' {...register('name',
                              { required: true })}/>

                        {errors?.name?.type === 'required' && (
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
                        </SignUpInputContainer>

                        <SignUpInputContainer>
                            <p>Senha</p>
                            <CustomInput hasError={!!errors?.password}
                            placeholder='Digite sua senha' type="password" {...register('password', {
                              required: true
                            })}/>

                        {errors?.password?.type === 'required' && (
                        <InputErrorMessage>A Senha é obrigatória.</InputErrorMessage>
                        )}
                        </SignUpInputContainer>

                        <SignUpInputContainer>
                            <p>Confimação de Senha</p>
                            <CustomInput hasError={!!errors?.passwordConfirmation}
                            placeholder='Confirme sua senha' type="password" {...register('passwordConfirmation', {
                              required: true,
                              validate: (value) => {
                                return value === watchPassword
                              }
                            })}/>
                            {errors?.passwordConfirmation?.type === 'required' && (
                        <InputErrorMessage>Confirme sua Senha é obrigatório.</InputErrorMessage>
                            )}

                            {errors?.passwordConfirmation?.type === 'validate' && (
                        <InputErrorMessage>As senhas tem que ser iguais.</InputErrorMessage>
                            )}
                        </SignUpInputContainer>

                        <CustomButton startIcon={<FiLogIn size={18}/>} onClick={() => handleSubmit(handleSubmitPress)()}>Entrar</CustomButton>

                </SignUpContent>
        </SignUpContainer>
    </>
  )
}

export default SignUpPage
