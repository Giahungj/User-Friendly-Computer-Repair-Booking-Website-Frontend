import { Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
const BookingTable = ({ bookings, onViewDetail, onReassign }) => {
	return (
		<div className="table-responsive p-3 border border-secondary" style={{ borderRadius: "1em" }}>
			<table className="table table-striped table-bordered table-hover align-middle" style={{ borderRadius: "1em", overflow: "hidden" }}>
				<thead className="text-center text-white" style={{ backgroundColor: "#3f51b5" }}>
					<tr>
						<th>Mã đặt lịch</th>
						<th>Khách hàng</th>
                        <th>Ngày đặt</th>
						<th>Kỹ thuật viên</th>
						<th>Trạng thái</th>
						<th>Hành động</th>
					</tr>
				</thead>
				<tbody>
					{bookings && bookings.length > 0 ? (
						bookings.map((b) => (
							<tr key={b.booking_id}>
								<td className="text-center fw-bold">{b.booking_id}</td>
								<td>{b?.Customer?.User?.name || ""}</td>
								<td>{b?.booking_date ? new Date(b.booking_date).toLocaleDateString("vi-VN") : ""}</td>
								<td>
                                    {b?.WorkSchedule?.Technician?.User?.name || ""}
                                    {b?.WorkSchedule && (
                                        <span className="badge text-white ms-2" style={{ backgroundColor: "#7986cb"}}>
                                            {b.WorkSchedule.current_number}/{b.WorkSchedule.max_number}
                                        </span>
                                    )}
                                </td>
								<td>
									<span
										className="badge"
										style={{
											backgroundColor:
												b.status === "completed"
													? "#4caf50"
													: b.status === "in-progress"
													? "#ff9800"
													: b.status === "cancelled"
													? "#f44336"
													: "#9e9e9e",
										}}
									>
										{b.status}
									</span>
									{!["completed", "in-progress", "cancelled"].includes(b.status) && (
										<Button
											variant="contained"
											color="success"
											size="small"
											startIcon={<CheckIcon />}
											sx={{ borderRadius: "50px", ml: 1 }}
										>
										</Button>
									)}
								</td>
								<td className="text-center">
									<button
										className="btn btn-sm border-0 rounded-pill me-2 text-white"
                                        style={{backgroundColor: "#3f51b5"}}
										onClick={() => onViewDetail(b)}
									>
										Xem
									</button>
									<button
										className="btn btn-sm btn-outline-secondary border-0 rounded-pill"
										onClick={() => onReassign(b)}
									>
										Đổi người
									</button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={7} className="text-center text-muted py-3">
								Không có dữ liệu
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}

export default BookingTable;
