import { FunctionComponent } from 'react'
import CategoriesOverview from '../../categories-overview/categories-overview.components'
import Header from '../../header/header.components'

const ExplorePage: FunctionComponent = () => {
  return (
        <>
            <Header/>

            <CategoriesOverview/>
        </>
  )
}

export default ExplorePage
