import React, { useRef } from 'react'; // thêm useRef
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatPieChart = ({ summary, chartRef }) => {
  // Kiểm tra summary có phải là object hợp lệ không
  const isValidObject = summary && typeof summary === 'object' && !Array.isArray(summary);

  // Xử lý dữ liệu summary dạng object
  let statusCounts = { completed: 0, cancelled: 0, pending: 0 };

  if (isValidObject) {
    statusCounts = {
      completed: Number(summary.completed) || 0,
      cancelled: Number(summary.cancelled) || 0,
      pending: Number(summary.pending) || (Number(summary.total) - (Number(summary.completed) || 0) - (Number(summary.cancelled) || 0)),
    };
  }

  const chartData = {
    labels: ['Hoàn thành', 'Bị hủy', 'Đang xử lý'],
    datasets: [
      {
        label: 'Phần trăm trạng thái đơn',
        data: [statusCounts.completed, statusCounts.cancelled, statusCounts.pending],
        backgroundColor: ['#A5D6A7', '#EF9A9A', '#FFE082'], // xanh nhạt, đỏ nhạt, cam nhạt
        borderColor: ['#66BB6A', '#E57373', '#FFB74D'],     // viền đậm hơn chút
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (context) => {
            const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
            const percentage = total ? ((context.raw / total) * 100).toFixed(1) : 0;
            return `${context.label}: ${context.raw} (${percentage}%)`;
          },
        },
      },
    },
  };

  // Hiển thị thông báo nếu không có dữ liệu (tất cả counts = 0)
  const totalCounts = statusCounts.completed + statusCounts.cancelled + statusCounts.pending;
  if (totalCounts === 0) {
    return (
      <div className="card rounded shadow-sm h-100">
        <div className="card-body text-center">
          <p>Không có dữ liệu để hiển thị biểu đồ.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card rounded shadow-sm h-100">
      <div className="card-body">
        <div style={{ width: "25em", height: "25em", margin: "0 auto" }}>
          <Pie ref={chartRef} data={chartData} options={options} /> 
        </div>
      </div>
    </div>
  );
};

export default StatPieChart;