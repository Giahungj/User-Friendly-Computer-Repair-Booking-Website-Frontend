import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFeaturedDoctors } from "../services/doctorService";
import { fetchSpecialties } from "../services/specialtySevice";
import { fetchFacilities } from "../services/FacilityService";
import Avatar from '@mui/material/Avatar';
import BannerCarousel from "./About/BannerCarousel ";
import { Card, CardContent, Grid, Typography, Box, Button } from '@mui/material';

const TestComponent = () => {
    const [doctors, setDoctors] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const navigate = useNavigate();
    const cardRefs = useRef([]);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const doctorsResponse = await fetchFeaturedDoctors();
                if (doctorsResponse && doctorsResponse.EC === 0) {
                    setDoctors(doctorsResponse.DT);
                } else {
                    console.error("Error fetching featured doctors:", doctorsResponse ? doctorsResponse.EM : "Unknown error");
                }

                const specialtiesResponse = await fetchSpecialties();
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

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('slide-in');
                        observer.unobserve(entry.target); // Ngừng theo dõi sau khi đã hiển thị
                    }
                });
            },
            {
                root: null, // Sử dụng viewport làm root
                rootMargin: '0px',
                threshold: 0.1, // Phần trăm element cần visible để callback được gọi
            }
        );

        cardRefs.current.forEach((card) => {
            if (card) {
                observer.observe(card);
            }
        });

        return () => {
            observer.disconnect(); // Cleanup observer khi component unmount
        };
    }, [doctors, specialties, facilities]); // Theo dõi khi dữ liệu được load

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
        <div className="container p-4">
            {/* Banner cuộn ngang */}
            <div className="mb-5 pb-5">
                <BannerCarousel />
            </div>

            {/* Cụm Bác sĩ Nổi bật */}
            <div className="mb-4 pb-5 border-bottom">
                <Typography variant="h5" gutterBottom className="text-center mb-3">
                    Bác sĩ Nổi bật
                </Typography>
                <Grid container spacing={3}>
                    {doctors.map((doctor, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={doctor.id} ref={(el) => (cardRefs.current[index] = el)}>
                            <Card
                                onClick={() => handleViewDoctorDetail(doctor.id)}
                                className="shadow-sm doctor-card"
                                style={{ cursor: 'pointer', height: '100%', transition: 'transform 0.3s ease-in-out, opacity 0.5s ease-out', opacity: 0, transform: 'translateY(20px)' }}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                            >
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                                    {/* Nội dung Card bác sĩ */}
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
                    {specialties.map((specialty, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={specialty.id} ref={(el) => (cardRefs.current[doctors.length + index] = el)}>
                            <Card
                                onClick={() => handleViewSpecialtyDetail(specialty.id)}
                                className="shadow-sm specialty-card"
                                style={{ cursor: 'pointer', height: '100%', transition: 'transform 0.3s ease-in-out, opacity 0.5s ease-out', opacity: 0, transform: 'translateY(20px)' }}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                            >
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                                    {/* Nội dung Card chuyên khoa */}
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
                    {facilities.map((facility, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={facility.id} ref={(el) => (cardRefs.current[doctors.length + specialties.length + index] = el)}>
                            <Card
                                onClick={() => handleViewFacilityDetail(facility.id)}
                                className="shadow-sm doctor-card"
                                style={{ cursor: 'pointer', height: '100%', transition: 'transform 0.3s ease-in-out, opacity 0.5s ease-out', opacity: 0, transform: 'translateY(20px)' }}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                            >
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                                    {/* Nội dung Card phòng khám */}
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

            {/* Định nghĩa CSS cho hiệu ứng slide-in */}
            <style>
                {`
                    .slide-in {
                        opacity: 1 !important;
                        transform: translateY(0) !important;
                    }
                `}
            </style>
        </div>
    );
};

export default TestComponent;