import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { TextField, IconButton, InputAdornment, Button } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AuthContext } from '../../context/AuthContext';
import { changePassword } from "../../services/AuthService";

const ChangePassword = () => {
    const { auth, logoutContext } = useContext(AuthContext);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const email = auth.user.email;
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

    const handleTogglePassword = (field) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
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
            style={{ background: 'linear-gradient(to top right, rgba(204, 226, 230, 1), rgba(62, 176, 194, 1))' }}>
            <div className="card p-3 shadow-sm w-100" style={{ maxWidth: '30em' }}>
                <h2 className="text-center mb-4">Đổi mật khẩu</h2>
                <p className="text-muted text-center mb-4 small">Nhập mật khẩu hiện tại và mật khẩu mới của bạn.</p>
                <form onSubmit={handleSubmit}>
                    <TextField
                        type={showPassword.current ? "text" : "password"}
                        label="Mật khẩu hiện tại"
                        fullWidth
                        margin="normal"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        error={!!errors.currentPassword}
                        helperText={errors.currentPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end" sx={{ mr: 1 }}>
                                    <IconButton onClick={() => handleTogglePassword("current")} edge="end">
                                        {showPassword.current ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        type={showPassword.new ? "text" : "password"}
                        label="Mật khẩu mới"
                        fullWidth
                        margin="normal"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        error={!!errors.newPassword}
                        helperText={errors.newPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end" sx={{ mr: 1 }}>
                                    <IconButton onClick={() => handleTogglePassword("new")} edge="end">
                                        {showPassword.new ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        type={showPassword.confirm ? "text" : "password"}
                        label="Xác nhận mật khẩu mới"
                        fullWidth
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end" sx={{ mr: 1 }}>
                                    <IconButton onClick={() => handleTogglePassword("confirm")} edge="end">
                                        {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        type="submit"
                        className="rounded"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        sx={{ mt: 2, backgroundColor: '#1ec3dcff', '&:hover': { backgroundColor: '#158798ff' } }}
                    >
                        {loading ? 'Đang xử lý...' : 'Xác nhận'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;