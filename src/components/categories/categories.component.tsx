
import './categories.styles.css'
import { useEffect, useState } from 'react'

import Category from '../../types/category.types'
import env from '../../config/env.config'
import axios from 'axios'

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

        </div>
    </div>
  )
}

export default Categories
