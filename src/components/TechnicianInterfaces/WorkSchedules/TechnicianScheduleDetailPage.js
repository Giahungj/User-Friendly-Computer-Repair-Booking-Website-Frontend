// TechnicianSchedulePage.js
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import { getWorkScheduleDetail } from "../../../services/WorkScheduleService";
import { completedRepairBooking } from "../../../services/RepairBookingService";
import { BackButton, ConfirmButton } from "../../commons/ActionButtons";
import LoadingAndError from "../../commons/LoadingAndError";

const TechnicianScheduleDetailPage = () => {
    const { auth } = useContext(AuthContext);
    const technicianId = auth.user.technicianId;
    const { work_schedule_id } = useParams();
    const [page, setPage] = useState(1);
    const [schedule, setSchedule] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchScheduleDetail = async () => {
        try {
            const res = await getWorkScheduleDetail(work_schedule_id);
            if (res?.EC === 0 && res?.DT) setSchedule(res.DT);
            else toast.error(res?.EM || "Lỗi tải chi tiết");
        } catch (err) {
            console.error("Lỗi tải chi tiết:", err);
        }
    };
    
    useEffect(() => {
		if (!work_schedule_id) return;
		fetchScheduleDetail();
	}, [work_schedule_id]);

    const formatDate = d => new Date(d).toLocaleDateString("vi-VN");
	const getShiftText = s => s === "1" ? "Sáng" : "Chiều";

    const handleCompleteBooking = async (bookingId) => {
        setLoading(true);
        try {
            const res = await completedRepairBooking(technicianId, bookingId);
            if (res?.EC === 0) {
                toast.success("Xác nhận hoàn thành đơn thành công");
                fetchScheduleDetail(work_schedule_id);
            } else {
                toast.error(res?.EM || "Lỗi xác nhận hoàn thành đơn");
            }
        } catch (err) {
            console.error("Lỗi xác nhận hoàn thành đơn:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingAndError.Loading />;
    if (error) return <LoadingAndError.Error message={error} />;

    return (
        <div className="container py-5">
            <div className="card hadow-sm mb-4">
                <div className="card-body d-flex justify-content-between align-items-center">
                    <h4>Lịch làm việc Kỹ Thuật Viên</h4>
                    <BackButton onClick={() => window.history.back()} />
                </div>
            </div>

            <div className="row">
                {/* Cột nhỏ: Thông tin cơ bản của schedule */}
                <div className="col-4">
                    <div className="d-flex flex-column gap-2">
                        {[
                            { label: "Ngày", value: formatDate(schedule.work_date) },
                            { label: "Ca làm việc", value: getShiftText(schedule.shift) },
                            { label: "Số lượng", value: `${schedule.current_number}/${schedule.max_number}` },
                            { label: "Cửa hàng", value: schedule.Technician?.Store?.name || "Không xác định" },
                            { label: "Kỹ thuật viên", value: schedule.Technician?.User?.name || "Không xác định" }
                        ].map((item, i) => (
                            <div key={i} className="card shadow-sm" style={{ backgroundColor: "#415A77", color: "#E0E1DD" }}>
                                <div className="card-body">
                                    <div className="fw-bold">{item.label}</div>
                                    <div className="small">{item.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cột to: Danh sách booking chi tiết */}
                <div className="col-8">
                    {schedule.RepairBookings?.length ? (
                        <div className="d-flex flex-column gap-3">
                            {schedule.RepairBookings.map(rb => (
                                <div key={rb.booking_id} className="card" style={{ backgroundColor: "#E0E1DD", color: "#1B263B" }}>
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <div className="fw-bold">{rb.Customer?.User?.name || "Khách hàng không xác định"}</div>
                                            <span className={`badge ${rb.status === "completed" ? "bg-success" : rb.status === "in-progress" ? "bg-warning text-dark" : "bg-secondary"}`}>
                                                {rb.status}
                                            </span>
                                        </div>
                                        <div className="small">
                                            <div><strong>Email:</strong> {rb.Customer?.User?.email || "Không xác định"}</div>
                                            <div><strong>Điện thoại:</strong> {rb.Customer?.User?.phone || "Không xác định"}</div>
                                            <div><strong>Người tạo:</strong> {rb.User?.name || "Không xác định"}</div>
                                            <div><strong>Thiết bị:</strong> {rb.device_type} - {rb.brand} {rb.model}</div>
                                            <div><strong>Mô tả sự cố:</strong> {rb.issue_description}</div>
                                            <div><strong>Ngày đặt:</strong> {rb.booking_date} {rb.booking_time}</div>
                                            {rb.issue_image && (
                                                <div className="mt-2 text-center">
                                                    <img
                                                        src={`http://localhost:8080/images/${rb.issue_image}`}
                                                        alt="Sự cố"
                                                        className="img-fluid rounded"
                                                        style={{ maxHeight: "150px" }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        {rb.status === "in-progress" && (
                                            <ConfirmButton onClick={() => handleCompleteBooking(rb.booking_id)} />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-secondary mt-2">
                            Không có đơn sửa chữa
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default TechnicianScheduleDetailPage;
