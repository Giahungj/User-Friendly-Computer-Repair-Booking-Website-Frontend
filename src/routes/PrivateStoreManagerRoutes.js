import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateStoreManagerRoutes = () => {
	const { auth } = useContext(AuthContext);
	return auth && auth.isAuthenticated && auth.user.role === 'store_manager'
		? <Outlet />
		: <Navigate to="/not-allow" />;
};

export default PrivateStoreManagerRoutes;
