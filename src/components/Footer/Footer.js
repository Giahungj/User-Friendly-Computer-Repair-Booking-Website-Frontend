import { Facebook, YouTube, Instagram } from '@mui/icons-material';

const Footer = () => {
	return (
		<footer className="bg-light pt-5 mt-5 border-top">
			<div className="container">
				<div className="row text-center text-md-start">
					{/* Giới thiệu */}
					<div className="col-md-4 mb-4">
						<h5 className="fw-bold">Về chúng tôi</h5>
						<p className="text-muted small">
							<strong>Your Brand</strong> là nền tảng đặt lịch sửa chữa máy tính, laptop nhanh chóng, tiện lợi và chuyên nghiệp.
						</p>
					</div>

					{/* Liên kết */}
					<div className="col-md-4 mb-4">
						<h5 className="fw-bold">Liên kết nhanh</h5>
						<ul className="list-unstyled small">
							<li><a href="/about" className="text-decoration-none text-secondary">Giới thiệu</a></li>
							<li><a href="/services" className="text-decoration-none text-secondary">Dịch vụ</a></li>
							<li><a href="/technicians" className="text-decoration-none text-secondary">Kỹ thuật viên</a></li>
							<li><a href="/faq" className="text-decoration-none text-secondary">Câu hỏi thường gặp</a></li>
						</ul>
					</div>

					{/* Liên hệ */}
					<div className="col-md-4 mb-4">
						<h5 className="fw-bold">Liên hệ</h5>
						<p className="small text-muted mb-1">
							📍 123 Đường ABC, Quận 1, TP.HCM
						</p>
						<p className="small mb-1">
							📞 <a href="tel:+84123456789" className="text-decoration-none text-secondary">+84 123 456 789</a>
						</p>
						<p className="small mb-2">
							✉️ <a href="mailto:contact@yourbrand.com" className="text-decoration-none text-secondary">contact@yourbrand.com</a>
						</p>
						{/* Mạng xã hội */}
						<div className="d-flex justify-content-center justify-content-md-start gap-3">
							<a href="#" className="text-secondary"><Facebook /></a>
							<a href="#" className="text-secondary"><YouTube /></a>
							<a href="#" className="text-secondary"><Instagram /></a>
						</div>
					</div>
				</div>

				{/* Bản quyền */}
				<hr />
				<p className="text-center text-muted small mb-0 pb-3">
					© {new Date().getFullYear()} <strong>TechFix</strong>. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
