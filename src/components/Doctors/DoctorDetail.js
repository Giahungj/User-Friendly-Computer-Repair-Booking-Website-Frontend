import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDoctorById, fetchDoctorsBySpecialty } from "../../services/doctorService";
import { AuthContext } from '../../context/AuthContext';
import { Rating, Avatar, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import SimilarDoctors from './SimilarDoctors'; // Import component SimilarDoctors

const DoctorDetail = () => {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [schedules, setSchedules] = useState(null);
    const [ratings, setRatings] = useState(null);
    const [visibleRatings, setVisibleRatings] = useState(5);
    const [averageScore, setAverageScore] = useState(0);
    const [similarDoctors, setSimilarDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getDoctorDetail = async () => {
            try {
                setLoading(true);
                const response = await fetchDoctorById(id);
                if (response?.EC === 0) {
                    setRatings(response.DT.ratings);
                    setDoctor(response.DT.doctor);
                    setAverageScore(response.DT.averageScore);
                    setSchedules(response.DT.schedules);

                    const specialtyId = response.DT.doctor.specialtyId;
                    const similarDoctorsResponse = await fetchDoctorsBySpecialty(specialtyId);
                    console.log(similarDoctorsResponse.DT);
                    if (similarDoctorsResponse?.EC === 0) {
                        setSimilarDoctors(similarDoctorsResponse.DT.filter(doc => doc.User.id !== id));
                    }
                } else {
                    console.error("Error fetching doctor detail:", response?.EM);
                }
            } catch (error) {
                console.error("Error fetching doctor detail:", error);
            } finally {
                setLoading(false);
            }
        };

        getDoctorDetail();
    }, [id]);

    const handleBooking = (scheduleId) => {
        if (!auth.account) { return navigate('/login', { state: { from: `/doctors/${id}` }})}
        const patientId = auth.account.id;
        navigate(`/confirm-booking?scheduleID=${scheduleId}&patientID=${patientId}`);
    };

    const loadMoreRatings = () => { setVisibleRatings((prev) => prev + 5); };
    const loadLessRatings = () => { setVisibleRatings(5); };

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (!doctor) return <p>Không tìm thấy thông tin bác sĩ.</p>;

    return (
        <div className="container py-4">
            <p></p>
            <div className="row g-4 p-3">
                {/* Cột trái - Lịch làm việc */}
                <div className="col-3 p-3 border shadow-sm bg-white rounded h-100" style={{ position: "sticky", top: "2em", alignSelf: "flex-start" }}>
                    <h5 className="fw-semibold text-dark mb-3">Lịch khám</h5>
                    {schedules.length === 0 ? (
                        <div className="alert alert-warning text-center" role="alert">
                            Không có lịch khám nào.
                        </div>
                    ) : (
                        <div className="d-flex flex-column gap-3">
                            {Object.entries(
                                schedules.reduce((acc, sche) => {
                                    const date = sche.date;
                                    if (!acc[date]) acc[date] = [];
                                    acc[date].push(sche);
                                    return acc;
                                }, {})
                            ).map(([date, schedulesByDate]) => (
                                <div key={date}>
                                    <h6 className="mb-2">{date}</h6>
                                    <div className="row row-cols-2 g-2">
                                        {schedulesByDate.slice(0, 8).map((sche) => (
                                            <div key={sche.id} className="col">
                                                <button
                                                    className="btn btn-outline-primary p-2 w-100"
                                                    onClick={() => handleBooking(sche.id)}
                                                    disabled={sche.currentNumber >= sche.maxNumber}
                                                >
                                                    <p className="m-0 fw-bold text-start" style={{ fontSize: '0.8rem' }}>
                                                        {sche.Timeslot.startTime} - {sche.Timeslot.endTime}
                                                    </p>
                                                    <p className="m-0 text-start" style={{ fontSize: '0.7rem' }}>
                                                        <span className={sche.currentNumber >= sche.maxNumber ? "text-danger" : ""}>
                                                            {sche.currentNumber}/{sche.maxNumber}
                                                        </span>
                                                    </p>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Cột giữa - Thông tin bác sĩ và địa chỉ */}
                <div className="col-6 h-100" style={{ position: "sticky", top: "2em", alignSelf: "flex-start" }}>
                    <div className="d-flex flex-column gap-3">
                        <div className="p-3 d-flex flex-column border shadow-sm bg-white rounded">
                            {/* Thông tin bác sĩ */}
                            <div className="d-flex gap-3">
                                <div className="m-3">
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={
                                            doctor.User.avatar
                                                ? `http://localhost:8080/images/uploads/${doctor.User.avatar}`
                                                : '/default-avatar.jpg'
                                        }
                                        sx={{ width: 150, height: 150 }}
                                    />
                                </div>
                                <div>
                                    <h5 className="fw-semibold text-dark mb-2 font-roboto">
                                        Bác sĩ chuyên khoa {doctor.Specialty.name} {doctor.User.name}
                                    </h5>
                                    <p className="m-0">
                                        <StarIcon size="large" sx={{ color: '#ffd54f' }} /> {averageScore}{' '}
                                        <span className="text-muted">({ratings.length} lượt)</span>
                                    </p>
                                    <p className="mb-0 text-muted">
                                        {doctor.experience || 'Chưa cập nhật'} năm kinh nghiệm
                                    </p>
                                    <p className="mb-0 text-muted">{doctor.infor || 'Chưa cập nhật'}</p>
                                </div>
                            </div>
                            {/* Địa chỉ và giá khám */}
                            <div className="text-secondary">
                                <h6>ĐỊA CHỈ KHÁM</h6>
                                <p className="mb-0 text-muted">{doctor.Facility?.name || 'Chưa cập nhật'}</p>
                                <p className="mb-0 text-muted">{doctor.Facility?.address || 'Chưa cập nhật'}</p>
                                <hr />
                                <h6>
                                    GIÁ KHÁM:{' '}
                                    <span className="text-danger">
                                        {doctor.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) ||
                                            'Chưa cập nhật'}
                                    </span>
                                </h6>
                            </div>
                        </div>
                        {/* Các bác sĩ tương tự */}
                        {similarDoctors.length > 0 && <SimilarDoctors similarDoctors={similarDoctors} />}
                    </div>
                </div>

                {/* Cột phải - Bình luận và đánh giá */}
                <div className="col-3 h-100 p-3 border shadow-sm bg-white rounded">
                    <h5 className="fw-semibold text-dark mb-3">Đánh giá</h5>
                    <div className="d-flex flex-column gap-3">
                        {ratings.length > 0 ? (
                            <>
                                {ratings.slice(0, visibleRatings).map((rating, index) => (
                                    <div key={index} className="d-flex align-items-start border-bottom pb-3 gap-2">
                                        <Avatar
                                            alt={rating.Patient.User.name}
                                            src={
                                                rating.Patient.User.avatar
                                                    ? `http://localhost:8080/images/uploads/${rating.Patient.User.avatar}`
                                                    : '/default-avatar.png'
                                            }
                                        />
                                        <div className="w-100">
                                            <strong>{rating.Patient.User.name}</strong>
                                            <p className="mb-0">
                                                <Rating name="read-only" value={rating.score} readOnly size="small" />
                                            </p>
                                            <p className="mb-0">{rating.comment}</p>
                                            <p className="text-muted text-end m-0 fs-7">
                                                {new Date(rating.createdAt).toLocaleString('vi-VN')}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                {visibleRatings < ratings.length ? (
                                    <Button variant="outlined" onClick={loadMoreRatings}>
                                        Hiển thị thêm
                                    </Button>
                                ) : (
                                    <Button variant="outlined" onClick={loadLessRatings}>
                                        Rút gọn
                                    </Button>
                                )}
                            </>
                        ) : (
                            <p className="text-muted">Chưa có đánh giá nào.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetail;