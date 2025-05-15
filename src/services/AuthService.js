import axios from "../setUp/axios";
// ---------------------------------------------------------
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post("/api/login", { email, password }, { withCredentials: true });
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
export const registerPatient = async (email, password, name, address, phone, citizenId, sex, dob) => {
    try {
        const response = await axios.post('/api/register-patient', {email, password, name, address, phone, citizenId, sex, dob});
        console.log(response)
        return response;
    } catch (error) {
        throw error;
    }
};

// ---------------------------------------------------------
export const registerDoctor = async (doctorData) => {
    try {
        for (const pair of doctorData.entries()) {
            if (pair[0] === 'avatar' && pair[1]) {
                console.log(pair[0], pair[1].name);
            } else {
                console.log(pair[0], pair[1]);
            }
        }
        const response = await axios.post('/api/register-doctor', doctorData);
        return response;
    } catch (error) {
        throw error;
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

