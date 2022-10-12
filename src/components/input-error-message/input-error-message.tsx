import { FunctionComponent } from 'react'
import { InputErrorMessageContainer } from './input-error-message.styles'

interface children {
    children?: any
}

const InputErrorMessage: FunctionComponent<children> = ({ children }) => {
  return (
    <InputErrorMessageContainer>{children}</InputErrorMessageContainer>
  )
}

export default InputErrorMessage
