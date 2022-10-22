import { createContext, FunctionComponent, ReactNode, useState } from 'react'
import CartProduct from '../types/cart.types'

interface Children{
    children?: ReactNode
}

interface ICartContext{
    isVisible: boolean
    products: CartProduct[]
    toggleCart: () => void
}

const CartContext = createContext<ICartContext>({
  isVisible: false,
  products: [],
  toggleCart: () => {}
})

const CartContextProvider: FunctionComponent<Children> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [products] = useState<CartProduct[]>([])

  const toggleCart = () => {
    setIsVisible(prevState => !prevState)
  }
  return (
    <CartContext.Provider value={{ isVisible, products, toggleCart }}>
        {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
