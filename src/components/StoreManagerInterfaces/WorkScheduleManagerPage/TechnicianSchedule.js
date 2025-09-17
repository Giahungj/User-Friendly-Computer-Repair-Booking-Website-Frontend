const TechnicianSchedule = ({ schedules }) => {
    return (
        <div className="technician-schedule">
            {schedules && schedules.length > 0 ? (
                <div
                    className="d-grid gap-3"
                    style={{
                        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    }}
                >
                    {schedules.map((item) => (
                        <div
                            key={item.work_schedule_id}
                            className="p-3 border rounded shadow-sm bg-white h-100"
                        >
                            <div className="d-flex align-items-center mb-2">
                                <img
                                    src={`http://localhost:8080/images${item.Technician.User.avatar}`}
                                    alt={item.Technician.User.name}
                                    className="rounded-circle me-3"
                                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                />
                                <div>
                                    <h6 className="mb-0">{item.Technician.User.name}</h6>
                                    <small className="text-muted">{item.Technician.User.phone}</small>
                                </div>
                            </div>

                            <div style={{ fontSize: "0.85rem" }}>
                                <p className="mb-1">✉️ {item.Technician.User.email}</p>
                                <p className="mb-1">
                                    <strong>Ngày:</strong>{" "}
                                    {new Date(item.work_date).toLocaleDateString("vi-VN")}
                                </p>
                                <p className="mb-1">
                                    <strong>Ca:</strong> {item.shift} (
                                    {item.shift === "1" ? "07:00 - 11:00" : "13:00 - 17:00"})
                                </p>
                            </div>

                            <div
                                className="mt-2 text-center text-muted fw-bold"
                                style={{ fontSize: "0.85rem" }}
                            >
                                Số lượng: {item.current_number}/{item.max_number}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-muted">Chưa có lịch làm việc.</p>
            )}
        </div>
    );
};

export default TechnicianSchedule;