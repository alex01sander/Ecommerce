
import { useContext, useEffect } from 'react'

// Components
import CategoryItem from '../category/category-item-component'

// Styles

// Utilities

import { CategoriesContainer, CategoriesContent } from './categoris.styles'

import { CategoryContext } from '../../contexts/category.context'
import LoadingComponent from '../loading/loading.components'

const Categories = () => {
  const { categories, isLoading, fetchCategories } = useContext(CategoryContext)
  useEffect(() => {
    fetchCategories()
  }, [])
  return (
    <CategoriesContainer>
        {isLoading && <LoadingComponent/>}
      <CategoriesContent>
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryItem category={category} />
          </div>
        ))}
      </CategoriesContent>
    </CategoriesContainer>
  )
}

export default Categories
