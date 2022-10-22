import { createContext, FunctionComponent, ReactNode, useState } from 'react'
import CartProduct from '../types/cart.types'
import Product from '../types/product.types'

interface Children{
    children?: ReactNode
}

interface ICartContext{
    isVisible: boolean
    products: CartProduct[]
    toggleCart: () => void
    addProductToCart: (product: Product) => void
}

export const CartContext = createContext<ICartContext>({
  isVisible: false,
  products: [],
  toggleCart: () => {},
  addProductToCart: () => {}
})

const CartContextProvider: FunctionComponent<Children> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [products, setProducts] = useState<CartProduct[]>([])

  const toggleCart = () => {
    setIsVisible(prevState => !prevState)
  }

  const addProductToCart = (product: Product) => {
    setProducts((prevState) => [...prevState, { ...product, quanty: 1 }])
  }
  return (
    <CartContext.Provider value={{ isVisible, products, toggleCart, addProductToCart }}>
        {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
