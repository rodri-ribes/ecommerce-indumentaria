import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRouteAdmin = ({ user, children }) => {

    if (user.rol !== "admin") return <Navigate to='/' />

    return (
        children
    )
}

export default ProtectedRouteAdmin