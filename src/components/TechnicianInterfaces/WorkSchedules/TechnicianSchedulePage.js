// TechnicianSchedulePage.js
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import TechnicianScheduleFilter from "./TechnicianScheduleFilter";
import TechnicianScheduleTable from "./TechnicianScheduleTable";
import TechnicianScheduleCalendar from "./TechnicianScheduleCalendar";
import PaginationMui from "../../commons/Pagination";
import { getWorkSchedulesOfTechnician, getWorkScheduleDetail } from "../../../services/WorkScheduleService";

const ITEMS_PER_PAGE = 10; // số lượng hiển thị mỗi trang

const TechnicianSchedulePage = () => {
	const { auth } = useContext(AuthContext);
	const technicianId = auth.user.technicianId;

	const [filters, setFilters] = useState({});
	const [page, setPage] = useState(1);
	const [technicianSchedules, setTechnicianSchedules] = useState([]);
	const [selectedSchedule, setSelectedSchedule] = useState({});

	useEffect(() => {
		const fetchSchedules = async () => {
			try {
				const res = await getWorkSchedulesOfTechnician(technicianId);
				if (res?.EC === 0 && res?.DT) setTechnicianSchedules(res.DT);
				else toast.error(res?.EM || "Lỗi tải dữ liệu");
			} catch (err) {
				console.error("Lỗi tải dữ liệu:", err);
			}
		};
		fetchSchedules();
	}, [technicianId]);

	const filteredSchedules = technicianSchedules.filter((s) => {
		if (filters.date && s.work_date !== filters.date) return false;
		if (filters.status) {
			const status = s.current_number >= s.max_number ? "filled" : "empted";
			if (status !== filters.status) return false;
		}
		return true;
	});

	// cắt mảng theo trang
	const startIndex = (page - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const schedulesToShow = filteredSchedules.slice(startIndex, endIndex);

	const fetchScheduleDetail = async (scheduleId) => {
		try {
			const res = await getWorkScheduleDetail(scheduleId);
			if (res?.EC === 0 && res?.DT) setSelectedSchedule(res.DT);
			else toast.error(res?.EM || "Lỗi tải chi tiết");
		} catch (err) {
			console.error("Lỗi tải chi tiết:", err);
		}
	};

	return (
		<div className="container py-5">
			<div className="card text-center py-4 shadow-sm mb-4">
				<h4>Lịch làm việc Kỹ Thuật Viên</h4>
			</div>

			<div className="row">
				{/* Filter bên trái */}
				<div className="col-md-3">
					<TechnicianScheduleFilter filters={filters} onChange={setFilters} />
				</div>

				{/* Bảng + Calendar bên phải */}
				<div className="col-md-9">
					<TechnicianScheduleTable 
						schedules={schedulesToShow} 
						onSelect={(s) => fetchScheduleDetail(s.work_schedule_id)} 
					/>

					<PaginationMui
						totalItems={filteredSchedules.length}
						itemsPerPage={ITEMS_PER_PAGE}
						currentPage={page}
						onChangePage={setPage}
					/>

					<hr className="my-4" />
					<TechnicianScheduleCalendar 
						schedules={schedulesToShow} 
						onSelect={(s) => fetchScheduleDetail(s.work_schedule_id)} 
					/>

				</div>
			</div>
		</div>
	);
};

export default TechnicianSchedulePage;
