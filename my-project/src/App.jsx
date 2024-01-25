
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import SNavbar from './components/SNavbar'
import Login from './components/Login'
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'


function App() {
  

  return (
    <>
      <BrowserRouter>


      <SNavbar/>
      
      <Routes>
      
      <Route path='/login' element={<Login  />} />
      <Route path='/register' element={<Register  />} />
      <Route path='/forgot-password' element={<ForgotPassword  />} />

      <Route path='/reset-password/:uidb64/:token' element={<ResetPassword  />} />
    </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
