import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import Profile from '../Pages/Profile'
import Create from '../Pages/Create'
import PrivateRoute from './PrivateRoute'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/profile' element={<Profile />}/>
        
        <Route path='/create' element={
          <PrivateRoute>
            <Create />
          </PrivateRoute>
        }/>
        
    </Routes>
  )
}

export default AllRoutes