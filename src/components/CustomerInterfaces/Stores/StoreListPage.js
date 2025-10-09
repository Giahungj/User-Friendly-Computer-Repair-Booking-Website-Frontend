import { useEffect, useState } from "react";
import { getAllStores } from "../../../services/StoreService.js";
import LoadingAndError from "../../commons/LoadingAndError";
import SearchStores from '../../Search/SearchStores';
import StoreCard from './StoreCard';

const StoreListPage = () => {
	const [stores, setStores] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchStores = async () => {
			setLoading(true);
			setError(null);
			try {
				const res = await getAllStores();
				if (res?.EC === 0) {
					setStores(res.DT);
					setError(null);
				} else {
					setStores([]);
					setError(res?.EM || "Không tải được dữ liệu");
				}
			} catch (err) {
				setStores([]);
				setError("Lỗi kết nối server");
			} finally {
				setLoading(false);
			}
		};

		fetchStores();
	}, []);
	
	const filteredStores = stores.filter(store =>
		store.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	if (loading) return <LoadingAndError.Loading />;
	if (error) return <LoadingAndError.Error message={error}  />;

	return (
		<div className="container py-5">
			<div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
				<p className="lead mb-0">🏬 Danh sách cửa hàng</p>
				<SearchStores searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			</div>

			<div className="row row-cols-4 g-4">
				{filteredStores.map((store) => (
					<div key={store.store_id} className="col mb-4">
						<StoreCard store={store} />
					</div>
				))}
			</div>
		</div>
	);
};

export default StoreListPage;
