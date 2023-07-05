import React from 'react'
import { Navigate } from 'react-router-dom'

import Cookies from "universal-cookie"

const ProtectedRouteAfterPaying = ({ children }) => {

    let cookie = new Cookies()

    if (cookie.get("time") === "0000002315000") return children
    return <Navigate to='/' />
}

export default ProtectedRouteAfterPaying