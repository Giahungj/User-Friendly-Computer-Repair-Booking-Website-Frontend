import {Avatar, Button} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useNavigate } from 'react-router-dom';

const DoctorList = ({ doctors, handleBooking }) => {
    const navigate = useNavigate();

    return (
        <>
        {doctors.length > 0 && (
            <div className="row g-2 justify-content-center mt-4">
                <ul className="list-group gap-3">
                    {doctors.map((doctor) => (
                        <li key={doctor.id} className="list-group-item list-group-item-action border rounded shadow-sm">
                            <div className="row gap-3">
                                {/* Ảnh đại diện */}
                                <div className="col-2 d-fex flex-column gap-3">
                                    <div className="d-flex align-items-center justify-content-center mb-3">
                                        <Avatar
                                            alt={doctor.User.name}
                                            src={
                                            doctor.User.avatar
                                                ? `http://localhost:8080/images/uploads/${doctor.User.avatar}`
                                                : '/default-avatar.jpg'
                                            }
                                            sx={{ width: 150, height: 150 }}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <Button variant="contained" onClick={() => navigate(`/doctors/${doctor.id}`)}>
                                            Xem thêm
                                        </Button>
                                    </div>
                                </div>
                                {/* Mô tả */}
                                <div className="col p-3 border-start">
                                    <div className="mb-3">
                                        <h6 className="mb-1">GIÁ KHÁM</h6>
                                        <span className="text-red-300 fw-bold" style={{ fontSize: '1.1rem' }}>
                                            {doctor.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) || 'Chưa cập nhật'}
                                        </span>
                                    </div>
                                    <div className="mb-3">
                                        <p className="mb-0 text-muted">{doctor.infor || 'Chưa cập nhật'}</p>
                                        <p className="mb-0 text-muted">{doctor.experience + ' năm' || 'Chưa cập nhật'}</p>
                                    </div>
                                    <div>
                                        <h6 className="mb-1">ĐỊA CHỈ KHÁM</h6>
                                        <p className="mb-0 text-muted d-flex align-items-center">
                                            <LocalHospitalIcon fontSize="small" className="me-1" />
                                            {doctor.Facility?.name || 'Chưa cập nhật'}
                                        </p>
                                        <p className="mb-0 text-muted d-flex align-items-center">
                                            <LocationOnIcon fontSize="small" className="me-1" />
                                            {doctor.Facility?.address || 'Chưa cập nhật'}
                                        </p>
                                    </div>
                                </div>
                                {/* Lịch làm việc */}
                                <div className="col border-start">
                                    <div className="d-flex flex-column gap-3">
                                        {doctor.schedules.length === 0 && (
                                            <div className="text-center">
                                            <div className="d-block">Trống</div>
                                            </div>
                                        )}
                                        {Object.entries(
                                            doctor.schedules.reduce((acc, sche) => {
                                            const date = sche.date;
                                            if (!acc[date]) acc[date] = [];
                                            acc[date].push(sche);
                                            return acc;
                                            }, {})
                                        ).map(([date, schedulesByDate]) => (
                                            <div key={date}>
                                            <h6 className="mb-2">{date}</h6>
                                            <div className="row row-cols-3">
                                                {schedulesByDate.slice(0, 8).map((sche) => (
                                                <div key={sche.id} className="col">
                                                    <button
                                                    className="btn btn-outline-primary p-2"
                                                    onClick={() => handleBooking(sche.id)}
                                                    disabled={sche.currentNumber >= sche.maxNumber}
                                                    >
                                                    <p className="m-0 fw-bold text-start" style={{ fontSize: '0.8rem' }}>
                                                        {sche.Timeslot.startTime} - {sche.Timeslot.endTime}
                                                    </p>
                                                    <p className="m-0 text-start" style={{ fontSize: '0.7rem' }}>
                                                        <span className={sche.currentNumber >= sche.maxNumber ? "text-danger" : ""}>
                                                        {sche.currentNumber}/{sche.maxNumber}
                                                        </span>
                                                    </p>
                                                    </button>
                                                </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )}
        {doctors.length === 0 && (
            <div className="alert alert-warning text-center mt-4" role="alert">
                Không có bác sĩ nào thuộc chuyên khoa này.
            </div>
        )}
        </>
    );
};

export default DoctorList;