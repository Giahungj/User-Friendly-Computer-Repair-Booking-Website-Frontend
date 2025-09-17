import { useState } from "react";
import { TextField, MenuItem, Button } from "@mui/material";

function FilterPanel({ onFilter }) {
	const [status, setStatus] = useState("");
	const [technician, setTechnician] = useState("");
	const [customer, setCustomer] = useState("");
	const [date, setDate] = useState("");

	const handleApply = () => {
		onFilter({ status, technician, customer, date });
	};

	return (
		<div className="p-3 bg-light rounded mb-3 d-flex flex-wrap gap-3">
			<TextField
				select
				label="Trạng thái"
				value={status}
				onChange={(e) => setStatus(e.target.value)}
				size="small"
				style={{ minWidth: 150 }}
			>
				<MenuItem value="">Tất cả</MenuItem>
				<MenuItem value="pending">Chờ xác nhận</MenuItem>
				<MenuItem value="confirmed">Đã xác nhận</MenuItem>
				<MenuItem value="completed">Hoàn thành</MenuItem>
				<MenuItem value="cancelled">Đã hủy</MenuItem>
			</TextField>

			<TextField
				label="Kỹ thuật viên"
				value={technician}
				onChange={(e) => setTechnician(e.target.value)}
				size="small"
			/>

			<TextField
				label="Khách hàng"
				value={customer}
				onChange={(e) => setCustomer(e.target.value)}
				size="small"
			/>

			<TextField
				type="date"
				label="Ngày"
				InputLabelProps={{ shrink: true }}
				value={date}
				onChange={(e) => setDate(e.target.value)}
				size="small"
			/>

			<Button variant="contained" onClick={handleApply}>
				Lọc
			</Button>
		</div>
	);
}

export default FilterPanel;
