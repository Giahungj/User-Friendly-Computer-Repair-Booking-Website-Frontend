// TestColorPage.jsx
import { Typography } from "@mui/material";
import {
	AddButton,
	ConfirmButton,
	CloseButton,
	DeleteButton,
	EditButton,
	DetailButton,
	FilterButton,
	SearchButton,
	FileButton,
	BackButton,
	LoginButton,
	LogoutButton,
	RegisterButton,
} from "./ActionButtons";

const colors = {
	primary: "#6366f1",       // indigo-500 – chủ đạo (nút, link, tiêu đề) nhẹ hơn, bớt chói
	accent: "#14b8a6",        // teal-500 – phần phụ, badge, icon, highlight
	dark: "#1e293b",          // slate-800 – chữ chính, viền, header, sidebar
	bg: "#f1f5f9",            // slate-100 – nền trang, card, vùng trống
	bgLight: "#f8fafc"        // slate-50 – nền phụ sáng hơn, tạo lớp phân tách nhẹ
};

const TestColorPage = () => {
	return (
		<div style={{ background: colors.bg, minHeight: "100vh", padding: "40px" }}>
			{/* Tiêu đề chính */}
			<Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: colors.dark }}>
				Bảng màu giao diện Trường Thịnh Group
			</Typography>

			{/* Section 1: Demo card màu */}
			<section className="mb-5">
				<h3 style={{ color: colors.primary }}>Section 1: Card màu</h3>
				<p style={{ color: colors.dark }}>Minh họa sử dụng màu chủ đạo, accent, dark và bgLight.</p>
				<div className="card p-3" style={{ backgroundColor: colors.bgLight }}>
					<h5 className="fw-bold" style={{ color: colors.primary }}>Tiêu đề chính</h5>
					<p style={{ color: colors.dark }}>Phần mô tả nội dung thẻ.</p>
					<span className="badge px-3 py-2" style={{ backgroundColor: colors.accent, color: "#fff" }}>
						Nổi bật
					</span>
				</div>
			</section>

			{/* Section 2: Bảng màu */}
			<section className="mb-5">
				<h3 style={{ color: colors.primary }}>Section 2: Bảng màu</h3>
				<div className="row g-3">
					{Object.entries(colors).map(([name, hex]) => (
						<div className="col-12 col-sm-6 col-md-3" key={name}>
							<div className="card shadow-sm border-0 rounded" style={{
								backgroundColor: hex,
								color: name === "bg" || name === "bgLight" ? colors.dark : "#fff"
							}}>
								<div className="card-body text-center">
									<h6 className="fw-bold text-uppercase mb-1">{name}</h6>
									<p className="mb-0 small">{hex}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Section 3: Bộ nút giao diện */}
			<section className="mb-5">
				<h3 style={{ color: colors.primary }}>Section 3: Bộ nút giao diện</h3>
				<div style={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "center",
					gap: 16,
					background: colors.bgLight,
					padding: 24,
					borderRadius: 12,
					boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
				}}>
					<AddButton />
					<ConfirmButton />
					<CloseButton />
					<DeleteButton />
					<EditButton />
					<DetailButton />
					<FilterButton />
					<SearchButton />
					<FileButton />
					<BackButton />
					<LoginButton />
					<LogoutButton />
					<RegisterButton />
				</div>
			</section>

			{/* Section 4: Danh sách đặt lịch */}
			<section className="mb-5">
				<h3 style={{ color: colors.primary }}>Section 4: Quản lý Đơn đặt lịch</h3>

				{/* Header Card */}
				<div className="card shadow-sm mb-4 border-0" style={{ background: colors.primary, color: "#fff" }}>
					<div className="card-body py-3 d-flex justify-content-between align-items-center">
						<h4 className="mb-0 fw-bold">Quản lý Đơn đặt lịch</h4>
						<button
							className="btn rounded-circle d-flex align-items-center justify-content-center"
							style={{
								width: 44,
								height: 44,
								fontSize: 22,
								background: colors.bgLight,
								color: colors.primary,
							}}
						>
							+
						</button>
					</div>
				</div>

				{/* Content Card */}
				<div className="card border-0 shadow-sm" style={{ background: colors.bgLight }}>
					<ul className="list-group list-group-flush">
						<li className="list-group-item d-flex justify-content-between align-items-center" style={{ background: colors.bgLight }}>
							<div>
								<h6 className="mb-1 fw-semibold" style={{ color: colors.dark }}>Nguyễn Văn A</h6>
								<small style={{ color: colors.accent }}>Đặt ngày: 23/10/2025</small>
							</div>
							<span className="badge" style={{ background: colors.primary, color: "#fff" }}>Đã xác nhận</span>
						</li>
						<li className="list-group-item d-flex justify-content-between align-items-center" style={{ background: colors.bgLight }}>
							<div>
								<h6 className="mb-1 fw-semibold" style={{ color: colors.dark }}>Trần Thị B</h6>
								<small style={{ color: colors.accent }}>Đặt ngày: 22/10/2025</small>
							</div>
							<span className="badge" style={{ background: colors.accent, color: "#fff" }}>Chưa xác nhận</span>
						</li>
						<li className="list-group-item d-flex justify-content-between align-items-center" style={{ background: colors.bgLight }}>
							<div>
								<h6 className="mb-1 fw-semibold" style={{ color: colors.dark }}>Phạm Văn C</h6>
								<small style={{ color: colors.accent }}>Đặt ngày: 21/10/2025</small>
							</div>
							<span className="badge" style={{ background: colors.primary, color: "#fff" }}>Hoàn thành</span>
						</li>
					</ul>
				</div>
			</section>
		</div>
	);
};

export default TestColorPage;
