import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Login, SignUp, Chats, Home } from './pages/'
import UserProvider from './contexts/users'
import PrivateRoutes from './pages/PrivateRoutes'

const App = () => {

  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/login' element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route element={<PrivateRoutes />} >
            <Route path='/chats' element={<Chats />} />
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  )
}

export default App