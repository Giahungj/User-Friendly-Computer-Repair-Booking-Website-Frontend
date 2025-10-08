import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const [showLogin, setShowLogin] = useState(false);
	const [showInternalLogin, setShowInternalLogin] = useState(false);
	const [auth, setAuth] = useState(() => {
		let storedUser = localStorage.getItem("user");
		return storedUser ? JSON.parse(storedUser) : { isAuthenticated: false, user: null, token: null };
	});
	const [notifications, setNotifications] = useState([]);

	const loginContext = (data) => {
		setAuth(data);
		localStorage.setItem("user", JSON.stringify(data));
	};

	const logoutContext = () => {
		setAuth({ isAuthenticated: false, user: null, token: null });
		localStorage.removeItem("user");
		setNotifications([]);
		navigate("/");
	};

	// Fetch notifications khi auth.user thay đổi
	useEffect(() => {
		const fetchNotifications = async () => {
			if (!auth.isAuthenticated) return;
			try {
				const res = await axios.get(`/api/notifications/${auth.user.user_id}`);
				setNotifications(res.data); // giả sử API trả về mảng notifications
			} catch (err) {
				console.error("Lỗi fetch notifications:", err);
			}
		};
		fetchNotifications();
	}, [auth.user]);

	return (
		<AuthContext.Provider value={{
			auth,
			loginContext,
			logoutContext,
			showLogin,
			setShowLogin,
			showInternalLogin,
			setShowInternalLogin,
			notifications,
			setNotifications
		}}>
			{children}
		</AuthContext.Provider>
	);
};