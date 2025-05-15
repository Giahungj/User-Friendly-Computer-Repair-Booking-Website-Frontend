import React, { useEffect, useState, useContext } from "react";
import { Card, CardContent, Typography, Button, List, ListItem, Box, CircularProgress } from "@mui/material";
import { fetchAvailableServices, registerDoctorService } from "../../../services/DoctorServiceService";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";

const DoctorServicePricing = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true); // Thêm state loading
    const { auth } = useContext(AuthContext);
    const doctorId = auth?.account?.doctorId;

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetchAvailableServices();
                if (res?.EC === 0) {
                    setServices(res.DT);
                } else {
                    toast.error("Không thể tải dịch vụ");
                }
            } catch (error) {
                toast.error("Lỗi kết nối");
            } finally {
                setLoading(false); // Đặt loading là false sau khi tải xong
            }
        };
        fetchServices();
    }, []);

    const handleRegisterService = async (serviceId) => {
        if (!doctorId) {
            toast.error("Lỗi: Không tìm thấy ID bác sĩ.");
            return;
        }

        const res = await registerDoctorService(doctorId, serviceId);
        if (res?.EC === 0) {
            toast.success("Đăng ký thành công!");
        } else if (res?.EC !== 1) {
            toast.warning(
                <div>
                    Thông báo: {res.EM}{" "}
                    <a href="http://localhost:3000/doctor/service-management">
                        Vui lòng kiểm tra lại thông tin ở đây.
                    </a>
                </div>
            );
        } else {
            toast.error(`Lỗi: ${res.EM || "Không thể đăng ký dịch vụ"}`);
        }
    };

    return (
        <div className="container py-5 vh-100">
            <h1 className="text-center mb-4">Đăng ký Gói dịch vụ dành cho bác sĩ chuyên môn</h1>
            <p className="text-center mb-4">
                Chọn gói dịch vụ phù hợp với nhu cầu của bạn. <br />
                Nếu bạn không chắc chắn, hãy thử ngay gói <span className="fw-bold text-green-400">Trung bình</span> <br />
                Để trải nghiệm các tính năng cơ bản, và nâng cấp sau khi đã quen với dịch vụ!
            </p>

            <div className="row g-4">
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <CircularProgress size="lg" />
                    </Box>
                ) : (
                    services.map((service) => (
                        <div key={service.id} className="col-12 col-md-6 col-lg-4">
                            <Card
                                sx={{
                                    backgroundColor: "#fff",
                                    color: "#000",
                                    border: `2px solid ${service.id === 1 ? "#ccc" : service.id === 2 ? "#4CAF50" : "#FFD700"}`,
                                    borderRadius: 2,
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    boxShadow: 3,
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                                className="shadow-sm hover"
                            >
                                {service.recommended && (
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            backgroundColor:
                                                service.id === 1 ? "#ccc" : service.id === 2 ? "#4CAF50" : "#FFD700",
                                            color: "#fff",
                                            fontSize: "0.9rem",
                                            fontWeight: "bold",
                                            px: 2,
                                            py: 1,
                                            borderRadius: "0 0 10px 10px",
                                        }}
                                    >
                                        🌟 Khuyên dùng
                                    </Box>
                                )}

                                <CardContent className="mt-5 text-center d-flex flex-column flex-grow-1">
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        sx={{
                                            color:
                                                service.id === 1 ? "#666" : service.id === 2 ? "#4CAF50" : "#FFD700",
                                        }}
                                    >
                                        {service.name}
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        fontWeight="bold"
                                        sx={{
                                            my: 2,
                                            color:
                                                service.id === 1 ? "#666" : service.id === 2 ? "#4CAF50" : "#FFD700",
                                        }}
                                    >
                                        {service.price === 0 ? "Miễn phí" : `${service.price}/tháng`}
                                    </Typography>

                                    <List sx={{ flexGrow: 1 }}>
                                        {service.features?.split("\n").map((feature, idx) => (
                                            <ListItem key={idx} sx={{ justifyContent: "center" }}>
                                                {feature}
                                            </ListItem>
                                        ))}
                                    </List>

                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor:
                                                service.id === 1 ? "#ccc" : service.id === 2 ? "#4CAF50" : "#FFD700",
                                            color: "#fff",
                                            "&:hover": {
                                                backgroundColor:
                                                    service.id === 1 ? "#ccc" : service.id === 2 ? "#45a045" : "#e6c200",
                                            },
                                            "&.Mui-disabled": {
                                                backgroundColor: "#ccc",
                                                color: "#fff",
                                            },
                                        }}
                                        className="mt-3"
                                        onClick={() => handleRegisterService(service.id)}
                                        disabled={service.id === 1} // Vô hiệu hóa cho id=1
                                    >
                                        {service.id === 1 ? "Gói mặc định" : "Chọn gói này"}
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default DoctorServicePricing;