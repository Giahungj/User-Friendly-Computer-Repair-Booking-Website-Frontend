import { Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import { toast } from "react-toastify";
import { cancelRepairBooking } from "../../../../services/RepairBookingService";

function CancelBookingModal({ open, onClose, bookingId }) {
	const [reason, setReason] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!reason) {
			toast.warn("Vui lòng nhập lý do hủy lịch hẹn.");
			return;
		}
		if (!bookingId) {
			toast.error("Thiếu thông tin mã lịch hẹn.");
			return;
		}

		setLoading(true);
		try {
			const res = await cancelRepairBooking(bookingId, reason);
			setTimeout(() => {
				if (res.EC === 0) {
						toast.success("Hủy lịch hẹn thành công!");
						window.location.reload();
				} else {
						toast.error(res.EM || "Hủy lịch hẹn thất bại.");
				}
				setLoading(false);
			}, 800);
		} catch (err) {
			toast.error("Có lỗi xảy ra khi hủy lịch hẹn.");
			setLoading(false);
		}
	};

	return (
		<div
			className={`modal fade ${open ? "show d-block" : ""}`}
			tabIndex="-1"
			role="dialog"
			style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
		>
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content border-0 shadow rounded">
					<div className="modal-header bg-danger text-white">
						<h5 className="modal-title">Xác nhận hủy lịch #{bookingId}</h5>
						<button
							type="button"
							className="btn-close btn-close-white"
							onClick={onClose}
						></button>
					</div>

					<div className="modal-body">
						<div className="mb-3">
							<label className="form-label fw-bold">Lý do hủy lịch</label>
							<textarea
								className="form-control"
								rows="3"
								value={reason}
								onChange={(e) => setReason(e.target.value)}
								placeholder="Nhập lý do hủy..."
							></textarea>
						</div>

						{/* Gợi ý nhanh */}
						<div className="d-flex flex-wrap gap-2 mb-3">
							{[
								"Bận công việc đột xuất",
								"Tìm được chỗ sửa khác",
								"Đặt nhầm lịch",
								"Không cần sửa nữa"
							].map((reason) => (
								<Button
									key={reason}
									variant="outlined"
									size="small"
									sx={{ textTransform: "none" }}
									onClick={() => setReason(reason)}
								>
									{reason}
								</Button>
							))}
						</div>
					</div>

					<div className="modal-footer d-flex justify-content-between">
						<Button
							variant="outlined"
							color="inherit"
							onClick={onClose}
							sx={{ borderRadius: "50px", px: 3 }}
						>
							Đóng
						</Button>
						<Button
							type="submit"
							className="rounded-pill"
							variant="contained"
							onClick={handleSubmit}
							sx={{ minWidth: "140px", backgroundColor: "#f44336" }}
							disabled={loading}
						>
							{loading ? (
								<>
									<span className="spinner-border spinner-border-sm text-light me-2" role="status"></span>
									Xác nhận hủy
								</>
							) : (
								<>
									<CancelIcon fontSize="small" className="me-2"/>
									Xác nhận hủy
								</>
							)}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CancelBookingModal;
