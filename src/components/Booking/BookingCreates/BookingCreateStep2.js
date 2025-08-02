import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';

function BookingCreateStep2() {
    const location = useLocation();
    const navigate = useNavigate();
    const bookingData = location.state;

    const [deviceType, setDeviceType] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [images, setImages] = useState([]);

    if (!bookingData) {
        navigate('/dat-lich/tao-lich');
        return null;
    }

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const imageUrls = files.map((file) => URL.createObjectURL(file));
        setImages((prev) => [...prev, ...imageUrls]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const deviceInfo = {
            deviceType: deviceType,
            brand,
            model,
            images,
        };

        if (!deviceType || !brand || !model) {
            alert('Vui lòng điền đầy đủ thông tin thiết bị.');
            return;
        }

        navigate('/booking/confirm', { state: { ...bookingData, ...deviceInfo } });
    };

    return (
        <div className="container py-5 fs-7">
            <div className="card shadow-sm" style={{ maxWidth: "700px", margin: "0 auto" }}>
                <div className="card-header text-white text-center" style={{ backgroundColor: '#039be5' }}>
                    <h4 className="mb-0">Đặt Lịch Sửa Chữa</h4>
                    <h5 className="mb-0">Bước 2: Thông tin thiết bị</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Loại thiết bị</label>
                                    <div className="d-flex flex-wrap gap-2">
                                        {['Laptop', 'PC'].map((type) => (
                                            <div
                                                key={type}
                                                onClick={() => setDeviceType(type)}
                                                style={{
                                                    padding: '10px 15px',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    backgroundColor: deviceType === type ? '#1976d2' : '#fff',
                                                    color: deviceType === type ? '#fff' : '#000',
                                                    borderColor: deviceType === type ? '#1976d2' : '#ccc',
                                                    transition: 'all 0.2s ease',
                                                }}
                                            >
                                                {type}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Hãng</label>
                                    <div className="d-flex flex-wrap gap-2">
                                        {['Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'Apple', 'MSI'].map((item) => (
                                            <div
                                                key={item}
                                                onClick={() => setBrand(item)}
                                                style={{
                                                    padding: '10px 15px',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    backgroundColor: brand === item ? '#1976d2' : '#fff',
                                                    color: brand === item ? '#fff' : '#000',
                                                    borderColor: brand === item ? '#1976d2' : '#ccc',
                                                    transition: 'all 0.2s ease',
                                                }}
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Model</label>
                                    <div className="d-flex flex-wrap gap-2">
                                        {[
                                            { value: 'XPS 13', label: 'Dell XPS 13 (Intel Core i7-1255U, 16GB RAM, Intel Iris Xe Graphics)' },
                                            { value: 'Pavilion 15', label: 'HP Pavilion 15 (AMD Ryzen 5 5600U, 16GB RAM, AMD Radeon Graphics)' },
                                            { value: 'ThinkPad X1', label: 'Lenovo ThinkPad X1 Carbon (Intel Core i7-1260P, 16GB RAM, Intel Iris Xe Graphics)' },
                                            { value: 'ZenBook 14', label: 'Asus ZenBook 14 (AMD Ryzen 9 5900HX, 16GB RAM, AMD Radeon Vega 7 Graphics)' },
                                            { value: 'Aspire 5', label: 'Acer Aspire 5 (Intel Core i5-1135G7, 20GB RAM, Intel Iris Xe Graphics)' },
                                            { value: 'MacBook Pro', label: 'Apple MacBook Pro 14 (M1 Pro, 16GB RAM, 10-core GPU)' },
                                            { value: 'GS65', label: 'MSI GS65 Stealth (Intel Core i7-9750H, 16GB RAM, NVIDIA GeForce RTX 2060)' },
                                        ].map((item) => (
                                            <div
                                                key={item.value}
                                                onClick={() => setModel(item.value)}
                                                style={{
                                                    padding: '10px 15px',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    backgroundColor: model === item.value ? '#1976d2' : '#fff',
                                                    color: model === item.value ? '#fff' : '#000',
                                                    borderColor: model === item.value ? '#1976d2' : '#ccc',
                                                    transition: 'all 0.2s ease',
                                                }}
                                            >
                                                {item.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="images" className="form-label fw-bold">Hình ảnh mô tả lỗi</label>
                                    <input
                                        type="file"
                                        id="images"
                                        name="images"
                                        className="form-control"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageChange}
                                    />
                                    <div className="d-flex flex-wrap gap-2 mt-2">
                                        {images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt={`Mô tả lỗi ${index + 1}`}
                                                style={{
                                                    width: '100px',
                                                    height: '100px',
                                                    objectFit: 'cover',
                                                    borderRadius: '8px',
                                                    border: '1px solid #ccc',
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between">
                            <Button
                                variant="outlined"
                                onClick={() => navigate(-1)}
                                sx={{
                                    minWidth: '120px',
                                    borderRadius: '5px',
                                }}
                                startIcon={<ArrowBackIcon />}
                            >
                                Hủy
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    minWidth: '120px',
                                    borderRadius: '5px',
                                    backgroundColor: '#1976d2',
                                }}
                                endIcon={<ArrowForwardIcon />}
                            >
                                Xác nhận
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BookingCreateStep2;