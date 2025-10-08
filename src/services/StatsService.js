import axios from "../setUp/axios";

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const getAppointmentsSummaryByManager = async (storeManagerId, filters) => {
	try {
		const response = await axios.get(
			`/api/cua-hang-truong/${storeManagerId}/thong-ke/so-lieu/tong-quat`,
			{
				params: {
					startDate: filters.startDate,
					endDate: filters.endDate,
					technicianId: filters.technicianId
				}
			}
		);
		return response;
	} catch (error) {
		console.error("❌ [DEBUG] Lỗi khi gọi API:", error);
		return { EC: -1, EM: error.message || "Lỗi không xác định", DT: [] };
	}
};

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const getDataBookingList = async (storeManagerId, filters) => {
	try {
		const response = await axios.get(
			`/api/cua-hang-truong/${storeManagerId}/thong-ke/danh-sach/lich-hen`,
			{ params: filters }
		);
		return response;
	} catch (error) {
		console.error("❌ [DEBUG] Lỗi khi lấy dữ liệu biểu đồ tròn:", error);
		return { EC: -1, EM: error.message || "Lỗi không xác định", DT: [] };
	}
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const getDataLineChart = async (storeManagerId, filters) => {
	try {
		const response = await axios.get(
			`/api/cua-hang-truong/${storeManagerId}/thong-ke/bieu-do/duong`,
			{ params: filters }
		);
		return response;
	} catch (error) {
		console.error("❌ [DEBUG] Lỗi khi lấy dữ liệu biểu đồ tròn:", error);
		return { EC: -1, EM: error.message || "Lỗi không xác định", DT: [] };
	}
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default { 
	getAppointmentsSummaryByManager, 
	getDataBookingList,
	getDataLineChart,
};
