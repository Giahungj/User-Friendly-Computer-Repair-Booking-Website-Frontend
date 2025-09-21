import React from "react";
import TechnicianStats from "./TechnicianStats";
import TechnicianTasksChart from "./TechnicianTasksChart";
import TechnicianTasksTrendChart from "./TechnicianTasksTrendChart";

const TechnicianDashboardPage = () => {
	const technicianStatsData = {
		todayOrders: 12,
		inProgressOrders: 5,
		completedOrders: 20,
	};

	const technicianTasksChartData = {
		labels: ["Hoàn thành", "Đang xử lý", "Hủy", "Chờ xác nhận", "Bị lỗi"],
		values: [20, 5, 2, 3, 1],
	};

	const technicianTasksTrendData = {
		labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
		values: [
			{ completed: 10, inProgress: 5, canceled: 2 },
			{ completed: 12, inProgress: 4, canceled: 3 },
			{ completed: 15, inProgress: 3, canceled: 1 },
			{ completed: 14, inProgress: 6, canceled: 2 },
			{ completed: 20, inProgress: 5, canceled: 3 },
			{ completed: 18, inProgress: 7, canceled: 4 },
		],
	};

	return (
		<div className="container py-5">
			<div className="card text-center p-3 shadow-sm mb-4">
				<h4>Chào mừng bạn đến với Dashboard Kỹ Thuật Viên!</h4>
				<p>Tại đây bạn sẽ quản lý lịch làm việc, đơn đặt lịch và đánh giá.</p>
			</div>

			<div className="row g-2">
				<div className="col d-flex">
					<TechnicianStats data={technicianStatsData} />
				</div>
				<div className="col-6 d-flex">
					<TechnicianTasksTrendChart data={technicianTasksTrendData} />
				</div>
				<div className="col d-flex">
					<TechnicianTasksChart data={technicianTasksChartData} />
				</div>
			</div>
		</div>
	);
};

export default TechnicianDashboardPage;
