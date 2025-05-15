import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSpecialties } from "../../services/specialtySevice";
import Button  from '@mui/material/Button';

const SpecialtyList = () => {
  const [specialties, setSpecialties] = useState([]);
  const navigate = useNavigate();

  // Fetch specialties when the component mounts
  useEffect(() => {
    const getSpecialties = async () => {
      try {
        const response = await fetchSpecialties();
        if (response && response.EC === 0) {
            setSpecialties(response.DT.specialties);
        } else {
          console.error("Error fetching specialties:", response.EM);
        }
      } catch (error) {
        console.error("Error fetching specialties:", error);
      }
    };
    getSpecialties();
  }, []);

  // Handle navigation to the specialty detail page
  const handleViewDetail = async (id) => {
    await new Promise(resolve => setTimeout(resolve, 250));
    navigate(`/specialties/${id}`);
  };

  return (
    <div className="container">
      <div className="row row-cols-md-4">
      {specialties.map((specialty) => (
        <div className="col my-4" key={specialty.id}>
          <div className="card shadow-sm border-0 rounded-0">
            {/* Hình ảnh chuyên khoa */}
            <div className="overflow-hidden">
              <img
                src={specialty.image ? `http://localhost:8080${specialty.image}` : '/default-image.jpg'}
                alt={specialty.name}
                className="card-img-top hover hover:scale-110"
                style={{ height: '200px', objectFit: 'cover' }}
              />
            </div>

            <div className="card-body text-center">
              <h5 className="card-title fw-bold">{specialty.name}</h5>
              <Button variant="outlined" onClick={() => handleViewDetail(specialty.id)} >
                Xem chi tiết
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default SpecialtyList;