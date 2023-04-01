import { Outlet, Navigate } from 'react-router-dom';
import { authContext } from '../contexts/users'

import React from 'react'

const PrivateRoutes = () => {
  const { userName } = authContext();
  return (
    userName ? <Outlet /> : <Navigate to='/login' />
  )
}

export default PrivateRoutes