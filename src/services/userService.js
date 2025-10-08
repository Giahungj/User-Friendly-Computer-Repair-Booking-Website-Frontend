import axios from "../setUp/axios";

const fetchAllUser = (page, limit) => axios.get(`/api/user/read?page=${page}&limit=${limit}`);
const deleteUser = (user) => axios.delete("/api/user/delete", { data: { id: user.id } });
const createNewUser = (dataUser) => axios.post("/api/user/create", dataUser);
const updateCurrentUser = async (formData) => {
    try {
        const response = await axios.put("/api/user/update", formData);
        return response;
    } catch (error) {
        console.error("FetchFalse:", error);
        return null;
    }
};
const getUserAccount = () => axios.get("/api/account");
export {
    fetchAllUser, 
    deleteUser,
    createNewUser, 
    updateCurrentUser, 
    getUserAccount,
};
