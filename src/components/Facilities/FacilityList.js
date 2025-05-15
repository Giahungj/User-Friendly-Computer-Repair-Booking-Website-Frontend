// FacilityList.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchFacilities } from "../../services/FacilityService";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "../../../src/App.scss";

const FacilityList = () => {
    const { id } = useParams();
    const [facilities, setFacilities] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const getFacilities = async () => {
            try {
                const response = await fetchFacilities();
                if (response && response.EC === 0) {
                    setFacilities(response.DT);
                }
            } catch (error) {
                console.error("Error fetching facilities:", error);
            }
        };
        getFacilities();
    }, [id]);

    const handleViewDetail = (id) => {
        navigate(`/facilities/${id}`);
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-secondary mb-0">Phòng khám</h2>
                <div className="w-50">
                </div>
            </div>
            <div className="row row-cols-4 g-4 d-flex justify-content-center">
                {facilities.map((facility) => (
                    <div className="col-md-3 mb-4" key={facility.id}>
                        <div className="card h-100 shadow-sm">
                            <div className="overflow-hidden">
                                <img 
                                    src={facility.image || "/images/uploads/pexels-gustavo-fring-7446995.jpg"} 
                                    className="card-img-top transition-transform duration-300 hover:scale-110" 
                                    alt={facility.name}
                                />
                            </div>
                            <div className="card-header text-center">
                                <h5 className="mb-0">{facility.name}</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text text-start">
                                    <LocationOnIcon color="error" sx={{ marginRight: 1 }} />
                                    {facility.address}
                                </p>
                                <p className="card-text">
                                    <strong className="text-primary">{facility.totalDoctor}</strong> Y bác sĩ uy tín và dày dạn kinh nghiệm, cùng với tay nghề cao đang làm việc tại đây.
                                </p>
                            </div>
                            <div className="card-footer text-center">
                                <button 
                                    className="btn btn-secondary hover"
                                    onClick={() => handleViewDetail(facility.id)}
                                >
                                    Xem chi tiết
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FacilityList;