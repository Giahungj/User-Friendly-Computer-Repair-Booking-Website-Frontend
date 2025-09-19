// src/components/Statistics/StatTable.jsx
import { DataGrid } from '@mui/x-data-grid';

const StatTable = ({ data }) => {
	// map dữ liệu để đảm bảo mỗi row có customer_name
	const rows = data.map(item => ({
		...item,
		customer_name: item.Customer?.User?.name || 'N/A',
	}));

	const columns = [
		{ field: 'booking_id', headerName: 'Mã đơn', width: 100 },
		{ field: 'customer_name', headerName: 'Khách hàng', width: 150 },
		{ field: 'issue_description', headerName: 'Mô tả sự cố', width: 200 },
		{ field: 'device_type', headerName: 'Loại thiết bị', width: 120 },
		{ field: 'brand', headerName: 'Thương hiệu', width: 120 },
		{ field: 'model', headerName: 'Model', width: 150 },
		{ field: 'booking_date', headerName: 'Ngày đặt', width: 120 },
		{ field: 'status', headerName: 'Trạng thái', width: 120 },
	];

	return (
		<div className="stat-table">
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={10}
				rowsPerPageOptions={[10, 20, 50]}
				getRowId={(row) => row.booking_id}
			/>
		</div>
	);
};

export default StatTable;
