import axios from "../setUp/axios";

const fetchFeaturedDoctors = async () => {
    try {
        const response = await axios.get("/api/doctor/featured/read");
        return response;
    } catch (error) {
        console.error("Error fetching all doctors:", error);
        return { EC: -1, EM: "Lỗi khi lấy danh sách tất cả bác sĩ", DT: [] };
    }
};

const fetchAllDoctors = async () => {
    try {
        const response = await axios.get("/api/doctor/read");
        return response;
    } catch (error) {
        console.error("Error fetching all doctors:", error);
        return { EC: -1, EM: "Lỗi khi lấy danh sách tất cả bác sĩ", DT: [] };
    }
};

const fetchDoctorById = async (id) => {
    try {
        const response = await axios.get(`/api/doctor/read/${id}`);
        return response;
    } catch (error) {
        console.error(`Error fetching doctor by ID ${id}:`, error);
        return { EC: -1, EM: `Lỗi khi lấy thông tin bác sĩ có ID ${id}`, DT: null };
    }
};

const fetchDoctorsBySpecialty = async (specialtyId, excludeDoctorId) => {
    try {
        const response = await axios.get(`/api/doctor/specialty?specialtyId=${specialtyId}&excludeDoctorId=${excludeDoctorId}&limit=5`);
        return response;
    } catch (error) {
        console.error(`Error fetching doctors by specialty ${specialtyId}:`, error);
        return { EC: -1, EM: `Lỗi khi lấy danh sách bác sĩ theo chuyên khoa có ID ${specialtyId}`, DT: [] };
    }
};

const fetchDoctorPatients = async (userId) => {
    try {
        const date = new Date().toISOString().split('T')[0];
        const response = await axios.get(`/api/doctor/manager-booking/bookings-today/read/${userId}?date=${date}`);
        return response;
    } catch (error) {
        console.error(`Error fetching patients for doctor ${userId}:`, error);
        return { EC: -1, EM: `Lỗi khi lấy danh sách bệnh nhân trong ngày của bác sĩ có ID ${userId}`, DT: [] };
    }
};

const fetchVisitedDoctors = async (patientId) => {
    try {
        console.log("Fetching visited doctors for patient ID:", patientId);
        const response = await axios.get(`/api/doctor/visited/${patientId}`);
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error fetching visited doctors:", error);
        return { EC: -1, EM: "Lỗi khi lấy danh sách bác sĩ đã từng khám", DT: [] };
    }
};

const updateDoctor = async (doctorData) => {
    try {
        const response = await axios.put("/api/doctor/update", doctorData);
        return response;
    } catch (error) {
        console.error("Error updating doctor:", error);
        return { EC: -1, EM: "Lỗi khi cập nhật thông tin bác sĩ", DT: null };
    }
};

const createDoctor = async (doctorData) => {
    try {
        const response = await axios.post("/api/doctor/create", doctorData);
        return response;
    } catch (error) {
        console.error("Error creating doctor:", error);
        return { EC: -1, EM: "Lỗi khi tạo bác sĩ mới", DT: null };
    }
};

const deleteDoctor = async (id) => {
    try {
        const response = await axios.delete("/api/doctor/delete", { data: { id } });
        return response;
    } catch (error) {
        console.error(`Error deleting doctor with ID ${id}:`, error);
        return { EC: -1, EM: `Lỗi khi xóa bác sĩ có ID ${id}`, DT: null };
    }
};

export {
    fetchFeaturedDoctors,
    fetchAllDoctors,
    fetchDoctorById,
    fetchDoctorsBySpecialty,
    fetchDoctorPatients,
    fetchVisitedDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor,
};