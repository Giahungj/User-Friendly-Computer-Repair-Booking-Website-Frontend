import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { getTechnicianProfile } from "../../../services/TechnicianService";
import { AuthContext } from "../../../context/AuthContext";
import TechnicianProfileForm from "./TechnicianProfileForm";
import TechnicianPasswordChange from "./TechnicianPasswordChange";

const TechnicianProfilePage = () => {
    const { auth } = useContext(AuthContext);
    const technicianId = auth.user.technicianId;
    const [technician, setTechnician] = useState({});

    const fetchTechnicianProfile = async (technicianId) => {
        try {
            const res = await getTechnicianProfile(technicianId);
            if (res?.EC === 0 && res?.DT) {
                setTechnician(res.DT);
            } else {
                toast.error(res?.EM || "Lỗi tải dữ liệu");
            }
        } catch (err) {
            console.error("Lỗi tải hồ sơ:", err);
        }
    };

    useEffect(() => {
        fetchTechnicianProfile(technicianId);
    }, [technicianId]);

	return (
		<div className="container py-5">
			<div className="card text-center p-4 mb-4">
				<h4 className="mb-3">Hồ sơ Kỹ Thuật Viên</h4>
			</div>
            <div className="row g-4">
				<div className="col d-flex">
    			    <TechnicianProfileForm data={technician} />
				</div>
                <div className="col d-flex">
		    	    <TechnicianPasswordChange />
				</div>
            </div>
		</div>
	);
};

export default TechnicianProfilePage;
