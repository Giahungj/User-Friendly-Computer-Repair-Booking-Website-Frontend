import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const TechnicianScheduleCalendar = ({ schedules, onSelect }) => {
	const events = schedules.map(s => {
		const date = new Date(s.work_date);
		const startHour = s.shift === "1" ? 8 : 13;
		const endHour = s.shift === "1" ? 12 : 17;

		return {
			id: s.work_schedule_id,
			title: `${s.shift === "1" ? "Ca Sáng" : "Ca Chiều"} - ${s.Technician.Store.name}`,
			start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), startHour, 0),
			end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), endHour, 0),
			status: s.current_number >= s.max_number ? "Đã đầy" : "Còn trống",
			original: s // giữ dữ liệu gốc để truyền ra
		};
	});

	const eventStyleGetter = (event) => {
		let backgroundColor = "#28a745"; // xanh lá cho còn trống
		if (event.status === "Đã đầy") backgroundColor = "#dc3545"; // đỏ nếu đầy
		return {
			style: {
				backgroundColor,
				color: "white",
				borderRadius: "4px",
				border: "none",
				padding: "2px 5px"
			}
		};
	};

	return (
		<div className="card p-3">
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				defaultView="week"
				style={{ height: 500 }}
				eventPropGetter={eventStyleGetter}
				onSelectEvent={(event) => onSelect?.(event.original)}
			/>
		</div>
	);
};

export default TechnicianScheduleCalendar;
