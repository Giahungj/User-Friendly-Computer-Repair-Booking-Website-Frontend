import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box, Rating } from '@mui/joy';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Dữ liệu tĩnh
const demoService = {
    id: "1",
    name: "Chuyên gia tâm lý Cao Kim Thảm",
    specialty: "Tâm lý, Tham vấn tâm lý",
    rating: 4.9,
    ratingCount: 5,
    store: {
        name: "Trung tâm Tâm lý liệu NHC Việt Nam",
        address: "chi nhánh Phan Chu Trinh, Hồ Chí Minh",
    },
    image: "https://via.placeholder.com/100", // Thay bằng ảnh thực tế
    };

    const TestCardServiceComponent = () => {
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate(`/services/${demoService.id}/booking`);
    };

    return (
       <Card
            variant="outlined"
            sx={{
                width: 300,
                height: 555,
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                overflow: 'hidden',
                borderColor: '#ffffff',
                transition: 'all 0.2s ease',
                '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                borderColor: '#81d4fa', // Màu xanh nhẹ khi hover
                },
            }}
            >
            <Box
                sx={{
                width: '100%',
                height: 128,
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                }}
            >
                <img
                src={demoService.image}
                alt={demoService.name}
                style={{
                    width: 100,
                    height: 100,
                    objectFit: 'cover',
                    borderRadius: '50%',
                    border: '4px solid #fff',
                }}
                />
            </Box>

            {/* Thông tin chính */}
            <CardContent sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
               <Typography level="h6" sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center', mb: 0.5 }}>
                    {demoService.name}
                </Typography>
                <Typography level="body2" sx={{ color: '#666', textAlign: 'center', mb: 0.5 }}>
                    {demoService.specialty}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 0.5 }}>
                    <StarIcon sx={{ fontSize: 16, color: '#FFD700' }} />
                    <Typography level="body2" sx={{ fontWeight: 'medium', color: '#333' }}>
                        {demoService.rating}/5
                    </Typography>
                    <Typography level="body2" sx={{ color: '#666' }}>
                        ({demoService.ratingCount} lượt)
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <LocationOnIcon sx={{ fontSize: 16, color: '#666' }} />
                    <Typography level="body2" sx={{ color: '#666', flexGrow: 1 }}>
                        {demoService.store.name} - {demoService.store.address}
                    </Typography>
                </Box>
                <Button
                    variant="solid"
                    color="primary"
                    size="md"
                    onClick={handleBookNow}
                    sx={{
                        mt: 'auto',
                        my: 1,
                        borderRadius: '8px',
                        bgcolor: '#007BFF',
                        '&:hover': { bgcolor: '#0056b3' },
                        fontWeight: 'bold',
                        width: '100%',
                    }}
                >
                Đặt lịch dịch vụ
                </Button>
            </CardContent>
        </Card>
    );
};

export default TestCardServiceComponent;