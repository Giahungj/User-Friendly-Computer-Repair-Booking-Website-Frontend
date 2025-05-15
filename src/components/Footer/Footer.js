const Footer = () => {
    return (
        <footer className="bg-light py-4 mt-5 border-top">
            <div className="container text-center">
                <div className="row">
                    {/* Cột 1: Giới thiệu */}
                    <div className="col-md-4 mb-3">
                        <h5 className="fw-bold">Về chúng tôi</h5>
                        <p className="text-muted small">
                            Your Brand là nền tảng đặt lịch khám bệnh trực tuyến, giúp kết nối bác sĩ và bệnh nhân nhanh chóng, tiện lợi.
                        </p>
                    </div>

                    {/* Cột 2: Liên kết nhanh */}
                    <div className="col-md-4 mb-3">
                        <h5 className="fw-bold">Liên kết nhanh</h5>
                        <ul className="list-unstyled small">
                            <li>
                                <a href="/about" className="text-decoration-none text-secondary">Về chúng tôi</a>
                            </li>
                            <li>
                                <a href="/services" className="text-decoration-none text-secondary">Dịch vụ</a>
                            </li>
                            <li>
                                <a href="/contact" className="text-decoration-none text-secondary">Liên hệ</a>
                            </li>
                            <li>
                                <a href="/faq" className="text-decoration-none text-secondary">Câu hỏi thường gặp</a>
                            </li>
                        </ul>
                    </div>

                    {/* Cột 3: Liên hệ */}
                    <div className="col-md-4 mb-3">
                        <h5 className="fw-bold">Liên hệ</h5>
                        <p className="small text-muted">
                            📍 123 Đường ABC, Quận 1, TP. Hồ Chí Minh <br />
                            📞 <a href="tel:+84123456789" className="text-decoration-none text-secondary">+84 123 456 789</a> <br />
                            ✉️ <a href="mailto:contact@yourbrand.com" className="text-decoration-none text-secondary">contact@yourbrand.com</a>
                        </p>
                    </div>
                </div>

                {/* Dòng bản quyền */}
                <hr className="my-3" />
                <p className="mb-2 text-muted small">
                    © {new Date().getFullYear()} <span className="fw-bold">Your Brand</span>. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
