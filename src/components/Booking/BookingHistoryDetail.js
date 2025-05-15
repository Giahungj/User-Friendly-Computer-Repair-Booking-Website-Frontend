import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchHistoryBookingDetail } from "../../services/BookingService";
import { ratingDoctor } from "../../services/RatingSevice";
import { LocalPharmacy } from '@mui/icons-material';

import { Rating, Button, CircularProgress, Box } from '@mui/material';

const BookingHistoryDetail = () => {
    const navigate = useNavigate();
    const { bookingId } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState(0);
    const [rating, setRating] = useState([]);
    const [prescription, sePprescription] = useState([]);
    
    const [comment, setComment] = useState("");
    useEffect(() => {
        const getBookingHistoryDetail = async () => {
            try {
                const response = await fetchHistoryBookingDetail(bookingId);
                if (response.EC === 0) {
                    if ( response.DT.rating.length > 0 ) { setRating(response.DT.rating) }
                    if ( response.DT.prescription.length > 0 ) { sePprescription(response.DT.prescription) }
                    setData(response.DT);
                    setComment(response.DT.Patient.Ratings.comment);
                    setValue(response.DT.Patient.Ratings.score);
                } else {
                    console.error(response.EM);
                }
            } catch (error) {
                console.error("Lỗi khi lấy thông tin đặt lịch:", error);
            } finally {
                setLoading(false);
            }
        };

        getBookingHistoryDetail();
    }, [bookingId]);

    // Gửi dữ liệu đánh giá
    const handleSubmitRating = async () => {
        if (!value) {
            return toast.warning("Bạn vui lòng để lại điểm đánh giá để chúng mình cải thiện nhé!")
        }
        const ratingData = {
            patientId: data.patientId,
            doctorId: data.Schedule.Doctor.id,
            bookingId: data.id,
            score: value,
            comment: comment,
        };

        try {
            const response = await ratingDoctor(ratingData);
            if (response.EC === 0) {
                toast.success(response.EM)
                window.location.reload();
            } else {
                toast.error(response.EM);
                console.error(response.EM);
            }
        } catch (error) {
            toast.error("Lỗi khi lấy lịch hẹn sắp tới:", error);
            console.error("Lỗi khi lấy lịch hẹn sắp tới:", error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return 
    <Box sx={{ display: 'flex', alignItems: 'center'}}>
        <CircularProgress size="lg" />
    </Box>

    if (!data) return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="shadow-lg p-5 text-center bg-light rounded-3" style={{ maxWidth: "600px" }}>
                <h2 className="text-danger mb-4 fw-bold">Không tìm thấy thông tin lịch hẹn</h2>
                <p className="text-muted mb-4">Hiện tại bạn không có thông tin của lịch hẹn này. Vui lòng kiểm tra lại hoặc đặt lịch hẹn mới nếu cần.</p>
                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-primary" onClick={() => navigate(-1)}>
                        Quay lại
                    </button>
                    <button className="btn btn-outline-secondary" onClick={() => navigate("/support")}>
                        Liên hệ hỗ trợ
                    </button>
                </div>
                <hr className="my-4" />
                <p className="text-muted small">Nếu cần hỗ trợ, vui lòng liên hệ bộ phận CSKH hoặc xem lại lịch hẹn trong tài khoản của bạn.</p>
            </div>
        </div>
    )
    
    return (
        <div className="container py-5">
            <div className="d-flex justify-content-center align-items-center">
                <div className="row g-4 w-100">
                    <div className="col">
                        <div className="card shadow-sm">
                            <div className="card-header text-white text-center" style={{ backgroundColor: "#1e88e5" }}>
                                THÔNG TIN LỊCH HẸN CỦA BẠN
                            </div>
                            <div className="card-body">
                                <div className="mb-4 border-bottom pb-3">
                                    <div className="text-center"><strong>Trạng thái: </strong><span className="text-success">Đã hoàn thành</span></div>
                                    <div className="mb-2 text-center text-muted"><small>{new Date(data.History.createdAt).toLocaleString("vi-VN", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })}</small></div>
                                    <div className="mb-2 text-center fw-bold text-warning">
                                        <h1>{data.Schedule.Doctor.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</h1>
                                    </div>
                                    <div className="mb-1"><strong>Bác sĩ:</strong> {data.Schedule.Doctor.User.name}</div>
                                </div>

                                <div className="mb-4 border-bottom pb-3" style={{ borderColor: "#dee2e6" }}>
                                    <div className="mb-1"><strong>Phòng khám:</strong> {data.Schedule.Doctor.Facility.name}</div>
                                    <div className="mb-1"><strong>Địa chỉ:</strong> {data.Schedule.Doctor.Facility.address}</div>
                                    <div className="mb-1"><strong>Ngày khám:</strong> {data.Schedule.date}</div>
                                    <div className="mb-1"><strong>Thời gian:</strong> {data.Schedule.Timeslot.startTime} - {data.Schedule.Timeslot.endTime}</div>
                                </div>

                                <div className="mb-4 border-bottom pb-3" style={{ borderColor: "#dee2e6" }}>
                                    <div className="mb-1"><strong>Bệnh nhân:</strong> {data.Patient.User.name}</div>
                                    <div className="mb-1"><strong>Email:</strong> {data.Patient.User.email}</div>
                                    <div className="mb-1">
                                        <strong>Giới tính: </strong> 
                                        {data.Patient.User.sex === 1 ? "Nam" : data.Patient.User.sex === 2 ? "Nữ" : "Không xác định"}
                                    </div>
                                    <div className="mb-1"><strong>Địa chỉ:</strong> {data.Patient.User.address}</div>
                                </div>

                                <div className="mb-4 border-bottom pb-3" style={{ borderColor: "#dee2e6" }}>
                                    <div className="mb-1">
                                        <strong>Mô tả bệnh:</strong>
                                        <p className="">{data.description || "Không có mô tả"}</p>
                                    </div>
                                    <div className={data.History.conditionAssessment === null ? "mb-2 text-muted" : "mb-2"}>
                                        <strong>Đánh giá tình trạng: </strong> 
                                        {data.History.conditionAssessment || "Chưa có đánh giá"}
                                    </div>
                                    <div className={data.History.diagnosis === null ? "mb-2 text-muted" : "mb-2"}>
                                        <strong>Ghi chú bác sĩ: </strong> 
                                        {data.History.diagnosis || "Chưa có ghi chú"}
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between gap-3">
                                    <button className="btn btn-outline-secondary w-100" onClick={() => navigate(-1)}>Quay lại</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col" style={{ position: "sticky", top: "2em", alignSelf: "flex-start" }}>
                        <div className="card shadow-sm">
                            <div className="card-header text-white text-center" style={{ backgroundColor: "#0091ea" }}>
                                ĐÁNH GIÁ BÁC SĨ
                            </div>
                            <div className="card-body text-center">
                                <Rating size="large" value={value} onChange={(event, newValue) => setValue(newValue)} />
                                <p className="fw-bold text-muted text-start mb-2">Bình luận:</p>
                                <textarea className="form-control" value={comment} rows="3" onChange={(event) => setComment(event.target.value)}></textarea>
                            </div>
                            <div className="text-center mb-3">
                                <Button variant="contained" sx={{ backgroundColor: "#0091ea" }} onClick={handleSubmitRating}>
                                    Gửi đánh giá
                                </Button>
                            </div>

                            {/* Danh sách đánh giá */}
                            {rating.length > 0 && (
                                <div className="card-body">
                                    <h5 className="fw-bold text-muted mb-3">Danh sách đánh giá:</h5>
                                    <div className="list-group">
                                        {rating.map((item) => (
                                            <div key={item.id} className="list-group-item">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <strong>{item.name}</strong>
                                                    <Rating value={item.score} readOnly size="small" />
                                                </div>
                                                <p className="mb-1">{item.comment}</p>
                                                <small className="text-muted">{item.createdAt}</small>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="card shadow-sm mt-4">
                            <div className="card-header text-white text-center" style={{ backgroundColor: "#0091ea" }}>
                                <LocalPharmacy style={{ marginRight: '8px' }} /> {/* Thêm icon */}
                                ĐƠN THUỐC
                            </div>

                            {prescription.length > 0 ? (
                                <div className="card-body">
                                    {prescription.map((item) => (
                                        <div className="row">
                                            <div className="col-3"><strong>{item.medicineName}</strong></div>
                                            <div className="col text-end"><span>{item.medicineDespription}</span></div>
                                            <div className="col-2 text-end"><span>{item.prescriptionsQuantity} viên</span></div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="card-body text-center text-muted">
                                    <h5 className="fw-bold mb-3">Không có thông tin đơn thuốc</h5>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingHistoryDetail;