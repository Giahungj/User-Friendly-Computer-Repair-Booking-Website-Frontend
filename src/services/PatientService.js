import axios from "../setUp/axios";

// ---------------------------------------------------------
export const fetchDoctorPatients = async ( doctorId ) => {
    try {
        const response = await axios.get(`/api/doctor/manager-patient/read/${ doctorId }`);
        console.log(response)
        return response;
    } catch (error) {
        console.error("Error fetching doctor patients:", error.response ? error.response.data : error.message);
        return { EC: -1, EM: "Error fetching doctor patients", DT: null };
    }
};
