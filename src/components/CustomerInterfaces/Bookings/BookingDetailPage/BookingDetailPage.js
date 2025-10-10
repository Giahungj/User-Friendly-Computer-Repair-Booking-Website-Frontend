import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ReplayIcon from '@mui/icons-material/Replay';

import { getRepairBookingDetail } from "../../../../services/RepairBookingService"
import BookingDetailSkeleton from "./BookingDetailSkeleton";
import CancelBookingModal from "./CancelBookingModal";
import UpdateBookingModel from "./UpdateBookingModel";
import "../RepairBookingCard.scss"; 

function BookingDetailPage() {
	const { bookingId } = useParams();
	const navigate = useNavigate();
	const [openCancelModal, setOpenCancelModal] = useState(false);
	const [openUpdateModal, setOpenUpdateModal] = useState(false);
	const [booking, setBooking] = useState(null);
	const [updatedHistories, setUpdatedHistories] = useState([]);
	const [showAllHistories, setShowAllHistories] = useState(false);
	const displayedHistories = showAllHistories ? updatedHistories : updatedHistories.slice(0, 1);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchBooking = async () => {
			try {
				const res = await getRepairBookingDetail(bookingId);
				if (res.EC !== 0) {				
					setError(true);
				} 
					setBooking(res.DT);
					setUpdatedHistories(res.DT.RepairHistories || []);
					setLoading(false);
			} catch (err) {
				setError(true);
			}
		};
		fetchBooking();
	}, [bookingId]);

	if (loading) return <BookingDetailSkeleton />;
	if (error) return (
		<div className="container py-5 fs-7">
			<div
				className="card shadow-sm border-0 p-3 mb-4"
				style={{ maxWidth: "700px", margin: "0 auto" }}
			>
				<div
					className="card-header border-0 rounded text-center"
					style={{ backgroundColor: "#e3f2fd" }}
				>
					<ErrorOutlineIcon sx={{ fontSize: 40, color: "#f44336" }} />
					<h4 className="lead mt-2 mb-1">Không thể tải thông tin đơn đặt lịch</h4>
					<p className="text-muted mb-0">Đã xảy ra sự cố khi lấy dữ liệu chi tiết đơn hàng</p>
				</div>
				<div className="p-4 text-center">
					<p className="lead text-muted mb-4">
						Vui lòng kiểm tra lại kết nối hoặc thử tải lại trang.
					</p>
					<div className="d-flex justify-content-center gap-3">
						<Button
							variant="outlined"
							startIcon={<ArrowBackIcon />}
							sx={{ borderRadius: "5px", minWidth: "120px" }}
							onClick={() => navigate(-1)}
						>
							Quay lại
						</Button>
						<Button
							variant="contained"
							startIcon={<ReplayIcon />}
							sx={{ backgroundColor: "#2196f3", borderRadius: "5px", minWidth: "120px" }}
							onClick={() => window.location.reload()}
						>
							Thử lại
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
	const shiftValue = booking?.WorkSchedule?.shift;
	const shiftLabel = {
		1: "Ca sáng (7:00 - 11:00)",
		2: "Ca chiều (13:00 - 17:00)",
	}[shiftValue] || "Ca không xác định";

	const formattedWorkDate = booking?.WorkSchedule?.work_date
		? new Date(booking.WorkSchedule.work_date).toLocaleDateString("vi-VN")
		: "Không xác định";
	const formattedBookingDate = booking?.booking_date
		? new Date(booking.booking_date).toLocaleDateString("vi-VN")
		: "Không xác định";

	const customerUser = booking?.Customer?.User;
	const technicianUser = booking?.WorkSchedule?.Technician?.User;
	const store = booking?.WorkSchedule?.Technician?.Store;

	return (
		<>
			<div className="container py-5">
				<div className="card shadow-sm p-3 mb-3">
					{/* Header */}
					<div
						className="card-header border-0 mb-4 rounded text-white text-center"
						style={{ backgroundColor: "#2196f3" }}
					>
						<h4 className="lead mt-2 mb-2">Thông tin lịch sửa chữa</h4>
						<h3 className="mb-2">Mã lịch hẹn #{booking?.booking_id || "?"}</h3>
						<p className="mb-1">
							Ngày đặt: <strong>{formattedBookingDate}</strong> - Thời gian đặt:{" "}
							<strong>{booking?.booking_time || "Không xác định"}</strong>
						</p>
						<span
							className={`text-uppercase btn ${
								booking?.status === "pending"
									? "btn-warning"
									: booking?.status === "in-progress"
									? "btn-primary"
									: booking?.status === "cancelled"
									? "btn-danger"
									: "btn-success"
							}`}
						>
							{booking?.status === "pending" ||  booking?.status === "in-progress" && (
								<span
									className="spinner-border spinner-border-sm text-light me-2"
									role="status"
								></span>
							)}
							{booking?.status === "pending"
								? "Đang chờ duyệt"
								: booking?.status === "in-progress"
								? "Kỹ thuật viên đã nhận đơn và trong quá trình sửa chữa cho bạn"
								: booking?.status === "cancelled"
								? "Đã hủy"
								: "Đã hoàn thành"}
						</span>

						{booking?.status === "pending" && (
							<p className="mt-2 text-light small fst-italic">
								Lịch hẹn sẽ được duyệt trong vòng 24 giờ. Vui lòng kiểm tra lại sau.
							</p>
						)}

						{/* Thông báo quá 24h */}
						{booking?.status === "pending" && (() => {
							const bookingDateTime = new Date(`${booking.booking_date}T${booking.booking_time}`);
							const now = new Date();
							const diffHours = (now - bookingDateTime) / (1000 * 60 * 60);

							return diffHours > 24 ? (
								<p className="mt-2 text-danger small fst-italic bg-light">
									Đã quá 24 giờ nhưng lịch hẹn vẫn chưa được duyệt. Vui lòng liên hệ tư vấn qua{" "}
									<span className="text-decoration-underline">đường dây nóng</span> để được hỗ trợ.
								</p>
							) : null;
						})()}
					</div>

					{updatedHistories.length > 0 && (
						<div className="card-body">
							<h5 className="text-primary mb-3">Thông tin cập nhật lịch</h5>
							{displayedHistories.map((h, i) => (
								<div key={i} className="mb-2 ps-3" style={{ borderLeft: "3px solid #2196f3" }}>
									<p className="mb-1">
										<strong>Ghi chú:</strong> {h.notes || "Không có"}
									</p>
									<p className="mb-0 text-muted small">
										Thời gian: {new Date(h.action_date).toLocaleString("vi-VN")}
									</p>
								</div>
							))}
							{updatedHistories.length > 1 && (
								<Button
									variant="text"
									size="small"
									onClick={() => setShowAllHistories(!showAllHistories)}
									endIcon={showAllHistories ? <ExpandLessIcon /> : <ExpandMoreIcon />}
									sx={{
										textTransform: "none",
										color: "#2196f3",
										fontWeight: 500,
										"&:hover": { backgroundColor: "rgba(33, 150, 243, 0.08)" },
										borderRadius: 3
									}}
								>
									{showAllHistories ? "Thu gọn" : "Xem thêm"}
								</Button>
							)}
						</div>
					)}

					{/* Thiết bị */}
					<div className="row mb-3">
						<div className="col-12">
							<div className="card border p-2 h-100">
								<h6 className="lead border-bottom pb-2 mb-3">Thông tin thiết bị</h6>
								<div className="row">
									<div className="col-md-6">
										<p><strong>Loại thiết bị:</strong> {booking?.device_type || "Không xác định"}</p>
										<p><strong>Hãng:</strong> {booking?.brand || "Không xác định"}</p>
										<p><strong>Model:</strong> {booking?.model || "Không xác định"}</p>
										<h6 className="fw-bold mt-3">Mô tả sự cố</h6>
										<p>{booking?.issue_description || "Không có mô tả"}</p>
									</div>

									<div className="col-md-6">
										<h6 className="fw-bold">Hình ảnh mô tả lỗi</h6>
										{booking?.issue_image ? (
											<img
												src={`http://localhost:8080/images${booking.issue_image}`}
												alt="Mô tả lỗi"
												className="img-fluid rounded border mb-2"
												style={{
													maxHeight: "180px",
													objectFit: "contain",
													backgroundColor: "#fff",
												}}
											/>
										) : (
											<p className="text-muted">Không có hình ảnh</p>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Khách hàng */}
					<div className="row mb-3">
						<div className="col-md-6 mb-3">
							<div className="card border p-2 h-100">
								<h6 className="lead border-bottom pb-2 mb-3">Thông tin khách hàng</h6>
								<p>
									<strong>Tên khách hàng:</strong>{" "}
									{customerUser?.name || <span className="text-danger">Chưa cập nhật</span>}
								</p>
								<p>
									<strong>Email:</strong>{" "}
									{customerUser?.email || <span className="text-danger">Chưa cập nhật</span>}
								</p>
								<p>
									<strong>Số điện thoại:</strong>{" "}
									{customerUser?.phone || <span className="text-danger">Chưa cập nhật</span>}
								</p>
							</div>
						</div>

						{/* Kỹ thuật viên */}
						<div className="col-md-6 mb-3">
							<div className="card border p-2 h-100">
								<h6 className="lead border-bottom pb-2 mb-3">Thông tin kỹ thuật viên</h6>
								<div className="row">
									<div className="col-md-6">
										<p><strong>Ngày làm việc:</strong> <span className="bg-primary p-1 text-white">{formattedWorkDate}</span></p>
										<p><strong>Ca làm việc:</strong> <span className="bg-primary p-1 text-white">{shiftLabel}</span></p>
										<p><strong>Tên kỹ thuật viên:</strong> <span className="bg-primary p-1 text-white">{technicianUser?.name || "Không xác định"}</span></p>
									</div>

									<div className="col-md-6">
										{technicianUser && (
											<div
												className="d-flex align-items-center gap-3 mt-2 p-2 border rounded bg-light card-hover"
												style={{ cursor: "pointer" }}
												onClick={() =>
													navigate(
														`/ky-thuat-vien/${booking?.WorkSchedule?.Technician?.technician_id}/chi-tiet`
													)
												}
											>
												<img
													src={`http://localhost:8080/images${technicianUser.avatar}`}
													alt="Avatar"
													className="rounded-circle"
													style={{
														width: "60px",
														height: "60px",
														objectFit: "cover",
													}}
												/>
												<div>
													<span className="fw-bold">{technicianUser.name}</span>
													<br />
													<span className="text-muted">{technicianUser.email}</span>
													<br />
													<span className="text-muted">{technicianUser.phone}</span>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>

						{/* Cửa hàng */}
						<div className="col-12">
							<div className="card border p-2">
								<h6 className="lead border-bottom pb-2 mb-3">Thông tin cửa hàng</h6>
								{store?.store_image && (
									<div className="text-center mb-3">
										<img
											src={`http://localhost:8080${store.store_image}`}
											alt="Hình cửa hàng"
											className="img-fluid rounded shadow-sm"
											style={{ maxHeight: "200px", objectFit: "cover" }}
										/>
									</div>
								)}
								<p><strong>Tên cửa hàng:</strong> <span className="bg-primary p-1 text-white">{store?.name || "Không xác định"}</span></p>
								<p><strong>Địa chỉ cửa hàng:</strong> <span className="bg-primary p-1 text-white">{store?.address || "Không xác định"}</span></p>
							</div>
						</div>
					</div>

					{/* Nút */}
					<div className="text-end d-flex justify-content-center gap-2">
						<Button
							className="rounded-pill"
							variant="outlined"
							sx={{ minWidth: "120px" }}
							startIcon={<ArrowBackIcon />}
							onClick={() => navigate(`/ky-thuat-vien/tat-ca`)}
						>
							Quay lại
						</Button>

						<Button
							className="rounded-pill"
							variant="contained"
							color="primary"
							sx={{ minWidth: "120px" }}
							startIcon={<EditIcon />}
							onClick={() => setOpenUpdateModal(true)} // hoặc hàm xử lý cập nhật
							disabled={booking?.status !== "pending"}
						>
							Cập nhật
						</Button>

						<Button
							className="rounded-pill"
							variant="contained"
							color="error"
							sx={{ minWidth: "120px" }}
							startIcon={<CancelIcon />}
							onClick={() => setOpenCancelModal(true)}
							disabled={booking?.status !== "pending"}
						>
							Hủy lịch
						</Button>
					</div>
				</div>
			</div>

			<UpdateBookingModel
				open={openUpdateModal}
				onClose={() => setOpenUpdateModal(false)}
				bookingId={booking?.booking_id || bookingId}
				booking={booking}
			/>

			<CancelBookingModal
				open={openCancelModal}
				onClose={() => setOpenCancelModal(false)}
				bookingId={booking?.booking_id || bookingId}
			/>
		</>
	);
}

export default BookingDetailPage;