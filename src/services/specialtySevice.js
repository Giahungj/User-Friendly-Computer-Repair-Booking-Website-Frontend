import axios from "../setUp/axios";

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const getFilterSpecialties = async () => {
    try {
        const response = await axios.get(`api/chuyen-mon/danh-sach`);
        const { EM, EC, DT } = response;

        if (EC !== 0) {
            console.warn(`API trả về lỗi: ${EM} (EC: ${EC})`);
            return { EC, EM, DT: [] };
        }

        return {
            EC: 0,
            EM: "Lấy danh sách chuyên môn thành công",
            DT: DT || []
        };
    } catch (error) {
        console.error(`Fetch work schedule failed`, error.message);
        return { EC: -1, EM: error.message || "Lỗi không xác định", DT: [] };
    }
};

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const fetchSpecialtyById = async (id) => {
    try {
        const response = await axios.get(`api/specialties/read/${id}`);
        return response;
    } catch (error) {
        console.error("Fetch failed:", error);
        return null;
    }
};

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const getSpecialties = async () => {
    try {
        const response = await axios.get(`api/chuyen-mon/danh-sach`);
        return response;
    } catch (error) {
        console.error(`Fetch specialties failed`, error.message);
        return { EC: -1, EM: error.message || "Lỗi không xác định", DT: [] };
    }
};

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export { 
    getFilterSpecialties,
    fetchSpecialtyById,
    getSpecialties
};