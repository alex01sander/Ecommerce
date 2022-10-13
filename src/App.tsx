import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import HomePage from './components/pages/home/home.page'
import LoginPage from './components/pages/login/login.page'
import SignUpPage from './components/pages/sing-up/sign-up.page'

function App () {
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
