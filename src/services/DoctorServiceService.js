import axios from "../setUp/axios";

// ---------------------------------------------------------
// 1. Lấy danh sách dịch vụ để hiển thị cho bác sĩ đăng ký
export const fetchAvailableServices = async () => {
    try {
        const response = await axios.get(`/api/services/all`);
        return response;
    } catch (error) {
        console.error("Error fetching available services:", error.response ? error.response.data : error.message);
        return { EC: -1, EM: "Error fetching available services", DT: null };
    }
};

// ---------------------------------------------------------
// 2. Gửi dữ liệu bác sĩ và serviceId để đăng ký dịch vụ
export const registerDoctorService = async (doctorId, serviceId) => {
    try {
        const response = await axios.post(`/api/doctor/service/register`, {
            doctorId,
            serviceId
        });
        return response;
    } catch (error) {
        console.error("Error registering doctor service:", error.response ? error.response.data : error.message);
        return { EC: -1, EM: "Error registering doctor service", DT: null };
    }
};

// ---------------------------------------------------------
// 3. Lấy danh sách dịch vụ mà bác sĩ đã đăng ký
export const fetchDoctorServices = async (doctorId) => {
    try {
        const response = await axios.get(`/api/doctor/service/read/${doctorId}`);
        return response;
    } catch (error) {
        console.error("Error fetching doctor service data:", error.response ? error.response.data : error.message);
        return { EC: -1, EM: "Error fetching doctor service data", DT: null };
    }
};

// ---------------------------------------------------------
// 4. Cập nhật dịch vụ mà bác sĩ đã đăng ký
export const upgradeDoctorService = async (doctorId, serviceId) => {
    try {
        const response = await axios.put(`/api/doctor/service/update`, { doctorId, serviceId });
        return response;
    } catch (error) {
        console.error("Error updating doctor service:", error.response ? error.response.data : error.message);
        return { EC: -1, EM: "Error updating doctor service", DT: null };
    }
};