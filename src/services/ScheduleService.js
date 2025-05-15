import { json } from "react-router-dom";
import axios from "../setUp/axios";

// ---------------------------------------------------------
export const fetchDoctorSchedules = async (userId) => {
    try {
        const response = await axios.get(`/api/doctor/manager-schedule/read/${userId}`);
        return response;
    } catch (error) {
        console.error("Error fetching doctor schedules:", error.response ? error.response.data : error.message);
        return { EC: -1, EM: "Error fetching doctor schedules", DT: null };
    }
};

// ---------------------------------------------------------
export const fetchDoctorSchedule = async (userId, scheduleId) => {
    try {
        const response = await axios.get(`/api/schedule/read/${userId}`);
        return response;
    } catch (error) {
        console.error("Error fetching doctor schedules:", error.response ? error.response.data : error.message);
        return { EC: -1, EM: "Error fetching doctor schedules", DT: null };
    }
};

// ---------------------------------------------------------
export const fetchEditableTimeSlots = async (scheduleId, date, userId) => {
    try {
        const response = await axios.get(`/api/schedules/available-timeslots/?scheduleId=${scheduleId}&date=${date}&userId=${userId}`);
        return response;
    } catch (error) {
        console.error("FetchFalse", error.response ? error.response.data : error.message);
        return { EC: -1, EM: "Error fetching doctor schedules", DT: null };
    }
};

// ---------------------------------------------------------
export const fetchScheduleAndTimeSlot = async (userId, date) => {
    try {
        const response = await axios.get(`/api/schedule-timeslot/read/${userId}?date=${date}`);
        return response;
    } catch (error) {
        console.error("Error fetching doctor schedules:", error.response ? error.response.data : error.message);
        return { EC: -1, EM: "Error fetching doctor schedules", DT: null };
    }
};

// ---------------------------------------------------------
export const createSchedule = async (schedules) => {
    try {
        console.log("schedules", schedules);
        const response = axios.post("/api/schedule/create", { schedules });
        return response;
    } catch (error) {
        console.error("FetchFalse:", error);
        return null;
    }
};

// ---------------------------------------------------------
export const updateSchedule = async (scheduleData) => {
    try {
        const response = await axios.put(`/api/update-schedule`, scheduleData);
        return response;
    } catch (error) {
        console.error("FetchFalse:", error);
        return null;
    }
};

