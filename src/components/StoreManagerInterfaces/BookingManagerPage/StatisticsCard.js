function StatisticsCard({ data }) {
	const { total = 0, pending = 0, confirmed = 0, completed = 0, cancelled = 0 } = data;
const mainContrastColors = {
	primary: "#415A77",   // xanh chủ đạo trung tính
	dark: "#0D1B2A",      // nền tối sâu
	bg: "#E0E1DD",        // nền sáng tương phản mạnh
};

	const stats = [
		{ label: "Tổng lịch", value: total },
		{ label: "Chờ xác nhận", value: pending },
		{ label: "Đã xác nhận", value: confirmed },
		{ label: "Hoàn thành", value: completed },
		{ label: "Đã hủy", value: cancelled },
	];

	return (
		<div className="row mb-3">
            {stats.map((s, idx) => {
                const baseColor = [65, 90, 119]; // #415A77
                const darken = (factor) =>
                    `rgb(${baseColor.map((v) => Math.max(0, v - factor)).join(",")})`;
                const bgColor = darken(idx * 15);

                return (
                    <div className="col-6 col-md-2 mb-2" key={idx}>
                        <div
                            className="card shadow-sm h-100"
                            style={{ backgroundColor: bgColor, color: "#E0E1DD" }}
                        >
                            <div className="card-body">
                                <h6 className="card-title">{s.value}</h6>
                                <p className="card-text mb-0">{s.label}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
	);
}

export default StatisticsCard;
