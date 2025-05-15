import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPaymentData } from "../../../services/PaymentService";
import Button  from '@mui/material/Button';
import { AuthContext } from '../../../context/AuthContext';

const SpecialtyList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);

    // Fetch specialties when the component mounts
    useEffect(() => {
        const getPaymentData = async () => {
            setLoading(true)
            try {
                const response = await fetchPaymentData(auth.account.doctorId);
                if (response && response.EC === 0) {
                    setData(response.DT);
                    console.log(response.DT)
                } else {
                    console.error("Error fetching specialties:", response.EM);
                }
            } catch (error) {
                console.error("Error fetching specialties:", error);
            } finally {
                setLoading(false)
            }
        };
        getPaymentData();
    }, []);
    
    if (loading) return (
        <div>Đang tải...</div>
    )
    
    return (
        <div className="container py-4">
            <div className="row row-cols-md-4">
            {data.map((payment) => (
                <div className="col my-4" key={payment.id}>
                    <div className="card shadow-sm border-1 hover">
                        {/* Hình ảnh chuyên khoa */}
                        <div className="card-body text-center">
                                <h5 className="card-title fw-bold">#{payment.id}</h5>
                                <h5 className="card-title fw-bold text-primary">
                                    {payment.paymentAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                </h5>
                                <h5 className="card-title fw-bold">
                                    {new Date(payment.paymentDate).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                </h5>
                                <h5 className={`card-title fw-bold ${payment.status === "pending" ? "text-success" : "text-danger"}`}>
                                    {payment.status === "pending" ? "ĐÃ THANH TOÁN" : "CHƯA THANH TOÁN"}
                                </h5>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
};

export default SpecialtyList;