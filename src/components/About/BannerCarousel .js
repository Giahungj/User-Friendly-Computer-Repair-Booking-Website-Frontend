import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { blue } from '@mui/material/colors';

const BannerCarousel = () => {
    const [bannerImages, setBannerImages] = useState([
        "https://i.pinimg.com/736x/a5/5b/a0/a55ba01b3bee377bb2ee881009a6df01.jpg",
        "https://i.pinimg.com/736x/05/eb/7d/05eb7d78e4b7b32e54f49cffff5863bc.jpg",
        "https://i.pinimg.com/736x/0a/ff/46/0aff467970e5a33f232baead591bebc2.jpg",
        "https://i.pinimg.com/736x/3c/fe/4c/3cfe4c0855f0c872f35fdd3fc2f52722.jpg",
        "https://i.pinimg.com/736x/a1/ad/97/a1ad97588c3522b0a759361991b6a576.jpg",
        "https://i.pinimg.com/736x/3c/fe/4c/3cfe4c0855f0c872f35fdd3fc2f52722.jpg",
    ]);

    const carouselSettings = {
        autoPlay: true,
        navButtonsAlwaysVisible: bannerImages.length > 1, // Luôn hiển thị nút nếu có nhiều hơn 1 ảnh
        animation: "slide",
        interval: 3000,
        duration: 500,
        indicators: false,
        cycleNavigation: true,
        navButtonsProps: {
            style: {
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                color: '#fff',
                borderRadius: '50%',
                margin: '0 10px',
            },
        },
        style: {
            padding: '0', // Loại bỏ padding mặc định của carousel
            marginBottom: '20px',
            backgroundColor: 'transparent', // Để nền trong suốt nếu muốn
        }
    };

    const imageStyle = {
        width: '30em',       // Chiều rộng tự động dựa trên tỷ lệ khung hình
        maxWidth: '100%',    // Không vượt quá chiều rộng cha
        height: 'auto',      // Chiều cao tự động dựa trên tỷ lệ khung hình
        // maxHeight: '100%',   // Không vượt quá chiều cao cha
        objectFit: 'contain', // Đảm bảo toàn bộ hình ảnh hiển thị và không bị cắt
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    };

    const paperStyle = {
        position: 'relative',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center', // Căn giữa theo chiều ngang
        alignItems: 'center',    // Căn giữa theo chiều dọc
        overflow: 'hidden',
        backgroundColor: '#3d6d73', // Màu nền nhẹ
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        height: '42em', // Đặt một chiều cao cố định cho Paper để căn giữa dọc hoạt động
    };

    return (
        <Carousel {...carouselSettings}>
            {bannerImages.map((image, index) => (
                <Paper key={index} elevation={0} style={paperStyle}>
                    <img src={image} alt={`Banner ${index + 1}`} style={imageStyle} />
                    <h1 className='fw-bold ms-2 text-white text-center w-50 right-0'>Chào mừng bạn đến với trang web của chúng tôi!</h1>
                </Paper>
            ))}
        </Carousel>
    );
};

export default BannerCarousel;