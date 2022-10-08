import React, { FunctionComponent, ButtonHTMLAttributes } from 'react'

import { CustomButtonContainer, IconContainer } from './custom-button.styles'

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    startIcon?:React.ReactNode
    children?: React.ReactNode
  }

const CustomButton:FunctionComponent<CustomButtonProps> = ({ children, startIcon, ...res }) => {
  return (

    <CustomButtonContainer {...res}>
        {startIcon && <IconContainer>{startIcon}</IconContainer> }
        {children}</CustomButtonContainer>

  )
}

export default CustomButton
