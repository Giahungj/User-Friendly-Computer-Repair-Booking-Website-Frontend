import { useNavigate } from "react-router-dom";
import { Button, Avatar } from "@mui/material";
import { Check, Close } from "@mui/icons-material";

import { useCallback } from "react";
import { toast } from "react-toastify";
import { approveRepairBooking, rejectRepairBooking } from "../../../services/RepairBookingService";

const BookingTable = ({ bookings, onViewDetail }) => {
	const navigate = useNavigate();
	const handleApprove = async(bookingId) => {
		try {
			const res = await approveRepairBooking(bookingId);
			if (res?.EC === 0) {
				toast.success("Duyệt đơn thành công");
				setTimeout(() => window.location.reload(), 1000);
			} else toast.error(res?.EM || "Duyệt đơn thất bại");
		} catch (error) {
			toast.error("Lỗi khi duyệt đơn");
			console.error(error);
		}
	};

	const handleReject = async(bookingId) => {
		try {
			const res = await rejectRepairBooking(bookingId);
			if (res?.EC === 0) {
				toast.success("Từ chối đơn thành công");
				setTimeout(() => window.location.reload(), 1000);
			} else toast.error(res?.EM || "Từ chối đơn thất bại");
		} catch (error) {
			toast.error("Lỗi khi từ chối đơn");
			console.error(error);
		}
	};


	return (
		<div className="card shadow-sm">
			<div className="card-body">
				<table className="table table-hover align-middle" style={{ overflow: "hidden" }}>
					<thead className="text-center text-white" style={{ backgroundColor: "#415A77" }}>
						<tr>
							<th>Mã đặt lịch</th>
							<th>Khách hàng</th>
							<th>Ngày đặt</th>
							<th>Kỹ thuật viên</th>
							<th>Trạng thái</th>
							<th>Hành động</th>
						</tr>
					</thead>
					<tbody>
						{bookings?.length > 0 ? (
							bookings.map((b) => (
								<tr key={b.booking_id} onClick={() => onViewDetail(b)} style={{ cursor: "pointer" }}>
									<td className="text-center fw-bold">{b.booking_id}</td>
									<td>{b?.Customer?.User?.name || ""}</td>
									<td>{b?.booking_date ? new Date(b.booking_date).toLocaleDateString("vi-VN") : ""}</td>
									<td className="d-flex align-items-between align-items-center">
										{b?.WorkSchedule?.Technician?.User?.avatar && (
											<Avatar className="me-2"
												src={b.WorkSchedule.Technician.User.avatar}
												alt={b.WorkSchedule.Technician.User.name}
											/>
										)}
										{b?.WorkSchedule?.Technician?.User?.name || ""}
										{b?.WorkSchedule && (
											<span className="badge text-white ms-2" style={{ backgroundColor: "#7986cb" }}>
												{b.WorkSchedule.current_number}/{b.WorkSchedule.max_number}
											</span>
										)}
									</td>
									<td>
										<span className="badge" style={{
											backgroundColor:
											b.status === "completed" ? "#4caf50" :
											b.status === "in-progress" ? "#ff9800" :
											b.status === "cancelled" ? "#f44336" : "#9e9e9e"
										}}>
											{b.status}
										</span>
										{!["completed", "in-progress", "cancelled"].includes(b.status) && (
											<>
												<Button variant="outlined" color="success"
													sx={{ minWidth: 0, p: 1, borderRadius: "50%", ml: 1 }}
													onClick={() => handleApprove(b.booking_id)}
													>
													<Check fontSize="small" />
												</Button>
												<Button variant="outlined" color="error"
													sx={{ minWidth: 0, p: 1, borderRadius: "50%", ml: 1 }}
													onClick={() => handleReject(b.booking_id)}
													>
													<Close fontSize="small" />
												</Button>
											</>
										)}

									</td>
									<td className="text-center">
									{!["completed", "in-progress", "cancelled"].includes(b.status) && (
										<Button
											variant="outlined" size="small" color="secondary"
											sx={{ borderRadius: "50px", textTransform: "none" }}
											onClick={(e) => {
												e.stopPropagation();
												navigate(`/cua-hang-truong/don-dat-lich/${b.booking_id}/doi-nguoi-sua-chua`);
											}}
										>Đổi người</Button>
									)}
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={7} className="text-center text-muted py-3">Không có dữ liệu</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default BookingTable;
