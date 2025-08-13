import axios from "../setUp/axios";
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const getDataForCreateBooking = async ({workScheduleId, userId}) => {
    try {
        const response = await axios.get(`/api/dat-lich/tao-lich-moi/${workScheduleId}/${userId}/lay-du-lieu/`);
        return response;
    } catch (error) {
        console.error(`Fetch work schedule failed (technician ${workScheduleId}):`, error.message);
        return { EC: -1, EM: error.message || "Lỗi không xác định", DT: [] };
    }
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const createRepairBooking = async (bookingDataToSubmit) => {
    try {
        const formData = new FormData();
        Object.entries(bookingDataToSubmit).forEach(([key, value]) => {
            if (key !== 'issueImage') formData.append(key, value);
        });
        if (bookingDataToSubmit.issueImage) {
            formData.append('issueImage', bookingDataToSubmit.issueImage);
        }
        const response = await axios.post('/api/dat-lich/tao-lich-hen-moi/them-moi', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response;
    } catch (error) {
        console.error(`Tạo đơn thất bại:`, error.message);
        return { EC: -1, EM: error.message || "Lỗi không xác định", DT: [] };
    }
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const getRepairBookingDetail = async (bookingId) => {
    try {
        const response = await axios.get(`/api/dat-lich/${bookingId}/thong-tin/chi-tiet`);
        return response;
    } catch (error) {
        console.error(`Lấy chi tiết lịch hẹn thất bại (ID ${bookingId}):`, error.message);
        return { EC: -1, EM: error.message || "Lỗi không xác định", DT: [] };
    }
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const cancelRepairBooking = async (bookingId, reason = "") => {
    try {
        const response = await axios.post(`/api/dat-lich/${bookingId}/huy-lich`, { reason });
        return response;
    } catch (error) {
        console.error(`Hủy đơn thất bại:`, error.message);
        return { EC: -1, EM: error.message || "Lỗi không xác định", DT: [] };
    }
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const updateRepairBooking = async (bookingId, data = {}) => {
	try {
        console.log("Dữ liệu gửi đi:", {
            issueImage: data.issueImage,
            deviceType: data.deviceType || "",
            model: data.model || "",
            brand: data.brand || "",
            issueDescription: data.issueDescription || ""
        });
		const formData = new FormData();
		formData.append("issueImage", data.issueImage);
		formData.append("deviceType", data.deviceType || "");
		formData.append("model", data.model || "");
		formData.append("brand", data.brand || "");
		formData.append("issueDescription", data.issueDescription || "");
		const response = await axios.post(`/api/dat-lich/${bookingId}/cap-nhat`, formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		return response;
	} catch (error) {
		console.error(`Cập nhật thất bại:`, error.message);
		return { EC: -1, EM: error.message || "Lỗi không xác định", DT: [] };
	}
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const getCustomerRepairBookings = async (userId) => {
    try {
        const response = await axios.get(`/api/dat-lich/khach-hang/${userId}/danh-sach`);
        return response;
    } catch (error) {
        console.error(`Lấy danh sách lịch hẹn thất bại (CustomerID ${userId}):`, error.message);
        return { EC: -1, EM: error.message || "Lỗi không xác định", DT: [] };
    }
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export {
    getDataForCreateBooking,
    createRepairBooking, cancelRepairBooking, updateRepairBooking,
    getRepairBookingDetail,
    getCustomerRepairBookings,
}