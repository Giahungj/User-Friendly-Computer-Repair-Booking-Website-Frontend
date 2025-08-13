import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { Button, Skeleton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import { getDataForCreateBooking } from "../../../services/RepairBookingService";

function BookingCreateStep1() {
    const { auth } = useContext(AuthContext);
    const { workScheduleId } = useParams();

    const location = useLocation();
    const bookingData = location.state;

    const [issueDescription, setIssueDescription] = useState(bookingData?.issueDescription || '');
    const [deviceType, setDeviceType] = useState(bookingData?.deviceType || '');
    const [model, setModel] = useState(bookingData?.model || '');
    const [selectedBrand, setSelectedBrand] = useState(
        bookingData?.brand && !bookingData?.customBrand ? bookingData.brand : ''
    );
    const [customBrand, setCustomBrand] = useState(
        bookingData?.brand && !selectedBrand ? bookingData.brand : ''
    );
    const [issueImage, setIssueImage] = useState(bookingData?.issueImage || null);

    const [workSchedule, setWorkSchedule] = useState(bookingData?.workSchedule || undefined);
    const [customer, setCustomer] = useState(bookingData?.customer || undefined);

    const [loading, setLoading] = useState(!bookingData);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const brands = [
        "Dell", "HP", "Lenovo", "Asus", "Acer",
        "Apple", "Canon", "Epson", "Brother", "Samsung"
    ];

    useEffect(() => {
        if (bookingData) return; // nếu có data từ state thì không gọi API

        const loadSchedule = async () => {
            if (!workScheduleId || !auth.user.user_id) {
                setError(true);
                setLoading(false);
                return;
            }
            try {
                const res = await getDataForCreateBooking({ workScheduleId, userId: auth.user.user_id });
                console.log("BookingCreateStep1 - getDataForCreateBooking response:", res);
                setTimeout(() => {
                    if (res.EC === 1) {
                        setError(1);
                    } else if (res.EC === 2) {
                        setError(2);
                    } else if (res.EC !== 0) {
                        setError(res.EC);
                    } else {
                        setWorkSchedule(res.DT.workSchedule);
                        setCustomer(res.DT.customer);
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
    }, [workScheduleId, auth.user.user_id, bookingData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookingDataToSend = { 
            issueDescription,
            deviceType,
            model,
            brand: selectedBrand || customBrand,
            issueImage,
            workSchedule,
            customer
        };
        navigate('/dat-lich/kiem-tra-thong-tin', { state: bookingDataToSend });
    };

    if (error === 1) {
        return (
            <div className="container py-5 fs-7">
                <div
                    className="card shadow-sm border-0 p-3 mb-4"
                    style={{ maxWidth: "700px", margin: "0 auto" }}
                >
                    <div
                        className="card-header border-0 rounded text-center"
                        style={{ backgroundColor: "#e3f2fd" }}
                    >
                        <ErrorOutlineIcon sx={{ fontSize: 40, color: "#f44336" }} />
                        <h4 className="lead mt-2 mb-1">Không thể tải dữ liệu</h4>
                        <p className="text-muted mb-0">Có lỗi khi lấy thông tin lịch làm việc</p>
                    </div>
                    <div className="p-4 text-center">
                        <p className="lead text-muted mb-4">
                            Vui lòng kiểm tra kết nối mạng hoặc thử tải lại trang.
                        </p>
                        <div className="d-flex justify-content-center gap-3">
                            <Button
                                variant="outlined"
                                startIcon={<ArrowBackIcon />}
                                sx={{ borderRadius: "5px", minWidth: "120px" }}
                                onClick={() => navigate(-1)}
                            >
                                Quay lại
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<ReplayIcon />}
                                sx={{ backgroundColor: "#2196f3", borderRadius: "5px", minWidth: "120px" }}
                                onClick={() => window.location.reload()}
                            >
                                Thử lại
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
        
    if (error === 2) {
        return (
            <div className="container py-5 fs-7">
                <div
                    className="card shadow-sm border-0 p-3 mb-4"
                    style={{ maxWidth: "700px", margin: "0 auto" }}
                >
                    <div
                        className="card-header border-0 rounded text-center"
                        style={{ backgroundColor: "#e3f2fd" }}
                    >
                        <ErrorOutlineIcon sx={{ fontSize: 40, color: "#f44336" }} />
                        <h4 className="lead mt-2 mb-1">Quyền truy cập hạn chế</h4>
                        <p className="text-muted mb-0">
                            Bạn đang đăng nhập với quyền kỹ thuật viên hoặc cửa hàng trưởng nên không thể đặt lịch làm việc.
                        </p>
                    </div>
                    <div className="p-4 text-center">
                        <p className="lead text-muted mb-4">
                            Hãy đăng xuất và đăng nhập bằng tài khoản khách hàng để tiếp tục đặt lịch sửa chữa.
                        </p>
                        <div className="d-flex justify-content-center gap-3">
                            <Button
                                variant="outlined"
                                startIcon={<ArrowBackIcon />}
                                sx={{ borderRadius: "5px", minWidth: "120px" }}
                                onClick={() => navigate(-1)}
                            >
                                Quay lại
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<ReplayIcon />}
                                sx={{ backgroundColor: "#2196f3", borderRadius: "5px", minWidth: "120px" }}
                                onClick={() => window.location.reload()}
                            >
                                Thử lại
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="container py-5 fs-7">
                <div className="card shadow-sm border-0 p-3 mb-4" style={{ maxWidth: "700px", margin: "0 auto" }}>
                    <div className="card-header border-0 rounded text-center" style={{ backgroundColor: "#e0e0e0" }}>
                        <Skeleton variant="text" width={180} height={32} sx={{ margin: "8px auto" }} />
                        <Skeleton variant="text" width={220} height={28} sx={{ margin: "0 auto" }} />
                    </div>
                    <div className="p-4">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-4">
                                    <Skeleton width="60%" height={20} className="mb-2" />
                                    <div className="d-flex flex-wrap gap-2">
                                        {Array.from({ length: 4 }).map((_, idx) => (
                                            <Skeleton
                                                key={idx}
                                                variant="rounded"
                                                width={100}
                                                height={36}
                                                sx={{ borderRadius: "5px" }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <Skeleton width="60%" height={20} className="mb-2" />
                                    <Skeleton variant="rectangular" width="100%" height={40} />
                                    <Skeleton width="80%" height={16} className="mt-1" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-4">
                                    <Skeleton width="60%" height={20} className="mb-2" />
                                    <div className="d-flex flex-wrap gap-2 mb-2">
                                        {Array.from({ length: 5 }).map((_, idx) => (
                                            <Skeleton
                                                key={idx}
                                                variant="rounded"
                                                width={100}
                                                height={36}
                                                sx={{ borderRadius: "5px" }}
                                            />
                                        ))}
                                    </div>
                                    <Skeleton variant="rectangular" width="100%" height={40} />
                                    <Skeleton width="80%" height={16} className="mt-2" />
                                </div>
                                <div className="mb-4">
                                    <Skeleton width="60%" height={20} className="mb-2" />
                                    <Skeleton variant="rectangular" width="100%" height={40} />
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <Skeleton width="60%" height={20} className="mb-2" />
                            <Skeleton variant="rectangular" width="100%" height={80} />
                        </div>
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
                                sx={{ minWidth: "120px", borderRadius: "5px", backgroundColor: "#90caf9" }}
                                disabled
                                endIcon={<ArrowForwardIcon />}
                            >
                                Tiếp theo
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5 fs-7">
            <div className="card shadow-sm border-0 p-3 mb-4" style={{ maxWidth: "700px", margin: "0 auto" }}>
                <div className="card-header border-0 rounded text-white text-center" style={{ backgroundColor: "#2196f3" }}>
                    <h4 className="lead mt-2 mb-2">Đặt Lịch Sửa Chữa</h4>
                    <h3 className="mb-2">Thông tin thiết bị</h3>
                </div>
                <form className="p-4" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-4">
                                <label className="form-label fw-bold">Loại thiết bị</label>
                                <div className="d-flex flex-wrap gap-2">
                                    {['Laptop', 'PC', 'Máy in', 'Điện thoại'].map((type) => (
                                        <Button
                                            key={type}
                                            variant={deviceType === type ? "contained" : "outlined"}
                                            onClick={() => setDeviceType(type)}
                                            sx={{ minWidth: "100px", borderRadius: "5px" }}
                                        >
                                            {type}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-bold">Model</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nhập model"
                                    list="modelSuggestions"
                                    value={model}
                                    onChange={(e) => setModel(e.target.value)}
                                />
                                <datalist id="modelSuggestions">
                                    <option value="MacBook Pro 2021" />
                                    <option value="Dell XPS 13" />
                                    <option value="HP LaserJet 1020" />
                                    <option value="Lenovo ThinkPad X1" />
                                    <option value="Asus ROG Zephyrus" />
                                    <option value="Acer Aspire 7" />
                                    <option value="Canon LBP 2900" />
                                    <option value="Epson L3150" />
                                    <option value="iPhone 14 Pro" />
                                    <option value="Samsung Galaxy S23" />
                                </datalist>
                                <small className="text-muted">Gõ vài ký tự để hiện gợi ý model phổ biến</small>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-4">
                                <label className="form-label fw-bold">Thương hiệu</label>
                                <div className="d-flex flex-wrap gap-2 mb-2">
                                    {brands.map((brand) => (
                                        <Button
                                            key={brand}
                                            variant={selectedBrand === brand ? "contained" : "outlined"}
                                            onClick={() => {
                                                setSelectedBrand(brand);
                                                setCustomBrand("");
                                            }}
                                            sx={{ minWidth: "100px", borderRadius: "5px" }}
                                        >
                                            {brand}
                                        </Button>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Hoặc nhập thương hiệu khác..."
                                    value={customBrand}
                                    onChange={(e) => {
                                        setCustomBrand(e.target.value);
                                        setSelectedBrand("");
                                    }}
                                />
                                <small className="text-muted d-block mt-2">
                                    Chọn thương hiệu phổ biến hoặc nhập thủ công nếu không có trong danh sách
                                </small>
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-bold">Ảnh sự cố</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={(e) => setIssueImage(e.target.files[0])}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-bold">Mô tả sự cố</label>
                        <textarea
                            className="form-control"
                            rows={3}
                            placeholder="Mô tả sự cố..."
                            value={issueDescription}
                            onChange={(e) => setIssueDescription(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-between">
                        <Button
                            className="rounded-pill"
                            variant="outlined"
                            sx={{ minWidth: "120px", borderRadius: "5px" }}
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate(-1, { state: bookingData })}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            className="rounded-pill"
                            variant="contained"
                            sx={{ minWidth: "120px", borderRadius: "5px", backgroundColor: "#2196f3" }}
                            endIcon={<ArrowForwardIcon />}
                        >
                            Tiếp theo
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BookingCreateStep1;