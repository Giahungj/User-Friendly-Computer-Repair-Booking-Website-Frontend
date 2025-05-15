import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDetailPaymentData } from "../../../services/PaymentService";
import { AuthContext } from "../../../context/AuthContext";

const DoctorDetailPayment = () => {
    const { paymentId } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const getPaymentData = async () => {
            setLoading(true);
            try {
                const response = await fetchDetailPaymentData(paymentId);
                if (response && response.EC === 0) {
                    console.log(response.DT);
                    setData(response.DT);
                } else {
                    setError(response.EM || "Error fetching payment data");
                }
            } catch (err) {
                setError("Error fetching payment data");
            } finally {
                setLoading(false);
            }
        };
        getPaymentData();
    }, [paymentId]);

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div className="alert alert-danger text-center">{error}</div>;
    if (!data) return null;

    return (
        <div className="container py-5 d-flex justify-content-center">
            <div className="card shadow-sm w-50">
                <div
                className="card-header text-white text-center"
                style={{ backgroundColor: "#1e88e5" }}
                >
                    <h4 className="mb-0">#{data.id}</h4>
                </div>

                <div className="card-body">
                    <h5 className="text-primary fw-bold text-center">{data.paymentAmount}</h5>
                    <p className="text-center">{data.paymentDate}</p>
                    <p
                        className={`text-center fw-bold ${
                        data.paymentStatus === "pending" ? "text-success" : "text-danger"
                        }`}
                    >
                        {data.paymentStatus === "pending" ? "ĐÃ THANH TOÁN" : "CHƯA THANH TOÁN"}
                    </p>
                    <hr />
                    <div className="mb-3">
                        <p>
                        <strong>Bác sĩ:</strong> {data.doctorName}
                        </p>
                        <p>
                        <strong>Bệnh nhân:</strong> {data.patientName}
                        </p>
                    </div>
                    <div className="mb-3">
                        <p>
                        <strong>Ngày đặt lịch:</strong> {data.bookingDate}
                        </p>
                        <p>
                        <strong>Mô tả lịch hẹn:</strong>{" "}
                        {data.bookingDescription || "Không có mô tả"}
                        </p>
                    </div>
                    <div className="mb-3">
                        <p>
                        <strong>Thời gian:</strong> {data.timeslotStartTime} - {data.timeslotEndTime}
                        </p>
                    </div>
                    <div className="text-end">
                        <button className="btn btn-outline-primary border rounded-pill me-2" onClick={() => navigate(`/doctor/manager-booking/booking-history/detail/${data.bookingId}`)}>
                            Chi tiết lịch hẹn này
                        </button>
                        <button className="btn btn-outline-secondary border rounded-pill" onClick={() => navigate(-1)}>
                            Quay lại
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetailPayment;
