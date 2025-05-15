import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { fetchScheduleAndTimeSlot, createSchedule } from "../../../services/ScheduleService";
import DoctorDateSelector from "./DoctorDateSelector";

const DoctorScheduleForm = () => {
    const { id } = useParams();
    const navigate = useNavigate(); 
    const [existingTimeSlots, setExistingTimeSlots] = useState([]);
    const [timeSlots, setTimeslots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        date: "",
        shift: "1",
    });
    const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const shifts = {
        1: "Buổi sáng",
        2: "Buổi chiều",
        3: "Buổi tối",
    };

    useEffect(() => {
        if (formData.date) {
            const fetchSchedule = async () => {
                const response = await fetchScheduleAndTimeSlot(id, formData.date);
                if (response.EC === 0) {
                    const schedules = response.DT.schedules || [];
                    const allTimeSlots = response.DT.timeslots || [];

                    const bookedSlotIds = schedules.map(slot => slot.timeSlotId);
                    const availableSlots = allTimeSlots.filter(slot => !bookedSlotIds.includes(slot.id));

                    setExistingTimeSlots(bookedSlotIds);
                    setTimeslots(availableSlots);
                } else {
                    setExistingTimeSlots([]);
                    setTimeslots([]);
                    setError(response.EM);
                }
            };

            fetchSchedule();
        }
    }, [formData.date]);

    const handleTimeSlotChange = (e, slotId) => {
        setSelectedTimeSlots((prev) => {
            let updatedSlots = [...prev];
    
            if (e.target.checked) {
                // Thêm slot mới nếu chưa tồn tại
                updatedSlots.push({ timeSlotId: slotId, maxPatients: "" });
            } else {
                // Loại bỏ slot khi bỏ chọn
                updatedSlots = updatedSlots.filter(slot => slot.timeSlotId !== slotId);
            }
    
            return updatedSlots;
        });
    };
    
    const handleMaxPatientsChange = (e, slotId) => {
        const value = e.target.value;
    
        setSelectedTimeSlots((prev) =>
            prev.map((slot) =>
                slot.timeSlotId === slotId ? { ...slot, maxPatients: value } : slot
            )
        );
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (selectedTimeSlots.length === 0) {
            setError("Vui lòng chọn ít nhất một khung giờ.");
            return;
        }
        const schedules = selectedTimeSlots.map((slotId) => ({
            doctorId: Number(id), // id từ useParams()
            date: formData.date,
            timeSlotId: parseInt(slotId.timeSlotId), // Đảm bảo slotId là số
            maxNumber: parseInt(slotId.maxPatients), // Chuyển maxPatients thành số
            currentNumber: 0,
            error: 0
        }))
        
        try {
            const response = await createSchedule(schedules);
            if (response.EC === 0) {
                toast.success("Hoàn thành thêm lịch làm việc!");
                navigate(`/doctor/manager-schedule/${id}`)
            } else {
                toast.error(response.EM);
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center py-5">
            <div className="card shadow-sm p-4 border" style={{ width: "55em" }}>
                <div className="card-body">
                    <h3 className="text-center mb-4">Đăng ký lịch làm việc</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            {/* Cột trái */}
                            <div className="col-md-8 border-end border-2">
                                {/* Ngày làm việc */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Chọn ngày</label>
                                    <DoctorDateSelector onSelectDate={(selectedDate) => setFormData({ ...formData, date: selectedDate })} />
                                </div>

                                {/* Chọn ca làm việc */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Chọn khung giờ</label>
                                    <div className="d-flex flex-column gap-3">
                                        {Object.keys(shifts).map((shift) => (
                                            <div key={shift} className="shift-container" data-shift={shift}>
                                                <h6 className="fw-bold text-primary">{shifts[shift]}</h6>
                                                <div className="d-flex flex-wrap gap-2">
                                                    {timeSlots
                                                        .filter((slot) => slot.shift == shift)
                                                        .map((slot) => (
                                                            <div key={slot.id} className="form-check">
                                                                <input 
                                                                    className="form-check-input time-checkbox time-btn" 
                                                                    type="checkbox" 
                                                                    id={`slot_${slot.id}`} 
                                                                    name="timeSlotId" 
                                                                    value={slot.id} 
                                                                    onChange={(e) => handleTimeSlotChange(e, slot.id)} 
                                                                    disabled={existingTimeSlots.includes(slot.id)} 
                                                                />
                                                                <label 
                                                                    className={`form-check-label btn ${existingTimeSlots.includes(slot.id) ? "btn-secondary" : "btn-outline-dark"}`} 
                                                                    htmlFor={`slot_${slot.id}`}
                                                                >
                                                                    {slot.startTime} - {slot.endTime}
                                                                </label>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Cột phải */}
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Số lượng bệnh nhân tối đa</label>
                                    <input type="number" className="form-control" name="maxPatients" value={formData.maxPatients} placeholder="45 bệnh nhân tối đa" min="1" disabled />
                                </div>
                                {selectedTimeSlots.map(({ timeSlotId, maxPatients }) => {
                                    const slot = timeSlots.find(slot => slot.id == timeSlotId);
                                    return (
                                        <div key={timeSlotId} className="mb-3">
                                            <label className="form-label fw-semibold">
                                                Số lượng bệnh nhân ({slot?.startTime} - {slot?.endTime})
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name={`maxNumber[${timeSlotId}]`}
                                                value={maxPatients}
                                                onChange={(e) => handleMaxPatientsChange(e, timeSlotId)}
                                                placeholder="Số bệnh nhân tối đa"
                                                min="1"
                                                required
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="d-flex justify-content-end mt-3 gap-2">
                            <button className="btn btn-outline-secondary rounded-pill" onClick={() => navigate(-1)}>
                                Hủy bỏ
                            </button>
                            <button type="submit" className="btn btn-info text-white rounded-pill">
                                {loading ? "Đang xử lý..." : "Đăng ký"}
                            </button>
                        </div>

                        {success && <div className="alert alert-success mt-3">{success}</div>}
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DoctorScheduleForm;
