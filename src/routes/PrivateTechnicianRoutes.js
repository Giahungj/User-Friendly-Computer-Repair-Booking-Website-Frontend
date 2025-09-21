import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateTechnicianRoutes = () => {
	const { auth } = useContext(AuthContext);
	return auth && auth.isAuthenticated && auth.user.role === 'technician'
		? <Outlet />
		: <Navigate to="/not-allow" />;
};

export default PrivateTechnicianRoutes;
