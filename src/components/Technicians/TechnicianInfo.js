import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { Skeleton, Button, CircularProgress } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { getTechnicianById } from "../../services/TechnicianService";

const TechnicianInfo = () => {
    const { id } = useParams();
    const [technician, setTechnician] = useState();
    const [specialties, setSpecialties] = useState([])
    const [totalBookings, setTotalBookings] = useState([])
    const [avgRating, setAvgRating] = useState([])

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await getTechnicianById(id);
                if (!res || res.EC !== 0) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setTimeout(() => {
                    setTechnician(res.DT.technician);
                    setSpecialties(res.DT.Specialties);
                    setAvgRating(res.DT.technician.avg_rating);
                    setTotalBookings(res.DT.totalBookings);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu kỹ thuật viên:', error);
                setError(true);
                setLoading(false);
            }
        };
        loadData();
    }, [id]);

    if (error) {
        return (
        <div className="card mb-4 p-3">
            <p>NGU</p>
        </div>
        )
    }

    if (loading) {
        return (
            <div className="card shadow-sm border-0 p-3 mb-4 position-relative">
                <div className="position-absolute top-50 start-50 translate-middle">
                    <CircularProgress size={36} color="primary" />
                </div>

                <div className="d-flex align-items-center mb-3">
                    <Skeleton variant="circular" width={70} height={70} className="me-3" />
                    <div className="flex-grow-1">
                        <Skeleton variant="text" width={150} height={24} />
                        <Skeleton variant="text" width={120} height={16} />
                        <Skeleton variant="text" width={180} height={16} />
                    </div>
                </div>

                <div className="d-flex justify-content-start gap-2 mt-3">
                    <Skeleton variant="rounded" width={80} height={40} />
                    <Skeleton variant="rounded" width={100} height={40} />
                </div>

                <div className="mt-3">
                    <Skeleton variant="text" width={100} height={20} className="mb-2" />
                    <div className="d-flex flex-wrap gap-2">
                        <Skeleton variant="rounded" width={90} height={24} />
                        <Skeleton variant="rounded" width={80} height={24} />
                        <Skeleton variant="rounded" width={70} height={24} />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="card shadow-sm border-0 p-3 mb-4 text-center">
                <div className="d-flex flex-column align-items-center">
                    <ErrorOutlineIcon color="error" sx={{ fontSize: 60 }} className="mb-3" />
                    <h5 className="fw-bold mb-2">Không thể tải thông tin kỹ thuật viên</h5>
                    <p className="text-muted mb-3">
                        Rất tiếc, đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại hoặc quay lại danh sách kỹ thuật viên.
                    </p>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/ky-thuat-vien/tat-ca"
                        sx={{ textTransform: "none" }}
                    >
                        Xem danh sách kỹ thuật viên
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="card shadow-sm border-0 p-3 mb-4">
            <div className="d-flex align-items-center">
                <img
                    src={
                        technician?.User?.avatar
                            ? `http://localhost:8080/images${technician.User.avatar}`
                            : "https://chupanhthe.vn/img/chup-anh-the-chuan-quoc-te5.jpg"
                    }
                    alt={technician?.User?.name || "Không rõ"}
                    className="rounded me-3 border"
                    style={{ width: 70, height: 70, objectFit: "cover" }}
                />
                <div className="flex-grow-1">
                    <h5 className="mb-1 fw-bold">{technician?.User?.name || "Lỗi tên"}</h5>
                    <small className="text-muted d-block">{technician?.Store?.name || "Không rõ cửa hàng"}</small>
                    <small className="text-muted">{technician?.Store?.address || "Không rõ địa chỉ"}</small>
                </div>
            </div>

            <div className="mt-3 d-flex">
                <div className="fs-3 d-flex align-items-center me-2" style={{ color: '#fdd835' }}>
                    {parseFloat(avgRating) === 0
                        ? ''
                        : Number.isInteger(parseFloat(avgRating))
                        ? parseInt(avgRating)
                        : parseFloat(avgRating).toFixed(2)}
                    <StarIcon fontSize="large" className="ms-1" /> 
                </div>
                <div className="fs-3 d-flex align-items-center" style={{ color: '#039be5' }}>
                    <AssignmentTurnedInIcon fontSize="large" className="ms-1" /> {totalBookings || 0} lượt đặt
                </div>
            </div>

            <div className="mt-3">
                <p className="d-block mb-1 lead">Chuyên môn:</p>
                {specialties?.length > 0 ? (
                    <div className="d-flex flex-wrap gap-2">
                        {specialties.map((spec) => (
                            <span
                                key={spec.specialty_id}
                                className="badge bg-light text-dark border"
                            >
                                {spec.name}
                            </span>
                        ))}
                    </div>
                ) : (
                    <small className="text-muted">Không rõ chuyên môn</small>
                )}
            </div>
        </div>
    );
};

export default TechnicianInfo;