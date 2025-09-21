// TechnicianScheduleFilter.js
import { List, ListItem, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const TechnicianScheduleFilter = ({ filters, onChange }) => {
	return (
		<div className="card p-3 sticky-top shadow-sm" style={{ top: "20px", zIndex: 1020 }}>
			<List>
				<ListItem sx={{ p: 1 }}>
					<TextField
						fullWidth
						type="date"
						label="Chọn ngày"
						value={filters.date || ""}
						onChange={(e) => onChange({ ...filters, date: e.target.value })}
						InputLabelProps={{ shrink: true }}
					/>
				</ListItem>
				<ListItem sx={{ p: 1 }}>
					<FormControl fullWidth>
						<InputLabel>Trạng thái</InputLabel>
						<Select
							value={filters.status || ""}
							onChange={(e) => onChange({ ...filters, status: e.target.value })}
							label="Trạng thái"
						>
							<MenuItem value="">Tất cả trạng thái</MenuItem>
							<MenuItem value="empted">Trống</MenuItem>
							<MenuItem value="filled">Đầy</MenuItem>
						</Select>
					</FormControl>
				</ListItem>
			</List>
		</div>
	);
};

export default TechnicianScheduleFilter;
