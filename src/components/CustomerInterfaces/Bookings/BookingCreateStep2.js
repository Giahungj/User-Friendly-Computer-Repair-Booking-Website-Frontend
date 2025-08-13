import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import { createRepairBooking } from '../../../services/RepairBookingService';

const getImagePreview = (image) => {
    if (!image) return null;
    return image instanceof File ? URL.createObjectURL(image) : image;
};

function BookingCreateStep2() {
    const location = useLocation();
    const navigate = useNavigate();
    const bookingData = location.state;

    // Khởi tạo state từ bookingData
    const issueDescription = useState(bookingData?.issueDescription || '');
    const deviceType = useState(bookingData?.deviceType || '');
    const model = useState(bookingData?.model || '');
    const brand = useState(bookingData?.brand || '');
    const issueImage = useState(bookingData?.issueImage || null);

    const workSchedule = useState(bookingData?.workSchedule || null);
    const customer = useState(bookingData?.customer || null);
    console.log("BookingCreateStep2 - bookingData:", bookingData);
    const [loading, setLoading] = useState(!bookingData);
    const [error, setError] = useState(false);

    if (!bookingData) {
        navigate('/dat-lich/tao-buoc-1');
        return;
    }

    const shiftLabel = {
        1: 'Ca sáng (7:00 - 11:00)',
        2: 'Ca chiều (13:00 - 17:00)'
    }[workSchedule.shift] || workSchedule.shift;

    const formattedDate = workSchedule.work_date
        ? new Date(workSchedule.work_date).toLocaleDateString('vi-VN')
        : '';


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!deviceType || !brand || !model || !issueDescription) {
            toast.warn("Vui lòng điền đầy đủ thông tin thiết bị và sự cố.");
            return;
        }
        if (!workSchedule?.work_schedule_id || !customer?.customer_id) {
            toast.error("Thiếu thông tin lịch làm việc hoặc khách hàng.");
            return;
        }
        setLoading(true);
        const bookingDataToSubmit = {
            issueDescription,
            deviceType,
            model,
            brand,
            issueImage,
            workScheduleId: workSchedule.work_schedule_id,
            customerId: customer?.customer_id || bookingData?.customer?.customer_id || null,
            bookingDate: new Date().toISOString().split('T')[0],   // yyyy-mm-dd
            bookingTime: new Date().toTimeString().split(' ')[0],  // HH:mm:ss
        };

        try {
            const res = await createRepairBooking(bookingDataToSubmit);
            setTimeout(() => {
                if (res.EC === 0) {
                    toast.success("Tạo đơn thành công!");
                    navigate(`/dat-lich/${res.DT}/thong-tin/chi-tiet`);
                } else {
                    toast.error(res.EM || "Tạo đơn thất bại. Vui lòng thử lại.");
                }setLoading(false);
            }, 1000);
        } catch (error) {
            toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        } 
    };

    return (
        <div className="container py-5 fs-7">
            <div className="card shadow-sm border-0 p-3 mb-4" style={{ maxWidth: "90em", margin: "0 auto" }}>
                <div className="card-header border-0 rounded text-white text-center" style={{ backgroundColor: "#2196f3" }}>
                    <h4 className="lead mt-2 mb-2">Đặt Lịch Sửa Chữa</h4>
                    <h3 className="mb-2">Xác nhận thông tin thiết bị</h3>
                </div>
                <form className="p-4" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-4">
                                <label className="form-label fw-bold">Loại thiết bị</label>
                                <input type="text" className="form-control" value={deviceType} disabled />
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-bold">Hãng</label>
                                <input type="text" className="form-control" value={brand} disabled />
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-bold">Model</label>
                                <input type="text" className="form-control" value={model} disabled />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-4">
                                <label className="form-label fw-bold">Hình ảnh mô tả lỗi</label>
                                {issueImage ? (
                                    <div className="card border p-2 bg-light">
                                        <img
                                        src={getImagePreview(issueImage)}
                                        alt="Mô tả lỗi"
                                        className="img-fluid rounded mb-2"
                                        style={{
                                            maxHeight: "180px",
                                            maxWidth: "100%",
                                            objectFit: "contain",
                                            backgroundColor: "#fff"
                                        }}
                                    />
                                        <div className="text-center text-truncate small text-muted">
                                            {issueImage.name}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="card border-0 shadow-sm p-2 bg-light text-center text-muted">
                                        <span>Không có hình ảnh</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-bold">Mô tả sự cố</label>
                        <textarea className="form-control" rows={3} value={issueDescription} disabled></textarea>
                    </div>

                    <div className="row mb-3">
                        {/* Thông tin khách hàng */}
                        <div className="col-md-6 mb-4">
                            <div className="card border p-2 h-100">
                                <h6 className="lead border-bottom pb-2 mb-3">Thông tin khách hàng</h6>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Tên khách hàng</label>
                                    <input
                                        type="text"
                                        className={`form-control ${!customer?.User?.name ? 'border border-danger-subtle' : ''}`}
                                        value={customer?.User?.name || ''}
                                        disabled
                                    />
                                    {!customer?.User?.name && (
                                        <small className="text-danger">
                                            Tên chưa được cập nhật. Vui lòng vào trang hồ sơ để bổ sung.
                                        </small>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Email khách hàng</label>
                                    <input
                                        type="text"
                                        className={`form-control ${!customer?.User?.email ? 'border border-danger-subtle' : ''}`}
                                        value={customer?.User?.email || ''}
                                        disabled
                                    />
                                    {!customer?.User?.email && (
                                        <small className="text-danger">
                                            Email chưa được cập nhật. Vui lòng vào trang hồ sơ để bổ sung.
                                        </small>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Số điện thoại khách hàng</label>
                                    <input
                                        type="text"
                                        className={`form-control ${!customer?.User?.phone ? 'border border-danger-subtle' : ''}`}
                                        value={customer?.User?.phone || ''}
                                        disabled
                                    />
                                    {!customer?.User?.phone && (
                                        <small className="text-danger">
                                            Số điện thoại chưa được cập nhật. Vui lòng vào trang hồ sơ để bổ sung.
                                        </small>
                                    )}
                                </div>

                            </div>
                        </div>

                        {/* Thông tin kỹ thuật viên */}
                        <div className="col-md-6 mb-4">
                            <div className="card border p-2 h-100">
                                <h6 className="lead border-bottom pb-2 mb-3">Thông tin kỹ thuật viên</h6>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Ngày làm việc</label>
                                    <input type="text" className="form-control" value={formattedDate} disabled />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Ca làm việc</label>
                                    <input type="text" className="form-control" value={shiftLabel} disabled />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Tên kỹ thuật viên</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={workSchedule.Technician?.User?.name || ''}
                                        disabled
                                    />
                                    {workSchedule.Technician?.User && (
                                        <div className="d-flex align-items-center gap-3 mt-3 p-2 border rounded bg-light">
                                            <img
                                                src={`http://localhost:8080/images/${workSchedule.Technician.User.avatar}`}
                                                alt="Avatar"
                                                className="rounded-circle"
                                                style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                            />
                                            <div className="d-flex flex-column">
                                                <span className="fw-bold">{workSchedule.Technician.User.name}</span>
                                                <span className="text-muted">{workSchedule.Technician.User.email}</span>
                                                <span className="text-muted">{workSchedule.Technician.User.phone}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Thông tin cửa hàng */}
                        <div className="col-12">
                            <div className="card border p-2">
                                <h6 className="lead border-bottom pb-2 mb-3">Thông tin cửa hàng</h6>

                                {/* Hình ảnh cửa hàng */}
                                {workSchedule.Technician?.Store?.image && (
                                    <div className="text-center mb-3">
                                        <img
                                            src={`http://localhost:8080/images/${workSchedule.Technician.Store.image}`}
                                            alt="Hình cửa hàng"
                                            className="img-fluid rounded shadow-sm"
                                            style={{ maxHeight: "200px", objectFit: "cover" }}
                                        />
                                    </div>
                                )}

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Tên cửa hàng</label>
                                    <input type="text" className="form-control" value={workSchedule.Technician?.Store?.name || ''} disabled />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Địa chỉ cửa hàng</label>
                                    <input type="text" className="form-control" value={workSchedule.Technician?.Store?.address || ''} disabled />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between">
                        <Button
                            className="rounded-pill"
                            variant="outlined"
                            sx={{ minWidth: "120px" }}
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate(`/dat-lich/${workSchedule.work_schedule_id}/tao-lich`, { state: bookingData })}
                        >
                            Thay đổi thông tin
                        </Button>
                        <Button
                            type="submit"
                            className="rounded-pill"
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{ minWidth: "120px", backgroundColor: "#2196f3" }}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="spinner-border spinner-border-sm text-light" role="status"></span>
                            ) : (
                                "Xác nhận"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BookingCreateStep2;