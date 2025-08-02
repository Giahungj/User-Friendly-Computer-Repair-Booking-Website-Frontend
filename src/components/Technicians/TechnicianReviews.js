import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Skeleton, Rating, Avatar } from "@mui/material";
import { getRatingByTechnician } from "../../services/RatingService";

const TechnicianReviews = () => {
    const { id: technicianId } = useParams();
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadRating = async () => {
            if (!technicianId) return;
            try {
                const res = await getRatingByTechnician(technicianId);
                setTimeout(() => {
                    if (!res.DT || res.DT.length === 0) {
                        setRatings([]);
                    } else if (res.EC !== 0) {
                        setError(true);
                    } else {
                        setRatings(res.DT);
                    }
                    setLoading(false);
                }, 1000);
            } catch (err) {
                console.error("Lỗi tải đánh giá:", err);
                setError(true);
                setLoading(false);
            }
        };
        loadRating();
    }, [technicianId]);

    if (loading) {
        return (
            <div className="card shadow-sm border-0 p-3 mb-4">
                {[...Array(2)].map((_, idx) => (
                    <div key={idx} className="d-flex mb-3">
                        <Skeleton variant="circular" width={40} height={40} className="me-2" />
                        <div style={{ flex: 1 }}>
                            <Skeleton variant="text" width={120} height={20} />
                            <Skeleton variant="text" width="80%" height={18} />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="card shadow-sm border-0 p-3 mb-4 text-danger">
                Lỗi tải đánh giá
            </div>
        );
    }

    return (
        <div className="card shadow-sm border-0 p-3 mb-4">
            {ratings?.length > 0 ? (
                ratings.map((item) => (
                    <div key={item.rating_id} className="d-flex mb-3">
                        <Avatar
                            src={`http://localhost:8080/images${item.Technician.User.avatar}`}
                            alt={item.Technician.User.name}
                            className="me-3"
                        />
                        <div style={{ flex: 1 }}>
                            <div className="d-flex align-items-center justify-content-between">
                                <h6 className="mb-0 fw-bold">{item.Technician.User.name}</h6>
                                <Rating
                                    value={parseFloat(item.rating)}
                                    precision={0.5}
                                    readOnly
                                    size="small"
                                />
                            </div>
                            <p className="mb-1 small text-muted">
                                {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                            </p>
                            <p className="mb-0">{item.comment}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-muted lead">Chưa có đánh giá</div>
            )}
        </div>
    );
};

export default TechnicianReviews;
