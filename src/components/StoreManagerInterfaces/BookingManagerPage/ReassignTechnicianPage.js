// src/pages/storeManager/ReassignTechnicianPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { getRepairBookingDetailForStoreManager, reassignTechnician } from "../../../services/RepairBookingService";
import { getAvailableTechniciansByManager } from "../../../services/TechnicianService";
import LoadingAndError from "../../commons/LoadingAndError";
import { Avatar } from "@mui/material";
import { toast } from "react-toastify";

const ReassignTechnicianPage = () => {
	const { repair_booking_id } = useParams();
	const navigate = useNavigate();
	const { auth } = useContext(AuthContext);
	const storeManagerId = auth.user.storeManagerId;

	const [booking, setBooking] = useState(null);
	const [technicians, setTechnicians] = useState([]);
	const [technicianId, setTechnicianId] = useState(null);
	const [newWorkScheduleId, setNewWorkScheduleId] = useState(null);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const loadData = async () => {
			try {
				const resBooking = await getRepairBookingDetailForStoreManager(repair_booking_id);
				if (!resBooking || resBooking.EC !== 0) {
					setError(resBooking?.EM || "Không tìm thấy đơn đặt lịch");
					setLoading(false);
					return;
				}
				setBooking(resBooking.DT);
				const resTech = await getAvailableTechniciansByManager(storeManagerId);
				console.log(resTech)
				if (!resTech || resTech.EC !== 0) {
					setError(resTech?.EM || "Không lấy được danh sách kỹ thuật viên");
					return;
				}
				setTechnicians(resTech.DT);
			} catch (err) {
				console.error("Lỗi khi tải dữ liệu:", err);
				setError("Đã xảy ra lỗi khi tải dữ liệu.");
				setLoading(false);
			} finally {
				setLoading(false);
			};
		};
		loadData();
	}, [repair_booking_id, storeManagerId]);

	const handleReassignTechnician = async () => {
		if (!technicianId) {
			toast.warning("Vui lòng chọn kỹ thuật viên mới!");
			return;
		}

		setLoading(true);

		try {
			const res = await reassignTechnician({
				bookingId: booking.booking_id,
				oldworkScheduleId: booking.WorkSchedule.work_schedule_id,
				newWorkScheduleId: newWorkScheduleId,
				technicianId: technicianId
			});

			if (res.EC === 0) {
				toast.success("Đổi kỹ thuật viên thành công!");
				navigate(-1);
			} else {
				toast.error(res.EM || "Đổi kỹ thuật viên thất bại");
			}
		} catch (error) {
			console.error("Lỗi khi đổi kỹ thuật viên:", error);
			setError("Đã xảy ra lỗi khi đổi kỹ thuật viên!");
			toast.error("Đã xảy ra lỗi khi đổi kỹ thuật viên!");
		} finally {
			setLoading(false);
		}
	};

	if (loading) return <LoadingAndError.Loading />;
	if (error) return <LoadingAndError.Error message={error} />;

	// if (!booking || !booking.Customer?.User || !booking.WorkSchedule?.Technician?.User)
	// 	return <p className="text-center text-muted mt-5">Không có dữ liệu đơn đặt lịch hợp lệ.</p>;

	return (
		<div className="container py-4">
			<h4 className="text-primary mb-4">Đổi kỹ thuật viên</h4>
			<h6 className="mb-3">
				Đơn của khách <b>{booking.Customer.User.name}</b> - Ngày cần đổi: <b>{booking.WorkSchedule.work_date}</b>
			</h6>
			<div className="mb-4">
				<div className="mb-2">Kỹ thuật viên hiện tại: {booking.WorkSchedule.Technician.User.name}</div>
				<h6 className="mb-3">Chọn kỹ thuật viên mới theo ngày làm việc</h6>

				{technicians.map((day) => (
					<div key={day.work_date} className="mb-3">
						<div className="fw-bold mb-2">Ngày: {day.work_date}</div>
						<div className="d-grid gap-2">
							{day.technicians.map((t) => (
								<div key={t.technician_id} className="d-flex align-items-center gap-2">
									<Avatar
										className="me-2"
										src={`http://localhost:8080/images${t?.User?.avatar}`}
										alt={t?.User?.name}
									/>
									<button
										type="button"
										onClick={() => {
											console.log("==============================================================================");
											console.log("Thông tin booking:", booking);
											console.log("Lịch cũ:", booking.WorkSchedule.work_schedule_id);
											console.log("Kỹ thuật viên cũ:", booking.WorkSchedule.Technician.technician_id);
											console.log("Chọn kỹ thuật viên ID:", t.technician_id,);
											console.log("Chọn lịch ID:",  t.WorkSchedule.work_schedule_id);
											setTechnicianId(t.technician_id);
											setNewWorkScheduleId(t.WorkSchedule.work_schedule_id);
										}}
										disabled={t.WorkSchedule?.current_number >= t.WorkSchedule?.max_number}
										className={`btn flex-grow-1 text-start rounded-3 py-2 px-3 ${
											technicianId === t.technician_id && newWorkScheduleId === t.WorkSchedule.work_schedule_id
												? "btn-primary text-white shadow"
												: "btn-outline-secondary"
										}`}
									>
										<div className="d-flex justify-content-between w-100">
											<span className="fw-bold">{t.User.name}</span>
											<span className="small">{t.User.phone}</span>
										</div>
										<small>
											{t.WorkSchedule?.max_number !== null && t.WorkSchedule?.current_number !== null
												? t.WorkSchedule.current_number >= t.WorkSchedule.max_number
													? "Đã hết chỗ"
													: `Còn ${t.WorkSchedule.max_number - t.WorkSchedule.current_number} chỗ`
												: "Chưa có lịch"}
										</small>
									</button>
								</div>
							))}
						</div>
					</div>
				))}
			</div>

			<div className="d-flex justify-content-end gap-2">
				<button className="btn btn-light rounded-pill px-4" onClick={() => navigate(-1)}>
					Hủy
				</button>
				<button className="btn btn-primary rounded-pill px-4" onClick={handleReassignTechnician}>
					Xác nhận
				</button>
			</div>
		</div>
	);
};

export default ReassignTechnicianPage;
