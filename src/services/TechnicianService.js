import axios from "../setUp/axios";
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const getTechnicians = async () => {
    try {
        const response = await axios.get(`api/ky-thuat-vien/danh-sach`);
        return response;
    } catch (error) {
        return { EC: -1, EM: error.message, DT: [] };
    }
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const getTechnicianById = async (technicianId) => {
    try {
        const response = await axios.get(`api/ky-thuat-vien/${technicianId}/thong-tin/chi-tiet`);
        return response;
    } catch (error) {
        return { EC: -1, EM: error.message || "Lỗi không xác định", DT: {} };
    }
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const getSimilarTechniciansById = async (technicianId) => {
    try {
        const response = await axios.get(`api/ky-thuat-vien/${technicianId}/thong-tin/ky-thuat-vien-tuong-tu`);
        return response;
    } catch (error) {
        return { EC: -1, EM: error.message || "Lỗi không xác định", DT: [] };
    }
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const getAvailableTechniciansByManager = async (storeManagerId) => {
    try {
        const response = await axios.get(`api/cua-hang-truong/${storeManagerId}/ky-thuat-vien/con-trong`);
        return response;
    } catch (error) {
        return { EC: -1, EM: error.message || "Lỗi không xác định", DT: [] };
    }
};

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const getAllTechniciansByManager = async (storeManagerId) => {
    try {
        const response = await axios.get(`api/cua-hang-truong/${storeManagerId}/ky-thuat-vien/danh-sach`);
        return response;
    } catch (error) {
        return { EC: -1, EM: error.message || "Lỗi không xác định", DT: [] };
    }
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const createTechnicianByManager = async (storeManagerId, payload) => {
    try {
		const formData = new FormData();
		Object.entries(payload).forEach(([key, value]) => {
			if (key === "specialties") {
				value.forEach(sp => formData.append("specialties[]", sp));
			} else if (value !== null && value !== undefined) {
				formData.append(key, value);
			}
		});

		const response = await axios.post(
			`/api/cua-hang-truong/${storeManagerId}/ky-thuat-vien/tao-moi`,
			formData
		);
		return response;
	} catch (error) {
		return { EC: -1, EM: error.message || "Lỗi không xác định", DT: {} };
	}
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const updateBasicInfoByManager = async (storeManagerId, technicianId, basicInforUpdate) => {
    try {
        const response = await axios.put(
            `api/cua-hang-truong/${storeManagerId}/ky-thuat-vien/${technicianId}/cap-nhat/thong-tin-co-ban`, basicInforUpdate
        );
        return response;
    } catch (error) {
        return { EC: -1, EM: error.message || "Lỗi không xác định", DT: {} };
    }
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const updateSpecialtiesByManager = async (storeManagerId, technicianId, specialtiesUpdate) => {
    try {
        const response = await axios.put(
            `api/cua-hang-truong/${storeManagerId}/ky-thuat-vien/${technicianId}/cap-nhat/thong-tin-chuyen-mon`, specialtiesUpdate
        );
        return response;
    } catch (error) {
        return { EC: -1, EM: error.message || "Lỗi không xác định", DT: {} };
    }
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const createTechnicianTransferRequestByStoreManager = async (storeManagerId, technicianId, data) => {
    try {
        const response = await axios.post(
            `api/cua-hang-truong/${storeManagerId}/ky-thuat-vien/${technicianId}/yeu-cau/doi-cua-hang`,
            data
        );
        return response;
    } catch (error) {
        return { EC: -1, EM: error.message || "Lỗi không xác định", DT: {} };
    }
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const getTechnicianProfile = async (technicianId) => {
    try {
        const response = await axios.get(`api/hoso/${technicianId}`);
        return response;
    } catch (error) {
        return { EC: -1, EM: error.message || "Lỗi không xác định", DT: {} };
    }
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export { 
    getTechnicians, 
    getTechnicianById, 
    getSimilarTechniciansById,
    getAvailableTechniciansByManager,
    getAllTechniciansByManager,

    createTechnicianByManager,
    updateBasicInfoByManager,
    updateSpecialtiesByManager,
    createTechnicianTransferRequestByStoreManager,

    getTechnicianProfile
};
