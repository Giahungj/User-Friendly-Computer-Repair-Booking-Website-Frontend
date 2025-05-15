import axios from '../setUp/axios';

const searchEntities = async (keyword) => {
    try {
        const response = await axios.get(`api/search-all?keyword=${keyword}`);
        return response;
    } catch (error) {
        console.error("Search failed:", error);
        return null;
    }
};

const searchService = async (keyword) => {
    try {
        const response = await axios.get(`/api/search?keyword=${keyword}`);
        return response;
    } catch (error) {
        console.error("Lỗi khi lấy gợi ý:", error);
        return [];
    }
}

const searchPatientService = async (query, doctorId) => {
    try {
        const response = await axios.get(`/api/search-patient/${doctorId}?query=${encodeURIComponent(query)}`);
        return response;
    } catch (error) {
        console.error("Lỗi khi lấy gợi ý:", error);
        return [];
    }
}

export default { 
    searchEntities,
    searchService, 
    searchPatientService 
};
