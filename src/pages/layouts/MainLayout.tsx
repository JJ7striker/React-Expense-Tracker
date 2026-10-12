import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthContextProvider from '../../../context/AuthContext'

const MainLayout = () => {
  return (
    <div>
      <AuthContextProvider>
        <Outlet />
        </AuthContextProvider>
    </div>
  )
}

export default MainLayout