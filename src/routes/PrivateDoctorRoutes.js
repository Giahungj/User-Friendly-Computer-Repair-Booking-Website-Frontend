import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateDoctorRoutes = () => {
  const { auth } = useContext(AuthContext);
  return auth && auth.isAuthenticated && auth.account.userType === 'doctor' ? <Outlet /> : <Navigate to="/not-allow" />;
};

export default PrivateDoctorRoutes;
