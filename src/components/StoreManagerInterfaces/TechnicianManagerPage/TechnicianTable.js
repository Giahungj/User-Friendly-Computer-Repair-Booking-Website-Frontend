function TechnicianTable({ data, onView, onEdit, onDisable }) {
	return (
		<div className="table-responsive p-3 border border-secondary" style={{ borderRadius: "1em" }}>
			<table className="table table-small table-striped table-bordered table-hover align-middle" style={{ borderRadius: "1em", overflow: "hidden" }}>
                <thead className="text-center text-white" style={{ backgroundColor: "#3f51b5" }}>
                    <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>SĐT</th>
                        <th>Email</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((t, index) => (
                            <tr key={t.technician_id}>
                                <td className="text-center">{index + 1}</td>
                                <td>{t.User.name}</td>
                                <td>{t.User.phone}</td>
                                <td>{t.User.email}</td>
                                <td className="d-flex justify-content-center gap-1">
                                    <button
                                        className="btn btn-sm border-0 rounded-pill me-2 text-white"
                                        style={{ backgroundColor: "#3f51b5" }}
                                        onClick={() => onView(t)}
                                    >
                                        Xem
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-secondary border-0 rounded-pill"
                                        onClick={() => onEdit(t)}
                                    >
                                        Cập nhật
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger border-0 rounded-pill"
                                        onClick={() => onDisable(t)}
                                    >
                                        Khóa
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="text-center text-muted py-3">
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
		</div>
	);
}
export default TechnicianTable;
