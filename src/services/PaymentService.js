import axios from "../setUp/axios";

// ---------------------------------------------------------
export const fetchPaymentData = async ( doctorId ) => {
    try {
        const response = await axios.get(`/api/doctor/payment/read/${ doctorId }`);
        return response;
    } catch (error) {
        console.error("Error fetching doctor patients:", error.response ? error.response.data : error.message);
        return { EC: -1, EM: "Error fetching doctor patients", DT: null };
    }
};

// ---------------------------------------------------------
export const fetchDetailPaymentData = async ( paymentId ) => {
    try {
        const response = await axios.get(`/api/doctor/payment/detail/read/${ paymentId }`);
        return response;
    } catch (error) {
        console.error("Error fetching doctor patients:", error.response ? error.response.data : error.message);
        return { EC: -1, EM: "Error fetching doctor patients", DT: null };
    }
};
