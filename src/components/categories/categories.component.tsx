
import { useEffect, useState } from 'react'

// Components
import CategoryItem from '../category/category-item-component'

// Styles

// Utilities
import Category from '../../types/category.types'

import { CategoriesContainer, CategoriesContent } from './categoris.styles'
import { db } from '../../config/firebase.config'
import { collection, getDocs } from '@firebase/firestore'
import { categoryConverter } from '../converts/firebase.converters'

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])

  const featchCategories = async () => {
    try {
      const categoriesFromFirestore: Category[] = []
      const querySnapshot = await getDocs(collection(db, 'categories').withConverter(categoryConverter))

      querySnapshot.forEach((doc) => {
        categoriesFromFirestore.push(doc.data())
      })
      setCategories(categoriesFromFirestore)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    featchCategories()
  }, [])
  return (
    <CategoriesContainer>
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
