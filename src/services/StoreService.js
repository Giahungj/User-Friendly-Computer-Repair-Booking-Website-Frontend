import axios from "../setUp/axios";
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const getAllStores = async () => {
    try {
        const response = await axios.get(`/api/cua-hang/danh-sach`);
        return response;
    } catch (error) {
        console.error(`Fetch rating failed (technician):`, error.message);
        return { EC: -1, EM: error.message || "Lỗi không xác định", DT: [] };
    }
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const getStoreDetail = async (storeId) => {
    try {
        const response = await axios.get(`/api/cua-hang/${storeId}/thong-tin/chi-tiet`);
        return response;
    } catch (error) {
        console.error(`Fetch rating failed (technician):`, error.message);
        return { EC: -1, EM: error.message || "Lỗi không xác định", DT: [] };
    }
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// const getRatingOfTechnician = async (technicianId) => {
//     try {
//         const response = await axios.get(`/api/danhgia/${technicianId}`);
//         return response;
//     } catch (error) {
//         console.error(`Fetch rating failed (technician ${technicianId}):`, error.message);
//         return { EC: -1, EM: error.message || "Lỗi không xác định", DT: [] };
//     }
// };
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export {
    getAllStores,
    getStoreDetail
    // getRatingOfTechnician
}