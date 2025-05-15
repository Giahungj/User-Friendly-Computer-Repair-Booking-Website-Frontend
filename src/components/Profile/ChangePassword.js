import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import { changePassword } from "../../services/AuthService";

const ChangePassword = () => {
    const { auth, logoutContext } = useContext(AuthContext);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const email = auth.account.email
    const validate = () => {
        let isValid = true;
        let newErrors = {};

        if (!currentPassword) newErrors.currentPassword = "Vui lòng nhập mật khẩu hiện tại";
        if (!newPassword) newErrors.newPassword = "Vui lòng nhập mật khẩu mới";
        if (!confirmPassword) newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu mới";
        else if (newPassword !== confirmPassword) newErrors.confirmPassword = "Mật khẩu mới không khớp";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogout = () => {
        logoutContext();
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            toast.error("Vui lòng kiểm tra lại thông tin");
            return;
        }
        setLoading(true);
        try {
            const response = await changePassword({ email, currentPassword, newPassword });
            if (response.EC === 0) {
                toast.success("Đổi mật khẩu thành công!");
                handleLogout()
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
            style={{ background: 'linear-gradient(to top right, rgb(157, 105, 159), rgb(82, 3, 92))' }}>
            <div className="bg-white p-4 rounded-lg shadow-lg w-100" style={{ maxWidth: '30em' }}>
                <h2 className="text-center mb-4">Đổi mật khẩu</h2>
                <p className="text-muted text-center mb-4 small">Nhập mật khẩu hiện tại và mật khẩu mới của bạn.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Mật khẩu hiện tại"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    {errors.currentPassword && <p className="text-danger small">{errors.currentPassword}</p>}
                    
                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Mật khẩu mới"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {errors.newPassword && <p className="text-danger small">{errors.newPassword}</p>}

                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Xác nhận mật khẩu mới"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors.confirmPassword && <p className="text-danger small">{errors.confirmPassword}</p>}

                    <button type="submit" className="btn btn-primary rounded-0 w-100" disabled={loading}>
                        {loading ? 'Đang xử lý...' : 'Xác nhận'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;