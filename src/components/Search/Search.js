import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import searchService from "../../services/searchService";

const Search = () => {
    const [doctors, setDoctors] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Lấy keyword từ URL
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get("keyword") || "Duy"; // Mặc định rỗng nếu không có keyword

    useEffect(() => {
        const fetchData = async () => {
            if (!keyword.trim()) {
                setError("Vui lòng cung cấp từ khóa tìm kiếm.");
                setLoading(false);
                return;
            }

            try {
                const response = await searchService.searchEntities(keyword);
                if (response && response.EC === 0) {
                    console.log("Kết quả tìm kiếm:", response);
                    setDoctors(response.DT.doctors || []);
                    setSpecialties(response.DT.specialties || []);
                    setFacilities(response.DT.facilities || []);
                    setLoading(false);
                } else {
                    setError(response ? response.EM : "Đã xảy ra lỗi khi tìm kiếm.");
                    setLoading(false);
                }
            } catch (err) {
                setError("Đã xảy ra lỗi kết nối.");
                setLoading(false);
                console.error("Lỗi khi tìm kiếm:", err);
            }
        };

        fetchData();
    }, [keyword]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div className="container py-4">
                <div className="alert alert-danger">
                    <h4 className="alert-heading menopause">Lỗi!</h4>
                    <p>{error}</p>
                    <hr />
                    <p className="mb-0">Vui lòng thử lại sau.</p>
                </div>
            </div>
        );
    }

    if (doctors.length === 0 && specialties.length === 0 && facilities.length === 0) {
        return (
            <div className="container py-4">
                <div className="alert alert-info">
                    <h4 className="alert-heading">Không tìm thấy kết quả!</h4>
                    <p>Không có bác sĩ, chuyên khoa hoặc phòng khám nào phù hợp với từ khóa "<strong>{keyword}</strong>."</p>
                    <hr />
                    <p className="mb-0">Vui lòng thử lại với từ khóa khác.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <h5 className="mb-4">
                Kết quả cho từ khóa: <span className="badge bg-primary">{keyword}</span>
            </h5>

            {doctors.length > 0 && (
                <section className="mb-5">
                    <h6 className="mb-3 text-uppercase text-muted">Bác sĩ</h6>
                    <div className="row g-3">
                        {doctors.map((doc) => (
                            <div key={doc._id} className="col-md-6" onClick={() => navigate(`/doctors/${doc._id}`)} style={{ cursor: 'pointer' }}>
                                <div className="card shadow-sm h-100">
                                    <div className="card-body d-flex align-items-center">
                                        <Avatar
                                            src="https://i.pinimg.com/736x/b7/aa/7a/b7aa7a2092192961df1ea5c3773fe0d9.jpg"
                                            alt={doc._source.name}
                                            sx={{ width: 56, height: 56, marginRight: 2 }}
                                        />
                                        <div>
                                            <h6 className="card-title">{doc._source.name}</h6>
                                            <p className="card-text mb-0">
                                                <span className="badge bg-secondary">{doc._source.specialty}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {specialties.length > 0 && (
                <section className="mb-5">
                    <h6 className="mb-3 text-uppercase text-muted">Chuyên khoa</h6>
                    <div className="row g-3">
                        {specialties.map((spec) => (
                            <div key={spec._id || spec.id} className="col-md-6" onClick={() => navigate(`/specialties/${spec._id}`)} style={{ cursor: 'pointer' }}>
                                <div className="card border-info h-100">
                                    <div className="card-body">
                                        <h6 className="card-title text-info">{spec._source?.name || spec.name}</h6>
                                        <p className="card-text">{spec._source?.description || spec.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {facilities.length > 0 && (
                <section className="mb-5">
                    <h6 className="mb-3 text-uppercase text-muted">Phòng khám</h6>
                    <div className="row g-3">
                        {facilities.map((facility) => (
                            <div key={facility._id || facility.id} className="col-md-6" onClick={() => navigate(`/facilities/${facility._id}`)} style={{ cursor: 'pointer' }}>
                                <div className="card border-warning h-100">
                                    <img
                                        src={facility._source?.mainImage || facility.mainImage || "https://i.pinimg.com/736x/2c/b4/87/2cb48745923437d74480cc962b1235b3.jpg"}
                                        alt={facility._source?.name || facility.name}
                                        className="card-img-top"
                                        style={{ objectFit: 'cover', height: '200px' }}
                                    />
                                    <div className="card-body">
                                        <h6 className="card-title">{facility._source?.name || facility.name}</h6>
                                        <p className="card-text">{facility._source?.description || facility.description}</p>
                                        <p className="card-text"><strong>Địa chỉ:</strong> {facility._source?.address || facility.address}</p>
                                        <p className="card-text"><strong>Số điện thoại:</strong> {facility._source?.phone || facility.phone}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default Search;