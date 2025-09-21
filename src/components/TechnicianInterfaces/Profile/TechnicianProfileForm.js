import { Star, StarHalf, StarOutline } from "@mui/icons-material";

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
		<div className="card p-3 w-100 h-100">
			<div className="d-flex align-items-center mb-4">
				<img
					src={`http://localhost:8080/images/${data.User?.avatar}`}
					alt="avatar"
					className="rounded-circle me-3"
					style={{ width: "80px", height: "80px", objectFit: "cover" }}
				/>
				<div>
					<h5 className="mb-1">{data.User?.name}</h5>
					<small className="text-muted">{data.User?.email}</small>
				</div>
			</div>

			<ul className="list-group list-group-flush">
				<li className="list-group-item d-flex justify-content-between">
					<span>Điện thoại</span>
					<span>{data.User?.phone}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span>Chi nhánh</span>
					<span>{data.Store?.name} ({data.Store?.address})</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span>Chuyên môn</span>
					<span>{data.Specialties?.map(s => s.name).join(", ")}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span>Rating</span>
					<span>{renderRating(data.rating || 4.5)}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span>Trạng thái hoạt động</span>
					<span>{data.User?.last_active ? new Date(data.User.last_active).toLocaleString() : "Chưa từng hoạt động"}</span>
				</li>
			</ul>
		</div>
	);
};

export default TechnicianProfileForm;
