import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateComponent() {
    const auth = JSON.parse(localStorage.getItem('user'));
    const isAuthenticated = auth && auth.token; 

    return isAuthenticated ? <Outlet /> : <Navigate to="/signup" />;
}
