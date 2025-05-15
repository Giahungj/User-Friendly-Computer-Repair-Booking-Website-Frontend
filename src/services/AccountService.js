import axios from "../setUp/axios";

// ---------------------------------------------------------
export const fetchUserProfile = async (email) => {
    try {
        const response = await axios.get(`/api/user/read/${email}`);
        return response;
    } catch (error) {
        console.error("FetchFalse:", error);
        return null;
    }
};

// ---------------------------------------------------------
export const updateProfile = async (formData) => {
    try {
        const response = await axios.get(`/api/user/read/${formData}`);
        return response;
    } catch (error) {
        console.error("FetchFalse:", error);
        return null;
    }
};

