import { useEffect, useState, useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import { useParams, useNavigate } from "react-router-dom";
import { fetchSpecialtyById } from "../../services/specialtySevice";
import "../../../src/App.scss";
import DoctorList from './DoctorList'; // Import component mới

const SpecialtyDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { auth } = useContext(AuthContext);
    const [specialty, setSpecialty] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSpecialtyDetail = async () => {
            try {
                setLoading(true);
                const specialtyResponse = await fetchSpecialtyById(id);
                if (specialtyResponse?.EC === 0) {
                    setSpecialty(specialtyResponse.DT.specialty);
                    setDoctors(specialtyResponse.DT.doctors);
                } else {
                    console.error("Error fetching specialty detail:", specialtyResponse?.EC);
                }
            } catch (error) {
                console.error("Error fetching specialty detail:", error);
            } finally {
                setLoading(false);
            }
        };

        getSpecialtyDetail();
    }, [id]);

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (!specialty) return <p>Không tìm thấy thông tin chuyên khoa.</p>;

    const handleBooking = (scheduleId) => {
      if (!auth.account) { return navigate('/login', { state: { from: `/doctors/${id}` }})}
      const patientId = auth.account.id;
      navigate(`/confirm-booking?scheduleID=${scheduleId}&patientID=${patientId}`);
    };

    return (
        <div className="container py-4">
            <div className="row g-2 justify-content-center">
                {/* Ảnh chuyên khoa */}
                <div className="col-md-4">
                    <img
                        src={specialty.image ? `http://localhost:8080${specialty.image}` : '/default-image.jpg'}
                        alt={specialty.name}
                        className="img-fluid border border-2"
                        style={{ objectFit: 'cover', width: '100%', height: '200px' }}
                    />
                </div>

                {/* Thông tin chuyên khoa */}
                <div className="col-md-8 p-3 bg-light">
                    <h5 className="text-start fw-semibold text-dark mb-3 font-roboto">
                        {specialty.name}
                    </h5>
                    <p className="text-muted mb-0">
                        {specialty.description || 'Chưa cập nhật'}
                    </p>
                </div>
            </div>
            <hr />

            {/* Danh sách bác sĩ */}
            <DoctorList doctors={doctors} handleBooking={handleBooking} />
        </div>
    );
};

export default SpecialtyDetail;