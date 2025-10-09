import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, InputAdornment } from '@mui/material';
import { signUp } from '../../services/AuthService';
import { toast } from 'react-toastify';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';

function RegisterForm() {
	const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        // Regex và thông báo lỗi
        const phoneRegex = /^0\d{9}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const newErrors = {};

        // Kiểm tra số điện thoại
        if (!phone) {
            newErrors.phone = 'Vui lòng nhập số điện thoại.';
        } else if (!phoneRegex.test(phone)) {
            newErrors.phone = 'Số điện thoại không hợp lệ. Vui lòng nhập 10 số và bắt đầu bằng 0.';
        }

        // Kiểm tra email
        if (!email) {
            newErrors.email = 'Vui lòng nhập email.';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Email không hợp lệ.';
        }

        // Kiểm tra mật khẩu
        if (!password) {
            newErrors.password = 'Vui lòng nhập mật khẩu.';
        } else if (password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự.';
        }

        // Kiểm tra xác nhận mật khẩu
        if (!confirmPassword) {
            newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu.';
        } else if (confirmPassword !== password) {
            newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp.';
        }

        // Kiểm tra tên
        if (!name) {
            newErrors.name = 'Vui lòng nhập họ tên.';
        } else if (name.length < 2) {
            newErrors.name = 'Họ tên phải có ít nhất 2 ký tự.';
        }

        // Cập nhật trạng thái lỗi
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Xóa lỗi trước khi gửi
        setErrors({});

		let respone = await signUp( email, password, name, phone );
		if (+respone.EC === 0) {
			toast.success(respone.EM)
		} else {
			toast.warning(respone.EM)
		}

    };

	return (
			<>
			<form onSubmit={handleSubmit} className="p-3 bg-white">
				<div className="mb-4">
					<p className="text-start text-muted">
						Dùng số điện thoại, email, hoặc phương thức khác để đăng nhập hoặc đăng ký.
					</p>
				</div>

				<div className="mb-4">
					<TextField
						type="text"
						fullWidth
						required
						label="Họ tên"
						value={name}
						onChange={(e) => setName(e.target.value)}
						error={Boolean(errors.name)}
						helperText={errors.name}
					/>
				</div>

				<div className="mb-4">
					<TextField
						type="tel"
						fullWidth
						required
						label="Số điện thoại"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						error={Boolean(errors.phone)}
						helperText={errors.phone}
						InputProps={{
							startAdornment: <InputAdornment position="start">+84</InputAdornment>,
						}}
					/>
				</div>

				<div className="mb-4">
					<TextField
						type="email"
						fullWidth
						required
						label="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						error={Boolean(errors.email)}
						helperText={errors.email}
					/>
				</div>

				<div className="mb-4">
					<TextField
						type="password"
						fullWidth
						required
						label="Mật khẩu"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						error={Boolean(errors.password)}
						helperText={errors.password}
					/>
				</div>

				<div className="mb-4">
					<TextField
						type="password"
						fullWidth
						required
						label="Xác nhận mật khẩu"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						error={Boolean(errors.confirmPassword)}
						helperText={errors.confirmPassword}
					/>
				</div>

				<Button
					type="submit"
					variant="contained"
					sx={{
						backgroundColor: '#2196f3',
						borderRadius: '10px',
						fontWeight: 'bold',
						color: '#fff',
						width: '100%',
						height: '50px',
						boxShadow: 'none',
						'&:hover': {
							backgroundColor: '#1976d2',
							boxShadow: 'none',
						},
					}}
				>
					Đăng ký
				</Button>
			</form>

			<div className="m-4 pt-4 text-center border-top border-1 border-secondary">
				<span className="text-muted">Hoặc tiếp tục bằng</span>
			</div>

			<div className="px-3 d-flex justify-content-center">
				<Button
					variant="outlined"
					startIcon={<GoogleIcon sx={{ color: '#DB4437' }} />}
					sx={{
						marginRight: '10px',
						width: '40%',
						padding: '10px',
						borderRadius: '7px',
						color: '#000',
						backgroundColor: '#ffebee',
						border: 'none'
					}}
					onClick={() => window.open('https://accounts.google.com/', '_blank')}
				>
					Google
				</Button>

				<Button
					variant="outlined"
					startIcon={<FacebookOutlinedIcon sx={{ color: '#1877F2' }} />}
					sx={{
						width: '40%',
						padding: '10px',
						borderRadius: '7px',
						color: '#000',
						backgroundColor: '#e3f2fd',
						border: 'none'
					}}
					onClick={() => window.open('https://www.facebook.com/', '_blank')}
				>
					Facebook
				</Button>
			</div>

			<div className="mt-4 px-3 text-muted">
				<span
					style={{
						fontSize: '13px',
						display: 'block',
						textAlign: 'justify',
						lineHeight: '1.4',
						marginTop: '10px'
					}}
				>
					Bằng cách đăng ký, tôi xác nhận rằng mình đã đọc, hiểu và đồng ý với <a href='#'>Chính sách bảo mật</a> và <a href='#'>Điều khoản sử dụng</a> của Trường Thịnh Group. Tôi đồng ý để Trường Thịnh Group thu thập, lưu trữ, sử dụng, tiết lộ và xử lý thông tin của tôi theo Chính sách quyền riêng tư của Trường Thịnh Group.
				</span>
			</div>
		</>
	);
}

export default RegisterForm;
