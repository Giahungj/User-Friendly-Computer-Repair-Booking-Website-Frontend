import axios from "../setUp/axios";

// ---------------------------------------------------------
const fetchConfirmBooking = async (scheduleID, patientID) => {
    try {
        const response = await axios.get(`/api/booking/confirm/?scheduleID=${scheduleID}&patientID=${patientID}`);
        return response;
    } catch (error) {
        console.error("Lỗi khi gọi API:", error.response ? error.response.data : error.message);
        return { EC: -1, EM: "Lỗi kết nối đến server", DT: null };
    }
};

// ---------------------------------------------------------
const fetchBookingDetail = async (bookingId) => {
    const response = await axios.get(`/api/booking/read/${bookingId}`);
    return response;
}

// ---------------------------------------------------------
const fetchHistoryBookingDetail = async (bookingId) => {
    const response = await axios.get(`/api/booking/history/read/${bookingId}`);
    return response;
}

// ---------------------------------------------------------
const fetchUpcomingBookings = async (patientId) => {
    const response = await axios.get(`/api/booking/upcomingbooking/read/${patientId}`);
    return response;
};

// ---------------------------------------------------------
const fetchHistoryBookings = async (userId, timeRange) => {
    const response = await axios.get(`/api/booking/historybooking/read/${userId}?timeRange=${timeRange}`);
    return response;
};

// ---------------------------------------------------------
const fetchDoctorBookingHistory = async (doctorId, timeRange) => {
    try {
        const response = await axios.get(`/api/doctor/manager-booking/booking-history/read/${doctorId}?timeRange=${timeRange}`);
        console.log("Dữ liệu phản hồi từ Service: ", response)
        return response;
    } catch (error) {
        console.error("Lỗi khi lấy lịch sử đặt lịch:", error);
        return { data: { EC: 1, EM: "Không thể tải dữ liệu", DT: [] } };
    }
};

// ---------------------------------------------------------
const fetchDoctorBookingsToday = async (userId, today) => {
    try {
        const response = await axios.get(`/api/doctor/manager-booking/bookings-today/read/${userId}?date=${today}`);
        return response;
    } catch (error) {
        console.error("Lỗi khi lấy lịch làm việc:", error);
        return { EC: 1, EM: "Không thể lấy lịch làm việc", DT: [] };
    }
};

// ---------------------------------------------------------
const fetchDoctorCompleteBooking = async (data) => {
    try {
        const response = await axios.post(`/api/doctor/manager-booking/complete-booking/update/`, data);
        console.log('Hoàn thành khám: ', response);
        return response;
    } catch (error) {
        console.error("Lỗi khi hoàn thành khám:", error);
        return { EC: 1, EM: "Không thể hoàn thành khám", DT: null };
    }
};

// ---------------------------------------------------------
const createBooking = (bookingData) => {
    return axios.post(`/api/booking/create`, bookingData);
};

// ---------------------------------------------------------
const cancelBooking = (bookingId) => {
    return axios.post(`/api/booking/cancel`, { bookingId });
};

// ---------------------------------------------------------
export { 
    fetchConfirmBooking, 
    fetchBookingDetail, 
    fetchHistoryBookingDetail,
    fetchUpcomingBookings, 
    fetchDoctorBookingsToday,
    fetchHistoryBookings,
    fetchDoctorCompleteBooking,
    
    createBooking, 
    cancelBooking, 

    fetchDoctorBookingHistory,
 };