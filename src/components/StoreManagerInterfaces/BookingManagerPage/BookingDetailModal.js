import {
	Person as PersonIcon,
	Phone as PhoneIcon,
	Badge as BadgeIcon,
	Event as EventIcon,
	AccessTime as AccessTimeIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material"

const BookingDetailModal = ({ booking, onClose }) => {
	const navigate = useNavigate();
	if (!booking) return null;

	const { Customer: customerData = {}, WorkSchedule: ws = {} } = booking;
	const customer = customerData.User || {};
	const technician = ws.Technician?.User || {};

	console.log(ws)

	const statusMap = {
		'pending': { label: "Đang chờ", className: "bg-warning text-dark" },
		'in-progress' : { label: "Đã xác nhận", className: "bg-primary" },
		'completed': { label: "Hoàn thành", className: "bg-success" },
		'cancelled': { label: "Đã hủy", className: "bg-danger" },
		'default': { label: "Không rõ", className: "bg-secondary" },
	};
	const { label: statusLabel, className: statusClass } =
		statusMap[booking.status] || statusMap.default;

	const formatDate = (date) =>
		date ? new Date(date).toLocaleDateString("vi-VN") : "";

	return (
		<div
			className="modal show fade d-block"
			tabIndex="-1"
			style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
		>
			<div className="modal-dialog modal-dialog-centered modal-lg">
				<div className="modal-content shadow-lg border-0">
					<div className="modal-header">
						<h5 className="modal-title d-flex align-items-center">
							<BadgeIcon className="me-2" /> Chi tiết đặt lịch
						</h5>
						<button
							type="button"
							className="btn-close btn-close-white"
							onClick={onClose}
						/>
					</div>

					<div className="modal-body px-5">
						{/* Mã + trạng thái */}
						<div className="row mb-3">
							<div className="col-md-6">
								<p>
									<strong>Mã đặt lịch:</strong> {booking.booking_id}
								</p>
							</div>
							<div className="col-md-6">
								<p>
									<strong>Trạng thái:</strong>{" "}
									<span className={`badge ${statusClass}`}>{statusLabel}</span>
								</p>
							</div>
						</div>

						{/* Khách hàng & KTV */}
						<div className="row mb-4">
							{[
								{ title: "Khách hàng", data: customer },
								{ title: "Kỹ thuật viên", data: technician },
							].map(({ title, data }) => (
								<div className="col-md-6" key={title}>
									<div className="card shadow-sm h-100">
										<div className="card-body">
											<h6 className="card-title text-primary mb-3">
												<PersonIcon className="me-1" /> {title}
											</h6>
											<p>
												<PersonIcon className="me-2 text-muted" />
												<strong>Tên:</strong> {data.name}
											</p>
											<p>
												<PhoneIcon className="me-2 text-muted" />
												<strong>SĐT:</strong> {data.phone}
											</p>
											{title === "Kỹ thuật viên" && data.avatar && (
												<img
													src={`http://localhost:8080/images/${data.avatar}`}
													alt="Ảnh KTV"
													className="img-fluid rounded mt-2 shadow-sm"
													style={{
														maxWidth: "100px",
														height: "100px",
														objectFit: "cover",
													}}
												/>
											)}
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Ngày & Ca */}
						<div className="row mb-2">
							<div className="col-md-6">
								<p>
									<EventIcon className="me-2 text-muted" />
									<strong>Lịch làm việc KTV:</strong> {formatDate(ws.work_date)}
								</p>
							</div>
							<div className="col-md-6">
								<p>
									<AccessTimeIcon className="me-2 text-muted" />
									<strong>Ca:</strong>{" "}
									{ws.shift === "1" ? "Sáng" : ws.shift === "2" ? "Chiều" : ""}
								</p>
							</div>
						</div>
					</div>

					<div className="modal-footer d-flex justify-content-between align-items-center">
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => navigate(`/cua-hang-truong/don-dat-lich/${booking.booking_id}/chi-tiet`)}
                            sx={{ borderRadius: "50px" }}
                            >
                            Xem chi tiết toàn bộ
                        </Button>
						<Button
                            variant="outlined"
                            color="secondary"
                            onClick={onClose}
                            sx={{ borderRadius: "50px" }}
                            >
                            Đóng
                        </Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookingDetailModal;