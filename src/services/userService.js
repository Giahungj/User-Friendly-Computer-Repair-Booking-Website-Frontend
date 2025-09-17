import axios from "../setUp/axios";

const registerNewUser = (email, phone, username, password) => axios.post("/api/register", { email, phone, username, password });
const loginUser = (email, password) => axios.post("/api/login", { email, password });
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
const fetchAllDoctor = () => axios.get("/api/doctor/read");
const fetchDoctor = (id) => axios.get(`/api/doctor/read/${id}`);
const fetchBooking = (id) => axios.get(`/api/booking/read/${id}`);
export {
    registerNewUser, loginUser, fetchAllUser, deleteUser,
    createNewUser, updateCurrentUser, getUserAccount,
    fetchAllDoctor, fetchDoctor, fetchBooking
};
