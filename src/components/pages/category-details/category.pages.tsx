import { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'
import CategoryDetails from '../../category-details/category-details.components'
import Header from '../../header/header.components'

const CategoryDetailsPages: FunctionComponent = () => {
  const { id } = useParams()
  if (!id) return null
  return (
   <>
    <Header/>
    <CategoryDetails categoryId={id}/>
   </>
  )
}

export default CategoryDetailsPages
