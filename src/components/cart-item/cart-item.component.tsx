import { FunctionComponent } from 'react'
import CartProduct from '../../types/cart.types'
import { AiOutlinePlus, AiOutlineClose, AiOutlineMinus } from 'react-icons/ai'
import { CartItemContainer, CartItemImage, CartItemInfo, CartItemQuantity, RemoveButton } from './cart-item.styles'

interface CartItemProps{
    product: CartProduct
}

const CartItem: FunctionComponent<CartItemProps> = ({ product }) => {
  return (
    <CartItemContainer>
        <CartItemImage imageUrl={product.imageUrl}/>
        <CartItemInfo>
            <p>{product.name}</p>
            <p>R${product.price}</p>

            <CartItemQuantity>
                <AiOutlineMinus size={20}/>
                <p>{product.quanty}</p>
                <AiOutlinePlus size={20}/>
            </CartItemQuantity>
        </CartItemInfo>
        <RemoveButton>
            <AiOutlineClose size={25}/>
        </RemoveButton>
    </CartItemContainer>
  )
}

export default CartItem
