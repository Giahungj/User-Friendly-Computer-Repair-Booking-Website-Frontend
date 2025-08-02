import { Star, LocationOn, Business, Info } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './TechnicianCard.scss';

const TechnicianCard = ({ tech }) => {
	const navigate = useNavigate();
	
	return (
		<div className="card border-0 h-100 card-hover cursor-pointer">
			<div className="card-body text-center">
				<img
					src={tech.User.avatar ? `http://localhost:8080/images/${tech.User.avatar}` : `https://chupanhthe.vn/img/chup-anh-the-chuan-quoc-te5.jpg`}
					alt={tech.User.name}
					className="rounded-circle mb-3"
					style={{ width: '5em', height: '5em', objectFit: 'cover' }}
				/>
				<h6 className="fw-bold mb-1	">{tech.User.name}</h6>				
				<div
					className="mb-2 overflow-hidden"
					style={{
						height: '4.3em',        // 3 dòng * 20px
					}}
				>
					{tech.Specialties && tech.Specialties.length > 0 ? (
						tech.Specialties.map((spec, i) => (
							<small
								key={i}
								className="mx-2 text-start text-muted d-block mb-1"
							>
								{spec.name}
							</small>
						))
					) : (
						<small className="text-muted d-block mb-1">Không rõ chuyên môn</small>
					)}				
				</div>
				<div className="d-flex justify-content-center align-items-center text-warning mb-2">
					<span className="small fw-semibold">
						{parseFloat(tech.avg_rating) === 0
							? ''
							: Number.isInteger(parseFloat(tech.avg_rating))
							? parseInt(tech.avg_rating)
							: parseFloat(tech.avg_rating).toFixed(2)}
					</span>
					<Star className="ms-1" fontSize="small" />
				</div>

				<button
					className="btn btn-sm mb-3 button-hover"
					onClick={() => navigate(`/ky-thuat-vien/${tech.technician_id}/chi-tiet`)}
				>
					<Info fontSize="small" className="me-1" />
					Xem chi tiết
				</button>


				<div className="info-box bg-light p-3 small text-muted text-start">
					<p className="mb-1">
						<Business fontSize="small" className="me-1" />
						{tech.Store.name}
					</p>
					<p className="mb-2 text-truncate" style={{ maxWidth: '100%' }} >
						<LocationOn fontSize="small" className="me-1" />
						{tech.Store.address}
					</p>
				    <button className="btn btn-outline-secondary w-100 rounded-3">Đặt lịch kỹ thuật viên</button>
				</div>
			</div>
		</div>
	);
};

export default TechnicianCard;
