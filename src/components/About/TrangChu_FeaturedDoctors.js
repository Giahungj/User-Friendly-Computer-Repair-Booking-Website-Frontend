import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFeaturedDoctors } from "../../services/doctorService";

import Avatar from '@mui/material/Avatar';
import { Card, CardContent, Grid, Typography, Box, Button, CircularProgress } from '@mui/material';

const FeaturedDoctors = () => {
	const navigate = useNavigate();
	const [doctors, setDoctors] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchFeatured = async () => {
			setLoading(true);
			setError(null);
			try {
				const doctorsResponse = await fetchFeaturedDoctors();
				if (doctorsResponse?.EC === 0) {
					setDoctors(doctorsResponse.DT);
				} else {
					throw new Error(doctorsResponse?.EM || 'Lỗi không xác định khi lấy danh sách bác sĩ');
				}
			} catch (err) {
				console.error("Lỗi khi lấy danh sách bác sĩ nổi bật:", err);
				setError(err.message);
			} finally {
				setLoading(true);
			}
		};

		fetchFeatured();
	}, []);

    const handleViewDoctorDetail = (id) => {
        navigate(`/doctors/${id}`);
    };

    if (loading) return 
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
            <CircularProgress size="lg" />
        </Box>

	if (error) return 
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
            <CircularProgress size="lg" />
        </Box>

    return <div className="mb-4 pb-5 border-bottom">
        <Typography variant="h5" gutterBottom className="text-center mb-3">
            Bác sĩ Nổi bật
        </Typography>
        <Grid container spacing={3}>
            {doctors.map((doctor) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={doctor.id}>
                    <Card
                        onClick={() => handleViewDoctorDetail(doctor.id)}
                        className="shadow-sm doctor-card"
                        style={{ cursor: 'pointer', height: '100%', transition: 'transform 0.3s ease-in-out' }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        >
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                            <div className="avatar-wrapper">
                                <Avatar
                                    alt={doctor.User.name}
                                    src={
                                        doctor.User.avatar
                                        ? `http://localhost:8080/images/uploads/${doctor.User.avatar}`
                                            : '/default-avatar.jpg'
                                    }
                                    sx={{ width: 100, height: 100, mb: 2, border: '2px solid #f0f0f0' }}
                                    className="doctor-avatar"
                                />
                            </div>
                            <Typography variant="h6" component="div" align="center" className="text-primary mb-1">
                                {doctor.User.name}
                            </Typography>
                            <Typography variant="h6" component="div" align="center" className="text-danger mb-1">
                                {doctor.price}
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary" align="center" className="mb-2">
                                <span className="fw-bold">Chuyên khoa:</span> {doctor.Specialty.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" align="center">
                                <span className="fw-bold">Phòng khám:</span> {doctor.Facility.name}
                            </Typography>
                            {doctor.averageScore !== undefined && (
                                <Typography variant="body2" color="text.secondary" align="center" className="mt-2">
                                    <span className="fw-bold">Đánh giá:</span> {doctor.averageScore.toFixed(1)} <span style={{ color: 'gold' }}>★</span>
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
        <Box mt={3} display="flex" justifyContent="center">
            <Button variant="outlined" color="primary" onClick={() => navigate(`/doctors`)}>
                Xem thêm bác sĩ
            </Button>
        </Box>
    </div>
};
export default FeaturedDoctors ;