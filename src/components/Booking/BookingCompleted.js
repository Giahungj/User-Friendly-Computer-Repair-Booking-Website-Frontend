import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function BookingCompleted() {
    const location = useLocation();
    const navigate = useNavigate();
    const bookingData = location.state;

    if (!bookingData) {
        navigate('/booking/create');
        return null;
    }

    const handleConfirm = () => {
        console.log('Xác nhận dữ liệu:', bookingData);
        // TODO: Gửi dữ liệu lên server tại đây nếu cần
    };

    return (
        <div className="container py-5 fs-7">
            <div className="card shadow-sm" style={{ maxWidth: "700px", margin: "0 auto" }}>
                <div className="card-header bg-success text-white text-center">
                    <h4 className="mb-0">Đặt Lịch Thành Công</h4>
                </div>
                <div className="card-body">
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
                        <strong>Hình ảnh/Video:</strong>
                        {bookingData.media?.length > 0 ? (
                            <div className="mt-2 d-flex flex-wrap gap-2">
                                {bookingData.media.map((file, idx) => (
                                    <div key={idx}>
                                        {file.type?.startsWith('image') ? (
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt="preview"
                                                style={{
                                                    width: 100,
                                                    height: 100,
                                                    objectFit: 'cover',
                                                    borderRadius: 8,
                                                    border: '1px solid #ccc',
                                                }}
                                            />
                                        ) : (
                                            <video
                                                src={URL.createObjectURL(file)}
                                                controls
                                                style={{
                                                    width: 120,
                                                    borderRadius: 8,
                                                    border: '1px solid #ccc',
                                                }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="mt-1 text-muted fst-italic">Không có tệp đính kèm</p>
                        )}
                    </div>

                    <div className="mb-3">
                        <strong>Ngày đặt lịch:</strong>
                        <p className="mt-1 text-muted">{bookingData.bookingDate}</p>
                    </div>

                    <div className="mb-3">
                        <strong>Thời gian:</strong>
                        <p className="mt-1 text-muted">{bookingData.bookingTime}</p>
                    </div>

                    <div className="mb-3">
                        <strong>Chi phí dự kiến:</strong>
                        <p className="mt-1 text-danger fw-bold">
                            {Number(bookingData.estimatedCost).toLocaleString('vi-VN')} VNĐ
                        </p>
                    </div>

                    <div className="mb-3">
                        <strong>Ngày tạo đơn:</strong>
                        <p className="mt-1 text-muted">
                            {new Date(bookingData.createdAt).toLocaleString('vi-VN')}
                        </p>
                    </div>

                    <Button
                        variant="outlined"
                        onClick={() => navigate('/')}
                        sx={{
                            width: '100%',
                            fontWeight: 'bold',
                            borderRadius: '5px',
                        }}
                    >
                        Quay về trang chủ
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default BookingCompleted;
