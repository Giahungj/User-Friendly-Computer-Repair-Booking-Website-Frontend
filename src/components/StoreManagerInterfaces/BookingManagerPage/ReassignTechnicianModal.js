import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { getAvailableTechniciansByManager } from "../../../services/TechnicianService";

function ReassignTechnicianModal({ booking, onClose }) {
    const { auth } = useContext(AuthContext)
    const storeManagerId = auth.user.storeManagerId;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true);
	const [technicians, setTechnician] = useState("");
    const technician = [
        {
            "technician_id": 2,
            "User": {
                "name": "Âu Tấn Đạt",
                "phone": "0786813506",
                "email": "ktvtd@gmail.com",
                "avatar": "/uploads/1752762674277.jpg"
            },
            "WorkSchedules": {
                "work_schedule_id": null,
                "work_date": null,
                "current_number": null,
                "max_number": null
            },
            "Store": {
                "store_id": 3,
                "store_manager_id": 1
            }
        }
    ];

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await getAvailableTechniciansByManager(storeManagerId);
                if (!res || res.EC !== 0) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setTechnician(res.DT);
                setLoading(false);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu kỹ thuật viên:', error);
                setError(true);
                setLoading(false);
            }
        };
        loadData();
    }, [storeManagerId]);

	const handleConfirm = () => {
		onClose();
	};

	if (!booking || !technicians) return null;

	return (
		<div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
			<div className="modal-dialog modal-dialog-centered modal-lg">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Đổi kỹ thuật viên</h5>
						<button type="button" className="btn-close" onClick={onClose}></button>
					</div>

					<div className="modal-body p-3">
                        <p>
                            Lịch của khách <b>{booking.customer_name}</b> hiện đang gán cho{" "}
                            <b>{booking.technician_name}</b>.
                        </p>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Chọn kỹ thuật viên mới</label>
                            <div className="d-grid gap-2">
                                {technicians.map((t) => (
                                    <div
                                        key={t.technician_id}
                                        className="d-flex align-items-center gap-2"
                                    >
                                        <img
                                            src={`http://localhost:8080/images${t.User.avatar}`}
                                            alt={t.User.name}
                                            style={{ width: "5em", height: "5em", borderRadius: "50%" }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setTechnician(t.technician_id)}
                                            disabled={t.WorkSchedules?.current_number >= t.WorkSchedules?.max_number}
                                            className={`btn flex-grow-1 d-flex flex-column align-items-start justify-content-center rounded-3 shadow-sm py-2 px-3 ${
                                                technician === t.technician_id
                                                    ? "btn-secondary text-white"
                                                    : "btn-outline-secondary"
                                            }`}
                                        >
                                            <div className="d-flex justify-content-between w-100">
                                                <span className="fw-bold">{t.User.name}</span>
                                                <span className="small">{t.User.phone}</span>
                                            </div>
                                            <small>
                                                {t.WorkSchedules?.max_number !== null && t.WorkSchedules?.current_number !== null
                                                    ? t.WorkSchedules.current_number >= t.WorkSchedules.max_number
                                                        ? "Đã hết chỗ"
                                                        : `Còn ${t.WorkSchedules.max_number - t.WorkSchedules.current_number} chỗ`
                                                    : "Chưa có lịch"}
                                            </small>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
					</div>

					<div className="modal-footer">
						<button type="button" className="btn rounded-pill" style={{color: "#2196f3"}} onClick={onClose}>
							Hủy
						</button>
						<button type="button" className="btn text-white rounded-pill" style={{backgroundColor: "#2196f3"}} onClick={handleConfirm}>
							Xác nhận
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ReassignTechnicianModal;
