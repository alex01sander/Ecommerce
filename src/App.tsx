import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import HomePage from './components/pages/home/home.page'
import LoginPage from './components/pages/login/login.page'
import SignUpPage from './components/pages/sing-up/sign-up.page'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase.config'

function App () {
  onAuthStateChanged(auth, (user) => {
    console.log(user)
  })
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
