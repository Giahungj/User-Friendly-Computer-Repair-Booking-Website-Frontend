import axios from "../setUp/axios";
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const getWorkScheduleByTechnician = async (technicianId) => {
    try {
        const response = await axios.get(`/api/ky-thuat-vien/${technicianId}/thong-tin/lich-lam-viec`);
        return response;
    } catch (error) {
        console.error(`Fetch work schedule failed (technician ${technicianId}):`, error.message);
        return { EC: -1, EM: error.message || "Lỗi không xác định", DT: [] };
    }
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const getWorkSchedulesOfTechnician = async (technicianId) => {
    try {
        const response = await axios.get(`/api/lichlamviec/${technicianId}`);
        console.log(response);
        return response;
    } catch (error) {
        console.error(`Fetch work schedule failed (technician ${technicianId}):`, error.message);
        return { EC: -1, EM: error.message || "Lỗi không xác định", DT: [] };
    }
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const getWorkScheduleDetail = async (scheduleId) => {
    try {
        const response = await axios.get(`/api/chitietlichlamviec/${scheduleId}`);
        console.log(response);

        return response;
    } catch (error) {
        console.error(`Fetch work schedule failed (schedule ${scheduleId}):`, error.message);
        return { EC: -1, EM: error.message || "Lỗi không xác định", DT: [] };
    }
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export {
    getWorkScheduleByTechnician,
    getWorkSchedulesOfTechnician,
    getWorkScheduleDetail
}