import axios from "../setUp/axios";

// ---------------------------------------------------------
const fetchMedicine = async () => {
	try {
		const response = await axios.get(`/api/doctor/medicine/read`);
		return response;
	} catch (error) {
		console.error("Lỗi lấy đơn thuốc:", error);
		return { EC: 1, EM: "Không thể lấy đơn thuốc", DT: null };
	}
};

// ---------------------------------------------------------
export { 
    fetchMedicine,
};