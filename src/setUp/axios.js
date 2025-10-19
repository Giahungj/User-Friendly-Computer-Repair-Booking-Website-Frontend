import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
	baseURL: 'http://localhost:8080',
	withCredentials: true
});

// Request interceptor (nếu cần chỉnh header)
instance.interceptors.request.use(
	config => config,
	error => Promise.reject(error)
);

// Response interceptor
instance.interceptors.response.use(
	response => response.data,
	error => {
		const status = error?.response?.status || 500;
		const data = error?.response?.data || null;

		switch (status) {
			case 401:
				toast.error("Unauthorized. Please login again.");
				return Promise.reject(data || error);
			case 403:
				toast.error("You don't have permission to access this resource.");
				return Promise.reject(data || error);
			default:
				toast.error(data?.message || "Something went wrong.");
				return Promise.reject(data || error);
		}
	}
);

export default instance;
