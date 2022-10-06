
import { useEffect, useState } from 'react'
import axios from 'axios'

// Components
import CategoryItem from '../category/category-item-component'

// Styles
import './categories.styles.css'

// Utilities
import Category from '../../types/category.types'
import env from '../../config/env.config'

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])

  const featchCategories = async () => {
    try {
      console.log({ categories })
      const { data } = await axios.get(`${env.apiUrl}/api/category`)
      console.log({ data })
      setCategories(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    featchCategories()
  }, [])
  return (
    <div className="categories-container">
      <div className="categories-content">
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryItem category={category} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories
