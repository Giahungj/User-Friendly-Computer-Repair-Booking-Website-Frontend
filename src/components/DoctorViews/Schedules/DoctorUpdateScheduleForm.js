import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchEditableTimeSlots, updateSchedule } from "../../../services/ScheduleService";

const DoctorUpdateScheduleForm = () => {
    const { scheduleId, userId, date } = useParams();
    const [schedule, setSchedule] = useState(null);
    const [timeslots, setTimeSlots] = useState([]);
    const [maxNumber, setMaxNumber] = useState("");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const shifts = {
        1: "Buổi sáng",
        2: "Buổi chiều",
        3: "Buổi tối",
    };

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const res = await fetchEditableTimeSlots(scheduleId, date, userId);
                if (res.EC === 0) {
                    setTimeSlots(res.DT.timeslots);
                    setSchedule(res.DT.schedule);
                    setMaxNumber(res.DT.schedule.maxNumber);
                } else {
                    setError(res.EM);
                    toast.success("Thông báo: " + res.EM);
                }
            } catch (error) {
                toast.error("Lỗi khi đặt lịch: " + error);
            }
        };

        fetchSchedule();
    }, [scheduleId, date]);

    const handleTimeSlotChange = (e, slotId) => {
        if (e.target.checked) {
            setSelectedTimeSlot({ timeSlotId: slotId, maxPatients: "" });
        } else {
            setSelectedTimeSlot(null);
        }
    };

    const handleMaxPatientsChange = (e) => {
        const value = e.target.value;
        setSelectedTimeSlot((prev) =>
            prev ? { ...prev, maxPatients: value } : null
        );
    };

    const handleUpdateSchedule = async (e) => {
        e.preventDefault();

        // Tạo object ban đầu
        const scheduleData = {
            id: scheduleId,
            doctorId: schedule.doctorId
        };

        // TH1: Không chọn khung giờ mới
        if (!selectedTimeSlot) {
            // Kiểm tra xem maxNumber có thay đổi so với giá trị ban đầu không
            if (parseInt(maxNumber) === schedule.maxNumber) {
                toast.warning("Không có thay đổi nào để cập nhật!");
                return;
            }
            // Nếu maxNumber thay đổi, thêm vào formData
            scheduleData.timeSlotId = schedule.Timeslot.id;
            scheduleData.maxNumber = parseInt(maxNumber);
        } 
        // TH2: Có chọn khung giờ mới
        else {
            if (!selectedTimeSlot.maxPatients || parseInt(selectedTimeSlot.maxPatients) < 1) {
                toast.error("Vui lòng nhập số lượng bệnh nhân tối đa hợp lệ!");
                return;
            }
            scheduleData.timeSlotId = selectedTimeSlot.timeSlotId;
            scheduleData.maxNumber = parseInt(selectedTimeSlot.maxPatients);
        }
        // In dữ liệu formData
        console.log("Dữ liệu scheduleData:", scheduleData);
        try {
            // Gửi request cập nhật với formData
            const response = await updateSchedule(scheduleData);
            if (response.EC === 0) {
                toast.success("Cập nhật thành công!");
                navigate(`/doctor/manager-schedule/${userId}`);
            } else {
                toast.error(response.EM);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật lịch làm việc:", error);
            toast.error("Lỗi khi cập nhật lịch làm việc!");
        }
    };

    if (!schedule) return (
        <div className="container d-flex vh-100 align-items-center justify-content-center">
            <h3>Đang tải dữ liệu............</h3>
        </div>
    );

    return (
        <div className="d-flex justify-content-center align-items-center py-5">
            <div className="card shadow border-0" style={{ width: "63em" }}>
                <div className="card-body">
                    <h3 className="text-center bg-info text-white rounded py-3">CẬP NHẬT LỊCH LÀM VIỆC</h3>
                    <form onSubmit={handleUpdateSchedule}>
                        <div className="row mt-4">
                            <div className="col-md-8 border-end border-2">
                                <div className="mb-3">
                                    <p className="fw-semibold m-0 text-cyan-600">
                                        <span className="text-muted">Ngày:</span> {schedule.date}
                                    </p>
                                    <p className="fw-semibold m-0 text-cyan-600">
                                        <span className="text-muted">Khung giờ:</span> {schedule.Timeslot.startTime} - {schedule.Timeslot.endTime}
                                    </p>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Thay đổi khung giờ</label>
                                    <div className="d-flex flex-column gap-1">
                                        {Object.keys(shifts).map((shift) => (
                                            <div key={shift} className="shift-container" data-shift={shift}>
                                                <h6 className="fw-bold text-primary">{shifts[shift]}</h6>
                                                <div className="d-flex flex-wrap gap-2">
                                                    {timeslots
                                                        .filter((slot) => slot.shift == shift)
                                                        .map((slot) => (
                                                            <div key={slot.id} className="form-check me-2">
                                                                <input 
                                                                    className="form-check-input time-checkbox time-btn" 
                                                                    type="checkbox" 
                                                                    id={`slot_${slot.id}`} 
                                                                    name="timeSlotId" 
                                                                    value={slot.id} 
                                                                    checked={selectedTimeSlot?.timeSlotId === slot.id}
                                                                    onChange={(e) => handleTimeSlotChange(e, slot.id)} 
                                                                />
                                                                <label 
                                                                    className="form-check-label btn btn-outline-dark" 
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
                            <div className="col ps-3">
                                <div className="mt-3">
                                    <label className="form-label fw-semibold">
                                        <p className="m-0 text-gray-600 fw-bold text-decoration-underline">Khung giờ hiện tại</p>
                                        Số lượng bệnh nhân:
                                        <p className="m-0">({schedule.Timeslot.startTime} - {schedule.Timeslot.endTime})</p>
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={maxNumber}
                                        onChange={(e) => setMaxNumber(e.target.value)}
                                        min="1"
                                        required
                                    />
                                    {selectedTimeSlot && (
                                        <div className="mt-3 bg-cyan-200 rounded p-2">
                                            <label className="form-label fw-semibold">
                                                <p className="m-0 text-cyan-700 fw-bold text-decoration-underline">Khung giờ được thay đổi</p>
                                                Số lượng bệnh nhân 
                                                <p className="m-0">(
                                                {timeslots.find(slot => slot.id === selectedTimeSlot.timeSlotId)?.startTime} - 
                                                {timeslots.find(slot => slot.id === selectedTimeSlot.timeSlotId)?.endTime})</p>
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={selectedTimeSlot.maxPatients}
                                                onChange={handleMaxPatientsChange}
                                                placeholder="Số bệnh nhân tối đa"
                                                min="1"
                                                required
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end mt-4 gap-2">
                            <button 
                                type="button" 
                                className="btn btn-outline-secondary rounded-pill" 
                                onClick={() => navigate(-1)}
                            >
                                Hủy bỏ
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-info text-white rounded-pill"
                            >
                                Cập nhật
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DoctorUpdateScheduleForm;