import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function BookingStatus() {
	const navigate = useNavigate();

	return (
		<div className="container py-5 fs-7">
			<div className="card shadow-sm" style={{ maxWidth: '600px', margin: '0 auto' }}>
				<div className="card-header text-white text-center" style={{ backgroundColor: '#039be5' }}>
					<h4 className="mb-0">🎉 Đặt Lịch Thành Công</h4>
				</div>
				<div className="card-body text-center">
					<p className="text-muted fs-5 mb-4">
						Cảm ơn bạn đã đặt lịch sửa chữa.<br />
						Chúng tôi sẽ liên hệ với bạn để xác nhận thông tin và tiến hành xử lý sớm nhất!
					</p>

					<img
						src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
						alt="success"
						style={{ width: '120px', marginBottom: '20px' }}
					/>

					<div className="d-grid gap-2">
						<Button
							variant="contained"
							onClick={() => navigate('/')}
							sx={{
								backgroundColor: '#039be5',
								borderRadius: '5px',
								fontSize: '16px',
								height: '40px',
								'&:hover': { backgroundColor: '#039be5' },
							}}
						>
							Về trang chủ
						</Button>

						<Button
							variant="outlined"
							onClick={() => navigate('/booking/create')}
							sx={{
								borderRadius: '5px',
								fontSize: '16px',
								height: '40px',
							}}
						>
							Đặt thêm lịch mới
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BookingStatus;
