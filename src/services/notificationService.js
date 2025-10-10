import axios from "../setUp/axios";

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const handlearkAsReadNotifications = async (notificationId) => {
    try {
        const response = await axios.get(`/api/notifications/${notificationId}/danh-dau-da-doc`);
        return response;
    } catch (error) {
        console.error("Error fetching doctor schedules:", error.response ? error.response.data : error.message);
        return { EC: -1, EM: "Error fetching doctor schedules", DT: null };
    }
};

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default {
    handlearkAsReadNotifications,
};

