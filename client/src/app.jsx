import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import UserProvider from './contexts/users'
import PrivateRoutes from './pages/PrivateRoutes'

const Login = lazy(() => import('./pages/login'))
const SignUp = lazy(() => import('./pages/signUp'))
const Chats = lazy(() => import('./pages/chat'))

const App = () => {

  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/login' element={
            <Suspense fallback={<h1>Please Wait...</h1>}>
              <Login />
            </Suspense>
          } />
          <Route path='/signUp' element={
            <Suspense fallback={<h1>Please Wait...</h1>}>
              <SignUp />
            </Suspense>
          } />
          <Route element={<PrivateRoutes />} >
            <Route path='/chats' element={
              <Suspense fallback={<h1>Please Wait...</h1>}>
                <Chats />
              </Suspense>
            } />
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  )
}

export default App