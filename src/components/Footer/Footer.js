import { Facebook, YouTube, Instagram, LocationOn, Phone, Email } from '@mui/icons-material';

const Footer = () => {
	return (
		<footer className="pt-5" style={{ backgroundColor: '#37474f' }}>
			<div className="container">
				<div className="row text-center text-md-start">
					{/* Giới thiệu */}
					<div className="col-md-4 mb-4">
						<h5 className="fw-bold text-white">Về chúng tôi</h5>
						<p className="text-light small">
							<strong>Trường Thịnh Group</strong> là nền tảng đặt lịch sửa chữa máy tính, laptop nhanh chóng, tiện lợi và chuyên nghiệp.
						</p>
					</div>

					{/* Liên kết */}
					<div className="col-md-4 mb-4">
						<h5 className="fw-bold text-white">Liên kết nhanh</h5>
						<ul className="list-unstyled small">
							<li><a href="/gioi-thieu/ve-chung-toi" className="text-decoration-none text-light">Giới thiệu</a></li>
							<li><a href="/chuyen-muc/tat-ca" className="text-decoration-none text-light">Dịch vụ</a></li>
							<li><a href="/ky-thuat-vien/danh-sach" className="text-decoration-none text-light">Kỹ thuật viên</a></li>
							<li><a href="/faq" className="text-decoration-none text-light">Câu hỏi thường gặp</a></li>
						</ul>
					</div>

					{/* Liên hệ */}
					<div className="col-md-4 mb-4">
						<h5 className="fw-bold text-white">Liên hệ</h5>
						<p className="small text-light mb-1">
							<LocationOn fontSize="small" /> 123 Đường ABC, Quận 1, TP.HCM
						</p>
						<p className="small text-light mb-1">
							<Phone fontSize="small" /> <a href="tel:+84123456789" className="text-decoration-none text-light">+84 123 456 789</a>
						</p>
						<p className="small text-light mb-2">
							<Email fontSize="small" /> <a href="mailto:contact@yourbrand.com" className="text-decoration-none text-light">contact@yourbrand.com</a>
						</p>
						{/* Mạng xã hội */}
						<div className="d-flex justify-content-center justify-content-md-start gap-3">
							<a href="#" className="text-light"><Facebook /></a>
							<a href="#" className="text-light"><YouTube /></a>
							<a href="#" className="text-light"><Instagram /></a>
						</div>
					</div>
				</div>

				{/* Bản quyền */}
				<hr />
				<p className="text-center text-light small mb-0 pb-3">
					© {new Date().getFullYear()} <strong>Trường Thịnh Group</strong>. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
