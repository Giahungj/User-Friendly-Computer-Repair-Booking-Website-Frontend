// TechnicianScheduleFilter.js
import React from "react";

const TechnicianScheduleFilter = ({ filters, onChange }) => {
	return (
		<div className="card p-3 sticky-top" style={{ top: "20px", zIndex: 1020 }}>
			<div className="d-flex flex-column">
				<input
					type="date"
					className="form-control mb-2"
					value={filters.date || ""}
					onChange={(e) => onChange({ ...filters, date: e.target.value })}
				/>
				<select
					className="form-select"
					value={filters.status || ""}
					onChange={(e) => onChange({ ...filters, status: e.target.value })}
				>
					<option value="">Tất cả trạng thái</option>
					<option value="empted">Trống</option>
					<option value="filled">Đầy</option>
				</select>
			</div>
		</div>
	);
};

export default TechnicianScheduleFilter;
