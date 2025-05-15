import { useEffect, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoutes = () => {
  const { auth } = useContext(AuthContext);
  return auth && auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
