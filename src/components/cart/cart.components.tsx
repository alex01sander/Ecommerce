import { FunctionComponent, useContext } from 'react'
import { BsCartCheck } from 'react-icons/bs'
import { CartContext } from '../../contexts/cart.context'
import CartItem from '../cart-item/cart-item.component'
import CustomButton from '../custom-button/custom-button.component'
import { CartContainer, CartContent, CartEscapeArea, CartTitle, CartTotal } from './cart.styles'

const Cart: FunctionComponent = () => {
  const { isVisible, products, toggleCart } = useContext(CartContext)
  return (
   <CartContainer isVisible={isVisible}>
            <CartEscapeArea onClick={toggleCart}/>
        <CartContent>
            <CartTitle>Seu Carrinho</CartTitle>
            {/* Products */}
            {products.map(product => <CartItem key={product.id} product={product}/>)}
            <CartTotal>Total: </CartTotal>
            <CustomButton startIcon={<BsCartCheck/>}>Ir para o Checkout</CustomButton>
        </CartContent>
   </CartContainer>
  )
}

export default Cart