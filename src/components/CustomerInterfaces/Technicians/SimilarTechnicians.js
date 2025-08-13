import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar, Skeleton } from '@mui/material';
import StarIcon from "@mui/icons-material/Star";
import { getSimilarTechniciansById } from "../../../services/TechnicianService";

const SimilarTechnicians = () => {
    const navigate = useNavigate();
    const { id: technicianId } = useParams();

    const [similarTechnicians, setSimilarTechnicians] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadSchedule = async () => {
            if (!technicianId) return;
            try {
                const res = await getSimilarTechniciansById(technicianId);
                setTimeout(() => {
                    if (res.EC !== 0) {
                        setError(true);
                    } else {
                        setSimilarTechnicians(res.DT);
                    }
                    setLoading(false);
                }, 1000);
            } catch (err) {
                console.error("Lỗi tải lịch làm việc:", err);
                setError(true);
                setLoading(false);
            }
        };
        loadSchedule();
    }, [technicianId]);
    // Skeleton
    if (loading) {
        return (
            <div className="card shadow-sm border-0 p-3 mb-4">
                <Skeleton variant="text" width={200} height={40} className="mx-auto mb-3" />
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="mb-3 p-3">
                        {/* Hàng avatar + tên + rating */}
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <div className="d-flex align-items-center gap-3">
                                <Skeleton variant="circular" width={40} height={40} />
                                <Skeleton variant="text" width={120} height={20} />
                            </div>
                            <Skeleton variant="text" width={40} height={20} />
                        </div>

                        {/* Cửa hàng */}
                        <Skeleton variant="text" width="60%" height={18} className="mb-2" />

                        {/* Chuyên môn */}
                        <div className="d-flex flex-wrap gap-1">
                            {Array.from({ length: 3 }).map((_, idx) => (
                                <Skeleton
                                    key={idx}
                                    variant="rounded"
                                    width={80}
                                    height={24}
                                    className="rounded-pill"
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="card shadow-sm border-0 p-3 mb-4 text-danger">
                Lỗi tải kỹ thuật viên tương tự
            </div>
        );
    }

    return (
        <div className="card shadow-sm border-0 p-3 mb-4">
            <div className="lead text-center mb-3">Đề xuất cho bạn</div>
            {similarTechnicians?.length > 0 ? (
                similarTechnicians.map(tech => (
                    <div
                        key={tech.technician_id}
                        className="mb-3 p-3 card-hover"
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate(`/ky-thuat-vien/${tech.technician_id}/chi-tiet`)}
                    >
                        {/* Hàng avatar + tên + rating */}
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <div className="d-flex align-items-center gap-3">
                                <Avatar
                                    src={`http://localhost:8080/images${tech.User.avatar}`}
                                    alt={tech.User.name}
                                    className="rounded-circle"
                                    style={{ width: 40, height: 40, objectFit: 'cover' }}
                                />
                                <h6 className="fw-bold mb-0">{tech.User?.name}</h6>
                            </div>
                            {tech.avg_rating > 0 && (
                                <div className="d-flex align-items-center small text-warning">
                                    {parseFloat(tech.avg_rating) === 0
                                        ? ''
                                        : Number.isInteger(parseFloat(tech.avg_rating))
                                        ? parseInt(tech.avg_rating)
                                        : parseFloat(tech.avg_rating).toFixed(2)}
                                    <StarIcon fontSize="small" className="ms-1" />
                                </div>
                            )}
                        </div>

                        {/* Cửa hàng */}
                        <div className="text-muted mb-2 small">
                            {tech.Store?.name} – {tech.Store?.address}
                        </div>

                        {/* Chuyên môn */}
                        <div className="d-flex flex-wrap gap-1">
                           {tech.Specialties.map(sp => (
                                <span
                                    key={sp.specialty_id}
                                    className={`badge rounded-pill px-2 ${
                                        sp.same ? 'bg-primary text-white border-0' : 'bg-light text-dark border'
                                    }`}
                                >
                                    {sp.name}
                                </span>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-muted lead text-center">
                    Không có kỹ thuật viên tương tự
                </div>
            )}
        </div>
    );
};

export default SimilarTechnicians;