// TechnicianTasksTrendChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TechnicianTasksTrendChart = ({ data }) => {
	const chartData = {
		labels: data.labels,
		datasets: [
			{
				label: "Hoàn thành",
				data: data.values.map(v => v.completed),
				fill: false,
				borderColor: "#36A2EB",
				tension: 0.4,
			},
			{
				label: "Đang xử lý",
				data: data.values.map(v => v.inProgress),
				fill: false,
				borderColor: "#FFCE56",
				tension: 0.4,
			},
			{
				label: "Hủy",
				data: data.values.map(v => v.canceled),
				fill: false,
				borderColor: "#FF6384",
				tension: 0.4,
			},
		],
	};

	return (
		<div className="card p-3 w-100 h-100">
			<h5 className="mb-3 text-center">Xu hướng Nhiệm vụ</h5>
			<div className="card-body">
				<Line data={chartData} />
			</div>
		</div>
	);
};

export default TechnicianTasksTrendChart;
