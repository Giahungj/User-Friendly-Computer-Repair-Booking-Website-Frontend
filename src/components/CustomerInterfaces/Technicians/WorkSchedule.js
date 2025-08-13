import { useEffect, useState } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import { Badge, Skeleton, Button } from "@mui/material";
import { getWorkScheduleByTechnician } from "../../../services/WorkScheduleService";

const WorkSchedule = () => {
    const navigate = useNavigate();
    const { id: technicianId } = useParams();
    const [schedules, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadSchedule = async () => {
            if (!technicianId) return;
            try {
                const res = await getWorkScheduleByTechnician(technicianId);
                setTimeout(() => {
                    if (res.EC !== 0) {
                        setError(true);
                    } else {
                        setSchedule(res.DT);
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
                {[...Array(2)].map((_, groupIndex) => (
                    <div key={groupIndex} className="mb-3">
                        <h5 className="mb-2 fw-normal">
                            <Skeleton variant="text" width={120} height={24} />
                        </h5>
                        <div className="d-flex flex-wrap gap-2">
                            {[...Array(2)].map((_, itemIndex) => (
                                <Skeleton
                                    key={itemIndex}
                                    variant="rounded"
                                    width={200}
                                    height={40}
                                    sx={{ borderRadius: 2 }}
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
                Lỗi tải lịch làm việc
            </div>
        );
    }

    return (
        <div className="card shadow-sm border-0 p-3 mb-4">
            {schedules?.length > 0 ? (
                schedules.map(group => (
                    <div key={group.work_date} className="mb-3">
                        <h5 className="mb-2 fw-normal" style={{ color: "#039be5" }}>
                            {new Date(group.work_date).toLocaleDateString("vi-VN")}
                        </h5>
                        <div className="d-flex flex-wrap gap-2">
                            {group.items.map(item => (
                                <Badge
                                    key={item.schedule_id}
                                    badgeContent={`${item.current_number}/${item.max_number}`}
                                    color="primary"
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right"
                                    }}
                                >
                                    <Button
                                        variant="outlined"
                                        disabled={item.current_number >= item.max_number}
                                        onClick={() => navigate(`/dat-lich/${item.work_schedule_id}/tao-lich`)}
                                    >
                                        {item.shift === '1'
                                            ? 'Ca sáng (07:00 - 11:00)'
                                            : 'Ca chiều (13:00 - 17:00)'}
                                    </Button>
                                </Badge>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-muted lead">Chưa có lịch làm việc</div>
            )}
        </div>
    );
};

export default WorkSchedule;