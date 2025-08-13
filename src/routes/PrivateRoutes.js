import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoutes = () => {
    const { auth, setShowLogin } = useContext(AuthContext);
    if (auth?.isAuthenticated) return <Outlet />;
    setShowLogin(true); 
    return null;
};

export default PrivateRoutes;
