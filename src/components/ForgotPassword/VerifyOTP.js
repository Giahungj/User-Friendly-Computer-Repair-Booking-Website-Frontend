import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyOTP } from "../../services/AuthService";

const VerifyOTP = () => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const emailOrPhone = location.state?.emailOrPhone || "";

    const handleVerifyOTP = async () => {
        if (!otp) {
            toast.error("Vui lòng nhập mã OTP!");
            return;
        }
        setLoading(true);
        try {
            const response = await verifyOTP({emailOrPhone,otp});
            if (response.EC === 0) {
                toast.success("Xác thực thành công!");
                navigate("/reset-password", { state: { emailOrPhone } });
            } else { toast.error(response.EM) }
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="d-flex flex-column align-items-center justify-content-center min-vh-100"
            style={{
            background: 'linear-gradient(to top right,rgb(100, 150, 111),rgb(255, 255, 171))',
        }}>
            <div className="bg-white p-4 rounded-lg shadow-lg w-100 text-center" style={{ maxWidth: '30em' }}>
                <h2 className="text-center mb-4">Xác thực OTP</h2>
                <input
                    value={otp}
                    type="text"
                    className="form-control mb-2"
                    placeholder="Nhập mã OTP"
                    onChange={(event) => setOtp(event.target.value)}
                    onKeyDown={(event) => event.key === "Enter" && handleVerifyOTP()}
                />
                <button onClick={handleVerifyOTP} className="btn btn-primary rounded-0 w-100 mb-1">Xác nhận</button>
                <span className="text-center">
                    <a href="/forgot-password" className="text-primary text-decoration-none">Quay lại</a>
                </span>
            </div>
        </div>
    );
};

export default VerifyOTP;
