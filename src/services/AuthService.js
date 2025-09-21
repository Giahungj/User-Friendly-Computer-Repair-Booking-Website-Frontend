import axios from "../setUp/axios";

// ---------------------------------------------------------
export const signUp = async ( email, password, name, phone ) => {
    try {
        const response = await axios.post('/api/sign-up', { email, password, name, phone });
        return response;
    } catch (error) {
        throw error;
    }
};

// ---------------------------------------------------------
export const signInByEmail = async ({ email, password }) => {
	try {
		const response = await axios.post("/api/sign-in-email", { email, password }, { withCredentials: true });
		return response;
	} catch (error) {
		console.error("Login failed:", error);
		return null;
	}
};

// ---------------------------------------------------------
export const signInByPhone = async ({ phone, password }) => {
	try {
		const response = await axios.post("/api/sign-in-phone", { phone, password }, { withCredentials: true });
		return response;
	} catch (error) {
		console.error("Login failed:", error);
		return null;
	}
};

// ---------------------------------------------------------
export const signInByEmailForStoreManager = async ({ email, password }) => {
	try {
		const response = await axios.post("/api/sign-in-email/store-manager", { email, password }, { withCredentials: true });
		return response;
	} catch (error) {
		console.error("Login failed:", error);
		return null;
	}
};

// ---------------------------------------------------------
export const signInByPhoneForTechnician = async ({ phone, password }) => {
	try {
		const response = await axios.post("/api/sign-in-phone/technician", { phone, password }, { withCredentials: true });
		return response;
	} catch (error) {
		console.error("Login failed:", error);
		return null;
	}
};

// ---------------------------------------------------------
export const signInByEmailForTechnician = async ({ email, password }) => {
	try {
		const response = await axios.post("/api/sign-in-email/technician", { email, password }, { withCredentials: true });
		return response;
	} catch (error) {
		console.error("Login failed:", error);
		return null;
	}
};

// ---------------------------------------------------------
export const signInByPhoneForStoreManager = async ({ phone, password }) => {
	try {
		const response = await axios.post("/api/sign-in-phone/store-manager", { phone, password }, { withCredentials: true });
		return response;
	} catch (error) {
		console.error("Login failed:", error);
		return null;
	}
};

// ---------------------------------------------------------
export const forgotPassword = async ({ emailOrPhone, type }) => {
    try {
        const response = await axios.post("/api/forgot-password", { emailOrPhone, type });
        return response;
    } catch (error) {
        console.error("Yêu cầu quên mật khẩu thất bại:", error);
        return null;
    }
};

// ---------------------------------------------------------
export const verifyOTP = async ({ emailOrPhone, otp }) => {
    try {
        const response = await axios.post("/api/verify-otp", { emailOrPhone, otp });
        return response;
    } catch (error) {
        console.error("Xác thực OTP thất bại:", error);
        return null;
    }
};

// ---------------------------------------------------------
export const changePassword = async ({ email, currentPassword,newPassword }) => {
    try {
        const response = await axios.post("/api/check-password", { email, currentPassword, newPassword });
        return response;
    } catch (error) {
        console.error("Đặt lại mật khẩu thất bại:", error);
        return null;
    }
};

// ---------------------------------------------------------
export const resetPassword = async ({ emailOrPhone, newPassword }) => {
    try {
        const response = await axios.post("/api/reset-password", { emailOrPhone, newPassword });
        return response;
    } catch (error) {
        console.error("Đặt lại mật khẩu thất bại:", error);
        return null;
    }
};

// ---------------------------------------------------------
export const logoutUser = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
};

// ---------------------------------------------------------
export const refreshAccessToken = async () => {
    try {
        const storedRefreshToken = sessionStorage.getItem("refreshToken");
        if (!storedRefreshToken) throw new Error("No refresh token available");

        const response = await axios.post("/api/refresh-token", { refreshToken: storedRefreshToken });
        const { accessToken } = response.data;

        sessionStorage.setItem("accessToken", accessToken);
        return accessToken;
    } catch (error) {
        console.error("Refresh token failed:", error);
        logoutUser();
        return null;
    }
};

// ---------------------------------------------------------
export const checkEmail = async (email) => {
    try {
        const response = await axios.post('/api/register/check-email', {email});
        return response;
    } catch (error) {
        throw error;
    }
};

// ---------------------------------------------------------
export const fetchNotifications = async (userId) => {
    try {
        const response = await axios.get(`/api/notifications/user/${userId}`);
        return response;
    } catch (error) {
        console.error("FetchFalse:", error);
        return null;
    }
};

// ---------------------------------------------------------
export const markAsReadNotification = async (notificationId) => {
    try {
        const response = await axios.get(`/api/notifications/markAsRead/${notificationId}`);
        return response;
    } catch (error) {
        console.error("FetchFalse:", error);
        return null;
    }
};

