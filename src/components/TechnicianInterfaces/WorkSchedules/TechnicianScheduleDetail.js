import React, { useState } from 'react';
import {
	Box, Card, IconButton, Typography, List, ListItem, ListItemText,
	ListItemIcon, Tabs, Tab
} from '@mui/material';
import {
	CalendarToday, AccessTime, People, Store, Person
} from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

const TechnicianScheduleDetail = ({ schedule, onClose }) => {
	const [tab, setTab] = useState(0);
	if (!schedule) return null;

	const formatDate = d => new Date(d).toLocaleDateString("vi-VN");
	const getShiftText = s => s === "1" ? "Sáng" : "Chiều";

	const RepairBookings = () => (
		schedule.RepairBooking?.length ? (
			<List sx={{ maxHeight: 200, overflow: 'auto', p: 0 }}>
				{schedule.RepairBooking.map(rb => (
					<ListItem key={rb.booking_id} divider sx={{ borderRadius: 1, mb: 0.5, bgcolor: 'background.paper', boxShadow: 1, py: 0.5 }}>
						<ListItemText
							primary={<Typography variant="body2" fontWeight="medium">{rb.Customer?.name || "Khách hàng không xác định"}</Typography>}
							secondary={
								<Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.2 }}>
									<Typography variant="caption"><strong>Người tạo:</strong> {rb.User?.name || "Không xác định"}</Typography>
									<Typography variant="caption"><strong>Trạng thái:</strong> {rb.status || "Chưa có"}</Typography>
								</Box>
							}
						/>
					</ListItem>
				))}
			</List>
		) : (
			<Typography variant="body2" color="text.secondary" textAlign="center" mt={1}>
				Không có đơn sửa chữa
			</Typography>
		)
	);

	const ScheduleInfo = () => (
		<List sx={{ p: 0 }}>
			{[
				{ icon: <CalendarToday color="primary" fontSize="small" />, label: "Ngày", value: formatDate(schedule.work_date) },
				{ icon: <AccessTime color="primary" fontSize="small" />, label: "Ca làm việc", value: getShiftText(schedule.shift) },
				{ icon: <People color="primary" fontSize="small" />, label: "Số lượng", value: `${schedule.current_number}/${schedule.max_number}` },
				{ icon: <Store color="primary" fontSize="small" />, label: "Cửa hàng", value: schedule.Technician?.Store?.name || "Không xác định" },
				{ icon: <Person color="primary" fontSize="small" />, label: "Kỹ thuật viên", value: schedule.Technician?.User?.name || "Không xác định" }
			].map((item, i) => (
				<ListItem key={i} divider={i < 4} sx={{ py: 0.5 }}>
					<ListItemIcon>{item.icon}</ListItemIcon>
					<ListItemText
						primary={<Typography variant="body2">{item.label}</Typography>}
						secondary={<Typography variant="caption">{item.value}</Typography>}
					/>
				</ListItem>
			))}
		</List>
	);

	return (
		<>
			<Box
				sx={{ position: 'fixed', inset: 0, bgcolor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}
				onClick={onClose}
			/>
			<Card
				sx={{
					position: 'fixed', top: '10%', right: 10, zIndex: 1060,
					minWidth: '25em', maxWidth: '40em', maxHeight: '70vh',
					overflow: 'auto', p: 2, boxShadow: 4, borderRadius: 2
				}}
			>
				<Box position="relative">
					<IconButton onClick={onClose} size="small" sx={{ position: 'absolute', top: 4, right: 4 }}>
						<CloseIcon fontSize="small" />
					</IconButton>
					<Typography variant="h6" textAlign="center" fontWeight="medium" mb={1}>
						Chi tiết lịch làm việc
					</Typography>
				</Box>

				<Tabs value={tab} onChange={(e, v) => setTab(v)} centered sx={{ mb: 1 }}>
					<Tab label="Thông tin" sx={{ textTransform: 'none', fontSize: '0.9rem' }} />
					<Tab label="Đơn sửa chữa" sx={{ textTransform: 'none', fontSize: '0.9rem' }} />
				</Tabs>

				<Box p={1}>{tab === 0 ? <ScheduleInfo /> : <RepairBookings />}</Box>
			</Card>
		</>
	);
};

export default TechnicianScheduleDetail;
