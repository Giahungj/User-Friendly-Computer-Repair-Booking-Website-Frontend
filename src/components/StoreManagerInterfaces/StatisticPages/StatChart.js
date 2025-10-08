import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatChart = ({ dataLineChart }) => {

  // Kiểm tra dữ liệu có hợp lệ không
  const isValidData = Array.isArray(dataLineChart) && dataLineChart.length > 0;

  // Chuẩn bị dữ liệu cho biểu đồ
  const chartData = {
    labels: isValidData ? dataLineChart.map(item => item.period) : [],
    datasets: [
      {
        label: 'Hoàn thành',
        data: isValidData ? dataLineChart.map(item => Number(item.completed) || 0) : [],
        backgroundColor: '#4CAF50',
        borderColor: '#388E3C',
        borderWidth: 1,
      },
      {
        label: 'Chưa duyệt',
        data: isValidData ? dataLineChart.map(item => Number(item.pending) || 0) : [],
        backgroundColor: '#4CAF50',
        borderColor: '#388E3C',
        borderWidth: 1,
      },
      {
        label: 'Bị hủy',
        data: isValidData ? dataLineChart.map(item => Number(item.cancelled) || 0) : [],
        backgroundColor: '#F44336',
        borderColor: '#D32F2F',
        borderWidth: 1,
      },
      {
        label: 'Đang xử lý',
        data: isValidData ? dataLineChart.map(item => Number(item.completed) || 0) : [],
        backgroundColor: '#FF9800',
        borderColor: '#F57C00',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
      title: {
        display: true,
        text: 'Số lượng đơn theo trạng thái',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Số lượng đơn',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Ngày',
        },
      },
    },
  };

  // Hiển thị thông báo nếu không có dữ liệu
  if (!isValidData) {
    return (
      <div className="card rounded shadow-sm">
        <div className="card-body text-center">
          <p>Không có dữ liệu để hiển thị biểu đồ.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card rounded shadow-sm">
      <div className="card-body">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default StatChart;