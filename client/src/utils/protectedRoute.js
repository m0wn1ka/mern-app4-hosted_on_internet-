import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"
import { REGISTER_FAIL,REGISTER_SUCCESS } from '../features/auth/authSlice';
const ProtectedRoute = ({children}) => {
    const user = useSelector((state) => state.auth.isAuthenticated);
    let location = useLocation();

    console.log("user is ")
    console.log(user)
    if(!user) {
        return <Navigate to="/register" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;