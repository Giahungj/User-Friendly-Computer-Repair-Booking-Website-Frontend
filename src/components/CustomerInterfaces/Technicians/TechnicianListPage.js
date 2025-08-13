import { useEffect, useState } from 'react';
import TechnicianCard from './TechnicianCard';
import SearchTechnicians from '../../Search/SearchTechnicians';
import FilterTech from './FilterTech';
import { getTechnicians } from '../../../services/TechnicianService';
import MuiPagination from '../../../components/MuiPanigation/MuiPagination';

const TechnicianList = () => {
	const [selectedSpecialty, setSelectedSpecialty] = useState(null);
	const [filteredData, setFilteredData] = useState([]);
	const [techniciansData, setTechniciansData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	const [page, setPage] = useState(1);
	const itemsPerPage = 20;

	useEffect(() => {
		const loadTechnicians = async () => {
			setIsLoading(true);
			try {
				const data = await getTechnicians();
				setTechniciansData(data.DT);
				setFilteredData(data.DT);
			} catch (error) {
				console.error('Lỗi lấy danh sách kỹ thuật viên:', error);
			} finally {
				setIsLoading(false);
			}
		};
		loadTechnicians();
	}, []);

	const handleFilter = () => {
		if (!selectedSpecialty) {
			setFilteredData(techniciansData);
		} else {
			setFilteredData(
				techniciansData.filter(t =>
					Array.isArray(t.Specialties) &&
					t.Specialties.some(sp => sp.name === selectedSpecialty)
				)
			);
		}
		setPage(1);
	};

	const handleSearch = (term) => {
		setSearchTerm(term);
		if (!term) {
			setFilteredData(techniciansData);
		} else {
			const lowerTerm = term.toLowerCase();
			setFilteredData(
				techniciansData.filter(tech =>
					tech.User.name.toLowerCase().includes(lowerTerm) ||
					(Array.isArray(tech.Specialties) &&
						tech.Specialties.some(sp => sp.name.toLowerCase().includes(lowerTerm)))
				)
			);
		}
		setPage(1);
	};

	const currentItems = filteredData.slice(
		(page - 1) * itemsPerPage,
		page * itemsPerPage
	);

	return (
		<div className="container py-5">
			<div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
				<p className="lead mb-4">🛠️ Kỹ thuật viên của cửa hàng</p>
				<SearchTechnicians searchTerm={searchTerm} onSearch={handleSearch} />
			</div>

			<div className="d-flex justify-content-end">
				<FilterTech
					selectedSpecialty={selectedSpecialty}
					setSelectedSpecialty={setSelectedSpecialty}
					handleFilter={handleFilter}
				/>
			</div>

			<div className="row row-cols-4 g-4">
				{currentItems.map((tech) => (
					<div key={tech.technician_id} className="col mb-4">
						<TechnicianCard tech={tech} />
					</div>
				))}
			</div>

			{!isLoading && filteredData.length === 0 && (
				<div className="text-center my-4 text-muted">
					Không có kỹ thuật viên nào!
				</div>
			)}

			{!isLoading && filteredData.length > itemsPerPage && (
				<div className="d-flex justify-content-center mt-4">
					<MuiPagination
						totalItems={filteredData.length}
						itemsPerPage={itemsPerPage}
						page={page}
						onPageChange={setPage}
					/>
				</div>
			)}
		</div>
	);
};

export default TechnicianList;
