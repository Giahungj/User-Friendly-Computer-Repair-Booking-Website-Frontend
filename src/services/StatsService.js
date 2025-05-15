import axios from "../setUp/axios";

// ---------------------------------------------------------
const fetchDoctorBookingStats = async (doctorId) => {
    try {
        console.log("Fetching doctor booking stats...");
        const response = await axios.get(`/api/doctor/statistics/bookings/read/${doctorId}`);
        return response;
    } catch (error) {
        console.error("Error fetching doctor booking stats:", error);
        return { data: { EC: 1, EM: "Không thể tải dữ liệu thống kê", DT: [] } };
    }
};

// ---------------------------------------------------------
const fetchPatientStats = async (doctorId) => {
    try {
        console.log("Fetching patient stats...");
        const response = await axios.get(`/api/doctor/statistics/patients/read/${doctorId}`);
        console.log("Response data:", response);
        return response;
    } catch (error) {
        console.error("Error fetching patient stats:", error);
        return { data: { EC: 1, EM: "Không thể tải dữ liệu thống kê bệnh nhân", DT: [] } };
    }
};

// ---------------------------------------------------------
const fetchRevenueStats = async (doctorId) => {
    try {
        console.log("Fetching revenue stats...");
        const response = await axios.get(`/api/doctor/statistics/revenues/read/${doctorId}`);
        console.log("Response data:", response);
        return response;
    } catch (error) {
        console.error("Error fetching revenue stats:", error);
        return { data: { EC: 1, EM: "Không thể tải dữ liệu thống kê doanh thu", DT: [] } };
    }
};

// ---------------------------------------------------------
export { 
    fetchDoctorBookingStats, 
    fetchPatientStats, 
    fetchRevenueStats 
};
