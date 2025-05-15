import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllDoctors } from "../../services/doctorService";
import Avatar from '@mui/material/Avatar';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const getDoctors = async () => {
            try {
                const response = await fetchAllDoctors();
                if (response.data && response.data.EC === 0) {
                    setDoctors(response.data.DT);
                } else {
                    console.error("Error fetching doctors:", response.data.EM);
                }
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };
        getDoctors();
    }, []);

    const handleViewDetail = (id) => {
        navigate(`/doctors/${id}`);
    };

    return (
        <div className="container p-4">
            <p>Danh sách bác sĩ</p>
            <ul className="list-group gap-4">
                {doctors.map((doctor) => (
                    <li key={doctor.id} className="list-group-item list-group-item-action border rounded shadow-sm" onClick={() => handleViewDetail(doctor.id)} style={{ cursor: 'pointer'}}>
                       <div className="d-flex gap-5 align-items-center">
                            <Avatar
                                alt={doctor.User.name}
                                src={
                                doctor.User.avatar
                                ? `http://localhost:8080/images/uploads/${doctor.User.avatar}`
                                : '/default-avatar.jpg'
                            }
                            sx={{ width: 150, height: 150 }}
                            />
                            BS {doctor.User.name} chuyên khoa {doctor.Specialty.name}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DoctorList;
