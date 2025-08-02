import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { signInByEmail, signInByPhone } from '../services/AuthService';
import { Button, TextField, InputAdornment } from '@mui/material';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';

function LoginForm() {
	const { loginContext } = useContext(AuthContext);

	const [loginMethod, setLoginMethod] = useState('phone');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [phoneError, setPhoneError] = useState('');
	const [emailError, setEmailError] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setPhoneError('');
		setEmailError('');

		let isValid = true;

		if (loginMethod === 'phone') {
			if (!/^0\d{9}$/.test(phone)) {
				setPhoneError('Số điện thoại không hợp lệ. Vui lòng nhập 10 số và bắt đầu bằng 0.');
				isValid = false;
			}
		} else {
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
				setEmailError('Email không hợp lệ.');
				isValid = false;
			}
		}

		if (!isValid) return;

		try {
			const res = loginMethod === 'phone'
				? await signInByPhone({ phone, password })
				: await signInByEmail({ email, password });

			if (res?.EC !== 0) {
				toast.error(res?.EM || 'Đăng nhập thất bại');
				return;
			}

			const { access_token, ...user } = res.DT || {};
			if (!access_token || !user) {
				toast.error('Dữ liệu đăng nhập không hợp lệ');
				return;
			}

			loginContext({
				isAuthenticated: true,
				token: access_token,
				user
			});
			toast.success(res.EM || 'Đăng nhập thành công!');
		} catch (err) {
			console.error('Lỗi đăng nhập:', err);
			toast.error('Lỗi kết nối máy chủ');
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="p-3 bg-white">
				<div className="mb-3">
					<p className="text-start text-muted">
						Dùng số điện thoại, email, hoặc phương thức khác để đăng nhập hoặc đăng kí.
					</p>
					<div className="d-flex gap-3">
						<label className="text-dark">
							<input type="radio" value="phone" checked={loginMethod === 'phone'} onChange={() => setLoginMethod('phone')} /> Số điện thoại
						</label>
						<label className="text-dark">
							<input type="radio" value="email" checked={loginMethod === 'email'} onChange={() => setLoginMethod('email')} /> Email
						</label>
					</div>
				</div>

				{loginMethod === 'phone' ? (
					<div className="mb-3">
						<TextField
							type="tel"
							fullWidth
							required
							label="Số điện thoại"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							error={Boolean(phoneError)}
							helperText={phoneError}
							InputProps={{
								startAdornment: <InputAdornment position="start">+84</InputAdornment>,
							}}
						/>
					</div>
				) : (
					<div className="mb-3">
						<TextField
							type="email"
							fullWidth
							required
							label="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							error={Boolean(emailError)}
							helperText={emailError}
						/>
					</div>
				)}

				<div className="mb-4">
					<TextField
						type="password"
						fullWidth
						required
						label="Mật khẩu"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
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
						'&:hover': { backgroundColor: '#1976d2', boxShadow: 'none' },
					}}
				>
					Đăng nhập
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
						marginLeft: '10px',
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
		</>
	);
}

export default LoginForm;
