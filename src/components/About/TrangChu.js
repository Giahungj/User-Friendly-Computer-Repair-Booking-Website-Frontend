import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFeaturedDoctors } from "../../services/doctorService";
import { getSpecialties } from "../../services/specialtySevice";
import { fetchFacilities } from "../../services/FacilityService";
import Avatar from '@mui/material/Avatar';
import BannerCarousel from "./BannerCarousel ";
import { Card, CardContent, Grid, Typography, Box, Button } from '@mui/material';

const TrangChu = () => {
    const [doctors, setDoctors] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const doctorsResponse = await fetchFeaturedDoctors();
                if (doctorsResponse && doctorsResponse.EC === 0) {
                    setDoctors(doctorsResponse.DT);
                } else {
                    console.error("Error fetching featured doctors:", doctorsResponse ? doctorsResponse.EM : "Unknown error");
                }

                const specialtiesResponse = await getSpecialties();
                if (specialtiesResponse && specialtiesResponse.EC === 0) {
                    setSpecialties(specialtiesResponse.DT.specialties);
                } else {
                    console.error("Error fetching specialties:", specialtiesResponse ? specialtiesResponse.EM : "Unknown error");
                }

                const facilitiesResponse = await fetchFacilities();
                if (facilitiesResponse && facilitiesResponse.EC === 0) {
                    setFacilities(facilitiesResponse.DT);
                } else {
                    console.error("Error fetching facilities:", facilitiesResponse ? facilitiesResponse.EM : "Unknown error");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchFeatured();
    }, []);

    const handleViewDoctorDetail = (id) => {
        navigate(`/doctors/${id}`);
    };

    const handleViewSpecialtyDetail = (id) => {
        navigate(`/specialties/${id}`);
    };

    const handleViewFacilityDetail = (id) => {
        navigate(`/facilities/${id}`);
    };

    return (
        <div className="container">
            {/* Banner cuộn ngang */}
            <div className="mb-5 pb-5 border-bottom">
                <BannerCarousel />
            </div>

            {/* Cụm Bác sĩ Nổi bật */}
            <div className="mb-4 pb-5 border-bottom">
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

            {/* Cụm Chuyên khoa */}
            <div className="mb-4 pb-5 border-bottom">
                <Typography variant="h5" gutterBottom className="text-center mb-3">
                    Chuyên khoa
                </Typography>
                <Grid container spacing={3}>
                    {specialties.map((specialty) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={specialty.id}>
                            <Card
                                onClick={() => handleViewSpecialtyDetail(specialty.id)}
                                className="shadow-sm specialty-card"
                                style={{ cursor: 'pointer', height: '100%', transition: 'transform 0.3s ease-in-out' }}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                            >
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                                    <div className="avatar-wrapper">
                                        <Avatar
                                            alt={specialty.name}
                                            src={
                                                specialty.image
                                                    ? `http://localhost:8080/${specialty.image}`
                                                    : '/default-avatar.jpg'
                                            }
                                            sx={{ width: 100, height: 100, mb: 2, border: '2px solid #f0f0f0' }}
                                            className="doctor-avatar"
                                        />
                                    </div>
                                    <Typography variant="h6" component="div" align="center" className="text-primary mb-1">
                                        {specialty.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box mt={3} display="flex" justifyContent="center">
                    <Button variant="outlined" color="success" onClick={() => navigate(`/specialties`)}>
                        Xem thêm chuyên khoa
                    </Button>
                </Box>
            </div>

            {/* Cụm Phòng khám */}
            <div className="mb-4 pb-5">
                <Typography variant="h5" gutterBottom className="text-center mb-3">
                    Phòng khám
                </Typography>
                <Grid container spacing={3}>
                    {facilities.map((facility) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={facility.id}>
                            <Card
                                onClick={() => handleViewFacilityDetail(facility.id)}
                                className="shadow-sm doctor-card"
                                style={{ cursor: 'pointer', height: '100%', transition: 'transform 0.3s ease-in-out' }}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                            >
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                                    <div className="avatar-wrapper">
                                        <Avatar
                                            alt={facility.name}
                                            src={
                                                facility.mainImage
                                                    ? `http://localhost:8080/images/uploads/${facility.mainImage}`
                                                    : '/default-avatar.jpg'
                                            }
                                            sx={{ width: 100, height: 100, mb: 2, border: '2px solid #f0f0f0' }}
                                            className="doctor-avatar"
                                        />
                                    </div>
                                    <Typography variant="h6" component="div" align="center" className="text-primary mb-1">
                                        {facility.name}
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary" align="center" className="mb-2">
                                        <span className="fw-bold">Địa chỉ:</span> {facility.address}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" align="center">
                                        <span className="fw-bold">Điện thoại:</span> {facility.phone}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box mt={3} display="flex" justifyContent="center">
                    <Button variant="outlined" color="info" onClick={() => navigate(`/facilities`)}>
                        Xem thêm phòng khám
                    </Button>
                </Box>
            </div>
        </div>
    );
};

export default TrangChu;