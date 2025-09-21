const TechnicianRepairBookingCard = ({ booking, onSelect }) => {
	const customerName = booking.Customer?.User?.name || "Khách vãng lai";
	return (
		<div className="card shadow-sm p-3 w-100 h-100" onClick={() => onSelect(booking.booking_id)} style={{ cursor: 'pointer' }}>
			<div className="d-flex justify-content-between align-items-center mb-2">
				<h6 className="card-title mb-0">Đơn #{booking.booking_id}</h6>
				<span className={`badge ${
					booking.status === "completed" ? "bg-success" :
					booking.status === "pending" ? "bg-warning text-dark" :
					booking.status === "cancelled" ? "bg-danger" : "bg-secondary"
				}`}>
					{booking.status}
				</span>
			</div>

			<p className="mb-1"><strong>Khách hàng:</strong> {customerName}</p>
			{booking.device_type && <p className="mb-1"><strong>Thiết bị:</strong> {booking.device_type} ({booking.brand})</p>}
			<p className="mb-1"><strong>Sự cố:</strong> {booking.issue_description}</p>
			<p className="mb-1"><strong>Ngày hẹn:</strong> {booking.booking_date} - {booking.booking_time}</p>
			<p className="mb-1">
				<strong>Buổi:</strong>{" "}
				{booking.WorkSchedule?.shift === "1" ? "Sáng" :
				booking.WorkSchedule?.shift === "2" ? "Chiều" : "Không rõ"}
			</p>
			<p className="mb-0 text-muted"><small>Tạo lúc: {new Date(booking.createdAt).toLocaleString()}</small></p>
		</div>
	);
};

export default TechnicianRepairBookingCard;
