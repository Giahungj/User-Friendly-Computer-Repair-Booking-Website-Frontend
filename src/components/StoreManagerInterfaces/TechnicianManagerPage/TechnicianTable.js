function TechnicianTable({ data, onView, onEdit, onDisable }) {
	return (
		<div className="card shadow-sm">
			<div className="card-body">
				<table className="table table-hover align-middle" style={{ overflow: "hidden" }}>
					<thead className="text-center text-white" style={{ backgroundColor: "#415A77" }}>
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
                                <tr key={t.technician_id} onClick={() => onView(t)} style={{ cursor: "pointer" }}>
                                    <td className="text-center">{index + 1}</td>
                                    <td>{t.User.name}</td>
                                    <td>{t.User.phone}</td>
                                    <td>{t.User.email}</td>
                                    <td className="d-flex justify-content-center gap-1">
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
		</div>
	);
}
export default TechnicianTable;
