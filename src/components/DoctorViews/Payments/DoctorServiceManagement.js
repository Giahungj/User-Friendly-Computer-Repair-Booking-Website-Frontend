import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDoctorServices, upgradeDoctorService } from "../../../services/DoctorServiceService";
import { AuthContext } from "../../../context/AuthContext";
import { Table, TableHead, TableBody, TableRow, TableCell, Select, Box, MenuItem, Button, FormControlLabel, Switch, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

const DoctorServiceManagement = () => {
    const { auth } = useContext(AuthContext);
    const doctorId = auth?.account?.doctorId;
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState("");
    const [mode, setMode] = useState("view");
    const [isChecked, setIsChecked] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 

    const hasMedium = services.some(s => s.Service?.id === 2 && s.status === 'Đang kích hoạt');
    const hasPremium = services.some(s => s.Service?.id === 3 && s.status === 'Đang kích hoạt');
    useEffect(() => {
        if (!doctorId) return;
        const loadServices = async () => {
            setLoading(true);
            const data = await fetchDoctorServices(doctorId);
            if (data.EC === 0) {
                console.log("Dịch vụ đã đăng ký:", data.DT);
                setServices(data.DT);
            }
            setLoading(false);
        };
        loadServices();
    }, [doctorId]);

    const handleChange = (event) => setIsChecked(event.target.checked);

    const handleUpgrade = async () => {
        if (!hasPremium && !hasMedium) {
            return toast.info(
                "Bạn chưa đăng ký gói dịch vụ nào! Vui lòng đăng ký dịch vụ để sử dụng chức năng này."
            );
        }
        if (hasPremium) {
            return toast.info(
                "Bạn đang sử dụng gói Cao nhất của hệ thống (Premium) — không thể nâng cấp hoặc hạ cấp!"
            );
        }
        setLoading(true);
        try {
            if (!doctorId) return toast.warning("Bạn cần đăng nhập để nâng cấp!");
            if (!selectedService) return toast.warning("Vui lòng chọn gói dịch vụ!");
    
            const isAlreadySubscribed = services.some(service => service.serviceId === selectedService && service.status === 'active');
            if (isAlreadySubscribed) return toast.info("Bạn đã đăng ký gói này!");
    
            try {
                const result = await upgradeDoctorService(doctorId, selectedService);
                if (result.EC === 0) {
                    toast.success("Nâng cấp thành công!");
                    setMode("view");
                } else {
                    toast.error(result.EM || "Lỗi nâng cấp!");
                }
            } catch (error) {
                console.error("Lỗi khi gọi API nâng cấp:", error);
                toast.error("Không thể nâng cấp. Vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Lỗi không xác định:", error);
            toast.error("Đã xảy ra lỗi!");
        } finally {
            setLoading(false);
        }
    };
    
    if (!auth.isAuthenticated) return <p>Vui lòng đăng nhập</p>;
    if (loading) return 
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
            <CircularProgress size="lg" />
        </Box>
    return (
        <div className="container mt-4">
            <h2 className="text-primary">Quản lý dịch vụ</h2>
            {mode === "view" ? (    
                <>
                    <div className="d-flex my-2 justify-content-between">
                        <h3 className="text-secondary">Dịch vụ đã đăng ký</h3>
                        <FormControlLabel
                            control={<Switch checked={isChecked} onChange={handleChange} color="primary" />}
                            label="Tự động gia hạn"
                        />
                    </div>

                    {loading ? (
                        <div className="text-center my-3">
                            <CircularProgress />
                        </div>
                    ) : Array.isArray(services) && services.length > 0 ? (
                        <>
                            <Table className="table table-bordered mt-3">
                                <TableHead className="table-primary">
                                    <TableRow>
                                        <TableCell>Tên dịch vụ</TableCell>
                                        <TableCell>Ngày đăng ký</TableCell>
                                        <TableCell>Đã sử dụng</TableCell>
                                        <TableCell>Hết hạn</TableCell>
                                        <TableCell>Trạng thái</TableCell>
                                        <TableCell>Còn lại</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {services.map((service) => (
                                        <TableRow key={service.id}>
                                            <TableCell><strong>{service.Service.name}</strong></TableCell>
                                            <TableCell>{service.startDate}</TableCell>
                                            <TableCell>{service.appointmentCount}/{service.Service.maxAppointments} (lần tạo lịch)</TableCell>
                                            <TableCell>{service.expiryDate}</TableCell>
                                            <TableCell>{service.status}</TableCell>
                                            <TableCell>
                                            {service.status === 'Đang kích hoạt' && service.daysRemaining > 0 ? (
                                                <span className="badge bg-success">{service.daysRemaining} ngày</span>
                                            ) : (
                                                <span className="badge bg-danger">0 ngày</span>
                                            )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            <Button variant="contained" color="primary" className="mt-3" onClick={() => setMode("upgrade")}>
                                Nâng cấp dịch vụ
                            </Button>
                        </>
                    ) : (
                        <>
                            <p className="alert alert-warning">Không có dịch vụ nào.</p>
                            <Button variant="contained" color="primary" className="mt-3" onClick={() => navigate("/doctor/service-pricing")}>
                                Đi đăng ký
                            </Button>
                        </>
                    )}
                </>
            ) : (
                <>
                    <h3 className="text-secondary">Nâng cấp dịch vụ</h3>
                    <div className="row">
                        <div className="col-md-6">
                        {!hasPremium ? (
                            <>
                                <Select
                                    fullWidth
                                    value={selectedService}
                                    onChange={e => setSelectedService(e.target.value)}
                                    displayEmpty
                                >
                                    <MenuItem value="" disabled>Chọn gói nâng cấp</MenuItem>

                                    {/* Chỉ hiện Medium nếu chưa có Medium */}
                                    {!hasMedium && (
                                        <MenuItem value={2}>Gói Trung Bình (299.000 đ/tháng)</MenuItem>
                                    )}
                                    <MenuItem value={3}>Gói Cao Cấp (499.000 đ/tháng)</MenuItem>
                                </Select>

                                {/* Nếu chưa chọn gì, hiển thị nhắc */}
                                {!selectedService && (
                                    <div className="alert alert-warning mt-2">
                                        Vui lòng chọn gói dịch vụ để tiếp tục.
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="alert alert-info">
                                Bạn đang sử dụng <strong>gói cao cấp</strong>. Vui lòng gia hạn để tiếp tục dịch vụ.
                            </div>
                        )}
                        </div>
                    </div>

                    <div className="mt-3">
                        <Button variant="contained" color="success" onClick={handleUpgrade} disabled={loading}>
                            {loading ?  <> <CircularProgress size={24} className="me-2" /> Đang thực hiện nâng cấp </> : "Xác nhận nâng cấp"}
                        </Button>
                        <Button variant="outlined" color="secondary" className="ms-2" onClick={() => setMode("view")}>
                            Quay lại
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default DoctorServiceManagement;
