import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPaymentData } from "../../../services/PaymentService";
import { AuthContext } from "../../../context/AuthContext";
import DoctorTotalPayments from "./DoctorTotalPayments"; // Component con

const DoctorPayments = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate(); 

    useEffect(() => {
        const getPaymentData = async () => {
            setLoading(true);
            try {
                const response = await fetchPaymentData(auth.account.doctorId);
                if (response && response.EC === 0) {
                    setData(response.DT);
                } else {
                    console.error("Error fetching payments:", response.EM);
                }
            } catch (error) {
                console.error("Error fetching payments:", error);
            } finally {
                setLoading(false);
            }
        };
        getPaymentData();
    }, [auth]);

    const handleOnclickPayment = (paymentId) => {
        navigate(`/doctor/payments/detail/${paymentId}`)
    }

    if (loading) return <div>Đang tải...</div>;

    const totalPayments = data.reduce(
        (sum, payment) => sum + payment.paymentAmount,
        0
    );

    return (
        <div className="container py-4">
            <div className="row">
                {/* Danh sách payment chiếm 8 cột */}
                <div className="col-md-8">
                    <div className="row row-cols-md-4">
                        {data.map((payment) => (
                        <div className="col my-4">
                            <div className="card shadow-sm border-1 hover" key={payment.id} style={{ cursor: "pointer" }} onClick={() => {handleOnclickPayment(payment.id)}}>
                                <div className="card-body text-center">
                                    <h5 className="card-title fw-bold">#{payment.id}</h5>
                                    <h5 className="card-title fw-bold text-primary">
                                    {payment.paymentAmount.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                    </h5>
                                    <h5 className="card-title fw-bold">
                                    {new Date(payment.paymentDate).toLocaleDateString("vi-VN", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })}
                                    </h5>
                                    <h5
                                    className={`card-title fw-bold ${
                                        payment.status === "pending" ? "text-success" : "text-danger"
                                    }`}
                                    >
                                    {payment.status === "pending" ? "ĐÃ THANH TOÁN" : "CHƯA THANH TOÁN"}
                                    </h5>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
                {/* Tổng tiền thanh toán chiếm 4 cột */}
                <div className="col-md-4" style={{ position: "sticky", top: "2em", alignSelf: "flex-start" }}>
                    <DoctorTotalPayments totalPayments={totalPayments} />
                </div>
            </div>
        </div>
    );
};

export default DoctorPayments;
