import { FunctionComponent, useContext } from 'react'
import Product from '../../types/product.types'
import CustomButton from '../custom-button/custom-button.component'
import { ProductContainer, ProductImage, ProductInfo } from './product-item.styles'
import { BsCartPlus } from 'react-icons/bs'
import { CartContext } from '../../contexts/cart.context'

interface ProductItemProps {
    product: Product
}

const ProductItem: FunctionComponent<ProductItemProps> = ({ product }) => {
  const { addProductToCart } = useContext(CartContext)

  const handleAddTooCartClick = () => {
    addProductToCart(product)
  }
  return (
    <ProductContainer>
        <ProductImage imageUrl={product.imageUrl}>
        <CustomButton onClick={handleAddTooCartClick} startIcon={<BsCartPlus size={20} />}>Adicionar ao Carrinho</CustomButton>
        </ProductImage>

        <ProductInfo>
            <p>{product.name}</p>
            <p>R${product.price}</p>
        </ProductInfo>
    </ProductContainer>
  )
}

export default ProductItem
