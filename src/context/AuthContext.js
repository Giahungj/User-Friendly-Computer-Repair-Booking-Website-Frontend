import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);
    const [showInternalLogin, setShowInternalLogin] = useState(false);
    const [auth, setAuth] = useState(() => {
        let storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : { isAuthenticated: false, user: null, token: null };
    });

    const loginContext = (data) => {
        setAuth(data);
        localStorage.setItem("user", JSON.stringify(data));
    };

    const logoutContext = () => {
        setAuth({ isAuthenticated: false, user: null, token: null });
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{
            auth,
            loginContext,
            logoutContext,
            showLogin,
            setShowLogin,
            showInternalLogin,
            setShowInternalLogin
        }}>
            {children}
        </AuthContext.Provider>
    );
};
