import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRouteUserNotLogged = ({ user, children }) => {

    if (user) return <Navigate to='/' />
    else return children
}

export default ProtectedRouteUserNotLogged