import { Button, List, ListItem, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const TechnicianRepairBookingDetail = ({ booking, onClose }) => {
	if (!booking) return null;

	return (
		<div 
			className="card p-3 position-sticky" 
			style={{
				top: '10px',  
				maxWidth: '100%',
				zIndex: 10
			}}
		>
			<Button
				className="position-absolute top-0 end-0 m-2"
				aria-label="Đóng"
				onClick={onClose}
				size="small"
				style={{ minWidth: 'auto' }}
			>
				<CloseIcon />
			</Button>

			<h5 className="mb-3">Chi tiết đơn #{booking.booking_id}</h5>

			<p className="mb-2"><strong>Khách hàng:</strong> {booking.Customer?.User?.name || "Khách vãng lai"}</p>
			<p className="mb-2"><strong>Email:</strong> {booking.Customer?.User?.email || "Không có"}</p>
			<p className="mb-2"><strong>SĐT:</strong> {booking.Customer?.User?.phone || "Không có"}</p>
			<p className="mb-2"><strong>Địa chỉ:</strong> {booking.Customer?.address || "Không có"}</p>

			<p className="mb-2"><strong>Thiết bị:</strong> {booking.device_type} ({booking.brand})</p>
			<p className="mb-2"><strong>Sự cố:</strong> {booking.issue_description}</p>
			<p className="mb-2"><strong>Ngày hẹn:</strong> {booking.booking_date} - {booking.booking_time}</p>
			<p className="mb-2"><strong>Buổi:</strong> 
				{booking.WorkSchedule?.shift === "1" ? " Sáng" :
				booking.WorkSchedule?.shift === "2" ? " Chiều" : " Không rõ"}
			</p>

			<p className="mb-2"><strong>Kỹ thuật viên:</strong> {booking.WorkSchedule?.Technician?.User?.name}</p>
			{booking.WorkSchedule?.Technician?.Specialties?.length > 0 && (
				<p className="mb-2"><strong>Chuyên môn:</strong> {booking.WorkSchedule.Technician.Specialties.map(s => s.name).join(", ")}</p>
			)}

			<p className="mb-2"><strong>Trạng thái:</strong> {booking.status}</p>
			<p className="mb-2"><strong>Ngày tạo:</strong> {new Date(booking.createdAt).toLocaleString()}</p>

			{booking.RepairHistories?.length > 0 && (
				<div>
					<p className="mb-2"><strong>Lịch sử sửa chữa:</strong></p>
					<List>
						{booking.RepairHistories.map(h => (
							<ListItem key={h.history_id} disablePadding>
								<ListItemText
									primary={`${h.status} - ${h.notes}`}
									secondary={new Date(h.action_date).toLocaleString()}
								/>
							</ListItem>
						))}
					</List>
				</div>
			)}

			{booking.status === "pending" && (
				<Button
					variant="contained"
					color="primary"
					className="mt-2 me-2"
					// onClick={() => handleEditBooking(booking.booking_id)}
				>
					Nhận đơn
				</Button>
			)}

			{booking.status === "in-progress" && (
				<Button
					variant="contained"
					color="success"
					className="mt-2 me-2"
					// onClick={() => handleCompleteBooking(booking.booking_id)}
				>
					Hoàn thành đơn
				</Button>
			)}
		</div>
	);
};

export default TechnicianRepairBookingDetail;
