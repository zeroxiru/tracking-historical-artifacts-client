import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
// import PropTypes from 'prop-types';

const PrivateRoutes = ({children}) => {
    const  { user, loading} = useAuth()
    const location = useLocation()
    if(loading) return <LoadingSpinner></LoadingSpinner>
    if(user) return children
    return <Navigate to='/signIn' state={{ from: location }} replace='true'></Navigate>

   
    // PrivateRoutes.propTypes = { 
    //     children: PropTypes.element,
    // }
};

export default PrivateRoutes;