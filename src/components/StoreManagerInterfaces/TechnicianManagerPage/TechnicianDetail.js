import { BackButton } from "../../commons/ActionButtons";
import { TextField, Rating, Avatar } from "@mui/material";

const TechnicianDetail = ({ tech, onClose }) => (
	<div>
		{/* Header */}
		<div className="card" style={{ backgroundColor: "#f8fafc" }}>
			<div className="card-body">
				<div className="d-flex justify-content-between align-items-center my-2">
					<h5 className="m-0 fw-bold text-uppercase" style={{ color: "#6366f1" }}>thông tin</h5>
					<BackButton size="small" onClick={onClose} />
				</div>

				<div className="d-flex align-items-center p-3 border-0 rounded-3 mb-3" style={{ backgroundColor: "#fff" }}>
					<div className="me-3">
						{tech.User.avatar ? (
							<Avatar
                                src={tech.User.avatar ? `http://localhost:8080/images/${tech.User.avatar}` : undefined}
                                alt={tech.User.name}
                                sx={{ width: 100, height: 100, bgcolor: tech.User.avatar ? "transparent" : "grey.200" }}
                            >
                                {!tech.User.avatar && tech.User.name[0]}
                            </Avatar>
						) : (
							<div
								className="rounded-circle bg-light d-flex align-items-center justify-content-center"
								style={{ width: "100px", height: "100px" }}
							>
								<span className="text-muted small">No Image</span>
							</div>
						)}
					</div>

					<div>
                        <h6 className="fw-bold mb-1">{tech.User.name}</h6>
                        <p className="text-muted small mb-1">Mã KTV: {tech.technician_id}</p>
                        <p className="small mb-1">{tech.User.phone}</p>
                        <p className="small mb-1">{tech.User.email}</p>
                        <div className="d-flex flex-column align-items-start">
                            <Rating value={Number(tech.avg_rating) || 0} precision={0.5} readOnly />
                            <span className="badge mt-2" style={{ backgroundColor: "#14b8a6" }}>
                                {tech.status || "Chưa cập nhật"}
                            </span>
                        </div>
                    </div>
				</div>

				{/* Khối thông tin nghề nghiệp */}
				<div className="d-flex align-items-center p-3 border-0 rounded-3" style={{ backgroundColor: "#fff" }}>
					<div className="me-3 w-100">
						<div className="mb-2">
							<label className="form-label" style={{ color: "#14b8a6" }}>Chuyên môn</label>
							<div className="d-flex flex-wrap">
								{tech.Specialties?.length > 0 ? (
									tech.Specialties.map(sp => (
										<span
											key={sp.specialty_id}
											className="badge me-2 mb-2"
											style={{ backgroundColor: "#14b8a6" }}
										>
											{sp.name}
										</span>
									))
								) : (
									<p className="text-muted fst-italic">Chưa cập nhật</p>
								)}
							</div>
						</div>

						<div className="row">
							<div className="col-6">
								<label className="form-label" style={{ color: "#14b8a6" }}>Ngày bắt đầu</label>
								<TextField
                                    label="Ngày bắt đầu"
                                    value={tech.createdAt ? new Date(tech.createdAt).toLocaleDateString("vi-VN") : "Chưa cập nhật"}
                                    disabled
                                />
							</div>

							<div className="col-6">
								<label className="form-label" style={{ color: "#14b8a6" }}>Đơn đã hoàn thành</label>
								<TextField
                                    label="Đơn đã hoàn thành"
                                    value={tech.bookingCount || "0"}
                                    disabled
                                />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default TechnicianDetail;
