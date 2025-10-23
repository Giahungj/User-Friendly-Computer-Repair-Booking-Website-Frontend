import { useNavigate } from "react-router-dom";
import { EditButton } from "../../commons/ActionButtons";
const TechnicianTable = ({ data, onView, onEdit, onDisable }) => {
    const navigate = useNavigate();

	return (
		<div className="card" style={{ backgroundColor: "#f8fafc" }}>
			<div className="card-body">
                <div className="d-flex justify-content-between align-items-center my-2 mb-2">
                    <h5 className="m-0 fw-bold text-uppercase" style={{ color: "#6366f1" }}>danh sách kỹ thuật viên</h5>
                </div>
				<table className="table table-hover align-middle border-0 rounded-3 overflow-hidden">
					<thead className="text-center text-white" style={{ backgroundColor: "#14b8a6" }}>
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
                                        <EditButton size="small" onClick={() => navigate(`/cua-hang-truong/ky-thuat-vien/${t.technician_id}/cap-nhat`)} />
                                        {/* <button
                                            className="btn btn-sm btn-outline-danger border-0 rounded-pill"
                                            onClick={() => onDisable(t)}
                                        >
                                            Khóa
                                        </button> */}
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
