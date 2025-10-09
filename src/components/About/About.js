import React from "react";

const About = () => {
	return (
		<div className="container py-5">
			{/* Giới thiệu chung */}
			<h2 className="text-center fw-bold text-primary mb-3">Giới Thiệu Về Chúng Tôi</h2>
			<p className="text-center text-muted mb-5">
				Chúng tôi là đơn vị hàng đầu cung cấp dịch vụ sửa chữa và bảo trì máy tính, laptop, máy in và điện thoại
				với đội ngũ kỹ thuật viên chuyên nghiệp, công nghệ tiên tiến và cam kết mang đến trải nghiệm dịch vụ nhanh chóng, đáng tin cậy.
				Với sứ mệnh giúp khách hàng tối ưu hóa hiệu suất thiết bị, chúng tôi luôn đặt sự hài lòng của bạn lên hàng đầu.
			</p>

			{/* Sứ mệnh & tầm nhìn */}
			<div className="row align-items-center mb-5">
				<div className="col-md-6">
					<h4 className="fw-semibold text-secondary">Sứ Mệnh & Tầm Nhìn</h4>
					<p className="text-muted">
						Sứ mệnh của chúng tôi là cung cấp các giải pháp sửa chữa công nghệ toàn diện, từ khắc phục sự cố phần cứng
						đến tối ưu hóa phần mềm, giúp khách hàng tiết kiệm thời gian và chi phí. Chúng tôi hướng tới việc trở thành
						trung tâm sửa chữa công nghệ đáng tin cậy nhất, mang lại sự tiện lợi thông qua quy trình đặt lịch trực tuyến
						nhanh chóng, đội ngũ kỹ thuật viên được đào tạo bài bản, và dịch vụ hậu mãi tận tâm. Tầm nhìn của chúng tôi
						là xây dựng một hệ sinh thái công nghệ hỗ trợ mọi thiết bị điện tử, từ laptop, PC đến điện thoại, đảm bảo
						hiệu suất tối ưu và độ bền lâu dài.
					</p>
				</div>
				<div className="col-md-6 text-center">
					<img src="/images/uploads/trung-tam.jpg" alt="Sứ mệnh" className="img-fluid rounded shadow" />
				</div>
			</div>

			{/* Đội ngũ kỹ thuật viên */}
			<div className="row align-items-center mb-5 flex-md-row-reverse">
				<div className="col-md-6">
					<h4 className="fw-semibold text-secondary">Đội Ngũ Kỹ Thuật Viên</h4>
					<p className="text-muted">
						Đội ngũ kỹ thuật viên của chúng tôi được tuyển chọn kỹ lưỡng, sở hữu nhiều năm kinh nghiệm trong việc xử lý các sự cố công nghệ
						phức tạp như lỗi phần cứng, nâng cấp thiết bị, vệ sinh máy móc, và khôi phục dữ liệu. Mỗi kỹ thuật viên đều được đào tạo chuyên sâu
						về các dòng laptop, PC, máy in và điện thoại từ các thương hiệu lớn như Dell, HP, Lenovo, Apple, Samsung, và hơn thế nữa. 
						Chúng tôi cam kết mang đến dịch vụ sửa chữa chính xác, nhanh chóng và minh bạch, đảm bảo thiết bị của bạn hoạt động như mới sau mỗi lần sửa chữa.
					</p>
				</div>
				<div className="col-md-6 text-center">
					<img src="/images/uploads/cua-hang.webp" alt="Đội ngũ kỹ thuật viên" className="img-fluid rounded shadow" />
				</div>
			</div>

			{/* Dịch vụ nổi bật */}
			<h4 className="text-center mb-4 text-primary">Dịch Vụ Nổi Bật</h4>
			<div className="row g-4 justify-content-center">
				<div className="col-12 col-sm-6 col-md-3">
					<div className="card text-center h-100 shadow-sm border-0" style={{ backgroundColor: '#e3f2fd', transition: 'transform 0.3s' }}>
						<div className="card-body">
							<i className="fas fa-calendar-check fa-2x mb-3 text-primary"></i>
							<h6 className="text-primary">Đặt Lịch Sửa Chữa</h6>
							<p className="text-muted small">
								Đặt lịch sửa chữa nhanh chóng qua hệ thống trực tuyến, chọn thời gian và kỹ thuật viên phù hợp.
							</p>
						</div>
					</div>
				</div>
				<div className="col-12 col-sm-6 col-md-3">
					<div className="card text-center h-100 shadow-sm border-0" style={{ backgroundColor: '#e3f2fd', transition: 'transform 0.3s' }}>
						<div className="card-body">
							<i className="fas fa-tools fa-2x mb-3 text-primary"></i>
							<h6 className="text-primary">Sửa Chữa Tận Nơi</h6>
							<p className="text-muted small">
								Sửa chữa tại nhà hoặc văn phòng, tiết kiệm thời gian với chất lượng tối ưu.
							</p>
						</div>
					</div>
				</div>
				<div className="col-12 col-sm-6 col-md-3">
					<div className="card text-center h-100 shadow-sm border-0" style={{ backgroundColor: '#e3f2fd', transition: 'transform 0.3s' }}>
						<div className="card-body">
							<i className="fas fa-laptop-code fa-2x mb-3 text-primary"></i>
							<h6 className="text-primary">Nâng Cấp Thiết Bị</h6>
							<p className="text-muted small">
								Nâng cấp RAM, SSD, card đồ họa và tối ưu phần mềm cho hiệu suất tối đa.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Liên hệ */}
			<div className="text-center mt-5">
				<h5 className="fw-semibold text-secondary">Liên Hệ Với Chúng Tôi</h5>
				<p className="text-muted">
					Hotline: <span className="fw-bold text-danger">1800-5678</span> | Email: support@techrepair.com
				</p>
                <a
                    href="http://localhost:3000/ky-thuat-vien/tat-ca"
                    className="btn btn-primary mt-3"
                >
                    Gửi Yêu Cầu Sửa Chữa
                </a>
			</div>
		</div>
	);
};

export default About;
