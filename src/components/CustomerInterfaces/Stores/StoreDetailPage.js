import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStoreDetail } from "../../../services/StoreService";
import StoreInfo from "./StoreInfo";
import TechnicianListOfStore from "./TechnicianListOfStore";
const TechnicianDetailPage = () => {
    const { storeId } = useParams();
    const [store, setStore] = useState({});
    const [technicians, setTechnicians] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
		const loadData = async () => {
			try {
				const res = await getStoreDetail(storeId);
				if (!res || res.EC !== 0) {
					setError(res?.EM || "Không tải được dữ liệu cửa hàng");
					setLoading(false);
					return;
				}
                setStore(res.DT);
                setTechnicians(res.DT.Technicians)
			} catch (err) {
				console.error("Lỗi khi lấy dữ liệu cửa hàng:", err);
				setError("Lỗi máy chủ!");
			} finally {
				setLoading(false);
            }
		};
		loadData();
	}, [storeId]);

    return (
        <div className="container py-5">
            <div className="row g-4">
                <div className="col-3">
                    <div className="mb-4">
                        <StoreInfo store={store} loading={loading} error={error} />
                    </div>
                    <div className="mb-4">
                        {/* <WorkSchedule /> */}
                    </div>
                    {/* <TechnicianReviews /> */}
                </div>
                <div className="col-9">
                    <TechnicianListOfStore technicians={technicians}  loading={loading} error={error} />
                </div>
            </div>
        </div>
    );
};

export default TechnicianDetailPage;
