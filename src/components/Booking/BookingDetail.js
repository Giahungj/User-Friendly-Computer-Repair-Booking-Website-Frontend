import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBookingDetail, cancelBooking } from "../../services/BookingService";
import { toast } from "react-toastify";
import { Button } from '@mui/material';
import { ArrowBack, MedicalServices, Cancel } from '@mui/icons-material';

const BookingDetail = () => {
    const navigate = useNavigate();
    const { bookingId } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingOut, setBookingOut] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        const getBookingDetail = async () => {
            setLoading(true)
            try {
                const response = await fetchBookingDetail(bookingId);
                if (response.EC === 0) {
                    setData(response.DT);
                } else {
                    toast.error(response.EM)
                    setError(true)
                }
            } catch (error) {
                console.error("Lỗi khi lấy thông tin đặt lịch:", error);
                setError(true)
            } finally {
                setLoading(false);
            }
        };

        getBookingDetail();
    }, [bookingId]);

    const handleCancel = async (bookingId) => {
        try {
            const response = await cancelBooking(bookingId);
            if (response.EC === 0) {
                toast.success("Thông báo: " + response.EM);
                navigate(`/doctors/${data.Schedule.Doctor.id}`);
            } else {
                setBookingOut(true)
                toast.error("Lỗi khi hủy lịch: " + response.EM);
            }
        } catch (error) {
            console.error("Lỗi khi lấy lịch hẹn sắp tới:", error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <p className="text-center">Đang tải...</p>;
    if (!data) return <p className="text-center text-danger">Không tìm thấy thông tin đặt lịc h.</p>;
    if (error) return <p className="text-center text-danger">Lỗi khi lấy thông tin đặt lịch.</p>;
    return (
        <>
            {bookingOut ? (
                <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                    <div className="shadow-lg p-5 text-center bg-light rounded-3" style={{ maxWidth: "600px" }}>
                        <h2 className="text-danger mb-4 fw-bold">Lịch đã bị hủy</h2>
                        <p className="text-muted mb-4">Rất tiếc, lịch khám bạn chọn hiện đã bị hủy hoặc không khả dụng. Vui lòng đặt khung giờ khác hoặc liên hệ hỗ trợ.</p>
                        <div className="d-flex justify-content-center gap-3">
                            <button className="btn btn-primary" onClick={() => navigate(-1)}>
                                Quay lại
                            </button>
                            <button className="btn btn-outline-secondary" onClick={() => navigate("/support")}>
                                Liên hệ hỗ trợ
                            </button>
                        </div>
                        <hr className="my-4" />
                        <p className="text-muted small">
                            Nếu cần hỗ trợ, vui lòng liên hệ bộ phận CSKH hoặc xem lại thông tin tài khoản của bạn.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-center align-items-center py-5">
                    <div className="card shadow-sm" style={{ width: "34em" }}>
                        <div className="card-header text-center py-4" style={{ background: "linear-gradient(90deg, #007bff, #00c4ff)", color: "white" }}>
                            <h3 className="mb-0" style={{ fontWeight: "600", letterSpacing: "1px", textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}>
                                THÔNG TIN LỊCH HẸN CỦA BẠN
                            </h3>
                        </div>
                        <div className="card-body">
                            <div className="mb-4 border-bottom pb-3" style={{ borderColor: "#dee2e6" }}>
                                <div className="mb-2"><strong>Bác sĩ:</strong> {data.Schedule.Doctor.User.name}</div>
                                <div className="mb-2">
                                    <strong>Giá khám: </strong>
                                    <span className="text-danger fw-bold">
                                        {data.Schedule.Doctor.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                    </span>
                                </div>
                            </div>

                            <div className="mb-4 border-bottom pb-3" style={{ borderColor: "#dee2e6" }}>
                                <div className="mb-2"><strong>Phòng khám:</strong> {data.Schedule.Doctor.Facility.name}</div>
                                <div className="mb-2"><strong>Địa chỉ:</strong> {data.Schedule.Doctor.Facility.address}</div>
                                <div className="mb-2">
                                    <strong>Ngày khám:</strong> 
                                    <span style={{ backgroundColor: "#039be5", color: "white" }}>
                                    {
                                        new Date(data.Schedule.date).toLocaleDateString('vi-VN', {
                                            weekday: 'long',
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        })
                                    };
                                    </span>
                                </div>
                                <div className="mb-2"><strong>Thời gian:</strong> {data.Schedule.Timeslot.startTime} - {data.Schedule.Timeslot.endTime}</div>
                            </div>

                            <div className="mb-4 border-bottom pb-3" style={{ borderColor: "#dee2e6" }}>
                                <div className="mb-2"><strong>Bệnh nhân:</strong> {data.Patient.User.name}</div>
                                <div className="mb-2"><strong>Email:</strong> {data.Patient.User.email}</div>
                                <div className="mb-2"><strong>Giới tính:</strong> {data.Patient.User.sex}</div>
                                <div className="mb-2"><strong>Địa chỉ:</strong> {data.Patient.User.address}</div>
                            </div>

                            <div className="mb-4 border-bottom pb-3" style={{ borderColor: "#dee2e6" }}>
                                <div className="mb-2">
                                    <strong>Mô tả bệnh:</strong>
                                    <p className="">{data.description || "Không có mô tả"}</p>
                                </div>
                                <div className={data.conditionAssessment === null ? "mb-2 text-muted" : "mb-2"}>
                                    <strong>Đánh giá tình trạng: </strong> 
                                    {data.conditionAssessment || "Chưa có đánh giá"}
                                </div>
                                <div className={data.diagnosis === null ? "mb-2 text-muted" : "mb-2"}>
                                    <strong>Ghi chú bác sĩ: </strong> 
                                    {data.diagnosis || "Chưa có ghi chú"}
                                </div>
                            </div>

                            <div className="alert alert-info text-center mb-4" role="alert">
                                Vui lòng đến đúng giờ và kiểm tra kỹ thông tin trước khi đến khám!
                            </div>

                            <div className="d-flex justify-content-between gap-3">
                            <Button
                                variant="contained"
                                startIcon={<ArrowBack />}
                                sx={{ backgroundColor: '#757575' }}
                                onClick={() => navigate(-1)}
                            >
                                Quay lại
                            </Button>

                            <Button
                                variant="contained"
                                startIcon={<MedicalServices />}
                                sx={{ backgroundColor: '#2196f3' }}
                                onClick={() => navigate(`/doctors/${data.Schedule.Doctor.id}`)}
                            >
                                Về trang bác sĩ
                            </Button>

                            <Button
                                variant="contained"
                                startIcon={<Cancel />}
                                sx={{ backgroundColor: '#c62828' }}
                                onClick={() => handleCancel(data.id)}
                            >
                                Hủy lịch
                            </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BookingDetail;
