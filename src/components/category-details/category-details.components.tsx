import { collection, getDocs, query, where } from '@firebase/firestore'
import { FunctionComponent, useEffect, useState } from 'react'
import { db } from '../../config/firebase.config'
import { categoryConverter } from '../../converts/firebase.converters'
import Category from '../../types/category.types'
import LoadingComponent from '../loading/loading.components'
import { CategoryTitle, Container, IconContainer, ProductsContainer } from './category-details.styles'
import { BiChevronLeft } from 'react-icons/bi'

import ProductItem from '../product-item/product-item.component'
import { useNavigate } from 'react-router-dom'

interface CategoryDetailsProps{
    categoryId: string
}

const CategoryDetails: FunctionComponent<CategoryDetailsProps> = ({ categoryId }) => {
  const [category, setCategory] = useState<Category | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate('/')
  }

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setIsLoading(true)
        const querySnapshot = await getDocs(query(collection(db, 'categories')
          .withConverter(categoryConverter),
        where('id', '==', categoryId)))

        const category = querySnapshot.docs[0]?.data()

        setCategory(category)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategory()
  }, [])

  console.log(category)

  if (isLoading) return <LoadingComponent/>

  return (
    <Container>

        <CategoryTitle >
        <IconContainer onClick={handleBackClick}>
            <BiChevronLeft size={36}/>
        </IconContainer>
            Explorar {category?.displayName}</CategoryTitle>

        <ProductsContainer>
            {category?.products.map((product) => (
                <ProductItem key={product.id} product={product}/>
            ))}
            </ProductsContainer>
    </Container>
  )
}

export default CategoryDetails
