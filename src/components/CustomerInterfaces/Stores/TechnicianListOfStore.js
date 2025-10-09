import { useNavigate } from "react-router-dom";
import { Avatar } from '@mui/material';
import StarIcon from "@mui/icons-material/Star";
import LoadingAndError from "../../commons/LoadingAndError";

const TechnicianListOfStore = ({ technicians = [], loading = false, error = null }) => {
	const navigate = useNavigate();
	if (loading) return <LoadingAndError.Loading />;
    if (error) return <LoadingAndError.Error message={error} />;

	return (
		<div className="card border-0 p-3 mb-4">
            <div className="lead text-center mb-3">Kỹ thuật viên của cửa hàng</div>

            {technicians.length > 0 ? (
                <div className="row row-cols-1 row-cols-3 g-4">
                    {technicians.map(tech => (
                        <div key={tech.technician_id} className="col">
                            <div
                                className="p-3 card shadow-sm h-100"
                                style={{ cursor: 'pointer' }}
                                onClick={() => navigate(`/ky-thuat-vien/${tech.technician_id}/chi-tiet`)}
                            >
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <div className="d-flex align-items-center gap-3">
                                        <Avatar
                                            src={tech.User?.avatar ? `http://localhost:8080/images${tech.User.avatar}` : undefined}
                                            alt={tech.User?.name}
                                            className="rounded-circle"
                                            style={{ width: 40, height: 40, objectFit: 'cover', backgroundColor: '#ccc' }}
                                        />
                                        <h6 className="fw-bold mb-0">{tech.User?.name}</h6>
                                    </div>
                                    {tech.avg_rating > 0 && (
                                        <div className="d-flex align-items-center small text-warning">
                                            {Number.isInteger(parseFloat(tech.avg_rating))
                                                ? parseInt(tech.avg_rating)
                                                : parseFloat(tech.avg_rating).toFixed(2)}
                                            <StarIcon fontSize="small" className="ms-1" />
                                        </div>
                                    )}
                                </div>

                                {/* Chuyên môn */}
                                <div className="d-flex flex-wrap gap-1">
                                    {tech.Specialties && tech.Specialties.length > 0 ? (
                                        tech.Specialties.map(sp => (
                                            <span
                                                key={sp.specialty_id}
                                                className="badge rounded-pill px-2 bg-primary text-white border-0"
                                            >
                                                {sp.name}
                                            </span>
                                        ))
                                    ) : (
                                        <small className="text-muted">Không có chuyên môn</small>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-muted lead text-center">
                    Không có kỹ thuật viên cửa hàng
                </div>
            )}
        </div>
	);
};

export default TechnicianListOfStore;
