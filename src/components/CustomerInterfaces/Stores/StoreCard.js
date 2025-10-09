import { useNavigate } from "react-router-dom";
import { PhoneInTalk, LocationOn, Business } from '@mui/icons-material';
import './StoreCard.scss';

const StoreCard = ({ store }) => {
	console.log(store)
	const navigate = useNavigate();

	return (
		<div className="card border-0 h-100 card-hover cursor-pointer">
			<div className="card-body text-center">
				<img
					src={store.image ? `http://localhost:8080/images/${store.image}` : "http://localhost:8080/images/cua-hang.webp"}
					alt={store.name}
					className="rounded-circle mb-3"
					style={{ width: '10em', height: '10em', objectFit: 'cover' }}
				/>
				<h6 className="fw-bold mb-2">{store.name}</h6>
				<button 
					className="btn btn-outline-primary btn-sm mb-3"
					onClick={() => navigate(`/cua-hang/${store.store_id}/chi-tiet`)}
				>
					<PhoneInTalk fontSize="small" className="me-1" />
					Xem thông tin cửa hàng
				</button>

				<div className="info-box bg-light p-3 small text-muted text-start">
					<p className="mb-1">
						<Business fontSize="small" className="me-1" />
						{store.address}
					</p>
					<p className="mb-2">
						<LocationOn fontSize="small" className="me-1" />
						{store.phone}
					</p>
				</div>
			</div>
		</div>
	);
};

export default StoreCard;
