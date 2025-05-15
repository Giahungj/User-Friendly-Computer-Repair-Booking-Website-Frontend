import React from "react";
import { Container, Grid, Typography, Card, CardContent, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faVideo, faVial } from "@fortawesome/free-solid-svg-icons";

const About = () => {
    return (
        <Container className="py-5">
            {/* Giới thiệu chung */}
            <Typography variant="h4" className="text-center fw-bold text-primary mb-3">
                Giới Thiệu Về Chúng Tôi
            </Typography>
            <Typography className="text-center text-muted mb-5">
                Chúng tôi cung cấp dịch vụ y tế chất lượng cao với đội ngũ bác sĩ hàng đầu, công nghệ tiên tiến và dịch vụ tận tâm.
            </Typography>

            {/* Sứ mệnh & tầm nhìn */}
            <Grid container spacing={4} alignItems="center" className="mb-5">
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" className="fw-semibold text-secondary">
                        Sứ Mệnh & Tầm Nhìn
                    </Typography>
                    <Typography className="text-muted">
                        Chúng tôi cam kết mang đến dịch vụ y tế tốt nhất, giúp bệnh nhân tiếp cận với bác sĩ nhanh chóng, tiện lợi và an toàn.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} className="text-center">
                    <img src="/images/uploads/pexels-olly-3881292.jpg" alt="Sứ mệnh" className="img-fluid rounded shadow" />
                </Grid>
            </Grid>

            {/* Đội ngũ bác sĩ */}
            <Grid container spacing={4} alignItems="center" className="mb-5 flex-row-reverse">
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" className="fw-semibold text-secondary">
                        Đội Ngũ Y Bác Sĩ
                    </Typography>
                    <Typography className="text-muted">
                        Đội ngũ bác sĩ với nhiều năm kinh nghiệm, đào tạo chuyên sâu, tận tâm trong từng dịch vụ, mang lại sự an tâm tuyệt đối cho bệnh nhân.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} className="text-center">
                    <img src="/images/uploads/pexels-gustavo-fring-7446995.jpg" alt="Đội ngũ bác sĩ" className="img-fluid rounded shadow" />
                </Grid>
            </Grid>

            {/* Dịch vụ nổi bật */}
            <Typography variant="h5" className="text-center fw-semibold text-secondary mb-4">
                Dịch Vụ Nổi Bật
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                {/* Đặt lịch khám */}
                <Grid item xs={12} md={4}>
                    <Card className="text-center shadow-sm">
                        <CardContent>
                            <FontAwesomeIcon icon={faCalendarCheck} size="3x" className="text-primary mb-3" />
                            <Typography variant="h6" className="fw-bold text-primary">
                                Đặt lịch khám
                            </Typography>
                            <Typography className="text-muted">
                                Đặt lịch khám nhanh chóng, dễ dàng với bác sĩ phù hợp nhất.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Tư vấn trực tuyến */}
                <Grid item xs={12} md={4}>
                    <Card className="text-center shadow-sm">
                        <CardContent>
                            <FontAwesomeIcon icon={faVideo} size="3x" className="text-primary mb-3" />
                            <Typography variant="h6" className="fw-bold text-primary">
                                Tư vấn trực tuyến
                            </Typography>
                            <Typography className="text-muted">
                                Nhận tư vấn sức khỏe qua video call từ đội ngũ bác sĩ chuyên môn.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Xét nghiệm tại nhà */}
                <Grid item xs={12} md={4}>
                    <Card className="text-center shadow-sm">
                        <CardContent>
                            <FontAwesomeIcon icon={faVial} size="3x" className="text-primary mb-3" />
                            <Typography variant="h6" className="fw-bold text-primary">
                                Xét nghiệm tại nhà
                            </Typography>
                            <Typography className="text-muted">
                                Dịch vụ xét nghiệm tận nơi, tiện lợi, đảm bảo an toàn.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Liên hệ */}
            <div className="text-center mt-5">
                <Typography variant="h5" className="fw-semibold text-secondary">
                    Liên Hệ Với Chúng Tôi
                </Typography>
                <Typography className="text-muted">
                    Hotline: <span className="fw-bold text-danger">1800-1234</span> | Email: support@clinic.com
                </Typography>
                <Button variant="contained" color="primary" className="mt-3">
                    Gửi yêu cầu tư vấn
                </Button>
            </div>
        </Container>
    );
};

export default About;
