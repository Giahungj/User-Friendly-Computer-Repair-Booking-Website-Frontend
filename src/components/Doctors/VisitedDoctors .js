import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RevolvingDot } from "react-loader-spinner";
import { fetchVisitedDoctors } from "../../services/doctorService"; // API lấy danh sách bác sĩ đã từng khám
import Avatar from '@mui/material/Avatar';
import { AuthContext } from "../../context/AuthContext";

const VisitedDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)
    const navigate = useNavigate();    
    const { auth } = useContext(AuthContext);
    console.log(auth)
    const patientId = auth.account.patientId;
    useEffect(() => {
        const getVisitedDoctors = async () => {
            setLoading(true);
            try {
                const response = await fetchVisitedDoctors(patientId);
                if (response && response.EC === 0) {
                    setDoctors(response.DT);
                } else {
                    setError(true)
                    console.error("Error fetching visited doctors:", response.EM);
                }
            } catch (error) {
                console.error("Error fetching visited doctors:", error);
            } finally {
                setLoading(false); // Kết thúc tải dữ liệu
            }
        };
        getVisitedDoctors();
    }, [patientId]);

    const handleViewDetail = (id) => {
        navigate(`/doctors/${id}`);
    };

    if (loading) return (
        <div className="loading-container">
            <RevolvingDot color="#6edff6" />
            <div className="loading-content">Đang tải chờ xíu ...</div>
        </div>
    )

    if (error) return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="shadow-lg p-5 text-center bg-light rounded-3" style={{ maxWidth: "600px" }}>
                <h2 className="text-danger mb-4 fw-bold">Đã xảy ra lỗi!</h2>
                <p className="text-muted mb-4">Không thể tải danh sách bác sĩ. Vui lòng thử lại sau hoặc liên hệ hỗ trợ.</p>
                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-primary" onClick={() => window.location.reload()}>
                        Thử lại
                    </button>
                    <button className="btn btn-outline-secondary" onClick={() => navigate("/support")}>
                        Liên hệ hỗ trợ
                    </button>
                </div>
            </div>
        </div>
    );
    
    if (!doctors || doctors.length === 0) return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="shadow-lg p-5 text-center bg-light rounded-3" style={{ maxWidth: "600px" }}>
                <h2 className="text-danger mb-4 fw-bold">Không có bác sĩ nào</h2>
                <p className="text-muted mb-4">Hiện tại, không có bác sĩ nào trong danh sách. Hãy thử lại sau hoặc đặt lịch hẹn mới.</p>
                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-primary" onClick={() => navigate("/doctors")}>
                        Đặt lịch hẹn ngay
                    </button>
                    <button className="btn btn-outline-secondary" onClick={() => navigate("/support")}>
                        Liên hệ hỗ trợ
                    </button>
                </div>
            </div>
        </div>
    );
    
    return (
        <div className="container p-4">
            <h2>Danh sách bác sĩ bạn đã khám</h2>
            <ul className="list-group gap-4">
                {doctors.length > 0 ? (
                    doctors.map((doctor) => (
                        <li key={doctor.id} 
                            className="list-group-item list-group-item-action border rounded shadow-sm"
                            onClick={() => handleViewDetail(doctor.id)} 
                            style={{ cursor: 'pointer'}}
                        >
                            <div className="d-flex gap-5 align-items-center">
                                <Avatar
                                    alt={doctor.User.name}
                                    src={
                                        doctor.User.avatar
                                            ? `http://localhost:8080/images/uploads/${doctor.User.avatar}`
                                            : '/default-avatar.jpg'
                                    }
                                    sx={{ width: 150, height: 150 }}
                                />
                                <div>
                                    <p className="mb-1"><strong>BS {doctor.User.name}</strong></p>
                                    <p className="text-muted">Chuyên khoa {doctor.Specialty.name}</p>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                        <div className="shadow-lg p-5 text-center bg-light rounded-3" style={{ maxWidth: "600px" }}>
                            <h2 className="text-danger mb-4 fw-bold">Bạn chưa từng khám bác sĩ nào</h2>
                            <p className="text-muted mb-4">Hiện tại, bạn chưa có lịch sử khám bệnh nào. Hãy đặt lịch hẹn để được tư vấn và chăm sóc sức khỏe tốt nhất.</p>
                            <div className="d-flex justify-content-center gap-3">
                                <button className="btn btn-primary" onClick={() => navigate("/booking")}>
                                    Đặt lịch hẹn ngay
                                </button>
                                <button className="btn btn-outline-secondary" onClick={() => navigate("/support")}>
                                    Liên hệ hỗ trợ
                                </button>
                            </div>
                            <hr className="my-4" />
                            <p className="text-muted small">Nếu bạn cần thêm thông tin, vui lòng liên hệ bộ phận CSKH hoặc xem lại lịch hẹn trong tài khoản của bạn.</p>
                        </div>
                    </div>

                )}
            </ul>
        </div>
    );
};

export default VisitedDoctors;
