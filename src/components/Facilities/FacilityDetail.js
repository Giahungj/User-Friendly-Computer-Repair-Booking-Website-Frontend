import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchFacilityById, fetchDoctorsByFacility } from "../../services/FacilityService";
import { Avatar } from '@mui/material';
const FacilityDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [facility, setFacility] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getFacilityDetail = async () => {
            try {
                setLoading(true);
                const facilityResponse = await fetchFacilityById(id);
                if (facilityResponse?.EC === 0) {
                    setFacility(facilityResponse.DT);
                    if (facilityResponse.DT.Doctors) {
                        setDoctors(facilityResponse.DT.Doctors);
                        console.log(facilityResponse.DT.Doctors);
                    } else {
                        setDoctors([]);
                    }
                } else {
                    console.error("Error fetching facility detail:", facilityResponse?.EC);
                }
            } catch (error) {
                console.error("Error fetching facility detail:", error);
            } finally {
                setLoading(false);
            }
        };

        getFacilityDetail();
    }, [id]);

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (!facility) return <p>Không tìm thấy thông tin cơ sở y tế.</p>;

    return (
        <div className="container py-4">
            <div className="row g-2 justify-content-center">
                {/* Thông tin cơ sở y tế */}
                <div className="p-3 bg-light">
                    <h5 className="text-start fw-semibold text-dark mb-3 font-roboto" style={{ color: '#2c3e50' }}>
                        {facility.name}
                    </h5>
                    <div className="d-flex flex-column gap-2">
                        <p className="mb-0">
                            <span className="text-muted">{facility.address || 'Chưa cập nhật'}</span>
                        </p>
                        <p className="mb-0">
                            <span className="text-muted">{facility.description || 'Chưa cập nhật'}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Danh sách bác sĩ */}
            {doctors.length > 0 && (
                <div className="row g-2 justify-content-center mt-4">
                    <div className="col-md-12">
                        <h4 className="mb-3 text-secondary text-center">BÁC SĨ CỦA CHUYÊN KHOA</h4>
                        <div className="row row-cols-1 row-cols-md-5 g-2">
                            {doctors.map((doctor) => (
                                <div key={doctor.id} className="col">
                                    <div className="card h-100 border border-0 shadow-sm">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-center my-3">
												<Avatar
													alt={doctor.User.name}
													src={
														doctor.User.avatar
															? `http://localhost:8080/images/uploads/${doctor.User.avatar}`
															: '/default-avatar.jpg'
													}
													sx={{ width: 100, height: 100 }}
												/>
											</div>
                                            <h4 className="card-title text-dark fs-6">
												<strong>BS: </strong> {doctor.User.name}
											</h4>
                                            <p className="card-text m-0">
                                                <strong>Chuyên khoa: </strong>
                                                <span className="text-muted">{doctor.Specialty?.name || 'Chưa cập nhật'}</span>
                                            </p>
                                            <p className="card-text m-0">
                                                <strong>Kinh nghiệm: </strong>
                                                <span className="text-muted">{doctor.experience || 'Chưa cập nhật'} năm</span>
                                            </p>
                                        </div>
                                        <div className="card-footer">
                                            <button
                                                className="btn btn-secondary w-100"
                                                onClick={() => navigate(`/doctors/${doctor.id}`)}
                                            >
                                                Xem chi tiết
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {doctors.length === 0 && (
                <div className="alert alert-warning text-center mt-4" role="alert">
                    Không có bác sĩ nào tại cơ sở y tế này.
                </div>
            )}
        </div>
    );
};

export default FacilityDetail;