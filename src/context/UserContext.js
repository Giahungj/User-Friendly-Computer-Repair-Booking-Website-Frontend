import React, { useState, useEffect } from "react";
import { getUserAccount } from "../services/userService";
// -------------------------------------------------------------------
const UserContext = React.createContext(null);
const UserProvider = ({ children }) => {
    const userDefault = {
        isLoading: false,
        isAuthenticated: false,
        token: "",
        account: {}
    };
    const [user, setUser] = useState(userDefault);

    const loginContext = (userData) => setUser({ ...userData, isLoading: false });
    const logout = () => setUser({ name: "", auth: false });
    return <UserContext.Provider value={{ user, loginContext, logout }}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
