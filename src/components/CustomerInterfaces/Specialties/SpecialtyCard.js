import { Button  } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SpecialtyCard = ({ specialty }) => {
    const navigate = useNavigate();

    return (
        <div className="card h-100 shadow-sm border-0" style={{ cursor: "pointer" }}>
            {specialty?.image ? (
                <img
                    src={`http://localhost:8080/images${specialty.image}`}
                    alt={specialty?.name || 'Specialty'}
                    className="card-img-top"
                    style={{ height: '150px', objectFit: 'cover' }}
                />
            ) : (
                <div
                    className="d-flex align-items-center justify-content-center bg-light"
                    style={{ height: '150px', color: '#999' }}
                >
                    Không có ảnh
                </div>
            )}

            <div className="card-body d-flex flex-column">
                <h6 className="card-title fs-6 fw-bold mb-2 text-truncate">
                    {specialty?.name || ''}
                </h6>

                <p className="card-text text-muted small mb-3">
                    {specialty?.description
                        ? specialty.description.length > 80
                            ? specialty.description.substring(0, 80) + '...'
                            : specialty.description
                        : ''}
                </p>

                <div className="text-primary small fw-semibold mb-3">
                    {specialty?.technicianCount ?? 0} kỹ thuật viên
                </div>

                {/* Button MUI */}
                <Button
                    variant="contained"
                    size="small"
                    sx={{
                        alignSelf: 'flex-start',
                        backgroundColor: '#2196f3',
                        '&:hover': {
                            backgroundColor: '#1976d2' // màu tối hơn khi hover
                        }
                    }}
                    onClick={() => navigate(`/chuyen-muc/${specialty?.specialty_id}/chi-tiet`)}
                >
                    Xem chi tiết
                </Button>
            </div>
        </div>
    );
};

export default SpecialtyCard;
