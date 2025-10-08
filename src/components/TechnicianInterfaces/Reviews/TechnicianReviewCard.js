import { Star, StarHalf, StarOutline } from "@mui/icons-material";
import { Avatar } from "@mui/material";

const renderRating = (rating) => {
	const stars = [];
	for (let i = 1; i <= 5; i++) {
		if (rating >= i) stars.push(<Star key={i} style={{ color: "#fbc02d" }} />);
		else if (rating >= i - 0.5) stars.push(<StarHalf key={i} style={{ color: "#fbc02d" }} />);
		else stars.push(<StarOutline key={i} style={{ color: "#fbc02d" }} />);
	}
	return stars;
};

const TechnicianReviewCard = ({ review }) => {
	const customer = review.Customer?.User || {};
	const customerName = customer.name || "Khách vãng lai";
	const avatar = customer.avatar ? `http://localhost:8080/images${customer.avatar}` : "http://localhost:8080/images/uploads/default-avatar.png";

	return (
		<div className="card w-100 h-100 shadow-sm">
			<div className="card-body">
				<div className="d-flex justify-content-between align-items-center mb-2">
					<div className="d-flex align-items-center">
						<Avatar
							src={avatar}
							alt={customerName}
							sx={{ width: 40, height: 40, mr: 2 }}
						/>
						<h6 className="mb-0">{customerName}</h6>
						<h6 className="mb-0">{}</h6>
					</div>
					<div>{renderRating(review.rating)}</div>
				</div>
				<p className="mb-1"><strong>Bình luận:</strong> {review.comment || "Không có bình luận"}</p>
				<p className="mb-0 text-muted"><small>{new Date(review.createdAt).toLocaleDateString("vi-VN")}</small></p>
			</div>
		</div>
	);
};


export default TechnicianReviewCard;
