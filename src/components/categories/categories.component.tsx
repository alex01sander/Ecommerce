
import './categories.styles.css'
import { useEffect, useState } from 'react'

import Category from '../../types/category.types'
import env from '../../config/env.config'
import axios from 'axios'

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])

  console.log({ categories })

  const featchCategories = async () => {
    try {
      const { data } = await axios.get(`${env.apiUrl}/api/category`)

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

        </div>
    </div>
  )
}

export default Categories
