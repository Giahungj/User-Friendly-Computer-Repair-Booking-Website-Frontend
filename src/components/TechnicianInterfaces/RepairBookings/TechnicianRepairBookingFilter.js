import { useState, useEffect } from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const TechnicianRepairBookingFilter = ({ filter, onFilter }) => {
	const [startDate, setStartDate] = useState(filter?.startDate || "");
	const [endDate, setEndDate] = useState(filter?.endDate || "");
	const [status, setStatus] = useState(filter?.status || "all");

	useEffect(() => {
		setStartDate(filter?.startDate || "");
		setEndDate(filter?.endDate || "");
		setStatus(filter?.status || "all");
	}, [filter]);

	const handleChange = (newFilter) => {
		onFilter(newFilter);
	};

	return (
		<div className="card shadow-sm">
			<div className="card-body">
				<div className="row g-2 align-items-end">
					<div className="col">
						<TextField
							type="date"
							label="Từ ngày"
							fullWidth
							size="large"
							value={startDate}
							onChange={(e) => {
								const val = e.target.value;
								setStartDate(val);
								handleChange({ startDate: val, endDate, status });
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
							onChange={(e) => {
								const val = e.target.value;
								setEndDate(val);
								handleChange({ startDate, endDate: val, status });
							}}
							InputLabelProps={{ shrink: true }}
						/>
					</div>
					<div className="col">
						<FormControl fullWidth>
							<InputLabel>Trạng thái</InputLabel>
							<Select
								value={status}
								label="Trạng thái"
								onChange={(e) => {
									const val = e.target.value;
									setStatus(val);
									handleChange({ startDate, endDate, status: val });
								}}
							>
								<MenuItem value="all">Tất cả đơn</MenuItem>
								<MenuItem value="completed">Đơn hoàn thành</MenuItem>
								<MenuItem value="pending">Đơn chưa hoàn thành</MenuItem>
								<MenuItem value="cancelled">Đơn đã hủy</MenuItem>
							</Select>
						</FormControl>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TechnicianRepairBookingFilter;
