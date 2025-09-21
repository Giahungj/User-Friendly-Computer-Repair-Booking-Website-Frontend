import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TechnicianTasksChart = ({ data }) => {
	const chartData = {
		labels: data.labels,
		datasets: [
			{
				label: "Số đơn",
				data: data.values,
				backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384", "#4BC0C0", "#9966FF"],
				hoverOffset: 4,
			},
		],
	};

	return (
		<div className="card p-3 shadow-sm w-100 h-100">
			<h5 className="mb-3 text-center">Biểu đồ Nhiệm vụ</h5>
			<div className="card-body">
				<Pie data={chartData} />
			</div>
		</div>
	);
};

export default TechnicianTasksChart;