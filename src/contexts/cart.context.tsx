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
    removeProductFromCart: (productId: string) => void
    increaseProductQuantity: (productId:string) => void
}

export const CartContext = createContext<ICartContext>({
  isVisible: false,
  products: [],
  toggleCart: () => {},
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  increaseProductQuantity: () => {}
})

const CartContextProvider: FunctionComponent<Children> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [products, setProducts] = useState<CartProduct[]>([])

  const toggleCart = () => {
    setIsVisible(prevState => !prevState)
  }

  const addProductToCart = (product: Product) => {
    const productIsAlreadyInCart = products.some((item) => item.id === product.id
    )

    if (productIsAlreadyInCart) {
      return setProducts((products) => products.map((item) => item.id === product.id
        ? { ...item, quanty: item.quanty + 1 }
        : item)
      )
    }

    setProducts((prevState) => [...prevState, { ...product, quanty: 1 }])
  }

  const removeProductFromCart = (productId: string) => {
    setProducts(products => products.filter(product => product.id !== productId))
  }

  const increaseProductQuantity = (productId: string) => {
    setProducts(products => products.map(product => product.id === productId
      ? { ...product, quanty: product.quanty + 1 }
      : product))
  }
  return (
    <CartContext.Provider value={{ isVisible, products, toggleCart, addProductToCart, removeProductFromCart, increaseProductQuantity }}>
        {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider