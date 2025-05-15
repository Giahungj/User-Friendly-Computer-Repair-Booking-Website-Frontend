import axios from "../setUp/axios";

const fetchSpecialties = async () => {
    try {
        const response = await axios.get('api/specialties/read');
        return response;
    } catch (error) {
        console.error("Fetch failed:", error);
        return null;
    }
};

const fetchSpecialtyById = async (id) => {
    try {
        const response = await axios.get(`api/specialties/read/${id}`);
        return response;
    } catch (error) {
        console.error("Fetch failed:", error);
        return null;
    }
};
export { 
    fetchSpecialties,
    fetchSpecialtyById
};