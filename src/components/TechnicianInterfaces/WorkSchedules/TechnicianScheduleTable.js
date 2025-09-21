// TechnicianScheduleTable.js
const TechnicianScheduleTable = ({ schedules, onSelect }) => {
	const formatShift = (shift) => (shift === "1" ? "Sáng" : shift === "2" ? "Chiều" : shift);
	const shiftClass = (shift) => (shift === "1" ? "text-warning fw-bold" : shift === "2" ? "text-primary fw-bold" : "");

	return (
		<div className="card p-3">
			<div className="table-responsive">
				{!schedules.length ? (
					<p className="text-center my-3 text-muted">Không có lịch làm việc</p>
				) : (
					<table className="table table-striped table-bordered">
						<thead className="table-dark">
							<tr>
								<th>Ngày</th>
								<th>Ca</th>
								<th>Trạng thái</th>
								<th>Cửa hàng</th>
							</tr>
						</thead>
						<tbody>
							{schedules.map((s, idx) => (
								<tr key={idx} style={{ cursor: "pointer" }} onClick={() => onSelect?.(s)}>
									<td>{new Date(s.work_date).toLocaleDateString("vi-VN")}</td>
									<td className={shiftClass(s.shift)}>{formatShift(s.shift)}</td>
									<td>
										{s.current_number >= s.max_number
											? "Đã đầy"
											: `Còn ${s.current_number}/${s.max_number} slot`}
									</td>
									<td>{s.Technician.Store.name}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
};

export default TechnicianScheduleTable;
