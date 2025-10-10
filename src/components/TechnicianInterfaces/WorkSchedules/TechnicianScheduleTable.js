import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const TechnicianScheduleTable = ({ schedules }) => {
	const navigate = useNavigate();

	const formatShift = (shift) => (shift === "1" ? "Sáng" : shift === "2" ? "Chiều" : shift);
	const shiftStyle = (shift) => ({
		fontWeight: 'bold',
		color: shift === "1" ? '#ffca28' : shift === "2" ? '#1976d2' : 'inherit'
	});

	return (
		<div className="card p-3 shadow-sm">
			{!schedules.length ? (
				<Typography variant="body1" color="text.secondary" align="center" sx={{ my: 3 }}>
					Không có lịch làm việc
				</Typography>
			) : (
				<div className="table-responsive">
					<table className="table table-hover align-middle text-center">
						<thead className="table-dark">
							<tr>
								<th>Ngày</th>
								<th>Ca</th>
								<th>Trạng thái</th>
								<th>Cửa hàng</th>
							</tr>
						</thead>
						<tbody>
							{schedules.map((s) => (
								<tr
									key={s.work_schedule_id}
									style={{ cursor: 'pointer' }}
									onClick={() => navigate(`/ky-thuat-vien/lich-lam-viec/${s.work_schedule_id}/chi-tiet`)}
								>
									<td>{new Date(s.work_date).toLocaleDateString("vi-VN")}</td>
									<td style={shiftStyle(s.shift)}>{formatShift(s.shift)}</td>
									<td>
										{s.current_number >= s.max_number ? (
											<span className="badge bg-danger">Đã đầy</span>
										) : (
											<span className="badge bg-success">Còn trống</span>
										)}
									</td>
									<td>{s.Technician?.Store?.name || "Chưa có"}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default TechnicianScheduleTable;
