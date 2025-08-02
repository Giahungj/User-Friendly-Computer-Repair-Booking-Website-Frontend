import TestHeaderComponent from './TestHeaderConmponent';
import ImageCarousel from './ImageCarousel';

const TestComponent = () => {
	return (
		<div className="bg-light">
			<TestHeaderComponent />
			<main className="container">
        <section className="my-5">
          <ImageCarousel />
        </section>

        <section className="mb-5">
          <h3 className="fw-bold mb-4 text-center">Dịch vụ nổi bật</h3>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img src="https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2023/03/cach-ve-sinh-laptop-1.jpg" className="card-img-top" alt="Dịch vụ vệ sinh laptop" />
                <div className="card-body">
                  <h5 className="card-title">Vệ sinh Laptop</h5>
                  <p className="card-text">Dịch vụ vệ sinh laptop định kỳ giúp máy hoạt động bền bỉ và mát mẻ hơn.</p>
                  <a href="#" className="btn btn-primary">Xem thêm</a>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/03/nang-cap-ram-cho-laptop-bg.jpg" className="card-img-top" alt="Nâng cấp RAM" />
                <div className="card-body">
                  <h5 className="card-title">Nâng cấp RAM</h5>
                  <p className="card-text">Dịch vụ nâng cấp RAM giúp máy chạy nhanh hơn, xử lý mượt mà hơn.</p>
                  <a href="#" className="btn btn-primary">Xem thêm</a>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img src="https://cdn.tgdd.vn/Files/2022/01/31/1413722/nhung-dieu-luu-y-truoc-khi-thay-o-cung-laptop-8.jpg" className="card-img-top" alt="Thay ổ cứng SSD" />
                <div className="card-body">
                  <h5 className="card-title">Thay ổ cứng SSD</h5>
                  <p className="card-text">Giúp tăng tốc độ khởi động và truy xuất dữ liệu bằng ổ cứng SSD hiện đại.</p>
                  <a href="#" className="btn btn-primary">Xem thêm</a>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className="mb-5">
          <h3 className="fw-bold mb-4 text-center">Kỹ thuật viên chuyên nghiệp</h3>
          <p className="text-center mb-4">Đội ngũ kỹ thuật viên tay nghề cao, phục vụ tận tình và chuyên nghiệp.</p>

          <div className="row justify-content-center mb-4">
              <div className="col-md-3 mb-4">
                  <div className="card h-100 shadow-sm text-center">
                      <img src="https://htmediagroup.vn/wp-content/uploads/2022/11/Anh-giam-doc-nam-01-min.jpg" className="card-img-top rounded-circle mx-auto mt-3" style={{ width: '150px', height: '150px', objectFit: 'cover' }} alt="Kỹ thuật viên 1" />
                      <div className="card-body">
                          <h5 className="card-title">Nguyễn Văn A</h5>
                          <p className="card-text">Chuyên gia phần cứng với 5 năm kinh nghiệm.</p>
                      </div>
                  </div>
              </div>

              <div className="col-md-3 mb-4">
                  <div className="card h-100 shadow-sm text-center">
                      <img src="https://www.jaybranding.com/wp-content/uploads/2023/05/Chan-dung-truyen-thong.jpg.webp" className="card-img-top rounded-circle mx-auto mt-3" style={{ width: '150px', height: '150px', objectFit: 'cover' }} alt="Kỹ thuật viên 2" />
                      <div className="card-body">
                          <h5 className="card-title">Trần Thị B</h5>
                          <p className="card-text">Chuyên sửa chữa laptop, nhiệt tình, tận tâm.</p>
                      </div>
                  </div>
              </div>

              <div className="col-md-3 mb-4">
                  <div className="card h-100 shadow-sm text-center">
                      <img src="https://lh6.googleusercontent.com/proxy/UbpNjaAqrCXwB62h8lAOCR-1JkOfeDo_2jMuxb-9xqXxt8DEQUywBrPRcTKcROdOrc920p8zi1l2aWsl754M6c2d0sSfqRQ" className="card-img-top rounded-circle mx-auto mt-3" style={{ width: '150px', height: '150px', objectFit: 'cover' }} alt="Kỹ thuật viên 3" />
                      <div className="card-body">
                          <h5 className="card-title">Lê Văn C</h5>
                          <p className="card-text">Kỹ thuật viên phần mềm, hỗ trợ cài đặt nhanh chóng.</p>
                      </div>
                  </div>
              </div>
          </div>

          <div className="text-center">
              <a href="#" className="btn btn-outline-primary">Xem danh sách kỹ thuật viên</a>
          </div>
        </section>

        <section className="mb-5">
          <h3 className="fw-bold mb-4 text-center">Hệ thống cửa hàng TechFix</h3>
          <p className="text-center mb-4">Tìm cửa hàng gần bạn để trải nghiệm dịch vụ chất lượng.</p>

          <div className="row justify-content-center mb-4">
              <div className="col-md-4 mb-4">
                  <div className="card h-100 shadow-sm">
                      <img src="https://cafebiz.cafebizcdn.vn/162123310254002176/2022/6/17/ttpk101280x720-800-resize-165547385278044959370.jpg" className="card-img-top" alt="Cửa hàng 1" />
                      <div className="card-body">
                          <h5 className="card-title">TechFix - Quận 1</h5>
                          <p className="card-text">Địa chỉ: 123 Lê Lợi, Quận 1, TP. HCM</p>
                          <p className="card-text">Giờ mở cửa: 8:00 - 20:00</p>
                      </div>
                  </div>
              </div>

              <div className="col-md-4 mb-4">
                  <div className="card h-100 shadow-sm">
                      <img src="https://cdn.brvn.vn/editor_news/2017/09/13441TGDD9_1505320123.jpg" className="card-img-top" alt="Cửa hàng 2" />
                      <div className="card-body">
                          <h5 className="card-title">TechFix - Quận 3</h5>
                          <p className="card-text">Địa chỉ: 456 Cách Mạng Tháng 8, Quận 3, TP. HCM</p>
                          <p className="card-text">Giờ mở cửa: 8:00 - 20:00</p>
                      </div>
                  </div>
              </div>

              <div className="col-md-4 mb-4">
                  <div className="card h-100 shadow-sm">
                      <img src="https://bogounvlang.org/wp-content/uploads/2019/07/cac-hinh-thuc-kinh-doanh-hang-cong-nghe.jpg" className="card-img-top" alt="Cửa hàng 3" />
                      <div className="card-body">
                          <h5 className="card-title">TechFix - Quận 7</h5>
                          <p className="card-text">Địa chỉ: 789 Nguyễn Thị Thập, Quận 7, TP. HCM</p>
                          <p className="card-text">Giờ mở cửa: 8:00 - 20:00</p>
                      </div>
                  </div>
              </div>
          </div>

          <div className="text-center">
              <a href="#" className="btn btn-outline-primary">Tìm cửa hàng</a>
          </div>
        </section>

        <section className="my-5">
          <h3 className="fw-bold mb-4 text-center">Danh sách các thiết bị điện tử</h3>
          <p className="text-center mb-4">Chúng tôi hỗ trợ sửa chữa nhiều loại thiết bị điện tử phổ biến.</p>
          <div className="container">
              <div className="row g-4">
            <div className="col-md-4 d-flex justify-content-center">
                <div className="text-center bg-transparent border-0">
                    <img src="https://surfaceviet.vn/wp-content/uploads/2024/05/Surface-Laptop-7-Platinum-13.8-inch.jpg" className="rounded-circle mx-auto d-block mb-3" alt="Laptop" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                    <h5 className="fw-bold">Laptop</h5>
                </div>
            </div>
            <div className="col-md-4 d-flex justify-content-center">
                <div className="text-center bg-transparent border-0">
                    <img src="https://pcmarket.vn/media/product/10239_340784857_799984757660921_1932046047919300131_n.jpg" className="rounded-circle mx-auto d-block mb-3" alt="PC" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                    <h5 className="fw-bold">PC</h5>
                </div>
            </div>
            <div className="col-md-4 d-flex justify-content-center">
                <div className="text-center bg-transparent border-0">
                    <img src="https://mucinthanhdat.net/wp-content/uploads/2024/01/may-in-epson-l18050-8.jpg" className="rounded-circle mx-auto d-block mb-3" alt="Máy in" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                    <h5 className="fw-bold">Máy in</h5>
                </div>
            </div>
        </div>
          </div>
      </section>
      </main>

			<footer className="bg-dark text-white text-center p-3">
				&copy; 2025 Sửa Chữa Laptop Nhanh. All rights reserved.
			</footer>
		</div>
	);
};

export default TestComponent;
