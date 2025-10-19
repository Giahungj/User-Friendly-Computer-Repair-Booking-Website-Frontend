import { useEffect, useState } from 'react';
import { Button  } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SpecialtyCard from './SpecialtyCard';
import SearchSpecialties from '../../Search/SearchSpecialties';
import LoadingAndError from "../../commons/LoadingAndError";
import { getSpecialties } from '../../../services/specialtySevice';

const SpecialtyListPage = () => {
    const [specialties, setSpecialties] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadSpecialties = async () => {
            try {
                const res = await getSpecialties();
                if (!res || res.EC !== 0) {
                    setError(res.EM);
                    setLoading(false);
                    return;
                }
                setSpecialties(res.DT);
                setFilteredData(res.DT);
                setLoading(false);
            } catch (error) {
                console.error('Lỗi lấy danh sách chuyên môn:', error);
                setError('Lỗi lấy danh sách chuyên môn');
                setLoading(false);
            }
        };
        loadSpecialties();
    }, []);

    const handleSearch = (term) => {
        setSearchTerm(term);
        if (!term) {
            setFilteredData(specialties);
        } else {
            setFilteredData(
                specialties.filter(sp =>
                    sp.name.toLowerCase().includes(term.toLowerCase())
                )
            );
        }
    };

    if (loading) return <LoadingAndError.Loading />;
    if (error) return <LoadingAndError.Error message={error} />;

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
                <p className="lead mb-4">📋 Danh sách chuyên môn</p>
                <SearchSpecialties searchTerm={searchTerm} onSearch={handleSearch} />
            </div>

            {error ? (
                <div className="card border-0 shadow-sm text-center p-4 w-50 mx-auto">
                    <div className="mb-3">
                        <ErrorOutlineIcon sx={{ fontSize: '5rem', color: 'error.main' }} />
                    </div>
                    <h6 className="fw-bold text-danger mb-2">Đã xảy ra lỗi</h6>
                    <p className="text-muted small mb-4">
                        Không thể tải dữ liệu chuyên môn. Vui lòng thử lại sau hoặc liên hệ quản trị viên.
                    </p>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            backgroundColor: '#2196f3',
                            textTransform: 'none',
                            px: 3,
                            '&:hover': { backgroundColor: '#1976d2' }
                        }}
                    >
                        Thử lại
                    </Button>
                </div>
            ) : (
                <div className="row row-cols-4 g-4">
                    {loading
                        ? Array.from({ length: 8 }).map((_, idx) => (
                            <div key={idx} className="col mb-4">
                                <div className="card h-100 shadow-sm border-0 rounded">
                                </div>
                            </div>
                        ))
                        : filteredData.map((specialty) => (
                            <div key={specialty.specialty_id} className="col mb-4">
                                <SpecialtyCard specialty={specialty} />
                            </div>
                        ))}
                </div>
            )}
            {!loading && filteredData.length === 0 && (
				<div className="text-center my-4 text-muted">
					Không có chuyên mục nào!
				</div>
			)}
        </div>
    );
};

export default SpecialtyListPage;
