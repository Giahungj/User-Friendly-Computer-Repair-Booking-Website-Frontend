import SearchStores from '../Search/SearchStores';
import StoreCard from './StoreCard';

const stores = [
	{ store_id: 1, name: 'Cửa hàng Laptop ABC', address: '123 Nguyễn Văn Cừ, HCM', phone: '0909123456', image: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/03/nang-cap-ram-cho-laptop-bg.jpg' },
	{ store_id: 2, name: 'Mobile Center XYZ', address: '45 Lê Lợi, HCM', phone: '0934567890', image: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/03/nang-cap-ram-cho-laptop-bg.jpg' },
	{ store_id: 3, name: 'IT Care Center', address: '67 Trần Phú, Đà Nẵng', phone: '0912345678', image: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/03/nang-cap-ram-cho-laptop-bg.jpg' },
	{ store_id: 4, name: 'Laptop Care Hà Nội', address: '89 Cầu Giấy, Hà Nội', phone: '0987123456', image: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/03/nang-cap-ram-cho-laptop-bg.jpg' },
	{ store_id: 5, name: 'PC Master Huế', address: '12 Hùng Vương, Huế', phone: '0978123456', image: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/03/nang-cap-ram-cho-laptop-bg.jpg' }
];

const StoreList = () => {
	return (
		<div className="container py-5">
			<div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
				<p className="lead mb-0">🏬 Danh sách cửa hàng</p>
				<SearchStores />
			</div>

			<div className="row row-cols-4 g-4">
				{stores.map((store) => (
					<div key={store.store_id} className="col mb-4">
						<StoreCard store={store} />
					</div>
				))}
			</div>
		</div>
	);
};

export default StoreList;
