import { useState, useEffect, useContext } from "react";
import { fetchPatientStats } from "../../../../services/StatsService";
import { AuthContext } from "../../../../context/AuthContext";

const DoctorPatientStatsData = ({ onDataLoaded }) => {
    const [stats, setStats] = useState(null);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            if (!auth?.account?.doctorId) return;
            try {
                const response = await fetchPatientStats(auth.account.doctorId);
                if (response.EC === 0) {
                    setStats(response.DT);
                    onDataLoaded(response.DT);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu thống kê bệnh nhân:", error);
            }
        };
        fetchData();
    }, [auth, onDataLoaded]);

    return null; // Không cần render gì cả
};

export default DoctorPatientStatsData;
