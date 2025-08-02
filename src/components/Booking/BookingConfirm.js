import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { confirmBooking } from '../../services/BookingService';

function BookingConfirm() {

	const location = useLocation();
    const navigate = useNavigate();
    const bookingData = location.state;

    if (!bookingData) {
        navigate('/booking/create');
        return null;
    }

	const handleConfirm = async() => {
        try {
            console.log('Xác nhận dữ liệu:', bookingData);
            const res = await confirmBooking(bookingData);
            if (res?.EC === 0) {
                navigate('/booking-completed');
            } else {
                alert(res?.EM || 'Đặt lịch thất bại!');
            }
        } catch (err) {
            console.error(err);
            alert('Có lỗi xảy ra khi đặt lịch.');
        }
	};

	return (
        <div className="container py-5 fs-7">
            <div className="card shadow-sm" style={{ maxWidth: "700px", margin: "0 auto" }}>
                <div className="card-header text-white text-center" style={{ backgroundColor: '#039be5' }}>
                    <h4 className="mb-0">Xác Nhận Thông Tin Đặt Lịch</h4>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            {bookingData.service?.length > 0 && (
                                <div className="mb-3">
                                    <strong>Dịch vụ yêu cầu:</strong>
                                    <ul className="mt-1 text-muted ps-3">
                                        {bookingData.service.map((s, idx) => (
                                            <li key={idx}>{s}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="mb-3">
                                <strong>Mô tả sự cố:</strong>
                                <p className="mt-1 text-muted">{bookingData.issueDescription}</p>
                            </div>

                            <div className="mb-3">
                                <strong>Chi phí dự kiến:</strong>
                                <p className="mt-1 text-danger fw-bold">
                                    {Number(bookingData.estimatedCost).toLocaleString('vi-VN')} VNĐ
                                </p>
                            </div>

                            <div className="mb-3">
                                <strong>Ngày đặt lịch:</strong>
                                <p className="mt-1 text-muted">{bookingData.bookingDate}</p>
                            </div>

                            <div className="mb-3">
                                <strong>Thời gian:</strong>
                                <p className="mt-1 text-muted">{bookingData.bookingTime}</p>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="mb-3">
                                <strong>Loại thiết bị:</strong>
                                <p className="mt-1 text-muted">{bookingData.deviceType}</p>
                            </div>
                            
                            <div className="mb-3">
                                <strong>Hãng:</strong>
                                <p className="mt-1 text-muted">{bookingData.brand}</p>
                            </div>
                            
                            <div className="mb-3">
                                <strong>Cấu hình:</strong>
                                <p className="mt-1 text-muted">{bookingData.model}</p>
                            </div>

                            <div className="mb-3">
                                <strong>Hình ảnh:</strong>
                                <div className="mt-2">
                                    <img
                                        src="https://benhviencongnghe88.vn/media/news/2807_maytinhelaubatkhonglennguon-1.png"
                                        alt="Mô tả sự cố"
                                        style={{ width: "100%", maxHeight: "180px", objectFit: "cover", borderRadius: "8px", border: "1px solid #ccc" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <Button
                        variant="contained"
                        onClick={handleConfirm}
                        sx={{
                            backgroundColor: '#039be5',
                            width: '100%',
                            fontWeight: 'bold',
                            borderRadius: '5px',
                        }}
                    >
                        Xác nhận đặt lịch
                    </Button>
                    
                    <Button
                        variant="outlined"
                        onClick={() => navigate(-1)}
                        sx={{
                            width: '100%',
                            borderRadius: '5px',
                            mt: 1,
                        }}
                    >
                        Quay lại
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default BookingConfirm;
