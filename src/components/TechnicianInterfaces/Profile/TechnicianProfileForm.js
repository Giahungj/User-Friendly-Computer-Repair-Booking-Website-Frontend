import { Avatar, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Phone, Store, Build, Star, AccessTime, StarHalf, StarOutline } from '@mui/icons-material';

const TechnicianProfileForm = ({ data }) => {
	const renderRating = (rating) => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			if (rating >= i) stars.push(<Star key={i} style={{ color: "#fbc02d" }} />);
			else if (rating >= i - 0.5) stars.push(<StarHalf key={i} style={{ color: "#fbc02d" }} />);
			else stars.push(<StarOutline key={i} style={{ color: "#fbc02d" }} />);
		}
		return stars;
	};

	return (
		<div className="card h-100 p-4 shadow-sm">
			<div className="d-flex align-items-center mb-4">
				<Avatar
					src={`http://localhost:8080/images/${data.User?.avatar}`}
					alt="avatar"
					sx={{ width: 80, height: 80, mr: 2 }}
				/>
				<div>
					<Typography variant="h5" component="h5" sx={{ mb: 1 }}>
						{data.User?.name}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{data.User?.email}
					</Typography>
				</div>
			</div>

			<List>
				<ListItem divider>
					<ListItemIcon>
						<Phone />
					</ListItemIcon>
					<ListItemText primary="Điện thoại" secondary={data.User?.phone} />
				</ListItem>
				<ListItem divider>
					<ListItemIcon>
						<Store />
					</ListItemIcon>
					<ListItemText primary="Chi nhánh" secondary={`${data.Store?.name} (${data.Store?.address})`} />
				</ListItem>
				<ListItem divider>
					<ListItemIcon>
						<Build />
					</ListItemIcon>
					<ListItemText primary="Chuyên môn" secondary={data.Specialties?.map(s => s.name).join(", ")} />
				</ListItem>
				<ListItem divider>
					<ListItemIcon>
						<Star />
					</ListItemIcon>
					<ListItemText primary="Rating" secondary={renderRating(data.rating || 4.5)} />
				</ListItem>
				<ListItem>
					<ListItemIcon>
						<AccessTime />
					</ListItemIcon>
					<ListItemText
						primary="Trạng thái hoạt động"
						secondary={data.User?.last_active ? new Date(data.User.last_active).toLocaleString() : "Chưa từng hoạt động"}
					/>
				</ListItem>
			</List>
		</div>
	);
};

export default TechnicianProfileForm;
