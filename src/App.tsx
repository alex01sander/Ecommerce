import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import HomePage from './components/pages/home/home.page'
import LoginPage from './components/pages/login/login.page'
import SignUpPage from './components/pages/sing-up/sign-up.page'
import { FunctionComponent, useContext } from 'react'
import { UserContext } from './contexts/user.context'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from './config/firebase.config'
import { collection, getDocs, query, where } from '@firebase/firestore'

// Firebase/Firestore

// components

const App: FunctionComponent = () => {
  const { isAuthenticated, loginUser, logoutUser } = useContext(UserContext)

  onAuthStateChanged(auth, async (user) => {
    const isSigningOut = isAuthenticated && !user

    if (isSigningOut) {
      return logoutUser()
    }

    const isSigningIn = !isAuthenticated && user

    if (isSigningIn) {
      const querySnapshot = await getDocs(query(collection(db, 'users'), where('id', '==', user.uid)))

      const userFromFirestore = querySnapshot.docs[0]?.data()
      return loginUser(userFromFirestore as any)
    }
  })

  console.log({ isAuthenticated })

  return (
    <>

        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/sign-up' element={<SignUpPage/>}/>
            </Routes>
        </BrowserRouter>

    </>

  )
}

export default App
