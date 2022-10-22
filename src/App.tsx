import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import HomePage from './components/pages/home/home.page'
import LoginPage from './components/pages/login/login.page'
import SignUpPage from './components/pages/sing-up/sign-up.page'
import { FunctionComponent, useContext, useState } from 'react'
import { UserContext } from './contexts/user.context'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from './config/firebase.config'
import { collection, getDocs, query, where } from '@firebase/firestore'
import { userConverter } from './converts/firebase.converters'
import LoadingComponent from './components/loading/loading.components'
import ExplorePage from './components/pages/explore/explore.pages'
import CategoryDetailsPages from './components/pages/category-details/category.pages'
import Cart from './components/cart/cart.components'

// Firebase/Firestore

// components

const App: FunctionComponent = () => {
  const [isInitializing, setIsInitializing] = useState(true)
  const { isAuthenticated, loginUser, logoutUser } = useContext(UserContext)

  onAuthStateChanged(auth, async (user) => {
    const isSigningOut = isAuthenticated && !user

    if (isSigningOut) {
      logoutUser()

      return setIsInitializing(false)
    }

    const isSigningIn = !isAuthenticated && user

    if (isSigningIn) {
      const querySnapshot = await getDocs(query(collection(db, 'users').withConverter(userConverter),
        where('id', '==', user.uid)))

      const userFromFirestore = querySnapshot.docs[0]?.data()
      loginUser(userFromFirestore as any)
      return setIsInitializing(false)
    }
    return setIsInitializing(false)
  })

  if (isInitializing) return <LoadingComponent/>
  return (
    <>

        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/explore' element={<ExplorePage/>}/>
                <Route path='/category/:id' element={<CategoryDetailsPages/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/sign-up' element={<SignUpPage/>}/>
            </Routes>
        <Cart/>
        </BrowserRouter>

    </>
  )
}

export default App
