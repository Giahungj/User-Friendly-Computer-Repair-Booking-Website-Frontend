import axios from "../setUp/axios";

const fetchFacilities = async () => {
    try {
        const response = await axios.get(`api/facilities/read`);
        return response;
    } catch (error) {
        console.error("Fetch failed:", error);
        return null;
    }
};

const fetchFacilityById = async (facilityId) => {
    try {
        const response = await axios.get(`api/facilities/read/${facilityId}`);
        return response;
    } catch (error) {
        console.error("Fetch facility failed:", error);
        return null;
    }
};

export { fetchFacilities, fetchFacilityById };