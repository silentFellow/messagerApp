import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Login, SignUp, Chats, Home } from './pages/'
import UserProvider from './contexts/users'

const App = () => {

  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/chats' element={<Chats />} />
        </Routes>
      </UserProvider>
    </Router>
  )
}

export default App