// TechnicianReviewsPage.js
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { getRatingOfTechnician } from "../../../services/RatingService";
import { AuthContext } from "../../../context/AuthContext";
import TechnicianReviewCard from "./TechnicianReviewCard";
import Star from '@mui/icons-material/Star';

const TechnicianReviewsPage = () => {
	const { auth } = useContext(AuthContext);
	const technicianId = auth.user.technicianId;
	const [ratings, setRatings] = useState([]);
	const fetchReviews = async (technicianId) => {
		try {
			const res = await getRatingOfTechnician(technicianId);
			if (res?.EC === 0 && res?.DT) {
				setRatings(res.DT);
			} else {
				toast.error(res?.EM || "Lỗi tải chi tiết");
			}
		} catch (err) {
			console.error("Lỗi tải chi tiết:", err);
		}
	};

	useEffect(() => {
		fetchReviews(technicianId);
	}, [technicianId]);

	return (
		<div className="container py-5">
			<div className="card text-center p-4 mb-4">
				<h4 className="mb-0">Đánh giá Kỹ Thuật Viên</h4>
			</div>

			{ratings.length === 0 ? (
				 <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
					<div className="text-center">
						<Star sx={{ fontSize: '2rem', color: 'text.secondary', opacity: 0.5 }} />
						<p className="mt-2 mb-0 text-muted" style={{ fontSize: '1.1rem' }}>
							Chưa có đánh giá nào
						</p>
					</div>
				</div>
				) : (
				<div className="row g-3">
					{ratings.map((review, idx) => (
					<div className="col" key={idx}>
						<TechnicianReviewCard review={review} />
					</div>
					))}
				</div>
				)}
		</div>
	);
};

export default TechnicianReviewsPage;
