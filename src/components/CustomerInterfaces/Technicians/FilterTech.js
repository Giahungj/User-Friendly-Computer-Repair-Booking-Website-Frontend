import { useState, useEffect } from 'react';
import { Badge, Button, Collapse } from '@mui/material';
import FilterListAltIcon from '@mui/icons-material/FilterListAlt';
import { getFilterSpecialties } from '../../../services/specialtySevice';

const FilterTech = ({ selectedSpecialty, setSelectedSpecialty, handleFilter }) => {
	const [open, setOpen] = useState(false);
	const [specialties, setSpecialties] = useState([]);

	useEffect(() => {
		const loadSpecialties = async () => {
			try {
				const res = await getFilterSpecialties();
				setSpecialties(res.DT || []);
			} catch (error) {
				console.error('Lỗi lấy specialties:', error);
			}
		};
		loadSpecialties();
	}, []);

	return (
		<div className="mb-4">
			<div className="d-flex justify-content-end mb-2">
				<Button
					variant="outlined"
					size="small"
					onClick={() => setOpen(!open)}
					sx={{
						borderRadius: 2,
						color: '#2196f3',
						borderColor: '#2196f3',
						textTransform: 'none',
						fontWeight: 400,
						gap: 1,
						'&:hover': {
							backgroundColor: '#2196f3',
							borderColor: '#fff',
							color: '#fff',
						}
					}}
				>
					<FilterListAltIcon fontSize="small" />
					{open ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
				</Button>
			</div>

			<Collapse in={open}>
				<div className="row g-2 mb-3">
					{specialties.map(sp => (
						<div className="col-auto" key={sp.specialty_id}>
							<Badge
								badgeContent={sp.technicianCount}
								color="primary"
								overlap="circular"
								sx={{
									'& .MuiBadge-badge': {
										fontSize: '0.7rem',
										height: 18,
										minWidth: 18,
										borderRadius: '50%',
										top: 6,
										right: 6
									}
								}}
							>
								<Button
									variant={selectedSpecialty === sp.name ? 'contained' : 'outlined'}
									size="small"
									onClick={() => setSelectedSpecialty(sp.name)}
									sx={{ borderRadius: 3 }}
								>
									{sp.name}
								</Button>
							</Badge>
						</div>
					))}
				</div>

				<div className="d-flex gap-2 justify-content-end">
					<Button
						variant="outlined"
						size="small"
						onClick={handleFilter}
						sx={{
							borderRadius: 1,
							color: '#2196f3',
							borderColor: '#2196f3',
							textTransform: 'none',
							fontWeight: 300,
							'&:hover': {
								backgroundColor: '#2196f3',
								borderColor: '#fff',
								color: '#fff',
								borderRadius: 3,
								scale: 1.2,
							}
						}}
					>
						Lọc
					</Button>
				</div>
			</Collapse>
		</div>
	);
};

export default FilterTech;
