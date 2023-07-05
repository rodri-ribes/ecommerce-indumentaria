import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRouteShopping = ({ user, children, buyNow }) => {


    if (!user) return <Navigate to='/' />
    else if (user?.cart?.length < 1 && !buyNow) {
        return <Navigate to='/' />
    } else {
        return (
            children
        )
    }

}

export default ProtectedRouteShopping