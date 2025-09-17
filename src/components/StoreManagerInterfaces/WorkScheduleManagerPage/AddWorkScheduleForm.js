import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { getAllTechniciansByManager } from "../../../services/TechnicianService";
import { createWorkSchedules } from "../../../services/ScheduleService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddWorkScheduleForm({ onAdded }) {
    const { auth } = useContext(AuthContext);

    const [technicians, setTechnicians] = useState([]);
    const [selectedTechs, setSelectedTechs] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [shift, setShift] = useState("1");
    const [maxNumber, setMaxNumber] = useState(10); // Giá trị mặc định
    const [loading, setLoading] = useState(false);

    const MAX_TECHNICIANS = 5;

    // Load danh sách kỹ thuật viên
    useEffect(() => {
        const loadTechnicians = async () => {
            try {
				const res = await getAllTechniciansByManager(auth.user.storeManagerId);

				if (!res) {
					toast.error("Không nhận được phản hồi từ server!");
					return;
				}

				if (res.techData?.EC === 0) {
					setTechnicians(res.techData.DT);
				} else if (res.techData?.EC === 1) {
					toast.warning("Bạn không có quyền xem danh sách kỹ thuật viên!");
				} else if (res.techData?.EC === 2) {
					toast.error("Không tìm thấy kỹ thuật viên nào thuộc quản lý của bạn!");
				} else {
					toast.error(res.techData?.EM || "Không thể tải danh sách kỹ thuật viên!");
				}
			} catch (error) {
				console.error("Lỗi khi tải kỹ thuật viên:", error);

				if (error.response) {
					// Lỗi từ phía server có status code
					toast.error(`Server trả về lỗi ${error.response.status}: ${error.response.data?.EM || "Lỗi không xác định"}`);
				} else if (error.request) {
					// Không nhận được phản hồi từ server
					toast.error("Không thể kết nối đến server. Vui lòng kiểm tra mạng!");
				} else {
					// Lỗi khác trong lúc xử lý
					toast.error("Đã xảy ra lỗi khi tải kỹ thuật viên!");
				}
			}
        };
        loadTechnicians();
    }, [auth.user.storeManagerId]);

    // Xử lý chọn/bỏ chọn kỹ thuật viên
    const toggleSelectTechnician = (id) => {
        setSelectedTechs((prev) => {
            if (prev.includes(id)) {
                return prev.filter((tid) => tid !== id);
            }
            if (prev.length >= MAX_TECHNICIANS) {
                toast.warning(`Chỉ được chọn tối đa ${MAX_TECHNICIANS} kỹ thuật viên!`);
                return prev;
            }
            return [...prev, id];
        });
    };

	// Hàm kiểm tra ngày hợp lệ
	const isValidDate = (dateStr) => {
		const date = new Date(dateStr);
		if (isNaN(date.getTime())) return false; // không hợp lệ
		const today = new Date();
		today.setHours(0,0,0,0); // reset time
		return date >= today; // không cho chọn ngày quá khứ
	};

    // Xử lý gửi form
    const handleSubmit = async (e) => {
        e.preventDefault();
		// Validations
		if (!date) {
			toast.error("Vui lòng chọn ngày làm việc!");
			return;
		}
		if (!isValidDate(date)) {
			toast.error("Ngày làm việc không hợp lệ, vui lòng chọn lại!");
			return;
		}
        if (selectedTechs.length === 0) {
            toast.error("Vui lòng chọn ít nhất một kỹ thuật viên!");
            return;
        }

        const payload = {
            storeManagerId: auth.user.storeManagerId,
            schedules: selectedTechs.map((techId) => ({
                technician_id: techId,
                work_date: date,
                shift,
                max_number: maxNumber,
            })),
        };

        try {
			setLoading(true);
			const res = await createWorkSchedules(payload);

			if (res && res.EC === 0) {
				toast.success(`✅ Đã thêm ${res.DT.length} lịch làm việc thành công!`);
				onAdded(res.DT);
				resetForm();
			} else if (res && res.EC === 1) {
				toast.warning(`⚠️ ${res.EM || "Dữ liệu không hợp lệ, vui lòng kiểm tra lại!"}`);
			} else if (res && res.EC === 2) {
				toast.info(`ℹ️ ${res.EM || "Một số lịch đã tồn tại, không thể thêm trùng!"}`);
			} else {
				toast.error(res?.EM || "❌ Không thể thêm lịch làm việc, vui lòng thử lại!");
			}
		} catch (error) {
			console.error("Lỗi khi tạo lịch làm việc:", error);
			toast.error("❌ Đã xảy ra lỗi hệ thống khi tạo lịch làm việc!");
		} finally {
			setLoading(false);
		}
    };

    // Reset form
    const resetForm = () => {
        setSelectedTechs([]);
        setDate("");
        setShift("1");
        setMaxNumber(10);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* Ngày làm việc */}
                <div className="mb-3">
                    <label className="form-label fw-bold">Ngày làm việc</label>
                    <input
                        type="date"
                        className="form-control"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                {/* Ca làm */}
                <div className="mb-3">
                    <label className="form-label fw-bold">Ca làm</label>
                    <select
                        className="form-select"
                        value={shift}
                        onChange={(e) => setShift(e.target.value)}
                    >
                        <option value="1">Ca 1 (07:00 - 11:00)</option>
                        <option value="2">Ca 2 (13:00 - 17:00)</option>
                    </select>
                </div>

                {/* Số lượng tối đa */}
                <div className="mb-3">
                    <label className="form-label fw-bold">Số lượng tối đa</label>
                    <input
                        type="number"
                        className="form-control"
                        value={maxNumber}
                        min="1"
                        onChange={(e) => setMaxNumber(e.target.value)}
                    />
                </div>

                {/* Chọn kỹ thuật viên */}
                <div className="mb-3">
                    <label className="form-label fw-bold">Chọn KTV</label>
                    <ul className="list-group">
                        {technicians.map((tech) => (
                            <li
                                key={tech.technician_id}
                                className={`list-group-item d-flex justify-content-between align-items-center ${
                                    selectedTechs.includes(tech.technician_id)
                                        ? "active text-white"
                                        : ""
                                }`}
                                style={{ cursor: "pointer" }}
                                onClick={() => toggleSelectTechnician(tech.technician_id)}
                            >
                                <div>
                                    <strong>{tech.User?.name}</strong> <br />
                                    <small>{tech.User?.email}</small>
                                </div>
                                {selectedTechs.includes(tech.technician_id) && <span>✓</span>}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Nút gửi */}
                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                >
                    {loading
                        ? "Đang tạo..."
                        : `Tạo lịch cho ${selectedTechs.length} kỹ thuật viên`}
                </button>
            </form>
        </div>
    );
}

export default AddWorkScheduleForm;