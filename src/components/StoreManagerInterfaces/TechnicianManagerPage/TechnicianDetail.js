function TechnicianDetail({ tech, onClose }) {
    return (
        <div>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Chi tiết KTV</h5>
                <button className="btn btn-secondary btn-sm" onClick={onClose}>
                    X
                </button>
            </div>

            {/* Khối thông tin cá nhân */}
            <div className="card mb-3 shadow-sm">
                <div className="card-body text-center">
                    {/* Avatar */}
                    {tech.User.avatar ? (
                        <img
                            src={`http://localhost:8080/images/${tech.User.avatar}`}
                            alt="Avatar"
                            className="rounded-circle border border-2 mb-3"
                            style={{ width: "120px", height: "120px", objectFit: "cover" }}
                        />
                    ) : (
                        <div
                            className="rounded-circle bg-light d-flex align-items-center justify-content-center mb-3"
                            style={{ width: "120px", height: "120px", margin: "0 auto" }}
                        >
                            <span className="text-muted">No Image</span>
                        </div>
                    )}

                    <h6 className="fw-bold">{tech.User.name}</h6>
                    <p className="text-muted mb-2">Mã KTV: {tech.technician_id}</p>
                    <p className="mb-1">📱 {tech.User.phone}</p>
                    <p className="mb-1">✉️ {tech.User.email}</p>
                    <span className="badge bg-info">{tech.status || "Chưa cập nhật"}</span>
                </div>
            </div>

            {/* Khối thông tin nghề nghiệp */}
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="mb-2">
                        <label className="form-label">Chuyên môn</label>
                        <div className="d-flex flex-wrap">
                            {tech.Specialties && tech.Specialties.length > 0 ? (
                                tech.Specialties.map((sp) => (
                                    <span
                                        key={sp.specialty_id}
                                        className="badge bg-primary me-2 mb-2"
                                    >
                                        {sp.name}
                                    </span>
                                ))
                            ) : (
                                <p className="text-muted">Chưa cập nhật</p>
                            )}
                        </div>
                    </div>

                    <div className="mb-2">
                        <label className="form-label">Ngày bắt đầu</label>
                        <input
                            className="form-control"
                            value={
                                tech.createdAt
                                    ? new Date(tech.createdAt).toLocaleDateString("vi-VN")
                                    : "Chưa cập nhật"
                            }
                            disabled
                        />
                    </div>

                    <div className="mb-2">
                        <label className="form-label">Đơn đã hoàn thành</label>
                        <input
                            className="form-control"
                            value={tech.bookingCount || "0"}
                            disabled
                        />
                    </div>

                    <div className="mb-2">
                        <label className="form-label">Đánh giá</label>
                        <input
                            className="form-control"
                            value={`${tech.avg_rating || "0"} ⭐`}
                            disabled
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TechnicianDetail;
