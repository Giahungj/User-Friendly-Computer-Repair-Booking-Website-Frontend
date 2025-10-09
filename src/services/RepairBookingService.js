import axios from "../setUp/axios";
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
const updateRepairBooking = async (bookingId, data = {}) => {
	try {
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
const getRepairBookingsForStoreManager = async (storeManagerId) => {
    try {
        const response = await axios.get(`/api/cua-hang-truong/${storeManagerId}/don-dat-lich/danh-sach`);
        return response;
    } catch (error) {
        console.error(`Lấy danh sách lịch hẹn thất bại (storeManagerId ${storeManagerId}):`, error.message);
        return { EC: -1, EM: error.message || "Lỗi không xác định", DT: [] };
    }
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const getRepairBookingDetailForStoreManager = async (repair_booking_id) => {
    try {
        const response = await axios.get(`/api/cua-hang-truong/don-dat-lich/${repair_booking_id}/chi-tiet`);
        return response;
    } catch (error) {
        console.error(`Lấy danh sách lịch hẹn thất bại`, error.message);
        return { EC: -1, EM: error.message || "Lỗi không xác định", DT: [] };
    }
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const approveRepairBooking = async (repair_booking_id) => {
    try {
        const response = await axios.put(`/api/cua-hang-truong/don-dat-lich/duyet-don`, { repair_booking_id });
        return response;
    } catch (error) {
        console.error(`Duyệt đơn thất bại:`, error.message);
        return { EC: -1, EM: error.message || "Lỗi không xác định", DT: [] };
    }
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const completedRepairBooking = async (technicianId, bookingId) => {
    try {
        const response = await axios.post(`/api/don-dat-lich/xac-nhan-hoan-thanh-don`, { technicianId, bookingId });
        console.log(response);
        return response;
    } catch (error) {
        console.error(`Duyệt đơn thất bại:`, error.message);
        return { EC: -1, EM: error.message || "Lỗi không xác định", DT: [] };
    }
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const rejectRepairBooking = async (repair_booking_id) => {
    try {
        const response = await axios.put(`/api/cua-hang-truong/don-dat-lich/tu-choi-don`, { repair_booking_id });
        return response;
    } catch (error) {
        console.error(`Duyệt đơn thất bại:`, error.message);
        return { EC: -1, EM: error.message || "Lỗi không xác định", DT: [] };
    }
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const getData1 = async (data) => {
	try {
        const { technicianId, filter } = data;
		const response = await axios.get(`/api/${technicianId}/laydanhsachdondatlich`, {params: filter});
		return response;
	} catch (error) {
		console.error("laydanhsachdondatlich:", error.message);
		return { EC: -1, EM: error.message || "Lỗi không xác định", DT: [] };
	}
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const getData2 = async (bookingId) => {
	try {
		const response = await axios.get(`/api/laydondatlich/${bookingId}`);
		return response;
	} catch (error) {
		console.error("laydondatlich:", error.message);
		return { EC: -1, EM: error.message || "Lỗi không xác định", DT: null };
	}
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const reassignTechnician = async ({ bookingId, oldworkScheduleId, newWorkScheduleId, technicianId}) => {
	try {
		const response = await axios.put(`/api/cua-hang-truong/don-dat-lich/doi-nguoi-sua-chua`, {
			bookingId,
            oldworkScheduleId,
			newWorkScheduleId,
			technicianId
		});
		return response;
	} catch (error) {
		console.error("Đổi kỹ thuật viên thất bại:", error.message);
		return { EC: -1, EM: error.message || "Lỗi không xác định", DT: null };
	}
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export {
    getDataForCreateBooking,
    createRepairBooking,
    cancelRepairBooking,
    updateRepairBooking,
    getRepairBookingDetail,
    getCustomerRepairBookings,

    getRepairBookingsForStoreManager,
    getRepairBookingDetailForStoreManager,
    approveRepairBooking,
    completedRepairBooking,
    rejectRepairBooking,

    getData1, getData2,

    reassignTechnician
}