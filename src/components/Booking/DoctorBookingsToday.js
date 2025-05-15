import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDoctorBookingsToday } from "../../services/BookingService";
import { Box, CircularProgress }  from '@mui/material';
import { Verified, Alarm } from '@mui/icons-material';
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import ConfirmVisitCompletionForm from "./ConfirmVisitCompletionForm";

const DoctorBookingsToday = () => {
    const { id } = useParams();
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedBooking, setSelectedBooking] = useState(null);

    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
    useEffect(() => {
        if (!auth || !auth.isAuthenticated) {
            toast.error("Bạn cần đăng nhập để thực hiện hành động này!");
            navigate("/login");
            return;
        }
        const fetchSchedule = async () => {
            try {
                const today = new Date().toISOString().split("T")[0];
                const response = await fetchDoctorBookingsToday(id, today);
                if (response.EC === 0) {
                setBookings(response.DT);
                } else {
                setError(response.EM);
                }
            } catch (err) {
                setError("Lỗi khi tải lịch làm việc.");
            } finally {
                setLoading(false);
            }
        };
        fetchSchedule();
    }, [id]);

    const handleCardClick = (booking) => {
        setSelectedBooking(booking); // Chọn booking để hiển thị form
    };

    const handleFormClose = () => {
        setSelectedBooking(null); // Đóng form
    };

    if (loading) return 
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
            <CircularProgress size="lg" />
        </Box>
    if (error)
        return (
        <div className="p-4 bg-white shadow rounded">
            <h3 className="text-center mb-3">Lịch hẹn hôm nay</h3>
            <p className="text-muted text-center">{error}</p>
        </div>
    );

    return (
        <div className="container my-5 position-relative">
            <div>
                <div className="d-flex justify-content-center">
                    {selectedBooking && selectedBooking.status !== 2 && (
                        <ConfirmVisitCompletionForm
                            doctorId={id}
                            bookingId={selectedBooking.id}
                            patientId={selectedBooking.patient.id}
                            date={selectedBooking.date}
                            patientName={selectedBooking.patient.name}
                            initialCondition=""
                            initialRevisitTime=""
                            onClose={handleFormClose}
                        />
                    )}
                </div>
                <h1 className="text-center mb-3 pb-3 border-bottom">Lịch hẹn hôm nay</h1>
                <div className="p-4">
                    {bookings.length > 0 ? (
                    <div className="row row-cols-4">
                        {bookings.map((booking, index) => (
                            <div key={index} className="col mb-3">
                                <div 
                                    className={`card card-booking-today relative transition-transform hover:scale-105 ${
                                        booking.status === "Đã khám xong" ? "opacity-80 cursor-not-allowed" : "cursor-pointer"
                                    }`} 
                                    onClick={booking.status === "Đã khám xong" ? null : () => handleCardClick(booking)}
                                >   
                                    <div className="card-header text-secondary bg-light d-flex justify-content-center align-items-center">
                                        <span><Alarm className="me-2" color="success"/></span>
                                        <span>
                                            {time >= booking.schedule.timeslot.startTime && time <= booking.schedule.timeslot.endTime
                                                ? "TRONG KHUNG GIỜ"
                                                : time < booking.schedule.timeslot.startTime
                                                ? "SẮP ĐẾN GIỜ"
                                                : "ĐÃ QUA"
                                            }
                                        </span>
                                    </div>
                                    {/* Card Body */}
                                    <div className="card-body bg-white">
                                        <div className="list-group">
                                            <div className="list-group-item d-flex justify-content-between align-items-center">
                                                <span>#</span>
                                                {booking.status === "Đã khám xong" && (
                                                    <Verified color="success"/>
                                                )}
                                                <span className="text-dark fs-5 fw-bold">{booking.id}</span>
                                            </div>
                                            <div className="list-group-item d-flex justify-content-between align-items-center">
                                                <span>Ngày: </span>
                                                <span className="text-dark">{booking.date}</span>
                                            </div>
                                            <div className="list-group-item d-flex justify-content-between align-items-center">
                                                <span>Thời gian: </span>
                                                <span className="text-dark">
                                                    {booking.schedule.timeslot.startTime} - {booking.schedule.timeslot.endTime}
                                                </span>
                                            </div>
                                            <div className="list-group-item d-flex justify-content-between align-items-center">
                                                <span>Trạng thái: </span>
                                                <span className={`${
                                                    booking.status === "Đã khám xong" ? "text-teal-500" : 
                                                    booking.status === "Đã qua" ? "text-gray-500" : 
                                                    booking.status === "Chưa đến" ? "text-orange-500" : "text-teal-500"
                                                }`}>
                                                    {booking.status}
                                                </span>
                                            </div>
                                            <div className="list-group-item d-flex justify-content-between align-items-center">
                                                <span>Bệnh nhân:</span>
                                                <span className="text-dark">{booking.patient.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    ) : (
                        <p className="text-muted text-center">Không có lịch hẹn hôm nay</p>
                    )}
                </div>

                <h1 className="text-center mb-3 pb-3 border-bottom">Lịch hẹn trong tương lai</h1>
                <div className="p-4">
                    {bookings.length > 0 ? (
                    <div className="row row-cols-4">
                        {bookings.map((booking, index) => (
                            <div key={index} className="col mb-3">
                                <div 
                                    className={`card card-booking-today relative transition-transform hover:scale-105 ${
                                        booking.status === "Đã khám xong" ? "opacity-80 cursor-not-allowed" : "cursor-pointer"
                                    }`} 
                                    onClick={booking.status === "Đã khám xong" ? null : () => handleCardClick(booking)}
                                >   
                                    <div className="card-header text-secondary bg-light d-flex justify-content-center align-items-center">
                                        <span><Alarm className="me-2" color="success"/></span>
                                        <span>
                                            {time >= booking.schedule.timeslot.startTime && time <= booking.schedule.timeslot.endTime
                                                ? "TRONG KHUNG GIỜ"
                                                : time < booking.schedule.timeslot.startTime
                                                ? "SẮP ĐẾN GIỜ"
                                                : "ĐÃ QUA"
                                            }
                                        </span>
                                    </div>
                                    {/* Card Body */}
                                    <div className="card-body bg-white">
                                        <div className="list-group">
                                            <div className="list-group-item d-flex justify-content-between align-items-center">
                                                <span>#</span>
                                                {booking.status === "Đã khám xong" && (
                                                    <Verified color="success"/>
                                                )}
                                                <span className="text-dark fs-5 fw-bold">{booking.id}</span>
                                            </div>
                                            <div className="list-group-item d-flex justify-content-between align-items-center">
                                                <span>Ngày: </span>
                                                <span className="text-dark">{booking.date}</span>
                                            </div>
                                            <div className="list-group-item d-flex justify-content-between align-items-center">
                                                <span>Thời gian: </span>
                                                <span className="text-dark">
                                                    {booking.schedule.timeslot.startTime} - {booking.schedule.timeslot.endTime}
                                                </span>
                                            </div>
                                            <div className="list-group-item d-flex justify-content-between align-items-center">
                                                <span>Trạng thái: </span>
                                                <span className={`${
                                                    booking.status === "Đã khám xong" ? "text-teal-500" : 
                                                    booking.status === "Đã qua" ? "text-gray-500" : 
                                                    booking.status === "Chưa đến" ? "text-orange-500" : "text-teal-500"
                                                }`}>
                                                    {booking.status}
                                                </span>
                                            </div>
                                            <div className="list-group-item d-flex justify-content-between align-items-center">
                                                <span>Bệnh nhân:</span>
                                                <span className="text-dark">{booking.patient.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    ) : (
                        <p className="text-muted text-center">Không có lịch hẹn hôm nay</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorBookingsToday;