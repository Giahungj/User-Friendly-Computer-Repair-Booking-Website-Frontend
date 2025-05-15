import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/AuthService";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    const emailOrPhone = location.state?.emailOrPhone || "";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newPassword || !confirmPassword) {
            toast.error("Vui lòng điền đầy đủ thông tin!");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Mật khẩu xác nhận không khớp!");
            return;
        }
        if (newPassword.length < 6) {
            toast.error("Mật khẩu phải có ít nhất 6 ký tự!");
            return;
        }
        setLoading(true);
        try {
            const response = await resetPassword({ emailOrPhone, newPassword });
            if (response.EC === 0) {
                toast.success("Đặt lại mật khẩu thành công!");
                navigate("/login");
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
                background: 'linear-gradient(to top right,rgb(128, 157, 60),rgb(7, 41, 17))',
            }}>
            <div className="bg-white p-4 rounded-lg shadow-lg w-100" style={{ maxWidth: '30em' }}>
                <h2 className="text-center mb-4">Đặt lại mật khẩu</h2>
                <p className="text-muted text-center mb-4 small">
                    Nhập mật khẩu mới của bạn.
                </p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Mật khẩu mới"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        className="form-control mb-4"
                        placeholder="Xác nhận mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary rounded-0 w-100"
                        disabled={loading}
                    >
                        {loading ? 'Đang xử lý...' : 'Xác nhận'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;