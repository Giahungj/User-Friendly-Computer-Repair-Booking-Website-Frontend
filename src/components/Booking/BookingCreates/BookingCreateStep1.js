import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { Skeleton, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getDataForCreateBooking } from "../../../services/RepairBookingService";

function BookingCreateStep1() {
    const { auth } = useContext(AuthContext);
    const { workScheduleId } = useParams();
    const [service, setService] = useState([]);
    const [schedule, setSchedule] = useState('');
    const [issueDescription, setIssueDescription] = useState('');
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const loadSchedule = async () => {
            if (!workScheduleId) return setError(true);
            if (!auth.user.user_id) return setError(true);
            try {
                const res = await getDataForCreateBooking({workScheduleId, userId: auth.user.user_id});
                // setTimeout(() => {
                //     if (res.EC !== 0) {
                //         setError(true);
                //     } else {
                //         setSchedule(res.DT);
                //     }
                //     setLoading(false);
                // }, 1000);
            } catch (err) {
                console.error("Lỗi tải lịch làm việc:", err);
                setError(true);
                setLoading(false);
            }
        };
        loadSchedule();
    }, [workScheduleId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const bookingData = {
            service,
            issueDescription,
            bookingDate,
            bookingTime,
        };

        navigate('/dat-lich/tao-buoc-2', { state: bookingData });
    };

    if (loading) {
        return (
            <>
                <div className="container py-5 fs-7">
                <div
                    className="card shadow-sm border-0 p-3 mb-4"
                    style={{ maxWidth: "700px", margin: "0 auto" }}
                >
                    <div
                        className="card-header border-0 rounded text-center"
                        style={{ backgroundColor: "#e0e0e0", height: "90px" }}
                    >
                        <Skeleton
                            variant="text"
                            width={180}
                            height={32}
                            sx={{ margin: "8px auto" }}
                        />
                        <Skeleton
                            variant="text"
                            width={220}
                            height={28}
                            sx={{ margin: "0 auto" }}
                        />
                    </div>

                    <div className="p-4">
                        <div className="row">
                            {/* Cột trái */}
                            <div className="col-md-6">
                                <div className="mb-4">
                                    <Skeleton width="60%" height={20} className="mb-2" />
                                    <Skeleton variant="rectangular" width="100%" height={60} />
                                </div>
                                <div className="mb-4">
                                    <Skeleton width="60%" height={20} className="mb-2" />
                                    <Skeleton variant="rectangular" width="100%" height={40} />
                                </div>
                            </div>

                            {/* Cột phải */}
                            <div className="col-md-6">
                                <div className="mb-4">
                                    <Skeleton width="70%" height={20} className="mb-2" />
                                    <div className="d-flex flex-wrap gap-2">
                                        {Array.from({ length: 4 }).map((_, idx) => (
                                            <Skeleton
                                                key={idx}
                                                variant="rounded"
                                                width={90}
                                                height={36}
                                                sx={{ borderRadius: 2 }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <Skeleton width="60%" height={20} className="mb-2" />
                                    <div className="d-flex flex-wrap gap-2">
                                        {Array.from({ length: 6 }).map((_, idx) => (
                                            <Skeleton
                                                key={idx}
                                                variant="rounded"
                                                width={80}
                                                height={36}
                                                sx={{ borderRadius: 2 }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Nút */}
                        <div className="d-flex justify-content-between">
                            <Button
                                className="rounded-pill"
                                variant="outlined"
                                sx={{ minWidth: "120px", borderRadius: "5px" }}
                                disabled
                                startIcon={<ArrowBackIcon />}
                            >
                                Hủy
                            </Button>
                            <Button
                                className="rounded-pill"
                                variant="contained"
                                sx={{
                                    minWidth: "120px",
                                    borderRadius: "5px",
                                    backgroundColor: "#90caf9",
                                }}
                                disabled
                                endIcon={<ArrowForwardIcon />}
                            >
                                Tiếp theo
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }

    return (
        <>
            <div className="container py-5 fs-7">
                <div
                    className="card shadow-sm border-0 p-3 mb-4"
                    style={{ maxWidth: "700px", margin: "0 auto" }}
                >
                    {/* Header */}
                    <div
                        className="card-header border-0 rounded text-white text-center"
                        style={{ backgroundColor: "#2196f3" }}
                    >
                        <h4 className="mb-0">Đặt Lịch Sửa Chữa</h4>
                        <h5 className="mb-0">Bước 1: Thông tin dịch vụ</h5>
                    </div>

                    {/* Body */}
                    <form className="p-4">
                        <div className="row">
                            {/* Cột trái */}
                            <div className="col-md-6">
                                <div className="mb-4">
                                    <label className="form-label fw-bold">Mô tả sự cố</label>
                                    <textarea
                                        className="form-control"
                                        rows={3}
                                        placeholder="Nhập mô tả sự cố..."
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-bold">Thời gian đặt lịch</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        placeholder="Chọn giờ"
                                    />
                                </div>
                            </div>

                            {/* Cột phải */}
                            <div className="col-md-6">
                                {/* Dịch vụ */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold">Chọn dịch vụ sửa chữa:</label>
                                    <div className="d-flex flex-wrap gap-2">
                                        {[
                                            "Sửa laptop",
                                            "Sửa máy bàn",
                                            "Thay màn hình",
                                            "Thay pin",
                                            "Vệ sinh máy",
                                            "Nạp mực máy in",
                                            "Sửa máy in",
                                            "Sửa camera",
                                        ].map((service) => (
                                            <div
                                                key={service}
                                                style={{
                                                    padding: "10px 15px",
                                                    border: "1px solid #ccc",
                                                    borderRadius: "8px",
                                                    cursor: "pointer",
                                                    backgroundColor: "#fff",
                                                    color: "#000",
                                                    transition: "all 0.2s ease",
                                                }}
                                            >
                                                {service}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Ngày */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold">Chọn ngày</label>
                                    <div className="d-flex flex-wrap gap-2">
                                        {[
                                            "03/07/2025",
                                            "04/07/2025",
                                            "05/07/2025",
                                            "06/07/2025",
                                            "07/07/2025",
                                            "08/07/2025",
                                        ].map((date) => (
                                            <div
                                                key={date}
                                                style={{
                                                    padding: "10px 15px",
                                                    border: "1px solid #ccc",
                                                    borderRadius: "8px",
                                                    cursor: "pointer",
                                                    backgroundColor: "#fff",
                                                    color: "#000",
                                                    transition: "all 0.2s ease",
                                                }}
                                            >
                                                {date}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Button */}
                        <div className="d-flex justify-content-between">
                            <Button
                                className="rounded-pill"
                                variant="outlined"
                                sx={{
                                    minWidth: "120px",
                                    borderRadius: "5px",
                                }}
                                startIcon={<ArrowBackIcon />}
                            >
                                Hủy
                            </Button>
                            <Button
                                className="rounded-pill"
                                variant="contained"
                                sx={{
                                    minWidth: "120px",
                                    borderRadius: "5px",
                                    backgroundColor: "#2196f3",
                                }}
                                endIcon={<ArrowForwardIcon />}
                            >
                                Tiếp theo
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default BookingCreateStep1;