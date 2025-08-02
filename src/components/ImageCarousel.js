import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';

const images = [
    { src: 'https://kimmarcom.com/wp-content/uploads/2024/03/samsung-tiger-in-the-city-1692609922.png', title: 'Chào mừng đến với TechFix', desc: 'Chuyên cung cấp dịch vụ sửa chữa laptop nhanh chóng, uy tín, chuyên nghiệp.' },
    { src: 'https://file.hstatic.net/1000323386/file/-phu-hop-cho-quang-cao-noi-dong-nguoi_1e99a0faca984485b6a53f570f67a805.jpg', title: 'Dịch vụ tận nơi', desc: 'TechFix hỗ trợ sửa chữa tận nhà, tiết kiệm thời gian cho bạn.' },
    { src: 'https://plus.vtc.edu.vn/wp-content/uploads/2022/12/Blog-3D-Billboard-3-1.jpg', title: 'Kỹ thuật viên chuyên nghiệp', desc: 'Đội ngũ tay nghề cao, cam kết chất lượng phục vụ.' }
];

const ImageCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Box className="my-5 position-relative" sx={{ maxWidth: '1000px', margin: 'auto', overflow: 'hidden' }}>
            <Box
                component="img"
                src={images[currentIndex].src}
                alt={images[currentIndex].title}
                sx={{
                    width: '100%',
                    height: '500px',
                    objectFit: 'cover',
                    borderRadius: 2,
                    display: 'block',
                    margin: '0 auto'
                }}
            />
            <Box className="text-center mt-3">
                <h2 className="fw-bold mb-2">{images[currentIndex].title}</h2>
                <p>{images[currentIndex].desc}</p>
            </Box>

            <Box className="position-absolute top-50 start-0 translate-middle-y">
                <Button onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)}>
                    &lt;
                </Button>
            </Box>
            <Box className="position-absolute top-50 end-0 translate-middle-y">
                <Button onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}>
                    &gt;
                </Button>
            </Box>
        </Box>
    );
};

export default ImageCarousel;
