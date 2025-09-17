import {
	Person as PersonIcon,
	Phone as PhoneIcon,
	Badge as BadgeIcon,
	Event as EventIcon,
	AccessTime as AccessTimeIcon,
} from "@mui/icons-material"

function BookingDetailModal({ booking, onClose }) {
	if (!booking) return null;

	const customer = booking?.Customer?.User || {};
	const technician = booking?.WorkSchedule?.Technician?.User || {};
	const workSchedule = booking?.WorkSchedule || {};

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
                        ></button>
                    </div>

                    <div className="modal-body px-5">
                        {/* Hàng đầu tiên: mã + trạng thái */}
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <p>
                                    <strong>Mã đặt lịch:</strong> {booking.booking_id}
                                </p>
                            </div>
                            <div className="col-md-6">
                                <p>
                                    <strong>Trạng thái:</strong>{" "}
                                    <span
                                        className={`badge ${
                                            booking.status === "pending"
                                                ? "bg-warning text-dark"
                                                : booking.status === "confirmed"
                                                ? "bg-primary"
                                                : booking.status === "completed"
                                                ? "bg-success"
                                                : booking.status === "cancelled"
                                                ? "bg-danger"
                                                : "bg-secondary"
                                        }`}
                                    >
                                        {booking.status === "pending"
                                            ? "Đang chờ"
                                            : booking.status === "confirmed"
                                            ? "Đã xác nhận"
                                            : booking.status === "completed"
                                            ? "Hoàn thành"
                                            : booking.status === "cancelled"
                                            ? "Đã hủy"
                                            : "Không rõ"}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Thông tin khách hàng & kỹ thuật viên */}
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <div className="card shadow-sm h-100">
                                    <div className="card-body">
                                        <h6 className="card-title text-primary mb-3">
                                            <PersonIcon className="me-1" /> Khách hàng
                                        </h6>
                                        <p>
                                            <PersonIcon className="me-2 text-muted" />
                                            <strong>Tên:</strong> {customer.name}
                                        </p>
                                        <p>
                                            <PhoneIcon className="me-2 text-muted" />
                                            <strong>SĐT:</strong> {customer.phone}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="card shadow-sm h-100">
                                    <div className="card-body">
                                        <h6 className="card-title text-primary mb-3">
                                            <PersonIcon className="me-1" /> Kỹ thuật viên
                                        </h6>
                                        <p>
                                            <PersonIcon className="me-2 text-muted" />
                                            <strong>Tên:</strong> {technician.name}
                                        </p>
                                        <p>
                                            <PhoneIcon className="me-2 text-muted" />
                                            <strong>SĐT:</strong> {technician.phone}
                                        </p>
                                        {technician.avatar && (
                                            <img
                                                src={`http://localhost:8080/images/${technician.avatar}`}
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
                        </div>

                        {/* Ngày & Ca */}
                        <div className="row mb-2">
                            <div className="col-md-6">
                                <p>
                                    <EventIcon className="me-2 text-muted" />
                                    <strong>Ngày:</strong>{" "}
                                    {workSchedule.work_date
                                        ? new Date(workSchedule.work_date).toLocaleDateString("vi-VN")
                                        : ""}
                                </p>
                            </div>
                            <div className="col-md-6">
                                <p>
                                    <AccessTimeIcon className="me-2 text-muted" />
                                    <strong>Ca:</strong>{" "}
                                    {workSchedule.shift == 1
                                        ? "Sáng"
                                        : workSchedule.shift == 2
                                        ? "Chiều"
                                        : ""}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn rounded-pill" style={{color: "#2196f3"}} onClick={onClose}>
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
	);
}

export default BookingDetailModal;
