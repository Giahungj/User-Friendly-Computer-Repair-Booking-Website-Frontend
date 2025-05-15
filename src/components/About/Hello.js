import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const AnimatedLogoPage = () => {
  return (
    <div style={{ backgroundColor: 'white', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 4,
            borderRadius: 8,
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Thay thế đoạn này bằng component logo của bạn */}
          <Typography
            variant="h2"
            component="div"
            sx={{
              color: '#ADD8E6', // Màu xanh nhạt
              fontWeight: 'bold',
              animation: 'rotateLogo 2s linear infinite', // Tên animation, thời gian, kiểu, lặp lại
            }}
          >
            Your Logo
          </Typography>
          {/* CSS Animation (có thể đặt trong file CSS riêng) */}
          <style>
            {`
              @keyframes rotateLogo {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(360deg);
                }
              }
            `}
          </style>
        </Box>
      </Container>
    </div>
  );
};

export default AnimatedLogoPage;