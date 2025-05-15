import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const useApi = () => {
    const { refreshToken, logout } = useContext(AuthContext);

    const api = axios.create({
        baseURL: "/api",
        headers: { "Content-Type": "application/json" },
    });

    // Interceptor để tự động thêm token
    api.interceptors.request.use(
        async (config) => {
            let token = sessionStorage.getItem("accessToken");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Interceptor để tự động refresh token nếu bị 401
    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 401) {
                console.log("Access token expired. Refreshing...");
                const newToken = await refreshToken();
                if (newToken) {
                    error.config.headers.Authorization = `Bearer ${newToken}`;
                    return axios(error.config);
                } else {
                    logout();
                }
            }
            return Promise.reject(error);
        }
    );

    return api;
};

export default useApi;
