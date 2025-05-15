import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchHistoryBookings } from "../../services/BookingService";
import { RevolvingDot } from "react-loader-spinner";
import { toast } from "react-toastify";
import {
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Typography,
  Rating,
  TextField,
} from "@mui/material";
import { AuthContext } from "../../context/AuthContext";

// Component hiển thị thông báo không có dữ liệu
const EmptyState = ({ title, message }) => (
  <div className="container vh-100">
    <div className="text-center py-5">
      <h1 className="text-danger fw-bold">{title}</h1>
      <p className="text-muted">{message}</p>
    </div>
  </div>
);

// Component hiển thị loading
const LoadingState = () => (
    <div className="loading-container">
        <RevolvingDot color="#6edff6" />
        <div className="loading-content">Đang tải chờ xíu ...</div>
    </div>
);

// Component chính
const BookingsHistory = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState("");
    const { auth } = useContext(AuthContext);

    // Lấy dữ liệu lịch sử khám
    const fetchBookings = async (timeRange) => {
        setLoading(true);
        try {
            const response = await fetchHistoryBookings(auth.account.id, timeRange);
            if (response.EC === 0) {
                setBookings(response.DT.rows);
                setActive(timeRange)
            } else {
                console.error("Lỗi từ server:", response.EM);
            }
        } catch (error) {
            console.error("Lỗi khi lấy lịch sử khám:", error);
        } finally {
            setLoading(false);
        }
    };

    // Gọi API khi component mount
    useEffect(() => {
        fetchBookings();
        setActive("week");
    }, []);

    // Điều hướng đến chi tiết lịch hẹn
    const handleBookingClick = (bookingId) => navigate(`/bookings/history/${bookingId}`);

    // Kiểm tra nếu là bác sĩ
    if (auth.account.userType === "doctor") {
        return (
        <EmptyState
            title="Bạn là bác sĩ mà."
            message="Đăng ký bệnh nhân đi rồi đi khám! Hệ thống chưa hỗ trợ bác sĩ đặt lịch khám."
        />
        );
    }

    // Trạng thái loading
    if (loading) return <LoadingState />;

    // Không có lịch hẹn
    if (bookings.length === 0) {
        return (
            <>
                <div className="container py-4">
                    <div className="row my-2 align-items-center">
                        <div className="col">
                        <h4>Lịch sử khám bệnh</h4>
                        </div>
                        <div className="col text-end">
                        <ButtonGroup aria-label="Filter time range">
                            <Button variant={active === "week" ? "contained" : "outlined"} onClick={() => fetchBookings("week")} > Tuần này </Button>
                            <Button variant={active === "month" ? "contained" : "outlined"} onClick={() => fetchBookings("month")} >Tháng này</Button>
                            <Button variant={active === "older" ? "contained" : "outlined"} onClick={() => fetchBookings("older")} >Cũ nhất</Button>
                        </ButtonGroup>
                        </div>
                    </div>
                </div>
                <EmptyState
                    title="Không có lịch sử các cuộc hẹn."
                    message="Vui lòng kiểm tra lại hoặc đặt lịch mới!"
                />
            </>
        );
    }

    // Giao diện chính khi có dữ liệu
    return (
        <div className="container py-4">
            <div className="row my-2 align-items-center">
                <div className="col">
                <h4>Lịch sử khám bệnh</h4>
                </div>
                <div className="col text-end">
                <ButtonGroup variant="text" aria-label="Filter time range">
                    <Button variant={active === "week" ? "contained" : "outlined"} onClick={() => fetchBookings("week")} > Tuần này </Button>
                    <Button variant={active === "month" ? "contained" : "outlined"} onClick={() => fetchBookings("month")} >Tháng này</Button>
                    <Button variant={active === "older" ? "contained" : "outlined"} onClick={() => fetchBookings("older")} >Cũ nhất</Button>
                </ButtonGroup>
                </div>
            </div>

            <div className="mx-5">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
                {bookings.map((booking) => (
                    <div key={booking.id} className="col">
                    <Card className="hover:scale-110" sx={{ height: "100%", cursor: "pointer" }} onClick={() => handleBookingClick(booking.id)}>
                        <CardMedia
                        component="img"
                        height="200"
                        image={`http://localhost:8080/images/uploads/${booking.Schedule.Doctor.User.avatar}`}
                        alt={booking.Schedule.Doctor.User.name}
                        />
                        <CardContent>
                            <h6>BS. {booking.Schedule.Doctor.User.name}</h6>
                            <Typography className="text-warning fw-bold" variant="body2">
                                Giá khám:{" "}{booking.Schedule.Doctor.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Phòng khám:</strong> {booking.Schedule.Doctor.Facility.name}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Địa chỉ:</strong> {booking.Schedule.Doctor.Facility.address}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Hoàn thành:</strong>{" "}
                                {new Date(booking.History.createdAt).toLocaleString("vi-VN", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                })}
                            </Typography>
                        </CardContent>
                    </Card>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
};

export default BookingsHistory;