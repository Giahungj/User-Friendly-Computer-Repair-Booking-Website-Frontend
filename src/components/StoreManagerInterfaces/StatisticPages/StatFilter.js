// StatFilter.jsx
import React, { useEffect, useState, useContext } from 'react';
import { TextField, ButtonGroup, Button, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';
import { AuthContext } from "../../../context/AuthContext";
import { getAllTechniciansByManager } from '../../../services/TechnicianService';

const StatFilter = ({ filters, setFilters }) => {
	const { auth } = useContext(AuthContext);
	const storeManagerId = auth.user.storeManagerId;
	const [technicianList, setTechniciansList] = useState([]);

	useEffect(() => {
		const loadTechnicians = async () => {
			try {
				const res = await getAllTechniciansByManager(storeManagerId);
				if (res?.techData?.EC === 0) setTechniciansList(res.techData.DT);
				else toast.error(res?.techData?.EM || "Không tải được danh sách kỹ thuật viên");
			} catch {
				toast.error("Lỗi khi tải danh sách kỹ thuật viên");
			}
		};

		if (storeManagerId) loadTechnicians();
	}, [storeManagerId]);

	return (
		<div className="card rounded shadow-sm">
			<div className='card-body'>
				<TextField
					label="Từ ngày"
					type="date"
					value={filters.startDate}
					onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
					
					fullWidth
					className="mb-3"
				/>
				<TextField
					label="Đến ngày"
					type="date"
					value={filters.endDate}
					onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
					
					fullWidth
					className="mb-3"
				/>

				<TextField
					select
					fullWidth
					label="Kỹ thuật viên"
					value={filters.technicianId || ""}
					onChange={(e) => setFilters({ ...filters, technicianId: e.target.value })}
					className="mb-3"
				>
					<MenuItem value="">Tất cả</MenuItem>
					{technicianList.map((tech) => (
						<MenuItem key={tech.technician_id} value={tech.technician_id}>
							{tech.User?.name || "—"}
						</MenuItem>
					))}
				</TextField>

				<ButtonGroup fullWidth variant="outlined" className='mb-3'>
					<Button
						variant={filters.periodType === 'day' ? 'contained' : 'outlined'}
						onClick={() => setFilters({ ...filters, periodType: 'day' })}
					>
						Ngày
					</Button>
					<Button
						variant={filters.periodType === 'month' ? 'contained' : 'outlined'}
						onClick={() => setFilters({ ...filters, periodType: 'month' })}
					>
						Tháng
					</Button>
					<Button
						variant={filters.periodType === 'year' ? 'contained' : 'outlined'}
						onClick={() => setFilters({ ...filters, periodType: 'year' })}
					>
						Năm
					</Button>
				</ButtonGroup>
			</div>
		</div>
	);
};

export default StatFilter;