import "./TechnicianScheduleDetail.css"
const TechnicianScheduleDetail = ({ schedule, onClose }) => {
	// Nếu không có schedule thật, tạo dữ liệu ảo
	if (!schedule) return (null)

	return (
		<>
			<div 
				className="position-fixed top-0 start-0 w-100 h-100"
				onClick={onClose}
			/>

			<div 
                id="technician-schedule-detail"
                className="card p-3 shadow-lg position-fixed fade-in"
                style={{
                    top: '10%',
                    right: '10px',
                    zIndex: 1060,
                    minWidth: '30em',
                    maxWidth: '50em'
                }}
            >
                <button
                    className="btn btn-light btn-sm position-absolute top-0 end-0 m-2"
                    onClick={onClose}
                >
                    X
                </button>

                <h5 className="mb-3">Chi tiết lịch làm việc</h5>

                <div className="row">
                    {/* Thông tin lịch bên trái */}
                    <div className="col-md-6">
                        <p><strong>Ngày:</strong> {new Date(schedule.work_date).toLocaleDateString("vi-VN")}</p>
                        <p><strong>Ca:</strong> {schedule.shift === "1" ? "Sáng" : "Chiều"}</p>
                        <p><strong>Số lượng hiện tại:</strong> {schedule.current_number}/{schedule.max_number}</p>
                        <p><strong>Cửa hàng:</strong> {schedule.Technician?.Store?.name}</p>
                        <p><strong>Kỹ thuật viên:</strong> {schedule.Technician?.User?.name || "Không có"}</p>
                        {schedule.Technician?.User?.avatar && (
                            <img 
                                src={`http://localhost:8080/images${schedule.Technician.User.avatar}`} 
                                alt="Avatar" 
                                className="img-thumbnail my-2" 
                                style={{ maxWidth: 120 }} 
                            />
                        )}
                    </div>

                    {/* Danh sách RepairBooking bên phải */}
                    <div className="col-md-6">
                        {schedule.RepairBooking?.length > 0 && (
                            <div>
                                <h6>Đơn sửa chữa:</h6>
                                <ul className="list-group">
                                    {schedule.RepairBooking.map(rb => (
                                        <li key={rb.booking_id} className="list-group-item">
                                            <p><strong>Khách hàng:</strong> {rb.Customer?.name || "Không có"}</p>
                                            <p><strong>Người tạo:</strong> {rb.User?.name || "Không có"}</p>
                                            <p><strong>Trạng thái:</strong> {rb.status || "Chưa có"}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
		</>
	);
};

export default TechnicianScheduleDetail;
