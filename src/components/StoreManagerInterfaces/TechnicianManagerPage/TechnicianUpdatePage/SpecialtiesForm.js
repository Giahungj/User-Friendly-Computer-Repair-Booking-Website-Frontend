import { useState, useEffect } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { ConfirmButton } from "../../../commons/ActionButtons";
import { getSpecialties } from "../../../../services/specialtySevice";
import { toast } from "react-toastify";

const SpecialtiesForm = ({ spec, onUpdateSpecialties }) => {
    const [form, setForm] = useState({
        specialties: spec?.map(item => ({
            specialty_id: item.specialty_id,
            name: item.name
        })) || []
    });
    const [allSpecialties, setAllSpecialties] = useState([]);

    useEffect(() => {
        setForm({
            specialties: spec?.map(item => ({
                specialty_id: item.specialty_id,
                name: item.name
            })) || []
        });
    }, [spec]);

    const handleToggle = (id, name) => {
        const exists = form.specialties.some(s => s.specialty_id === id);
        const updated = exists
            ? form.specialties.filter(s => s.specialty_id !== id)
            : [...form.specialties, { specialty_id: id, name }];

        setForm({ ...form, specialties: updated });

        if (exists) {
            toast.info(`Bỏ chọn chuyên môn:  ${id} - ${name}`);
        } else {
            toast.success(`Đã chọn chuyên môn:  ${id} - ${name}`);
        }
    };

    useEffect(() => {
        const getSecialtyData = async () => {
            try {
                const res = await getSpecialties();
                if (res.EC === 0) {
                    setAllSpecialties(res.DT);
                } else {
                    toast.error(res.EM);
                }
            } catch (err) {
                console.error(err);
                toast.error("Lỗi khi tải danh sách chuyên môn");
            }
        };
        getSecialtyData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateSpecialties(form);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card" style={{ backgroundColor: "#f8fafc" }}>
                <div className="card-body">
                    <div className="mb-3">
                        {allSpecialties.map(spec => (
                            <div key={spec.specialty_id} className="mb-2">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={form.specialties.some(
                                                s => s.specialty_id === spec.specialty_id
                                            )}
                                            onChange={() => handleToggle(spec.specialty_id, spec.name)}
                                        />
                                    }
                                    label={spec.name}
                                />
                            </div>
                        ))}
                    </div>
                    <ConfirmButton type="submit">
                        Cập nhật thông tin
                    </ConfirmButton>
                </div>
            </div>
        </form>
    );
};

export default SpecialtiesForm;
