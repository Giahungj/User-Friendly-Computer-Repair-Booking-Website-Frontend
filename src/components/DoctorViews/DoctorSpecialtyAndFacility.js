import { useEffect, useState, useContext } from "react";
import { RevolvingDot } from "react-loader-spinner";
import { fetchDoctorById, updateDoctor } from "../../services/doctorService";
import { Card, CardContent, Typography, CircularProgress, Button, TextField } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const DoctorSpecialtyAndFacility = () => {
    const { auth } = useContext(AuthContext);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!auth.account.doctorId) return;
        (async () => {
            try {
                const response = await fetchDoctorById(auth.account.doctorId);
                setData(response.DT.doctor);
            } catch {
                setError("Không thể tải thông tin.");
            } finally {
                setLoading(false);
            }
        })();
    }, [auth.account.doctorId]);

    console.log(data)
    if (error) return <Typography color="error">{error}</Typography>;

    const { User, experience, price, infor, Specialty, Facility } = data || {};

    const DoctorInfoCard = ({ User, experience, price, infor }) => {
        const [editing, setEditing] = useState(false);
        const [formData, setFormData] = useState({
            doctorId: auth.account.doctorId,
            name: User.name,
            experience,
            price,
            infor
        });

        const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };

        const handleSave = async () => {
            try {
                const response = await updateDoctor(formData);
                if (response.EC === 0) {
                    toast.success("Cập nhật thành công");
                    setData((prev) => ({ ...prev, ...formData }));
                    setEditing(false);
                } else {
                    toast.error(response.EM);
                }
            } catch {
                toast.error("Lỗi kết nối API");
            }
        };

        return (
            <div className="col-md-4 d-flex align-items-stretch mb-3">
                <Card className="w-100 d-flex flex-column">
                    <CardContent className="flex-grow-1 d-flex flex-column">
                        <Typography variant="h5">Thông tin bác sĩ</Typography>
                        <TextField label="Bác sĩ" name="name" value={formData.name} onChange={handleChange} fullWidth margin="dense" InputProps={{ readOnly: !editing }} />
                        <TextField label="Kinh nghiệm" name="experience" value={formData.experience} onChange={handleChange} fullWidth margin="dense" InputProps={{ readOnly: !editing, endAdornment: <Typography sx={{ ml: 1 }}>năm</Typography> }} />
                        <TextField label="Giá khám" name="price" value={formData.price} onChange={handleChange} fullWidth margin="dense" InputProps={{ readOnly: !editing }} />
                        <TextField label="Mô tả" name="infor" value={formData.infor} onChange={handleChange} fullWidth margin="dense" multiline rows={4} InputProps={{ readOnly: !editing }} />
                        <div className="mt-auto d-flex justify-content-end">
                            {editing ? (
                                <>
                                    <Button variant="contained" color="secondary" onClick={() => setEditing(false)}>Hủy</Button>
                                    <Button variant="contained" color="primary" onClick={handleSave} sx={{ ml: 1 }}>{loading ? "Đang lưu ..." : "Lưu"}</Button>
                                </>
                            ) : (
                                <Button variant="contained" color="primary" onClick={() => setEditing(true)}>Cập nhật</Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    };

    const SpecialtyInfoCard = ({ Specialty }) => (
        <div className="col-md-4 d-flex align-items-stretch mb-3">
            <Card className="w-100 d-flex flex-column">
                <CardContent className="flex-grow-1 d-flex flex-column">
                    <Typography variant="h5">Thông tin chuyên khoa</Typography>
                    <TextField label="Chuyên khoa" value={Specialty.name} fullWidth margin="dense" InputProps={{ readOnly: true }} />
                    <TextField label="Mô tả" value={Specialty.description} fullWidth margin="dense" multiline rows={4} InputProps={{ readOnly: true }} />
                </CardContent>
            </Card>
        </div>
    );

    const FacilityInfoCard = ({ Facility }) => (
        <div className="col-md-4 d-flex align-items-stretch mb-3">
            <Card className="w-100 d-flex flex-column">
                <CardContent className="flex-grow-1 d-flex flex-column">
                    <Typography variant="h5">Thông tin cơ sở</Typography>
                    <TextField label="Cơ sở" value={Facility.name} fullWidth margin="dense" InputProps={{ readOnly: true }} />
                    <TextField label="Địa chỉ" value={Facility.address} fullWidth margin="dense" InputProps={{ readOnly: true }} />
                    <TextField label="Liên hệ" value={Facility.phone} fullWidth margin="dense" InputProps={{ readOnly: true }} />
                </CardContent>
            </Card>
        </div>
    );
    if (loading) return (
        <div className="loading-container">
            <RevolvingDot color="#6edff6" />
            <div className="loading-content">Đang tải chờ xíu ...</div>
        </div>
    )
    return (
        <div className="container py-4">
            <div className="row">
                <DoctorInfoCard User={User} experience={experience} price={price} infor={infor} />
                <SpecialtyInfoCard Specialty={Specialty} />
                <FacilityInfoCard Facility={Facility} />
            </div>
        </div>
    );
};

export default DoctorSpecialtyAndFacility;
