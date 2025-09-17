function StatisticsCard({ data }) {
	const { total = 0, pending = 0, confirmed = 0, completed = 0, cancelled = 0 } = data;

	const stats = [
		{ label: "Tổng lịch", value: total },
		{ label: "Chờ xác nhận", value: pending },
		{ label: "Đã xác nhận", value: confirmed },
		{ label: "Hoàn thành", value: completed },
		{ label: "Đã hủy", value: cancelled },
	];

	return (
		<div className="row mb-3">
            {stats.map((s, idx) => (
                <div className="col-6 col-md-2 mb-2" key={idx}>
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h6 className="card-title">{s.value}</h6>
                            <p className="card-text text-muted mb-0">{s.label}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
	);
}

export default StatisticsCard;
