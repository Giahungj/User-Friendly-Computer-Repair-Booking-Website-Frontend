import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './RepairBookingCard.scss';

const CustomerBookingCard = ({ booking }) => {
	const navigate = useNavigate();
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatStatus = (status) => {
        switch (status) {
            case 'pending':
                return 'Đang chờ';
            case 'in-progress':
                return 'Đang xử lý';
            case 'completed':
                return 'Hoàn thành';
            case 'cancelled':
                return 'Đã hủy';
            default:
                return 'Không xác định';
        }
    };

	return (
		<div className="card h-100 border-0 card-hover" style={{ cursor: 'pointer' }}>
			{/* Ảnh cửa hàng */}
			{booking?.WorkSchedule?.Technician?.User?.avatar ? (
				<img
					src={`http://localhost:8080/images${booking.WorkSchedule.Technician.User.avatar}`}
					alt={booking?.WorkSchedule?.Technician?.User?.avatar || 'Store'}
					className="card-img-top rounded-top"
					style={{ height: '150px', objectFit: 'cover' }}
				/>
			) : (
				<div
					className="d-flex align-items-center justify-content-center bg-light rounded-top"
					style={{ height: '150px', color: '#999' }}
				>
					Không có ảnh
				</div>
			)}

			<div className="card-body d-flex flex-column">
				<h6 className="card-title fs-6 fw-bold mb-2 text-truncate">
					{booking?.WorkSchedule?.Technician?.Store?.name || 'Không rõ cửa hàng'}
				</h6>

				<p className="card-text text-muted small mb-2">
					{booking?.WorkSchedule?.Technician?.Store?.address || 'Không có địa chỉ'}
				</p>

				<div className="small mb-2">
					<span className="fw-semibold">Ngày sửa chữa: </span>
					{formatDate(booking?.WorkSchedule?.work_date) || 'Không rõ ngày'}
				</div>

				<div className="small mb-3">
					<span className="fw-semibold">Trạng thái: </span>
					<span
						className={`lead ms-2 ${
							booking?.status === 'completed'
								? 'text-success'
								: booking?.status === 'pending'
								? 'text-warning'
								: booking?.status === 'in-progress'
								? 'text-info'
								: 'text-secondary'
						}`}
					>
						{formatStatus(booking?.status)}
					</span>
				</div>

				{/* Button MUI */}
				<Button
					variant="contained"
					size="small"
					sx={{
						alignSelf: 'flex-start',
						backgroundColor: '#2196f3',
						textTransform: 'none',
						'&:hover': {
							backgroundColor: '#1976d2'
						}
					}}
					onClick={() => navigate(`/dat-lich/${booking?.booking_id}/thong-tin/chi-tiet`)}
				>
					Xem chi tiết
				</Button>
			</div>
		</div>
	);
};

export default CustomerBookingCard;
