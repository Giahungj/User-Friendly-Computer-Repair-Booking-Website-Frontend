const TechnicianStats = ({ data }) => {
	return (
		<div className="card p-3 w-100 h-100">
			<h5 className="mb-3">Thống kê Kỹ Thuật Viên</h5>
			<ul className="list-group list-group-flush">
				<li className="list-group-item">Số đơn hôm nay: {data.todayOrders}</li>
				<li className="list-group-item">Số đơn đang xử lý: {data.inProgressOrders}</li>
				<li className="list-group-item">Đơn hoàn thành: {data.completedOrders}</li>
			</ul>
		</div>
	);
};

export default TechnicianStats;
