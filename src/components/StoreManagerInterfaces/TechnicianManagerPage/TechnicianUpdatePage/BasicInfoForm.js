import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { ConfirmButton } from "../../../commons/ActionButtons";

const BasicInfoForm = ({ tech, onUpdateBasicInfo }) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        if (tech?.User) {
            setForm({
                name: tech.User.name || "",
                email: tech.User.email || "",
                phone: tech.User.phone || "",
            });
        }
    }, [tech]);

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateBasicInfo(form);
  };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card" style={{ backgroundColor: "#f8fafc" }}>
                <div className="card-body">
                    <div className="mb-3">
                        <TextField
                        label="Tên"
                        fullWidth
                        value={form.name}
                        onChange={e => handleChange("name", e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <TextField
                        label="Email"
                        fullWidth
                        value={form.email}
                        onChange={e => handleChange("email", e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <TextField
                        label="SĐT"
                        fullWidth
                        value={form.phone}
                        onChange={e => handleChange("phone", e.target.value)}
                        />
                    </div>
                    <ConfirmButton type="submit">
                        Cập nhật thông tin
                    </ConfirmButton>
                </div>
            </div>
        </form>
    );
};

export default BasicInfoForm;
