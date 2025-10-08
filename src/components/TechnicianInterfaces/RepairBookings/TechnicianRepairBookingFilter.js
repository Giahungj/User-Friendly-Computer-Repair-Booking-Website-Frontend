import { useState, useEffect } from "react";
import { TextField } from "@mui/material";

const TechnicianRepairBookingFilter = ({ filter, onFilter }) => {
	const [startDate, setStartDate] = useState(filter?.startDate || "");
	const [endDate, setEndDate] = useState(filter?.endDate || "");

	useEffect(() => {
		setStartDate(filter?.startDate || "");
		setEndDate(filter?.endDate || "");
	}, [filter]);

	const handleChange = (newFilter) => onFilter(newFilter);

	return (
		<div className="card shadow-sm">
			<div className="card-body">
				<div className="row g-2">
					<div className="col">
						<TextField
							type="date"
							label="Từ ngày"
							fullWidth
							size="large"
							value={startDate}
							onChange={e => {
								const val = e.target.value;
								setStartDate(val);
								handleChange({ startDate: val, endDate });
							}}
							InputLabelProps={{ shrink: true }}
						/>
					</div>
					<div className="col">
						<TextField
							type="date"
							label="Đến ngày"
							fullWidth
							size="large"
							value={endDate}
							onChange={e => {
								const val = e.target.value;
								setEndDate(val);
								handleChange({ startDate, endDate: val });
							}}
							InputLabelProps={{ shrink: true }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TechnicianRepairBookingFilter;