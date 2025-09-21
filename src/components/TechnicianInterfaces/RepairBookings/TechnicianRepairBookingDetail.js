import {
	Box, Typography, List, ListItem, ListItemText, ListItemIcon, Button, IconButton
} from '@mui/material';
import {
	Person, Email, Phone, Home, Devices, Warning,
	CalendarToday, AccessTime, Build, Info, History
} from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

const TechnicianRepairBookingDetail = ({ booking, onClose }) => {
	if (!booking) return null;

	const infoItems = [
		{ icon: <Person color="primary" fontSize="small" />, label: "Khách hàng", value: booking.Customer?.User?.name || "Khách vãng lai" },
		{ icon: <Email color="primary" fontSize="small" />, label: "Email", value: booking.Customer?.User?.email || "Không có" },
		{ icon: <Phone color="primary" fontSize="small" />, label: "SĐT", value: booking.Customer?.User?.phone || "Không có" },
		{ icon: <Home color="primary" fontSize="small" />, label: "Địa chỉ", value: booking.Customer?.address || "Không có" },
		{ icon: <Devices color="primary" fontSize="small" />, label: "Thiết bị", value: `${booking.device_type} (${booking.brand})` },
		{ icon: <Warning color="primary" fontSize="small" />, label: "Sự cố", value: booking.issue_description },
		{ icon: <CalendarToday color="primary" fontSize="small" />, label: "Ngày hẹn", value: `${booking.booking_date} - ${booking.booking_time}` },
		{ icon: <AccessTime color="primary" fontSize="small" />, label: "Buổi", value: booking.WorkSchedule?.shift === "1" ? "Sáng" : booking.WorkSchedule?.shift === "2" ? "Chiều" : "Không rõ" },
		{ icon: <Person color="primary" fontSize="small" />, label: "Kỹ thuật viên", value: booking.WorkSchedule?.Technician?.User?.name || "Không xác định" },
		...(booking.WorkSchedule?.Technician?.Specialties?.length
			? [{
				icon: <Build color="primary" fontSize="small" />, label: "Chuyên môn",
				value: booking.WorkSchedule.Technician.Specialties.map(s => s.name).join(", ")
			}] : []),
		{ icon: <Info color="primary" fontSize="small" />, label: "Trạng thái", value: booking.status },
		{ icon: <CalendarToday color="primary" fontSize="small" />, label: "Ngày tạo", value: new Date(booking.createdAt).toLocaleString() }
	];

	return (
		<div className="card shadow-sm p-3 position-sticky" style={{ top: 10, maxWidth: '100%', zIndex: 10 }}>
			<IconButton onClick={onClose} size="small" sx={{ position: 'absolute', top: 8, right: 8 }}>
				<CloseIcon fontSize="small" />
			</IconButton>

			<Typography variant="h6" fontWeight="medium" textAlign="center" mb={1}>
				Chi tiết đơn #{booking.booking_id}
			</Typography>

			<List sx={{ p: 0 }}>
				{infoItems.map((item, i) => (
					<ListItem key={i} divider={i < infoItems.length - 1} sx={{ py: 0.1 }}>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText
							primary={<Typography variant="body2">{item.label}</Typography>}
							secondary={<Typography variant="caption">{item.value}</Typography>}
						/>
					</ListItem>
				))}
			</List>

			{booking.RepairHistories?.length > 0 && (
				<Box mt={2}>
					<Typography variant="subtitle1" fontWeight="medium" mb={1}>Lịch sử sửa chữa</Typography>
					<List sx={{ maxHeight: 200, overflow: 'auto', p: 0 }}>
						{booking.RepairHistories.map(h => (
							<ListItem key={h.history_id} divider sx={{ py: 0.1 }}>
								<ListItemIcon><History color="primary" fontSize="small" /></ListItemIcon>
								<ListItemText
									primary={<Typography variant="body2">{`${h.status} - ${h.notes}`}</Typography>}
									secondary={<Typography variant="caption">{new Date(h.action_date).toLocaleString()}</Typography>}
								/>
							</ListItem>
						))}
					</List>
				</Box>
			)}

			<Box mt={2} display="flex" gap={1} justifyContent="flex-end">
				{booking.status === "pending" && (
					<Button variant="contained" color="primary" size="small">Nhận đơn</Button>
				)}
				{booking.status === "in-progress" && (
					<Button variant="contained" color="success" size="small">Hoàn thành đơn</Button>
				)}
			</Box>
		</div>
	);
};

export default TechnicianRepairBookingDetail;
