// src/components/Statistics/StatisticsPage.jsx
import { useEffect, useState, useContext, useRef } from 'react';
import { toast } from 'react-toastify';
import { Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import StatsService from '../../../services/StatsService';
import exportStatistics from "../../utils/exportStatistics";
import { AuthContext } from '../../../context/AuthContext';
import StatCard from './StatCard';
import StatFilter from './StatFilter';
import StatChart from './StatChart';
import StatPieChart from './StatPieChart';
import StatTable from './StatTable';

const initializeFilters = (filters, setFilters) => {
	if (filters.startDate && filters.endDate) return;

	const today = new Date();
	const threeMonthsAgo = new Date(today);
	threeMonthsAgo.setMonth(today.getMonth() - 3);

	setFilters((prev) => ({
		...prev,
		startDate: prev.startDate || threeMonthsAgo.toISOString().slice(0, 10),
		endDate: prev.endDate || today.toISOString().slice(0, 10),
	}));
};

const fetchStatisticsData = async (storeManagerId, filters, setData, setDataLineChart, setSummary) => {
	if (!storeManagerId) return;

	try {
		const [summaryRes, bookingRes, lineChartRes] = await Promise.all([
			StatsService.getAppointmentsSummaryByManager(storeManagerId, filters),
			StatsService.getDataBookingList(storeManagerId, filters),
			StatsService.getDataLineChart(storeManagerId, filters),
		]);

		if (!summaryRes || !bookingRes || !lineChartRes) {
			toast.error('Không thể tải dữ liệu thống kê.');
			return;
		}

		setData(bookingRes.DT);
		setDataLineChart(lineChartRes.DT);

		const statusArr = (summaryRes.data && summaryRes.data.DT) || summaryRes.DT || [];
		const totalObj = (summaryRes.total && summaryRes.total.DT) || summaryRes.total || {};
		const totalVal = Number(totalObj.total ?? 0);

		const counts = { pending: 0, inProgress: 0, completed: 0, cancelled: 0 };
		if (Array.isArray(statusArr)) {
			statusArr.forEach((item) => {
				if (!item || !item.status) return;
				const key = String(item.status).toLowerCase();
				counts[key] = Number(item.count) || 0;
			});
		}

		setSummary({
			total: totalVal || counts.inProgress + counts.pending + counts.completed + counts.cancelled,
			inProgress: counts.inProgress || 0,
			completed: counts.completed || 0,
			cancelled: counts.cancelled || 0,
			pending: counts.pending || 0,
		});
	} catch (error) {
		console.error('Error fetching statistics:', error);
		toast.error('Đã xảy ra lỗi khi tải dữ liệu thống kê.');
	}
};

const StatisticsPage = () => {
	const { auth } = useContext(AuthContext);
	const storeManagerId = auth.user.storeManagerId;
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const chartRef = useRef();
	const [filters, setFilters] = useState({
		startDate: '',
		endDate: '',
		periodType: 'day',
		technicianId: '',
	});
	const [summary, setSummary] = useState({ total: 0, inProgress: 0, completed: 0, cancelled: 0, pending: 0 });
	const [data, setData] = useState([]);
	const [dataLineChart, setDataLineChart] = useState([]);

	useEffect(() => {
		initializeFilters(filters, setFilters);
	}, [filters]);

	useEffect(() => {
		if (filters.startDate && filters.endDate && storeManagerId) {
			fetchStatisticsData(storeManagerId, filters, setData, setDataLineChart, setSummary);
		}
	}, [filters, storeManagerId]);

	const handleExportWord = async () => {
		try {
			let chartImage = null;
			if (chartRef.current) {
				chartImage = chartRef.current.toBase64Image();
			}
			await exportStatistics.exportStatisticsToWord(summary, chartImage, data);
			toast.success("Xuất báo cáo Word thành công!");
		} catch (err) {
			console.error("Error exporting Word:", err);
			toast.error("Xuất báo cáo Word thất bại!");
		}
	};

	const handleExportExcel = async () => {
		try {
			await exportStatistics.exportStatisticsToExcel(summary, data);
			toast.success("Xuất báo cáo Excel thành công!");
		} catch (err) {
			console.error("Error exporting Excel:", err);
			toast.error("Xuất báo cáo Excel thất bại!");
		}
	};

	const handleClick = (e) => setAnchorEl(e.currentTarget);
	const handleClose = () => setAnchorEl(null);

	return (
		<div className="container py-5">
			<div className="card shadow-sm rounded mb-3">
				<div className="card-body d-flex justify-content-between align-items-center">
					<p className="lead fs-3 m-0">Báo cáo thống kê</p>
					<div>
						<Button 
							variant="contained" color="primary" onClick={handleClick} size="large"
							endIcon={<ArrowDropDownIcon />} sx={{ textTransform: "uppercase" }}
						>
							Xuất Báo Cáo
						</Button>

						<Menu anchorEl={anchorEl} open={open} onClose={handleClose}
							anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
							transformOrigin={{ vertical: "top", horizontal: "right" }}
						>
							<MenuItem onClick={() => { handleClose(); handleExportWord(); }}>
								Word (.docx)
							</MenuItem>
							<MenuItem onClick={() => { handleClose(); handleExportExcel(); }}>
								Excel (.xlsx)
							</MenuItem>
						</Menu>
					</div>
				</div>
			</div>

			<div className="row">
				<div className="col-md-3">
					<div style={{ position: 'sticky', top: '20px' }}>
						<StatFilter filters={filters} setFilters={setFilters} />
					</div>
				</div>

				<div className="col-md-9">
					<div className="row mb-3 g-3">
						<div className="col-4 d-flex flex-column gap-3">
							<StatCard title="Tổng số đơn" value={summary.total} />
							<StatCard title="Đang xử lý" value={summary.pending} />
							<StatCard title="Đơn đã hoàn thành" value={summary.completed} />
							<StatCard title="Đơn bị hủy" value={summary.cancelled} />
						</div>
						<div className="col-8">
							<StatPieChart summary={summary} chartRef={chartRef} />
						</div>
					</div>

					<div className="mb-3">
						<StatChart dataLineChart={dataLineChart} />
					</div>
					<div className="mb-3 shadow-sm">
						<StatTable data={data} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default StatisticsPage;
