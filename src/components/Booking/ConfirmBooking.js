import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchConfirmBooking, createBooking } from "../../services/BookingService";
import { toast } from "react-toastify";

const ConfirmBooking = () => {
    const navigate = useNavigate();  
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const scheduleID = queryParams.get("scheduleID");
    const patientID = queryParams.get("patientID");

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorCode, setErrorCode] = useState(null);
    const [description, setDescription] = useState("");

    useEffect(() => {
        const getBookingInfo = async () => {
            try {
                const response = await fetchConfirmBooking(scheduleID, patientID);
                if (response.EC === 0) {
                    setData(response.DT);
                } else {
                    setErrorCode(response.EC);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setErrorCode(500);
            } finally {
                setLoading(false);
            }
        };

        getBookingInfo();
    }, [scheduleID, patientID]);

    const handleConfirm = async () => {
        const bookingData = {
            scheduleID,
            patientID,
            date: data.schedule.date,
            description
        };
        const response = await createBooking(bookingData);
        if (response.EC === 0) {
            toast.success("Thông báo: " + response.EM);
            navigate(`/booking/${response.DT.id}`);
        } else {
            toast.error("Lỗi khi đặt lịch: " + response.EM);
        }
    };
    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (!data) {
        if (errorCode === 3) {
            return (
                <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                    <div className="shadow-lg p-5 text-center bg-light rounded-3" style={{ maxWidth: "600px" }}>
                        <h2 className="text-danger mb-4 fw-bold">Hết chỗ trống</h2>
                        <p className="text-muted mb-4">Rất tiếc, lịch khám bạn chọn hiện đã hết chỗ hoặc không khả dụng. Vui lòng chọn khung giờ khác hoặc liên hệ hỗ trợ.</p>
                        <div className="d-flex justify-content-center gap-3">
                            <button className="btn btn-primary" onClick={() => navigate(-1)}>
                                Quay lại chọn lịch
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
            );
        }
    
        if (errorCode === 2) {
            return (
                <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                    <div className="shadow-lg p-5 text-center bg-light rounded-3" style={{ maxWidth: "600px" }}>
                        <h2 className="text-danger mb-4 fw-bold">Hạn chế</h2>
                        <p className="text-muted mb-4">Bạn đang đăng nhập với vai trò bác sĩ, do đó không thể đặt lịch khám. Vui lòng sử dụng tài khoản bệnh nhân để tiếp tục.</p>
                        <div className="d-flex justify-content-center gap-3">
                            <button className="btn btn-primary" onClick={() => navigate(-1)}>
                                Quay lại chọn lịch
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
            );
        }
    
        if (errorCode === 1) {
            return (
                <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                    <div className="shadow-lg p-5 text-center bg-light rounded-3" style={{ maxWidth: "600px" }}>
                        <h2 className="text-danger mb-4 fw-bold">Lỗi hệ thống</h2>
                        <p className="text-muted mb-4">Đã xảy ra lỗi trong quá trình xử lý lịch hẹn. Vui lòng thử lại sau hoặc liên hệ hỗ trợ.</p>
                        <div className="d-flex justify-content-center gap-3">
                            <button className="btn btn-primary" onClick={() => navigate(-1)}>
                                Quay lại chọn lịch
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
            );
        }
    } else {
        return (
            <div className="container d-flex justify-content-center align-items-center">
                <div className="shadow-lg my-5 p-4" style={{ width: "40em" }}>
                    <h2 className="text-center mb-3">Xác nhận đặt lịch</h2>

                    {/* Thông tin bác sĩ */}
                    <div className="mb-3">
                        <h5 className="text-primary">Thông tin bác sĩ</h5>
                        <ul className="list-group">
                            <li className="list-group-item"><strong>Bác sĩ:</strong> {data.schedule.Doctor.User.name}</li>
                            <li className="list-group-item"><strong>Chuyên khoa:</strong> {data.schedule.Doctor.Specialty.name}</li>
                            <li className="list-group-item"><strong>Phòng khám:</strong> {data.schedule.Doctor.Facility.name}</li>
                            <li className="list-group-item"><strong>Địa chỉ:</strong> {data.schedule.Doctor.Facility.address}</li>
                            <li className="list-group-item"><strong>Giá khám:</strong> <span className="text-danger fw-bold">{data.schedule.Doctor.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></li>
                        </ul>
                    </div>

                    <hr />

                    {/* Thông tin lịch hẹn */}
                    <div className="mb-3">
                        <h5 className="text-primary">Thông tin lịch hẹn</h5>
                        <ul className="list-group">
                            <li className="list-group-item"><strong>Thời gian:</strong> {data.schedule.Timeslot.startTime} - {data.schedule.Timeslot.endTime}</li>
                            <li className="list-group-item"><strong>Ngày khám:</strong> {data.schedule.date}</li>
                        </ul>
                    </div>

                    <hr />

                    {/* Thông tin bệnh nhân */}
                    <div className="mb-3">
                        <h5 className="text-primary">Thông tin bệnh nhân</h5>
                        <ul className="list-group">
                            <li className="list-group-item"><strong>Họ tên:</strong> {data.patient.User.name}</li>
                            <li className="list-group-item"><strong>Email:</strong> {data.patient.User.email}</li>
                            <li className="list-group-item"><strong>Giới tính:</strong> {data.patient.User.sex}</li>
                            <li className="list-group-item"><strong>Địa chỉ:</strong> {data.patient.User.address}</li>
                        </ul>
                    </div>

                    <hr />

                    {/* Mô tả bệnh */}
                    <div className="mb-3">
                        <h5 className="text-primary">Mô tả bệnh (nếu có)</h5>
                        <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Nhập mô tả bệnh..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="d-flex justify-content-between mt-3">
                    <button className="btn btn-success w-45" onClick={handleConfirm}>Xác nhận</button>
                        <button className="btn btn-danger w-45" onClick={() => navigate(-1)}>Hủy</button>
                    </div>
                </div>
            </div>
        );
    };
};

export default ConfirmBooking;
