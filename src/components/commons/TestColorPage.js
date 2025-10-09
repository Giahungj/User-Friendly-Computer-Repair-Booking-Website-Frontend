// TestColorPage.jsx
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
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
	primary: "#415A77",
	dark: "#1B263B",
	lightDark: "#0D1B2A",
	accent: "#778DA9",
	bg: "#E0E1DD",
};

const mainContrastColors = {
	primary: "#415A77",   // xanh chủ đạo trung tính
	dark: "#0D1B2A",      // nền tối sâu
	bg: "#E0E1DD",        // nền sáng tương phản mạnh
};

const TestColorPage = () => {
	return (
		<div style={{ background: colors.bg, minHeight: "100vh", padding: "40px" }}>
			<Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: colors.dark }}>
				Bảng màu giao diện Trường Thịnh Group
			</Typography>

			<div className="row g-3">
				{Object.entries(colors).map(([name, hex]) => (
					<div className="col-12 col-sm-6 col-md-4" key={name}>
						<div
							className="card shadow-sm border-0 rounded"
							style={{
								backgroundColor: hex,
								color: name === "bg" ? colors.dark : colors.bg,
							}}
						>
							<div className="card-body">
								<h6 className="fw-bold text-uppercase mb-1">{name}</h6>
								<p className="mb-0 small">{hex}</p>
							</div>
						</div>
					</div>
				))}
			</div>

			<Typography variant="h4" sx={{ mt: 4, mb: 4, fontWeight: 700, color: colors.dark }}>
				Bộ nút giao diện
			</Typography>

			<div className="mb-5">
				<div className="d-flex flex-wrap justify-content-center gap-3 p-3"
					style={{
						background: colors.bg,
					}}
				>
					<div className="card shadow-lg border-0 p-3" style={{ backgroundColor: "#E0E1DD" }}>
						<div className="card-header  text-white fw-bold rounded-3" style={{ backgroundColor: "#415A77" }}>
							Lịch làm việc - Nguyễn Văn A
						</div>
						<div className="card-body">
							<p className="mb-2"><strong>Ca:</strong> Sáng (07:30 - 11:30)</p>
							<p className="mb-2"><strong>Phòng:</strong> Kỹ thuật</p>
							<p className="mb-0"><strong>Ngày:</strong> 06/10/2025</p>
						</div>
					</div>
				</div>
			</div>

			<Typography variant="h4" sx={{ mt: 4, mb: 4, fontWeight: 700, color: colors.dark }}>
				Bộ nút giao diện
			</Typography>

			<div style={{ marginTop: 50, textAlign: "center" }}>
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						justifyContent: "center",
						gap: 16,
						background: colors.bg,
						padding: 24,
						borderRadius: 12,
						boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
					}}
				>
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
			</div>
		</div>
	);
};

export default TestColorPage;
