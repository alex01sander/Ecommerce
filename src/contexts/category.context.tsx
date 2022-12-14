import { collection, getDocs } from '@firebase/firestore'
import { createContext, FunctionComponent, ReactNode, useState } from 'react'
import { db } from '../config/firebase.config'
import { categoryConverter } from '../converts/firebase.converters'
import Category from '../types/category.types'

interface children {
    children?: ReactNode
}

interface ICategoryContext {
    categories: Category[]
    isLoading: boolean
    fetchCategories: () => Promise<void>
}

export const CategoryContext = createContext<ICategoryContext>({
  isLoading: false,
  categories: [],
  fetchCategories: () => Promise.resolve()
})

const CategoryContextProvider: FunctionComponent<children> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchCategories = async () => {
    try {
      setIsLoading(true)
      const categoriesFromFirestore: Category[] = []
      const querySnapshot = await getDocs(collection(db, 'categories').withConverter(categoryConverter))

      querySnapshot.forEach((doc) => {
        categoriesFromFirestore.push(doc.data())
      })
      setCategories(categoriesFromFirestore)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (

        <CategoryContext.Provider value={{ categories, fetchCategories, isLoading }}>{children}</CategoryContext.Provider>
  )
}
export default CategoryContextProvider
