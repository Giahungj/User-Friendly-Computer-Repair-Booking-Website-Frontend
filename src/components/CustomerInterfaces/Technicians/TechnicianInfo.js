import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import LoadingAndError from "../../commons/LoadingAndError";
import { getTechnicianById } from "../../../services/TechnicianService";

const TechnicianInfo = () => {
    const { id } = useParams();
    const [technician, setTechnician] = useState();
    const [specialties, setSpecialties] = useState([])
    const [totalBookings, setTotalBookings] = useState([])
    const [avgRating, setAvgRating] = useState([])

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await getTechnicianById(id);
                if (!res || res.EC !== 0) {
                    setError(res.EM);
                    setLoading(false);
                    return;
                }
                    setTechnician(res.DT.technician);
                    setSpecialties(res.DT.Specialties);
                    setAvgRating(res.DT.technician.avg_rating);
                    setTotalBookings(res.DT.totalBookings);
                    setLoading(false);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu kỹ thuật viên:', error);
                setError("Lỗi máy chủ!");
                setLoading(false);
            }
        };
        loadData();
    }, [id]);

    if (loading) return <LoadingAndError.Loading />;
    if (error) return <LoadingAndError.Error message={error}  />;

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