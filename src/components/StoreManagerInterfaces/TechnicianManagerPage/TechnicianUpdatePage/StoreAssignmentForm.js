import { useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
import { ConfirmButton } from "../../../commons/ActionButtons";
import { getAllStores } from "../../../../services/StoreService";
import { toast } from "react-toastify";

const StoreAssignment = ({ store, onSubmitRequest }) => {
    const [form, setForm] = useState({
        from_store_id: "",
        to_store_id: "",
        reason: ""
    });
    const [allStores, setAllStores] = useState([]);

    useEffect(() => {
        if (store) {
            setForm(prev => ({ ...prev, from_store_id: store.store_id || "" }));
        }
    }, [store]);

    useEffect(() => {
        const getStoresData = async () => {
            try {
                const res = await getAllStores();
                if (res.EC === 0) {
                    setAllStores(res.DT);
                } else {
                    toast.error(res.EM);
                }
            } catch (err) {
                console.error(err);
                toast.error("Lỗi khi tải danh sách cửa hàng");
            }
        };
        getStoresData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.to_store_id || !form.reason) {
            toast.warning("Vui lòng chọn cửa hàng muốn chuyển đến và nhập lý do!");
            return;
        }
        onSubmitRequest(form);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card" style={{ backgroundColor: "#f8fafc" }}>
                <div className="card-body">
                    <div className="mb-3">
                        <TextField
                            label="Cửa hàng hiện tại"
                            value={
                                allStores.find(s => s.store_id === form.from_store_id)?.name || ""
                            }
                            fullWidth
                            disabled
                        />
                    </div>
                    <div className="mb-3">
                        <TextField
                            select
                            label="Chọn cửa hàng muốn chuyển đến"
                            name="to_store_id"
                            value={form.to_store_id}
                            onChange={handleChange}
                            fullWidth
                        >
                            {allStores
                                .filter(s => s.store_id !== form.from_store_id)
                                .map(store => (
                                    <MenuItem key={store.store_id} value={store.store_id}>
                                        {store.name}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </div>
                    <div className="mb-3">
                        <TextField
                            label="Lý do yêu cầu"
                            name="reason"
                            value={form.reason}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            fullWidth
                        />
                    </div>
                    <ConfirmButton type="submit">
                        Gửi yêu cầu đổi cửa hàng
                    </ConfirmButton>
                </div>
            </div>
        </form>
    );
};

export default StoreAssignment;
