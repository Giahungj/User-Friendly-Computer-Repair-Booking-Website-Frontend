import axios from "../setUp/axios";

export const ratingDoctor = async (ratingData) => {
    const response = await axios.post(`/api/rating/create`, {ratingData});
    return response;
}
