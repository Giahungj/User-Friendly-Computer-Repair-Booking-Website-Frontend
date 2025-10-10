const TechnicianRepairBookingCard = ({ booking, onSelect }) => {
	const customerName = booking.Customer?.User?.name || "Khách vãng lai";
	return (
		<div className="card shadow-sm w-100 h-100" onClick={() => onSelect(booking.booking_id)} style={{ cursor: 'pointer' }}>
			<div className="card-body">
				<div className="d-flex justify-content-between align-items-center mb-2">
					<h6 className="card-title mb-0">Đơn #{booking.booking_id}</h6>
					<span className={`badge ${
						booking.status === "completed" ? "bg-success" :
						booking.status === "pending" ? "bg-warning text-dark" :
						booking.status === "in-progress" ? "bg-secondary" :
						booking.status === "cancelled" ? "bg-danger" : "bg-secondary"
					}`}>
						{booking.status}
					</span>
				</div>
				
				<div className="row row-cols-2 g-3">
					<div className="col-3">
						<div className="text-end fw-bold mb-1">Khách hàng:</div>
						<div className="text-end fw-bold mb-1">Thiết bị:</div>
						<div className="text-end fw-bold mb-1">Sự cố:</div>
						<div className="text-end fw-bold mb-1">Ngày hẹn:</div>
						<div className="text-end fw-bold mb-1">Buổi:</div>
						<div className="text-end text-muted mb-1">Tạo lúc:</div>
					</div>

					<div className="col">
						<div className="mb-1">{customerName}</div>
						<div className="mb-1">{booking.device_type}({booking.brand})</div>
						<div className="mb-1">{booking.issue_description}</div>
						<div className="mb-1">{booking.booking_date}</div>
						<div className="mb-1">
							{booking.WorkSchedule?.shift === "1" ? "Sáng" :
							booking.WorkSchedule?.shift === "2" ? "Chiều" : "Không rõ"}
						</div>
						<small className="text-muted mb-1">{new Date(booking.createdAt).toLocaleString()}</small>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TechnicianRepairBookingCard;
