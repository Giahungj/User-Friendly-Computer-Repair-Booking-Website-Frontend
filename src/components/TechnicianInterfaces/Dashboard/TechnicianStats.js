import { Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { CalendarToday, AccessTime, CheckCircle } from '@mui/icons-material';

const TechnicianStats = ({ data }) => {
	return (
		<div className="card p-3 shadow-sm w-100 h-100">
			<h5 className="mb-3 text-center">Thống kê</h5>
			<List disablePadding>
				<ListItem divider sx={{ py: 0.5 }}>
					<ListItemIcon sx={{ minWidth: 32 }}>
						<CalendarToday color="primary" fontSize="large" sx={{ mr: 1 }}/>
					</ListItemIcon>
					<ListItemText primary="Số đơn hôm nay" secondary={data.todayOrders} />
				</ListItem>
				<ListItem divider sx={{ py: 0.5 }}>
					<ListItemIcon sx={{ minWidth: 32 }}>
						<AccessTime color="warning" fontSize="large" sx={{ mr: 1 }}/>
					</ListItemIcon>
					<ListItemText primary="Số đơn đang xử lý" secondary={data.inProgressOrders} />
				</ListItem>
				<ListItem sx={{ py: 0.5 }}>
					<ListItemIcon sx={{ minWidth: 32 }}>
						<CheckCircle color="success" fontSize="large" sx={{ mr: 1 }}/>
					</ListItemIcon>
					<ListItemText primary="Đơn hoàn thành" secondary={data.completedOrders} />
				</ListItem>
			</List>
		</div>
	);
};

export default TechnicianStats;
