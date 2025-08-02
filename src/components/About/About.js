import React from "react";
import { Container, Grid, Typography, Card, CardContent, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faLaptopCode, faTools } from "@fortawesome/free-solid-svg-icons";

const About = () => {
    return (
        <Container className="py-5">
            {/* Giới thiệu chung */}
            <Typography variant="h4" className="text-center fw-bold text-primary mb-3">
                Giới Thiệu Về Chúng Tôi
            </Typography>
            <Typography className="text-center text-muted mb-5">
                Chúng tôi là đơn vị hàng đầu cung cấp dịch vụ sửa chữa và bảo trì máy tính, laptop, máy in và điện thoại với đội ngũ kỹ thuật viên chuyên nghiệp, công nghệ tiên tiến và cam kết mang đến trải nghiệm dịch vụ nhanh chóng, đáng tin cậy. Với sứ mệnh giúp khách hàng tối ưu hóa hiệu suất thiết bị, chúng tôi luôn đặt sự hài lòng của bạn lên hàng đầu.
            </Typography>

            {/* Sứ mệnh & tầm nhìn */}
            <Grid container spacing={4} alignItems="center" className="mb-5">
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" className="fw-semibold text-secondary">
                        Sứ Mệnh & Tầm Nhìn
                    </Typography>
                    <Typography className="text-muted">
                        Sứ mệnh của chúng tôi là cung cấp các giải pháp sửa chữa công nghệ toàn diện, từ khắc phục sự cố phần cứng đến tối ưu hóa phần mềm, giúp khách hàng tiết kiệm thời gian và chi phí. Chúng tôi hướng tới việc trở thành trung tâm sửa chữa công nghệ đáng tin cậy nhất, mang lại sự tiện lợi thông qua quy trình đặt lịch trực tuyến nhanh chóng, đội ngũ kỹ thuật viên được đào tạo bài bản, và dịch vụ hậu mãi tận tâm. Tầm nhìn của chúng tôi là xây dựng một hệ sinh thái công nghệ hỗ trợ mọi thiết bị điện tử, từ laptop, PC đến điện thoại, đảm bảo hiệu suất tối ưu và độ bền lâu dài.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} className="text-center">
                    <img src="/images/uploads/pexels-olly-3881292.jpg" alt="Sứ mệnh" className="img-fluid rounded shadow" />
                </Grid>
            </Grid>

            {/* Đội ngũ kỹ thuật viên */}
            <Grid container spacing={4} alignItems="center" className="mb-5 flex-row-reverse">
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" className="fw-semibold text-secondary">
                        Đội Ngũ Kỹ Thuật Viên
                    </Typography>
                    <Typography className="text-muted">
                        Đội ngũ kỹ thuật viên của chúng tôi được tuyển chọn kỹ lưỡng, sở hữu nhiều năm kinh nghiệm trong việc xử lý các sự cố công nghệ phức tạp như lỗi phần cứng, nâng cấp thiết bị, vệ sinh máy móc, và khôi phục dữ liệu. Mỗi kỹ thuật viên đều được đào tạo chuyên sâu về các dòng laptop, PC, máy in và điện thoại từ các thương hiệu lớn như Dell, HP, Lenovo, Apple, Samsung, và hơn thế nữa. Chúng tôi cam kết mang đến dịch vụ sửa chữa chính xác, nhanh chóng và minh bạch, đảm bảo thiết bị của bạn hoạt động như mới sau mỗi lần sửa chữa.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} className="text-center">
                    <img src="/images/uploads/pexels-gustavo-fring-7446995.jpg" alt="Đội ngũ kỹ thuật viên" className="img-fluid rounded shadow" />
                </Grid>
            </Grid>

            {/* Đặt lịch sửa chữa */}
            <Typography variant="h5" className="text-center mb-4" sx={{ color: '#1976d2', fontSize: '1.5rem' }}>
                Dịch Vụ Nổi Bật
            </Typography>
            <Grid container spacing={3} justifyContent="center" sx={{ flexDirection: 'row' }}>
            <Grid item xs={12} sm={6} md={3}>
                <Card className="text-center" sx={{ backgroundColor: '#e3f2fd', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.03)' }, height: '100%' }}>
                    <CardContent sx={{ padding: '1.5rem' }}>
                        <FontAwesomeIcon icon={faCalendarCheck} size="2x" className="mb-3" style={{ color: '#1976d2' }} />
                        <Typography variant="h6" sx={{ color: '#1976d2', fontSize: '1.2rem' }}>
                            Đặt Lịch Sửa Chữa
                        </Typography>
                        <Typography sx={{ color: '#455a64', fontSize: '0.9rem' }}>
                            Đặt lịch sửa chữa nhanh chóng qua hệ thống trực tuyến, chọn thời gian và kỹ thuật viên phù hợp.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            {/* Sửa chữa tận nơi */}
            <Grid item xs={12} sm={6} md={3}>
                <Card className="text-center" sx={{ backgroundColor: '#e3f2fd', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.03)' }, height: '100%' }}>
                    <CardContent sx={{ padding: '1.5rem' }}>
                        <FontAwesomeIcon icon={faTools} size="2x" className="mb-3" style={{ color: '#1976d2' }} />
                        <Typography variant="h6" sx={{ color: '#1976d2', fontSize: '1.2rem' }}>
                            Sửa Chữa Tận Nơi
                        </Typography>
                        <Typography sx={{ color: '#455a64', fontSize: '0.9rem' }}>
                            Sửa chữa tại nhà hoặc văn phòng, tiết kiệm thời gian với chất lượng tối ưu.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            {/* Nâng cấp thiết bị */}
            <Grid item xs={12} sm={6} md={3}>
                <Card className="text-center" sx={{ backgroundColor: '#e3f2fd', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.03)' }, height: '100%' }}>
                    <CardContent sx={{ padding: '1.5rem' }}>
                        <FontAwesomeIcon icon={faLaptopCode} size="2x" className="mb-3" style={{ color: '#1976d2' }} />
                        <Typography variant="h6" sx={{ color: '#1976d2', fontSize: '1.2rem' }}>
                            Nâng Cấp Thiết Bị
                        </Typography>
                        <Typography sx={{ color: '#455a64', fontSize: '0.9rem' }}>
                            Nâng cấp RAM, SSD, card đồ họa và tối ưu phần mềm cho hiệu suất tối đa.
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
                    Hotline: <span className="fw-bold text-danger">1800-5678</span> | Email: support@techrepair.com
                </Typography>
                <Button variant="contained" sx={{ backgroundColor: '#1976d2'  }} className="mt-3">
                    Gửi Yêu Cầu Sửa Chữa
                </Button>
            </div>
        </Container>
    );
};

export default About;