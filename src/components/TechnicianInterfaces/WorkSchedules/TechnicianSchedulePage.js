// TechnicianSchedulePage.js
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import TechnicianScheduleFilter from "./TechnicianScheduleFilter";
import TechnicianScheduleTable from "./TechnicianScheduleTable";
import TechnicianScheduleCalendar from "./TechnicianScheduleCalendar";
import TechnicianScheduleDetail from "./TechnicianScheduleDetail";
import { getWorkSchedulesOfTechnician, getWorkScheduleDetail } from "../../../services/WorkScheduleService"

const TechnicianSchedulePage = () => {
	const { auth } = useContext(AuthContext);
	const technicianId = auth.user.technicianId;

	const [filters, setFilters] = useState({});
	const [technicianSchedules, setTechnicianSchedules] = useState([]);
	const [selectedSchedule, setSelectedSchedule] = useState({});

	const filteredSchedules = technicianSchedules.filter(s => {
		if (filters.date && s.work_date !== filters.date) return false;

		if (filters.status) {
			const status = s.current_number >= s.max_number ? "filled" : "empted";
			if (status !== filters.status) return false;
		}
		return true;
	});

	const fetchScheduleDetail = async (scheduleId) => {
		try {
			const res = await getWorkScheduleDetail(scheduleId);
			if (res?.EC === 0 && res?.DT) {
				setSelectedSchedule(res.DT);
			} else {
				toast.error(res?.EM || "Lỗi tải chi tiết");
			}
		} catch (err) {
			console.error("Lỗi tải chi tiết:", err);
		}
	};

	const fetchTechicianSchedules = async (scheduleId) => {
		try {
			const res = await getWorkSchedulesOfTechnician(scheduleId);
			if (res?.EC === 0 && res?.DT) {
				setTechnicianSchedules(res.DT);
			} else {
				toast.error(res?.EM || "Lỗi tải chi tiết");
			}
		} catch (err) {
			console.error("Lỗi tải chi tiết:", err);
		}
	};

	useEffect(() => {
		fetchTechicianSchedules(technicianId);
	}, [technicianId]);

	return (
		<div className="container py-5">
			<div className="card text-center py-4 shadow-sm mb-4">
				<h4>Lịch làm việc Kỹ Thuật Viên</h4>
			</div>
			<div className="row">
				{/* Filter cố định bên trái */}
				<div className="col-md-3">
					<TechnicianScheduleFilter filters={filters} onChange={setFilters} />
				</div>	

				{/* Bảng + Calendar bên phải */}
				<div className="col-md-9">
					<TechnicianScheduleTable 
						schedules={filteredSchedules} 
						onSelect={(s) => fetchScheduleDetail(s.work_schedule_id)} 
					/>
					<hr className="my-4" />
					<TechnicianScheduleCalendar 
						schedules={filteredSchedules} 
						onSelect={(s) => fetchScheduleDetail(s.work_schedule_id)} 
					/>
					{selectedSchedule?.work_schedule_id && (
						<TechnicianScheduleDetail 
							schedule={selectedSchedule} 
							onClose={() => setSelectedSchedule({})} 
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default TechnicianSchedulePage;
