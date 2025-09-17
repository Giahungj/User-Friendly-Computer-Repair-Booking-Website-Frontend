import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword } from "../../services/AuthService";

const ForgotPassword = () => {
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!emailOrPhone) {
            toast.error("Vui lòng nhập email hoặc số điện thoại!");
            return;
        }
        // Xác định là email hay số điện thoại
        const isEmail = /\S+@\S+\.\S+/.test(emailOrPhone);
        const isPhone = /^[0-9]{10,11}$/.test(emailOrPhone);
        if (!isEmail && !isPhone) {
            toast.error("Vui lòng nhập đúng định dạng email hoặc số điện thoại!");
            return;
        }
        setLoading(true);
        try {
            const response = await forgotPassword({ emailOrPhone, type: isEmail ? "email" : "phone" });
            if (response.EC === 0) {
                navigate("/verify-otp", { state: { emailOrPhone } });
            } else {
                toast.error(response.EM);
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center min-vh-100"
            style={{
            background: 'linear-gradient(to top right, #1E88E5, #FF8A65)',
        }}>
            <div className="bg-white  text-center p-4 rounded-lg shadow-lg w-100" style={{ maxWidth: '30em' }}>
                <h2 className="text-center mb-4">Quên mật khẩu</h2>
                <p className="text-muted text-center mb-4 small">
                    Nhập email hoặc số điện thoại để nhận mã xác thực.
                </p>
                <form onSubmit={handleSubmit} className="mb-2">
                    <input
                    type="text"
                    className="form-control mb-4"
                    placeholder="Email hoặc số điện thoại"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    />
                    <button
                    type="submit"
                    className="btn btn-primary rounded-0 w-100"
                    disabled={loading}
                    >
                    {loading ? 'Đang gửi...' : 'Gửi mã xác nhận'}
                    </button>
                </form>
                <a href="#" onClick={() => navigate(-1)}>Quay lại</a>
            </div>
        </div>
    );
};

export default ForgotPassword;
